export interface UserNameParts {
  firstName: string;
  lastName: string;
  middleInitial: string;
  suffix: string;
}

export function formatUserName(parts: UserNameParts) {
  return [parts.firstName.trim(), parts.middleInitial ? `${parts.middleInitial.trim()}.` : "", parts.lastName.trim(), parts.suffix.trim()]
    .filter(Boolean).join(" ");
}

export function suggestUsername(firstName: string, lastName: string) {
  const clean = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9_-]/g, "");
  const first = clean(firstName.trim());
  const last = clean(lastName.trim());
  if (!first || !last) return "";
  const username = `${first.charAt(0)}.${last}`.toLowerCase();
  return username.slice(0, 50);
}

export function getUserNameParts(user: { name: string; firstName?: string | null; lastName?: string | null; middleInitial?: string | null; suffix?: string | null } | null): UserNameParts {
  if (!user) return { firstName: "", lastName: "", middleInitial: "", suffix: "" };
  if (user.firstName !== null && user.firstName !== undefined) {
    return { firstName: user.firstName, lastName: user.lastName ?? "", middleInitial: user.middleInitial ?? "", suffix: user.suffix ?? "" };
  }
  // Older records have a single name field. Preserve compound surnames when editing.
  const parts = user.name.trim().split(/\s+/);
  const firstName = parts.shift() ?? "";
  return { firstName, lastName: parts.join(" "), middleInitial: "", suffix: "" };
}
