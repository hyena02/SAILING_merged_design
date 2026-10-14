import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import CompanyLogo from "../Home/components/CompanyLogo";
import { getJobDetail, jobsWithMeta } from "./jobsData";
import "../Home/Home.css";
import "./Jobs.css";

export default function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [applied, setApplied] = useState(false);
  const job = jobsWithMeta.find((item) => item.id === Number(jobId));
  if (!job) return <Navigate to="/jobs" replace />;
  const detail = getJobDetail(job);
  const closed = job.status === "모집마감";

  return (
    <div className="subpage jobs-page">
      <HomeHeader />
      <main className="job-detail container">
        <button className="page-back" onClick={() => navigate("/jobs")}><Icon name="chevron" size={17} /> 채용공고 목록</button>
        <div className="job-detail__layout">
          <article className="job-detail__content">
            <header className="job-detail__header">
              <div className="job-detail__company"><CompanyLogo code={job.logoCode} /><span>{job.company}</span></div>
              <h1>{job.title}</h1>
              <div className="job-detail__tags"><span>{job.role}</span><span><Icon name="map" size={14} />{job.location}</span><span>{detail.vessel}</span></div>
            </header>
            <img className="job-detail__image" src={job.image} alt={`${job.title} 채용 이미지`} />
            <section className="job-detail__summary">
              <div><span>경력</span><strong>{detail.experience}</strong></div>
              <div><span>고용형태</span><strong>{detail.employment}</strong></div>
              <div><span>근무형태</span><strong>{detail.schedule}</strong></div>
              <div><span>급여</span><strong>{job.pay}</strong></div>
            </section>
            <DetailSection title="주요 업무" items={detail.duties} />
            <DetailSection title="지원 자격" items={detail.requirements} />
            {detail.recruitmentSteps && <section className="job-detail__section"><h2>채용 절차</h2><div className="recruit-process">{detail.recruitmentSteps.map((item, index) => <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}</div></section>}
            <section className="job-detail__section"><h2>안내사항</h2><p className="job-detail__notice">제출한 서류의 내용이 사실과 다른 경우 채용이 취소될 수 있습니다. 상세 승선 일정과 근무 조건은 최종 면접 과정에서 안내됩니다.</p></section>
            <section className="job-company-card">
              <div className="job-company-card__heading"><CompanyLogo code={job.logoCode} /><div><h2>{job.company}</h2><a href={detail.company.website}>{detail.company.website}</a></div><button onClick={() => navigate(`/company/${job.id}/recruit`)}>이 회사 채용공고 <Icon name="chevron" size={15} /></button></div>
              <p>{detail.company.introduction}</p>
              <dl>
                <div><dt>대표 전화</dt><dd>{detail.company.phone}</dd></div><div><dt>FAX</dt><dd>{detail.company.fax}</dd></div>
                <div><dt>채용 담당자</dt><dd>{detail.company.manager}</dd></div><div><dt>이메일</dt><dd>{detail.company.email}</dd></div>
                <div className="is-wide"><dt>주소</dt><dd>{detail.company.address}</dd></div>
              </dl>
            </section>
          </article>
          <aside className="job-apply-card">
            <span>접수 마감</span><strong>{closed ? "모집이 마감되었습니다" : job.deadline}</strong><p>{closed ? "현재 지원할 수 없는 공고입니다." : "지원 전 이력서와 보유 자격을 확인해주세요."}</p>
            <button className={`button button--outline ${favorite ? "is-favorite" : ""}`} onClick={() => setFavorite((current) => !current)}><Icon name="heart" size={18} filled={favorite} />{favorite ? "관심 공고 저장됨" : "관심 공고 저장"}</button>
            <button className="button button--primary" disabled={closed || applied} onClick={() => setApplied(true)}>{closed ? "모집마감" : applied ? "지원 완료" : "지원하기"}<Icon name="arrow" size={18} /></button>
            {applied && <small>지원이 정상적으로 접수되었습니다.</small>}
          </aside>
        </div>
      </main>
    </div>
  );
}

function DetailSection({ title, items }: { title: string; items: string[] }) {
  return <section className="job-detail__section"><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}
