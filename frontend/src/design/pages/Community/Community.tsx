import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CommunityLayout from "./CommunityLayout";
import { communityPosts } from "./communityData";

const categories = ["전체", "승선후기", "질문답변", "정보공유", "자유게시판"];

export default function Community() {
  const pageSize = 10;
  const navigate = useNavigate();
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const posts = useMemo(() => communityPosts.filter((post) => {
    const categoryMatches = category === "전체" || post.category === category;
    const queryMatches = !query || `${post.title} ${post.author}`.includes(query);
    return categoryMatches && queryMatches;
  }), [category, query]);
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const visiblePosts = posts.slice((page - 1) * pageSize, page * pageSize);

  const changeCategory = (item: string) => {
    setCategory(item);
    setPage(1);
  };

  return (
    <CommunityLayout>
      <main>
        <section className="subpage-hero">
          <div className="container">
            <span>SAILING COMMUNITY</span>
            <h1>바다 위 경험이<br />서로의 항로가 됩니다</h1>
            <p>현직자와 예비 해운인이 자유롭게 질문하고 경험을 나누는 공간입니다.</p>
          </div>
        </section>
        <section className="community-page container">
          <div className="page-title-row">
            <div><span>COMMUNITY</span><h2>커뮤니티</h2><p>새로운 소식과 현장의 이야기를 확인하세요.</p></div>
            <button className="button button--primary" onClick={() => navigate("/community/write")}><Icon name="pen" size={18} />글쓰기</button>
          </div>
          <div className="community-toolbar">
            <div className="community-categories">
              {categories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => changeCategory(item)}>{item}</button>)}
            </div>
            <label className="community-search"><Icon name="search" size={18} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="제목 또는 작성자 검색" /></label>
          </div>
          <div className="community-table">
            <div className="community-table__head"><span>분류</span><span>제목</span><span>작성자</span><span>반응</span><span>조회</span><span>등록일</span></div>
            {visiblePosts.map((post) => (
              <div className="community-table__row" key={post.id} onClick={() => navigate(`/community/${post.id}`)}>
                <span className="category-chip">{post.category}</span>
                <strong>{post.hot && <em>HOT</em>}{post.title}<small><Icon name="comment" size={14} />{post.comments}</small></strong>
                <span>{post.author}</span>
                <span className="post-reaction-count"><i><Icon name="thumb-up" size={14} />{post.likes}</i><i><Icon name="thumb-down" size={14} />{post.dislikes}</i></span>
                <span>{post.views}</span><span>{post.date}</span>
              </div>
            ))}
            {posts.length === 0 && <div className="community-empty">검색 결과가 없습니다.</div>}
          </div>
          <nav className="pagination" aria-label="커뮤니티 페이지">
            <button disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><Icon name="chevron" size={16} /></button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} className={page === item ? "is-active" : ""} onClick={() => setPage(item)}>{item}</button>)}
            <button disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}><Icon name="chevron" size={16} /></button>
          </nav>
        </section>
      </main>
    </CommunityLayout>
  );
}
