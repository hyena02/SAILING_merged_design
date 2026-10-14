
import { createBrowserRouter, Navigate } from "react-router-dom";

// 페이지는 접속할 때 불러오도록 설정
export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("../features/Home/HomePage")).default,
    }),
  },
  {
    path: "/login", // 로그인
    lazy: async () => ({
      Component: (await import("../features/auth/pages/LoginPage")).default,
    }),
  },
  {
    path: "/signup", // 회원가입
    lazy: async () => ({
      Component: (await import("../features/auth/pages/SignupTypePage")).default,
    }),
  },
  {
    path: "/signup/personal", //회원가입 일반회원
    lazy: async () => ({
      Component: (await import("../features/auth/pages/PersonalSignupPage")).default,
    }),
  },
  {
    path: "/signup/company",  //회원가입 기업회원
    lazy: async () => ({
      Component: (await import("../features/auth/pages/CompanySignupPage")).default,
    }),
  },
  {
    path: "/signup/store",  //회원가입 업체회원
    lazy: async () => ({
      Component: (await import("../features/auth/pages/StoreSignupPage")).default,
    }),
  },
  {
    path: "/users", 
    lazy: async () => ({
      Component: (await import("../features/users/UserListPage")).default,
    }),
  },
  {
    path: "/mypage/personal", //마이페이지 일반
    lazy: async () => ({
      Component: (
        await import("../features/mypage/personal/PersonalMyPage")).default,
    }),
  },
  {
    path: "/mypage/personal/likes",  //마이페이지-일반 관심공고
    lazy: async () => {
      const PersonalActivityPage = (
        await import("../features/mypage/personal/PersonalActivityPage")
      ).default;

      return {
        Component: () => <PersonalActivityPage type="likes" />,
      };
    },
  },
  {
    path: "/mypage/personal/writing", //마이페이지 - 일반 내가쓴글
    lazy: async () => {
      const PersonalActivityPage = (
        await import("../features/mypage/personal/PersonalActivityPage")
      ).default;

      return {
        Component: () => <PersonalActivityPage type="writing" />,
      };
    },
  },
  {
    path: "/mypage/company",
    lazy: async () => ({
      Component: (
        await import("../features/mypage/company/CompanyMyPage")
      ).default,
    }),
  },
  {
    // 업체회원 마이페이지 (/mypage/store)
    path: "/mypage/store",
    lazy: async () => ({
      Component: (await import("../features/mypage/store/storeMyPage")).default,
    }),
  },
  {
    path: "/mypage/store",
    lazy: async () => ({
      Component: (await import("../features/mypage/store/storeMyPage")).default,
    }),
  },




  // Sailingg-main 디자인 페이지를 SAILING의 기존 frontend 라우터에 연결
  { path: "/mypage/admin", lazy: async () => ({ Component: (await import("../design/pages/Admin/AdminDashboard")).default }) },
  { path: "/design-home", lazy: async () => ({ Component: (await import("../design/pages/Home/Home")).default }) },
  { path: "/jobs", lazy: async () => ({ Component: (await import("../design/pages/Jobs/Jobs")).default }) },
  { path: "/jobs/detail/:jobId", lazy: async () => ({ Component: (await import("../design/pages/Jobs/JobDetail")).default }) },
  { path: "/jobs/new", lazy: async () => ({ Component: (await import("../design/pages/Jobs/JobCreate")).default }) },
  { path: "/partners", lazy: async () => ({ Component: (await import("../design/pages/Partners/Partners")).default }) },
  { path: "/partners/detail/:partnerId", lazy: async () => ({ Component: (await import("../design/pages/Partners/PartnerDetail")).default }) },
  { path: "/chats", lazy: async () => ({ Component: (await import("../design/pages/Chats/Chats")).default }) },
  { path: "/chats/:partnerId", lazy: async () => ({ Component: (await import("../design/pages/Chats/Chats")).default }) },
  { path: "/talents", lazy: async () => ({ Component: (await import("../design/pages/Talents/Talents")).default }) },
  { path: "/community", lazy: async () => ({ Component: (await import("../design/pages/Community/Community")).default }) },
  { path: "/community/write", lazy: async () => ({ Component: (await import("../design/pages/Community/CommunityWrite")).default }) },
  { path: "/community/:postId", lazy: async () => ({ Component: (await import("../design/pages/Community/CommunityView")).default }) },
  { path: "/company/:companyId/recruit", lazy: async () => ({ Component: (await import("../design/pages/Company/CompanyRecruit")).default }) },

  { path: "*", element: <Navigate to="/" replace /> },
]);