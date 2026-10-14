import type { ReactNode } from "react";
import HomeHeader from "../Home/components/HomeHeader";
import "../Home/Home.css";
import "./Community.css";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="subpage">
      <HomeHeader />
      {children}
      <footer className="subpage-footer">
        <div className="container"><strong>SAILING</strong><span>대한민국 해운·선박 전문 채용 플랫폼</span><span>© 2025 SAILING.</span></div>
      </footer>
    </div>
  );
}
