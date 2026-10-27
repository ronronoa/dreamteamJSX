import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "./config";
import { refreshSession } from "./refreshSession";
import { store } from "@/store";
import { setSession } from "@/store/authSlice";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _authRetry?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  adapter: "fetch",
  validateStatus: () => true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.session?.accessToken;
  if (accessToken && !config.headers.has("Authorization")) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

apiClient.interceptors.response.use(async (response) => {
  if (response.status !== 401 || response.config._authRetry || isRefreshRequest(response.config)) {
    return response;
  }

  response.config._authRetry = true;
  const failedToken = getBearerToken(response.config);
  const currentSession = store.getState().auth.session;
  const currentToken = currentSession?.accessToken;

  // Another request may already have refreshed the session while this 401 was in flight.
  // Reuse that newer token instead of rotating the refresh cookie again.
  if (currentToken && failedToken && failedToken !== currentToken) {
    response.config.headers.set("Authorization", `Bearer ${currentToken}`);
    return apiClient.request(response.config);
  }

  const refreshedSession = await refreshSession();
  if (!refreshedSession?.accessToken) {
    if (currentSession) store.dispatch(setSession(null));
    return response;
  }

  store.dispatch(setSession(refreshedSession));
  response.config.headers.set("Authorization", `Bearer ${refreshedSession.accessToken}`);
  return apiClient.request(response.config);
});

/** Sends API requests through Axios and keeps the existing Response-based API helpers compatible. */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const response = await apiClient.request({
    url: normalizePath(path),
    method: options.method ?? "GET",
    headers: toAxiosHeaders(options.headers),
    data: options.body,
    signal: options.signal ?? undefined,
    responseType: path.includes("/stream") ? "stream" : "blob",
  });

  return toFetchResponse(response);
}

/** Refreshes an optional session first, then makes the request with its access token. */
export async function apiFetchWithOptionalAuth(path: string, options: RequestInit = {}): Promise<Response> {
  const session = await refreshSession();
  if (session) store.dispatch(setSession(session));

  const headers = new Headers(options.headers);
  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  return apiFetch(path, { ...options, headers });
}

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function toAxiosHeaders(headers?: HeadersInit): Record<string, string> {
  const requestHeaders = new Headers(headers);
  const result: Record<string, string> = {};

  requestHeaders.forEach((value, name) => {
    result[name] = value;
  });

  return result;
}

function getBearerToken(config: InternalAxiosRequestConfig): string | null {
  const authorization = config.headers.get("Authorization");
  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length);
}

function isRefreshRequest(config: InternalAxiosRequestConfig): boolean {
  return config.url?.replace(/\/$/, "").endsWith("/auth/refresh") ?? false;
}

function toFetchResponse(response: AxiosResponse): Response {
  const headers = new Headers();
  const responseHeaders = response.headers as Record<string, unknown>;

  for (const [name, value] of Object.entries(responseHeaders)) {
    if (Array.isArray(value)) {
      headers.set(name, value.join(", "));
    } else if (value !== undefined) {
      headers.set(name, String(value));
    }
  }

  const body = getResponseBody(response.data);
  const emptyBodyStatus = [204, 205, 304].includes(response.status);

  return new Response(emptyBodyStatus ? null : body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function getResponseBody(data: unknown): BodyInit | null {
  if (data === null || data === undefined) return null;
  if (typeof data === "string") return data;
  if (data instanceof Blob || data instanceof ArrayBuffer || data instanceof ReadableStream) return data;
  if (ArrayBuffer.isView(data)) {
    const bytes = new Uint8Array(data.byteLength);
    bytes.set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
    return bytes.buffer;
  }

  return JSON.stringify(data);
}
