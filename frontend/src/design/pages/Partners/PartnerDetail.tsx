import { Navigate, useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CompanyLogo from "../Home/components/CompanyLogo";
import HomeHeader from "../Home/components/HomeHeader";
import { partners } from "./partnersData";
import { getLoginUser } from "../../utils/auth";
import "../Home/Home.css";
import "./Partners.css";

export default function PartnerDetail() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const partner = partners.find((item) => item.id === Number(partnerId));
  if (!partner) return <Navigate to="/partners" replace />;

  return (
    <div className="subpage partners-page">
      <HomeHeader />
      <main className="partner-detail container">
        <button className="page-back" onClick={() => navigate("/partners")}><Icon name="chevron" size={17} /> 한인선식 목록</button>
        <div className="partner-detail__layout">
          <article className="partner-profile">
            <header><div><CompanyLogo code={partner.logoCode} /><span className="partner-card__category">{partner.category} · {partner.country}</span></div>{partner.badge && <span className={`partner-badge partner-badge--${partner.badge.toLowerCase()}`}>{partner.badge}</span>}<h1>{partner.name}</h1><p>{partner.description}</p><small>조회 {partner.views.toLocaleString()} · 가입일 {partner.joined}</small></header>
            <section><h2>서비스 안내</h2><div className="service-chips">{partner.services.map((service) => <span key={service}>{service}</span>)}</div></section>
            <section><h2>서비스 가능 항구</h2><div className="port-list">{partner.ports.map((port) => <span key={port}><Icon name="map" size={15} />{port}</span>)}</div></section>
            <section><h2>업체 정보</h2><dl><div><dt>담당자</dt><dd>{partner.manager}</dd></div><div><dt>전화</dt><dd>{partner.phone}</dd></div><div><dt>FAX</dt><dd>{partner.fax}</dd></div><div><dt>이메일</dt><dd>{partner.email}</dd></div><div><dt>홈페이지</dt><dd>{partner.website}</dd></div><div><dt>주소</dt><dd>{partner.address}</dd></div></dl>
              <div className="partner-map"><div><Icon name="map" size={18} /><span><strong>업체 위치</strong><small>{partner.address}</small></span></div><iframe title={`${partner.name} 지도`} loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(partner.address)}&output=embed`} /></div>
            </section>
          </article>
          <aside className="partner-contact-card"><span>실시간 문의</span><h2>업체에 바로 문의해보세요</h2><p>서비스 가능 여부와 견적을 채팅으로 빠르게 확인할 수 있습니다.</p><button className="button button--primary" onClick={() => navigate(getLoginUser() ? `/chats/${partner.id}` : "/login")}><Icon name="comment" size={18} />업체와 채팅하기</button><div><strong>평균 응답 시간</strong><span>약 15분 이내</span></div></aside>
        </div>
      </main>
    </div>
  );
}
