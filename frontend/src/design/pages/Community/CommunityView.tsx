import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CommunityLayout from "./CommunityLayout";
import { communityPosts } from "./communityData";
import { getLoginUser } from "../../utils/auth";

type ReportTarget = { type: "post" } | { type: "default-comment" } | { type: "comment"; index: number };

export default function CommunityView() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = communityPosts.find((item) => item.id === Number(postId));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; likes: number; liked: boolean; reported: boolean }>>([]);
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  const [reported, setReported] = useState(false);
  const [defaultCommentLiked, setDefaultCommentLiked] = useState(false);
  const [defaultCommentReported, setDefaultCommentReported] = useState(false);
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [adminHidden, setAdminHidden] = useState(false);
  const [adminDeleted, setAdminDeleted] = useState(false);
  const isAdmin = getLoginUser()?.role === "ADMIN";

  if (!post) return <Navigate to="/community" replace />;

  return (
    <CommunityLayout>
      <main className="post-view container">
        <button className="page-back" onClick={() => navigate("/community")}><Icon name="chevron" size={17} /> 목록으로 돌아가기</button>
        {isAdmin && <div className="admin-review-bar"><div><Icon name="bell" size={18} /><span>관리자 검토 모드</span></div><div><button onClick={() => setAdminHidden((current) => !current)}>{adminHidden ? "숨김 해제" : "게시글 숨김"}</button><button onClick={() => setAdminDeleted(true)}>게시글 삭제</button></div></div>}
        {adminDeleted ? <div className="admin-removed-content"><Icon name="flag" size={28} /><strong>관리자에 의해 삭제 처리된 게시글입니다.</strong><button onClick={() => setAdminDeleted(false)}>삭제 취소</button></div> :
        <article className="post-view__card">
          <header><div className="post-view__meta-top"><span className="category-chip">{post.category}</span><button className={reported ? "report-button is-reported" : "report-button"} onClick={() => !reported && setReportTarget({ type: "post" })}><Icon name="flag" size={14} />{reported ? "신고 접수됨" : "신고하기"}</button></div><h1>{post.title}</h1>
            <div className="post-view__author"><strong>{post.author}</strong><span>{post.date}</span><span>조회 {post.views}</span></div>
          </header>
          <div className="post-view__body">{post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <footer><div className="post-reactions">
              <button className={reaction === "like" ? "is-active" : ""} onClick={() => setReaction((current) => current === "like" ? null : "like")}><Icon name="thumb-up" size={18} />공감해요 <strong>{post.likes + (reaction === "like" ? 1 : 0)}</strong></button>
              <button className={reaction === "dislike" ? "is-active is-dislike" : ""} onClick={() => setReaction((current) => current === "dislike" ? null : "dislike")}><Icon name="thumb-down" size={18} />공감하지 않아요 <strong>{post.dislikes + (reaction === "dislike" ? 1 : 0)}</strong></button>
            </div>
          </footer>
        </article>}
        <section className="comment-card">
          <h2>댓글 <span>{post.comments + comments.length}</span></h2>
          <form onSubmit={(event) => { event.preventDefault(); if (comment.trim()) { setComments((current) => [{ text: comment.trim(), likes: 0, liked: false, reported: false }, ...current]); setComment(""); } }}>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="따뜻한 댓글을 남겨주세요." />
            <button className="button button--dark">댓글 등록</button>
          </form>
          {comments.map((item, index) => <div className="comment" key={`${item.text}-${index}`}><strong>나</strong><p>{item.text}</p><span>방금 전</span>
            <div className="comment-actions"><button className={item.liked ? "is-active" : ""} onClick={() => setComments((current) => current.map((entry, entryIndex) => entryIndex === index ? { ...entry, liked: !entry.liked } : entry))}><Icon name="thumb-up" size={14} />추천 {item.likes + (item.liked ? 1 : 0)}</button><button className={item.reported ? "is-reported" : ""} onClick={() => !item.reported && setReportTarget({ type: "comment", index })}><Icon name="flag" size={14} />{item.reported ? "신고됨" : "신고하기"}</button></div>
          </div>)}
          <div className="comment"><strong>항해하는사람</strong><p>좋은 경험 공유해주셔서 감사합니다. 승선을 준비하는 데 큰 도움이 됐어요.</p><span>2025.05.28</span>
            <div className="comment-actions"><button className={defaultCommentLiked ? "is-active" : ""} onClick={() => setDefaultCommentLiked((current) => !current)}><Icon name="thumb-up" size={14} />추천 {12 + (defaultCommentLiked ? 1 : 0)}</button><button className={defaultCommentReported ? "is-reported" : ""} onClick={() => !defaultCommentReported && setReportTarget({ type: "default-comment" })}><Icon name="flag" size={14} />{defaultCommentReported ? "신고됨" : "신고하기"}</button></div>
          </div>
        </section>
      </main>
      {reportTarget && <ReportModal reason={reportReason} onReasonChange={setReportReason} onCancel={() => { setReportTarget(null); setReportReason(""); }} onConfirm={() => {
        if (!reportReason) return;
        if (reportTarget.type === "post") setReported(true);
        if (reportTarget.type === "default-comment") setDefaultCommentReported(true);
        if (reportTarget.type === "comment") setComments((current) => current.map((entry, index) => index === reportTarget.index ? { ...entry, reported: true } : entry));
        setReportTarget(null);
        setReportReason("");
      }} />}
    </CommunityLayout>
  );
}

function ReportModal({ reason, onReasonChange, onCancel, onConfirm }: {
  reason: string; onReasonChange: (reason: string) => void; onCancel: () => void; onConfirm: () => void;
}) {
  const reasons = ["음란성/선정성", "비방/욕설", "광고/도배", "기타"];
  return (
    <div className="report-modal-backdrop" onMouseDown={onCancel}>
      <div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="report-modal__close" onClick={onCancel} aria-label="닫기"><Icon name="x" size={20} /></button>
        <span className="report-modal__icon"><Icon name="flag" size={22} /></span>
        <h2 id="report-title">신고 내용을 선택해주세요</h2>
        <p>신고 사유를 확인한 후 운영 정책에 따라 검토합니다.</p>
        <div className="report-reasons">
          {reasons.map((item) => <label key={item}><input type="radio" name="report-reason" value={item} checked={reason === item} onChange={() => onReasonChange(item)} /><span />{item}</label>)}
        </div>
        <div className="report-modal__actions"><button className="button button--outline" onClick={onCancel}>취소</button><button className="button button--dark" disabled={!reason} onClick={onConfirm}>확인</button></div>
      </div>
    </div>
  );
}
