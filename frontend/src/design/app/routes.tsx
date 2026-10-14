import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", lazy: async () => ({ Component: (await import("../pages/Home/Home")).default }) },
  { path: "/home", lazy: async () => ({ Component: (await import("../pages/Home/Home")).default }) },
  { path: "/login", lazy: async () => ({ Component: (await import("../pages/Auth/Login")).default }) },
  { path: "/signup", lazy: async () => ({ Component: (await import("../pages/Auth/SignupType")).default }) },
  { path: "/signup/personal", lazy: async () => ({ Component: (await import("../pages/Auth/PersonalSignup")).default }) },
  { path: "/signup/company", lazy: async () => ({ Component: (await import("../pages/Auth/CompanySignup")).default }) },
  { path: "/signup/vendor", lazy: async () => ({ Component: (await import("../pages/Auth/VendorSignup")).default }) },
  { path: "/mypage", element: <Navigate to="/mypage/personal" replace /> },
  { path: "/mypage/personal", lazy: async () => {
    const MyPage = (await import("../pages/MyPage/MyPage")).default;
    return { Component: () => <MyPage pageRole="USER" /> };
  } },
  { path: "/mypage/company", lazy: async () => {
    const MyPage = (await import("../pages/MyPage/MyPage")).default;
    return { Component: () => <MyPage pageRole="COMPANY" /> };
  } },
  { path: "/mypage/personal/likes", lazy: async () => {
    const PersonalActivity = (await import("../pages/MyPage/PersonalActivity")).default;
    return { Component: () => <PersonalActivity type="likes" /> };
  } },
  { path: "/mypage/personal/writing", lazy: async () => {
    const PersonalActivity = (await import("../pages/MyPage/PersonalActivity")).default;
    return { Component: () => <PersonalActivity type="writing" /> };
  } },
  { path: "/mypage/vendor", lazy: async () => {
    const MyPage = (await import("../pages/MyPage/MyPage")).default;
    return { Component: () => <MyPage pageRole="STORE" /> };
  } },
  { path: "/mypage/admin", lazy: async () => ({ Component: (await import("../pages/Admin/AdminDashboard")).default }) },
  { path: "/community", lazy: async () => ({ Component: (await import("../pages/Community/Community")).default }) },
  { path: "/community/write", lazy: async () => ({ Component: (await import("../pages/Community/CommunityWrite")).default }) },
  { path: "/community/:postId", lazy: async () => ({ Component: (await import("../pages/Community/CommunityView")).default }) },
  { path: "/jobs", lazy: async () => ({ Component: (await import("../pages/Jobs/Jobs")).default }) },
  { path: "/jobs/detail", element: <Navigate to="/jobs" replace /> },
  { path: "/jobs/detail/:jobId", lazy: async () => ({ Component: (await import("../pages/Jobs/JobDetail")).default }) },
  { path: "/jobs/new", lazy: async () => ({ Component: (await import("../pages/Jobs/JobCreate")).default }) },
  { path: "/partners", lazy: async () => ({ Component: (await import("../pages/Partners/Partners")).default }) },
  { path: "/partners/detail", element: <Navigate to="/partners" replace /> },
  { path: "/partners/detail/:partnerId", lazy: async () => ({ Component: (await import("../pages/Partners/PartnerDetail")).default }) },
  { path: "/chats", lazy: async () => ({ Component: (await import("../pages/Chats/Chats")).default }) },
  { path: "/chats/:partnerId", lazy: async () => ({ Component: (await import("../pages/Chats/Chats")).default }) },
  { path: "/talents", lazy: async () => ({ Component: (await import("../pages/Talents/Talents")).default }) },
  { path: "/company/:companyId/recruit", lazy: async () => ({ Component: (await import("../pages/Company/CompanyRecruit")).default }) },
  { path: "*", element: <Navigate to="/" replace /> },
]);
