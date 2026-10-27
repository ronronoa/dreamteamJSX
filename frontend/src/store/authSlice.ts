import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfileData } from "@/api/profile";
import type { UserSession } from "@/types/auth";

interface AuthState {
  session: UserSession | null;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<UserSession | null>) {
      state.session = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      if (state.session) state.session.accessToken = action.payload;
    },
    updateProfile(state, action: PayloadAction<UserProfileData>) {
      if (!state.session) return;

      state.session.user = {
        ...state.session.user,
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
        profileImageUrl: action.payload.profileImageUrl,
      };
    },
  },
});

export const { setSession, setLoading, updateAccessToken, updateProfile } = authSlice.actions;
export default authSlice.reducer;
