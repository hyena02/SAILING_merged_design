import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/common/Icon";
import { getLoginUser, getMyPagePath, notifyAuthChange, type LoginUser } from "../../../utils/auth";

const shortRole = { USER: "일반", COMPANY: "기업", STORE: "업체", ADMIN: "관리" } as const;
const navigation = [
  { label: "채용정보", path: "/jobs", target: "jobs" },
  { label: "인재정보", path: "/talents", target: "talents" },
  { label: "커뮤니티", path: "/community", target: "community" },
  { label: "한인선식", path: "/partners", target: "partners" },
];

export default function HomeHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<LoginUser | null>(getLoginUser);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => setUser(getLoginUser());
    window.addEventListener("sailingAuthChange", updateUser);
    return () => window.removeEventListener("sailingAuthChange", updateUser);
  }, []);

  const moveToSection = (target?: string, path?: string) => {
    if (path) navigate(path);
    else if (!["/", "/home"].includes(window.location.pathname)) navigate(`/#${target}`);
    else document.getElementById(target || "jobs")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem("sailingUser");
    notifyAuthChange();
    navigate("/");
  };

  return (
    <header className="home-header safe-area-top">
      <div className="container home-header__inner">
        <button className="brand" onClick={() => navigate("/")} aria-label="세일링 홈">
          <span className="brand__symbol"><Icon name="ship" size={20} /></span>
          <span className="brand__name">SAILING</span>
        </button>
        <nav className="home-nav">
          {navigation.map((item) => <button key={item.label} onClick={() => moveToSection(item.target, item.path)}>{item.label}</button>)}
        </nav>
        <div className="home-header__actions">
          {user ? <>
            <button className="header-chat" onClick={() => navigate("/chats")}><Icon name="comment" size={16} />내 채팅</button>
            <button className="header-account" onClick={() => navigate(getMyPagePath(user.role))}>
              <strong>{user.loginId}님</strong><span className="role-badge">{shortRole[user.role]}</span>
            </button>
            <button className="header-logout" onClick={logout}>로그아웃</button>
          </> : <>
            <button onClick={() => navigate("/login")}>로그인</button><button onClick={() => navigate("/signup")} className="button button--outline">회원가입</button>
          </>}
          {user?.role === "COMPANY" && <button className="button button--primary" onClick={() => navigate("/jobs/new")}>구인공고 등록</button>}
        </div>
        <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="메뉴 열기">
          <Icon name={mobileOpen ? "x" : "menu"} size={25} />
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {navigation.map((item) => <button key={item.label} onClick={() => moveToSection(item.target, item.path)}>{item.label}</button>)}
          {user ? <>
            <button onClick={() => navigate("/chats")}><Icon name="comment" size={16} /> 내 채팅</button>
            <button onClick={() => navigate(getMyPagePath(user.role))}>{user.loginId}님 <span className="role-badge">{shortRole[user.role]}</span></button>
            <button onClick={logout}>로그아웃</button>
          </> : <>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </>}
          {user?.role === "COMPANY" && <button className="button button--primary" onClick={() => navigate("/jobs/new")}>구인공고 등록</button>}
        </div>
      )}
    </header>
  );
}
