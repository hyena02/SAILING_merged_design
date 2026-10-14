import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CommunityLayout from "./CommunityLayout";

export default function CommunityWrite() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("질문답변");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notice, setNotice] = useState("");

  return (
    <CommunityLayout>
      <main className="editor-page container">
        <button className="page-back" onClick={() => navigate("/community")}><Icon name="chevron" size={17} /> 커뮤니티로 돌아가기</button>
        <div className="editor-heading"><span>WRITE A POST</span><h1>새 글 작성</h1><p>항해 경험과 궁금한 점을 커뮤니티에 나눠보세요.</p></div>
        <form className="editor-card" onSubmit={(event) => {
          event.preventDefault();
          setNotice("게시글이 임시 등록되었습니다. REST API 연결 후 커뮤니티에 바로 반영됩니다.");
        }}>
          <label><span>게시판</span><select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>승선후기</option><option>질문답변</option><option>정보공유</option><option>자유게시판</option>
          </select></label>
          <label><span>제목</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="제목을 입력해주세요" maxLength={80} required /><small>{title.length} / 80</small></label>
          <label><span>내용</span><textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="내용을 입력해주세요. 서로를 존중하는 커뮤니티 문화를 함께 만들어주세요." required /><small>{content.length}자</small></label>
          {notice && <div className="editor-notice"><Icon name="bell" size={18} />{notice}</div>}
          <div className="editor-actions"><button type="button" className="button button--outline" onClick={() => navigate("/community")}>취소</button><button className="button button--dark" type="submit">게시글 등록 <Icon name="arrow" size={18} /></button></div>
        </form>
      </main>
    </CommunityLayout>
  );
}
