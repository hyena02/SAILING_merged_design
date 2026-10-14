export type UserRole = "USER" | "COMPANY" | "STORE" | "ADMIN";

export type LoginUser = {
  userId: number;
  loginId: string;
  name: string;
  role: UserRole;
};

export const ROLE_LABEL: Record<UserRole, string> = {
  USER: "일반 회원",
  COMPANY: "선사·기업 회원",
  STORE: "선식·선용품 업체",
  ADMIN: "관리자",
};

export function getLoginUser(): LoginUser | null {
  try {
    const saved = sessionStorage.getItem("sailingUser");
    return saved ? (JSON.parse(saved) as LoginUser) : null;
  } catch {
    return null;
  }
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event("sailingAuthChange"));
}

export function getMyPagePath(role: UserRole) {
  if (role === "ADMIN") return "/mypage/admin";
  if (role === "COMPANY") return "/mypage/company";
  if (role === "STORE") return "/mypage/vendor";
  return "/mypage/personal";
}
