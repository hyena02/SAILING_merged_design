import Icon from "../../../components/common/Icon";
import type { JobPosting } from "../homeData";
import CompanyLogo from "./CompanyLogo";

interface JobCardProps {
  job: JobPosting;
  favorite: boolean;
  onFavorite: (id: number) => void;
  onOpen?: () => void;
}

export default function JobCard({ job, favorite, onFavorite, onOpen }: JobCardProps) {
  return (
    <article className="job-card" onClick={onOpen}>
      <div className="job-card__top">
        <CompanyLogo code={job.logoCode} />
        <button className={`favorite-button ${favorite ? "is-active" : ""}`} onClick={(event) => { event.stopPropagation(); onFavorite(job.id); }} aria-label="관심 공고 저장">
          <Icon name="heart" size={20} filled={favorite} />
        </button>
      </div>
      <p className="job-card__company">{job.company}</p>
      <h3>{job.title}</h3>
      <div className="job-card__tags"><span>{job.role}</span><span>{job.location}</span></div>
      <div className="job-card__footer"><strong>{job.pay}</strong><span>{job.deadline}</span></div>
    </article>
  );
}
