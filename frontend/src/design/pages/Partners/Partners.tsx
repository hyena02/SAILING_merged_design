import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CompanyLogo from "../Home/components/CompanyLogo";
import HomeHeader from "../Home/components/HomeHeader";
import { partners } from "./partnersData";
import "../Home/Home.css";
import "./Partners.css";

const partnerImages = [
  "https://images.unsplash.com/photo-1636545256808-c2f40f2b6cdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1665194976267-a0178633cf27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1621862681400-a2a7321dc1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

export default function Partners() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("전체 지역");
  const filtered = useMemo(() => partners.filter((partner) => {
    const queryMatch = !query || `${partner.name} ${partner.services.join(" ")} ${partner.ports.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return queryMatch && (country === "전체 지역" || partner.country === country);
  }), [query, country]);

  return (
    <div className="subpage partners-page">
      <HomeHeader />
      <main>
        <section className="partners-hero"><div className="container"><span>KOREAN MARINE PARTNERS</span><h1>전 세계 항구의<br />믿을 수 있는 한인선식</h1><p>선식·선용품부터 수리와 항만 서비스까지 검증된 업체를 만나보세요.</p></div></section>
        <section className="partners-board container">
          <div className="partners-heading"><div><span>PARTNER DIRECTORY</span><h2>한인선식 업체</h2><p>항구와 필요한 서비스를 기준으로 업체를 찾아보세요.</p></div><strong>{filtered.length}개 업체</strong></div>
          <div className="partners-filter"><label><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="업체명, 항구, 서비스 검색" /></label><div className="partner-country-filter">{["전체 지역", ...new Set(partners.map((partner) => partner.country))].map((item) => <button key={item} className={country === item ? "is-active" : ""} onClick={() => setCountry(item)}>{item}</button>)}</div></div>
          <div className="partner-grid">{filtered.map((partner) => <article className="partner-card" key={partner.id} onClick={() => navigate(`/partners/detail/${partner.id}`)}>
            <img className="partner-card__image" src={partnerImages[(partner.id - 1) % partnerImages.length]} alt={`${partner.name} 서비스 이미지`} />
            <div className="partner-card__top"><CompanyLogo code={partner.logoCode} />{partner.badge && <span className={`partner-badge partner-badge--${partner.badge.toLowerCase()}`}>{partner.badge}</span>}</div>
            <span className="partner-card__category">{partner.category} · {partner.country}</span><h3>{partner.name}</h3><p>{partner.description}</p>
            <div className="partner-card__ports"><Icon name="map" size={15} />{partner.ports.join(" · ")}</div>
            <div className="partner-card__footer"><span>조회 {partner.views.toLocaleString()}</span><strong>업체 보기 <Icon name="chevron" size={15} /></strong></div>
          </article>)}</div>
        </section>
      </main>
    </div>
  );
}
