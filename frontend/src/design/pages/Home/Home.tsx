import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import "./Home.css";
import HomeHeader from "./components/HomeHeader";
import HeroSearch from "./components/HeroSearch";
import JobCard from "./components/JobCard";
import CompanyLogo from "./components/CompanyLogo";
import { categories, communityPosts, recentJobs, urgentJobs } from "./homeData";

export default function Home() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("지역 전체");
  const [jobType, setJobType] = useState("직무 전체");
  const [activeCategory, setActiveCategory] = useState("해기사");
  const [urgentPage, setUrgentPage] = useState(0);
  const [searched, setSearched] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"region" | "job" | null>(null);

  const filteredJobs = useMemo(() => [...urgentJobs, ...recentJobs].filter((job) => {
    const keywordMatch = !query || `${job.company} ${job.title} ${job.role}`.toLowerCase().includes(query.toLowerCase());
    const regionMatch = region === "지역 전체" || job.location === region || job.location === "전국";
    const roleMatch = jobType === "직무 전체" || job.role.includes(jobType);
    return keywordMatch && regionMatch && roleMatch;
  }), [query, region, jobType]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const search = () => {
    setSearched(true);
    setOpenDropdown(null);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  const urgentPageSize = 3;
  const urgentPageCount = Math.ceil(urgentJobs.length / urgentPageSize);
  const visibleJobs = searched ? filteredJobs : urgentJobs.slice(urgentPage * urgentPageSize, (urgentPage + 1) * urgentPageSize);

  return (
    <div className="home">
      <HomeHeader />
      <main>
        <HeroSearch query={query} region={region} jobType={jobType} openDropdown={openDropdown}
          onQueryChange={setQuery} onRegionChange={setRegion} onJobTypeChange={setJobType}
          onDropdownChange={setOpenDropdown} onSearch={search} />

        <section className="stats">
          <div className="container stats__grid">
            {[["진행중 채용", "483", "건"], ["등록 기업", "1,204", "곳"], ["오늘의 신규공고", "32", "건"], ["누적 회원", "28,451", "명"]].map(([label, number, unit]) => (
              <div key={label}><span>{label}</span><strong>{number}<small>{unit}</small></strong></div>
            ))}
          </div>
        </section>

        <section id="jobs" className="jobs-section">
          <div className="container">
            <div className="section-title-row">
              <div>
                <span className="section-kicker"><Icon name="bell" size={18} />{searched ? "검색 결과" : "지금 바로 지원하세요"}</span>
                <h2 className="section-heading">{searched ? <>조건에 맞는 공고 <em>{filteredJobs.length}건</em></> : "긴급 구인 공고"}</h2>
                <p>{searched ? "선택한 검색 조건을 반영한 결과입니다." : "채용 마감이 임박한 공고를 놓치지 마세요."}</p>
              </div>
              {searched ? <button className="text-button" onClick={() => { setSearched(false); setQuery(""); setRegion("지역 전체"); setJobType("직무 전체"); }}>검색 초기화</button> :
                <div className="urgent-controls"><span>{urgentPage + 1} / {urgentPageCount}</span><button disabled={urgentPage === 0} onClick={() => setUrgentPage((current) => current - 1)}><Icon name="chevron" size={18} /></button><button disabled={urgentPage === urgentPageCount - 1} onClick={() => setUrgentPage((current) => current + 1)}><Icon name="chevron" size={18} /></button></div>}
            </div>
            <div className="job-card-grid">
              {visibleJobs.map((job) => <JobCard key={job.id} job={job} favorite={favorites.includes(job.id)} onFavorite={toggleFavorite} onOpen={() => navigate(`/jobs/detail/${job.id}`)} />)}
            </div>
            {visibleJobs.length === 0 && <div className="empty-state"><strong>조건에 맞는 채용 공고가 없습니다.</strong><p>검색 조건을 조금 넓혀보세요.</p></div>}
          </div>
        </section>

        <section className="category-section">
          <div className="container">
            <span className="section-kicker">나에게 맞는 포지션 찾기</span>
            <h2 className="section-heading">직무별 채용정보</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <button key={category.name} className={`category-card ${activeCategory === category.name ? "is-active" : ""}`} onClick={() => setActiveCategory(category.name)}>
                  <span><Icon name={category.icon} size={22} /></span><strong>{category.name}</strong><small>채용 {category.count}건</small>
                </button>
              ))}
            </div>
            <div className="recent-heading"><h2>최근 등록 채용</h2><button onClick={() => navigate("/jobs")}>더보기 <Icon name="chevron" size={16} /></button></div>
            <div className="recent-list">
              {recentJobs.map((job) => (
                <article className="recent-job" key={job.id} onClick={() => navigate(`/jobs/detail/${job.id}`)}>
                  <CompanyLogo code={job.logoCode} compact />
                  <div className="recent-job__title"><span>{job.company}</span><strong>{job.title}</strong></div>
                  <span className="recent-job__role">{job.role}</span>
                  <span className="recent-job__location"><Icon name="map" size={15} />{job.location}</span>
                  <strong className="recent-job__deadline">{job.deadline}</strong>
                  <button className={`favorite-button ${favorites.includes(job.id) ? "is-active" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(job.id); }}><Icon name="heart" size={19} filled={favorites.includes(job.id)} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="community-section">
          <div className="container community-layout">
            <div className="community-intro">
              <span>SAILING COMMUNITY</span><h2>바다 사람들의<br />진짜 이야기를 나눠요</h2>
              <p>승선 후기부터 자격증, 면접, 선박 생활까지. 현직자와 예비 해운인이 자유롭게 묻고 답합니다.</p>
              <button className="button button--primary" onClick={() => navigate("/community/write")}><Icon name="pen" size={18} />글쓰기</button>
            </div>
            <div className="post-panel">
              <div className="post-tabs"><button className="is-active">전체</button><button>승선후기</button><button>질문답변</button><button>정보공유</button></div>
              {communityPosts.map((post) => (
                <article className="post" key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
                  <div><span>{post.category}</span>{post.hot && <em>HOT</em>}</div>
                  <h3>{post.title}</h3>
                  <p>{post.author}<span>{post.time}</span><span>조회 {post.views}</span><span><Icon name="comment" size={13} />{post.comments}</span></p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="company-cta">
          <div className="container"><div><span>기업회원이라면</span><h2>필요한 해운 인재를 지금 만나보세요</h2></div>
            <button className="button button--dark" onClick={() => navigate("/jobs/new")}>무료 구인등록 <Icon name="arrow" size={18} /></button></div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="container">
          <div className="home-footer__top">
            <div><div className="brand"><span className="brand__symbol"><Icon name="ship" size={18} /></span><span className="brand__name">SAILING</span></div>
              <p>대한민국 해운·선박 전문 채용 플랫폼<br />좋은 인재와 좋은 일자리를 연결합니다.</p></div>
            <div className="footer-links">{["회사소개", "이용약관", "개인정보처리방침", "고객센터", "광고문의", "제휴문의", "공지사항", "자주 묻는 질문"].map((item) => <button key={item}>{item}</button>)}</div>
          </div>
          <div className="home-footer__bottom"><span>© 2025 SAILING. All rights reserved.</span><span>고객센터 1588-0000 · 평일 09:00–18:00</span></div>
        </div>
      </footer>
    </div>
  );
}
