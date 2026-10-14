import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import JobCard from "../Home/components/JobCard";
import { jobsWithMeta } from "../Jobs/jobsData";
import { communityPosts } from "../Community/communityData";
import "../Home/Home.css";
import "./MyPage.css";

export default function PersonalActivity({ type }: { type: "likes" | "writing" }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([1, 3, 8]);
  const isLikes = type === "likes";
  const posts = communityPosts.slice(0, 5);
  return <div className="subpage mypage"><HomeHeader /><main className="mypage-main">
    <section className="mypage-banner"><div className="container"><span>MY ACTIVITY</span><h1>{isLikes ? "관심 공고" : "내가 쓴 글"}</h1><p>{isLikes ? "저장한 채용공고를 한곳에서 확인하고 지원하세요." : "커뮤니티에 작성한 글과 반응을 관리하세요."}</p></div></section>
    <div className="container mypage-layout">
      <aside className="mypage-sidebar"><div className="profile-summary"><div className="profile-avatar is-personal"><Icon name="user" size={34} /></div><strong>김세일</strong><span>일반 회원</span></div>
        <nav><button onClick={() => navigate("/mypage/personal")}><Icon name="user" size={18} />프로필 관리</button><button className={isLikes ? "is-active" : ""} onClick={() => navigate("/mypage/personal/likes")}><Icon name="heart" size={18} />관심 공고</button><button className={!isLikes ? "is-active" : ""} onClick={() => navigate("/mypage/personal/writing")}><Icon name="comment" size={18} />내가 쓴 글</button></nav>
      </aside>
      <section className="profile-card activity-card"><div className="profile-card__heading"><div><span>{isLikes ? "SAVED JOBS" : "MY POSTS"}</span><h2>{isLikes ? "관심 공고" : "내가 쓴 글"}</h2></div><em>총 {isLikes ? favorites.length : posts.length}건</em></div>
        {isLikes ? <div className="activity-job-grid">{jobsWithMeta.filter((job) => favorites.includes(job.id)).map((job) => <JobCard key={job.id} job={job} favorite onOpen={() => navigate(`/jobs/detail/${job.id}`)} onFavorite={(id) => setFavorites((current) => current.filter((item) => item !== id))} />)}</div> :
          <div className="activity-post-list">{posts.map((post) => <button key={post.id} onClick={() => navigate(`/community/${post.id}`)}><span className="category-chip">{post.category}</span><div><strong>{post.title}</strong><p>{post.date} · 조회 {post.views} · 댓글 {post.comments}</p></div><span className="activity-reactions"><Icon name="thumb-up" size={15} />{post.likes}</span><Icon name="chevron" size={17} /></button>)}</div>}
      </section>
    </div>
  </main></div>;
}
