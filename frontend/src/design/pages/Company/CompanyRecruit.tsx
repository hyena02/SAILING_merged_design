import { useNavigate, useParams } from "react-router-dom";
import HomeHeader from "../Home/components/HomeHeader";
import CompanyLogo from "../Home/components/CompanyLogo";
import JobCard from "../Home/components/JobCard";
import { jobsWithMeta } from "../Jobs/jobsData";
import "../Home/Home.css";
import "../Jobs/Jobs.css";

export default function CompanyRecruit() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const selected = jobsWithMeta.find((job) => job.id === Number(companyId)) || jobsWithMeta[0];
  const jobs = jobsWithMeta.filter((job) => job.company === selected.company);
  return <div className="subpage jobs-page"><HomeHeader /><main><section className="company-recruit-hero"><div className="container"><CompanyLogo code={selected.logoCode} /><div><span>COMPANY RECRUIT</span><h1>{selected.company}</h1><p>현재 진행 중인 채용공고를 확인하세요.</p></div></div></section><section className="jobs-board container"><div className="jobs-board__heading"><div><span>OPEN POSITIONS</span><h2>이 회사의 채용공고</h2><p>{selected.company}에서 함께할 인재를 찾고 있습니다.</p></div><strong>총 {jobs.length}건</strong></div><div className="job-card-grid jobs-board__grid company-recruit-grid">{jobs.map((job) => <JobCard key={job.id} job={job} favorite={false} onFavorite={() => {}} onOpen={() => navigate(`/jobs/detail/${job.id}`)} />)}</div></section></main></div>;
}
