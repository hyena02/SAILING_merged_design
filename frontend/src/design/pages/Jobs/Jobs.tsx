import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import JobCard from "../Home/components/JobCard";
import { jobsWithMeta } from "./jobsData";
import "../Home/Home.css";
import "./Jobs.css";

const roles = ["전체 직무", "항해사", "기관사", "갑판부", "조리부", "승무원", "육상직"];
const statuses = ["전체 상태", "상시채용", "모집중", "모집마감"];
type SortOption = "최신 등록순" | "마감일 순" | "급여 높은순";

export default function Jobs() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("전체 직무");
  const [status, setStatus] = useState("전체 상태");
  const [excludeClosed, setExcludeClosed] = useState(false);
  const [salaryOnly, setSalaryOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("최신 등록순");
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredJobs = useMemo(() => jobsWithMeta.filter((job) => {
    const queryMatches = !query || `${job.company} ${job.title} ${job.role} ${job.location}`.toLowerCase().includes(query.toLowerCase());
    const roleMatches = role === "전체 직무" || job.role.includes(role);
    const statusMatches = status === "전체 상태" || job.status === status;
    const closedMatches = !excludeClosed || job.status !== "모집마감";
    const salaryMatches = !salaryOnly || job.salaryVisible;
    return queryMatches && roleMatches && statusMatches && closedMatches && salaryMatches;
  }).sort((a, b) => {
    if (sort === "최신 등록순") return b.registeredOrder - a.registeredOrder;
    if (sort === "급여 높은순") {
      const salary = (value: string) => Number(value.replace(/\D/g, "")) || 0;
      return salary(b.pay) - salary(a.pay);
    }
    const deadline = (value: string) => value === "오늘마감" ? 0 : value === "상시채용" ? 999 : Number(value.replace(/\D/g, "")) || 998;
    return deadline(a.deadline) - deadline(b.deadline);
  }), [query, role, status, excludeClosed, salaryOnly, sort]);

  return (
    <div className="subpage jobs-page">
      <HomeHeader />
      <main>
        <section className="jobs-hero">
          <div className="container"><span>SAILING JOBS</span><h1>바다에서 시작하는<br />새로운 커리어</h1><p>검증된 해운·선박 전문 채용공고를 한곳에서 확인하세요.</p></div>
        </section>
        <section className="jobs-board container">
          <div className="jobs-board__heading"><div><span>OPEN POSITIONS</span><h2>채용공고</h2><p>현재 채용 중인 해상·육상 직무를 찾아보세요.</p></div><strong>총 {filteredJobs.length}건</strong></div>
          <div className="jobs-filter">
            <label><Icon name="search" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="기업명, 공고명, 지역으로 검색" /></label>
            <div className="jobs-filter__roles">{roles.map((item) => <button key={item} className={role === item ? "is-active" : ""} onClick={() => setRole(item)}>{item}</button>)}</div>
            <div className="jobs-filter__options">
              <div className="status-filter">{statuses.map((item) => <button key={item} className={status === item ? "is-active" : ""} onClick={() => setStatus(item)}>{item}</button>)}</div>
              <div className="jobs-filter__toggles">
                <button className={excludeClosed ? "is-selected" : ""} onClick={() => setExcludeClosed((current) => !current)}><span />모집마감 제외</button>
                <button className={salaryOnly ? "is-selected" : ""} onClick={() => setSalaryOnly((current) => !current)}><span />급여표시 회사만 보기</button>
                <label>정렬<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option>최신 등록순</option><option>마감일 순</option><option>급여 높은순</option></select></label>
              </div>
            </div>
          </div>
          {filteredJobs.length > 0 ? <div className="job-card-grid jobs-board__grid">{filteredJobs.map((job) => <div className={`jobs-card-wrap ${job.status === "모집마감" ? "is-closed" : ""}`} key={job.id}><JobCard job={job} favorite={favorites.includes(job.id)} onOpen={() => navigate(`/jobs/detail/${job.id}`)} onFavorite={(id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} /></div>)}</div> :
            <div className="jobs-empty"><Icon name="search" size={30} /><strong>조건에 맞는 채용공고가 없습니다.</strong><p>다른 검색어나 직무를 선택해보세요.</p></div>}
        </section>
      </main>
    </div>
  );
}
