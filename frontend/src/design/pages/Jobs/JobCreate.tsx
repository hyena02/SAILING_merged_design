import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import "../Home/Home.css";
import "./Jobs.css";

type JobForm = {
  company: string; title: string; role: string; vessel: string; location: string; employment: string;
  experience: string; pay: string; deadline: string; duties: string; requirements: string; benefits: string;
  manager: string; phone: string; email: string;
  process: string;
};

const initialForm: JobForm = {
  company: "", title: "", role: "", vessel: "", location: "", employment: "계약직 · 승선근무",
  experience: "", pay: "", deadline: "", duties: "", requirements: "", benefits: "",
  manager: "김민수 채용매니저", phone: "010-2345-6789", email: "hr@company.co.kr", process: "서류 접수, 실무 면접, 건강 검진, 최종 합격",
};

export default function JobCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");
  const [useProcess, setUseProcess] = useState(false);
  const update = (field: keyof JobForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <div className="subpage jobs-page">
      <HomeHeader />
      <main className="job-create container">
        <button className="page-back" onClick={() => navigate("/jobs")}><Icon name="chevron" size={17} /> 채용공고 목록</button>
        <div className="job-create__heading"><span>POST A JOB</span><h1>구인공고 등록</h1><p>좋은 인재가 공고를 정확히 이해할 수 있도록 채용 정보를 자세히 작성해주세요.</p></div>
        <form className="job-create__form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
          <CreateSection number="01" title="공고 기본정보" description="목록과 공고 상단에 표시되는 핵심 정보입니다.">
            <div className="create-grid">
              <CreateField label="기업명" value={form.company} onChange={(value) => update("company", value)} required />
              <CreateField label="공고 제목" value={form.title} onChange={(value) => update("title", value)} required />
              <CreateField label="모집 직무" value={form.role} onChange={(value) => update("role", value)} placeholder="예: 2등 항해사" required />
              <CreateField label="선종·근무부서" value={form.vessel} onChange={(value) => update("vessel", value)} placeholder="예: LNG 운반선" required />
              <CreateField label="근무 지역" value={form.location} onChange={(value) => update("location", value)} required />
              <label><span>고용형태 *</span><select value={form.employment} onChange={(event) => update("employment", event.target.value)}><option>계약직 · 승선근무</option><option>정규직</option><option>기간제</option><option>협의 후 결정</option></select></label>
            </div>
            <label className={`job-image-upload ${image ? "has-image" : ""}`}>
              <input type="file" accept="image/png,image/jpeg" onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setImage(URL.createObjectURL(file));
              }} />
              {image ? <img src={image} alt="채용공고 이미지 미리보기" /> : <span><Icon name="building" size={28} /><strong>채용공고 대표 이미지 첨부</strong><small>선박, 근무환경, 기업 관련 JPG·PNG 이미지를 등록해주세요.</small></span>}
              <em>{image ? "이미지 변경" : "이미지 선택"}</em>
            </label>
          </CreateSection>
          <CreateSection number="02" title="채용 조건" description="지원자가 근무 조건을 명확히 확인할 수 있도록 입력해주세요.">
            <div className="create-grid">
              <CreateField label="경력 조건" value={form.experience} onChange={(value) => update("experience", value)} placeholder="예: 관련 경력 2년 이상" required />
              <CreateField label="급여" value={form.pay} onChange={(value) => update("pay", value)} placeholder="예: 월 720만원~" required />
              <CreateField label="접수 마감일" type="date" value={form.deadline} onChange={(value) => update("deadline", value)} required />
            </div>
            <CreateText label="주요 업무" value={form.duties} onChange={(value) => update("duties", value)} placeholder="담당하게 될 업무를 항목별로 작성해주세요." required />
            <CreateText label="지원 자격" value={form.requirements} onChange={(value) => update("requirements", value)} placeholder="필수 면허, 경력, 자격 조건을 작성해주세요." required />
            <CreateText label="복리후생 및 기타 안내" value={form.benefits} onChange={(value) => update("benefits", value)} placeholder="휴가, 보험, 교육지원 등 추가 정보를 작성해주세요." />
            <label className="process-toggle"><input type="checkbox" checked={useProcess} onChange={(event) => setUseProcess(event.target.checked)} /><span /><div><strong>채용 절차 표시</strong><small>상세 공고에 단계별 채용 절차를 표시합니다. 선택 항목입니다.</small></div></label>
            {useProcess && <CreateField label="채용 절차" value={form.process} onChange={(value) => update("process", value)} placeholder="쉼표로 단계를 구분해주세요." />}
          </CreateSection>
          <CreateSection number="03" title="채용 담당자" description="지원자 문의와 공고 확인을 위한 담당자 정보입니다.">
            <div className="create-grid">
              <label><span>담당자 선택 *</span><select value={form.manager} onChange={(event) => {
                const manager = event.target.value;
                update("manager", manager);
                if (manager.startsWith("김민수")) { update("phone", "010-2345-6789"); update("email", "hr@company.co.kr"); }
                else { update("phone", "010-9876-5432"); update("email", "recruit@company.co.kr"); }
              }}><option>김민수 채용매니저 (대표)</option><option>박서연 인사담당자</option><option>이준호 해상인사팀</option></select></label>
              <CreateField label="연락처" value={form.phone} onChange={(value) => update("phone", value)} required />
              <CreateField label="이메일" type="email" value={form.email} onChange={(value) => update("email", value)} required />
            </div>
          </CreateSection>
          {submitted && <div className="create-success"><Icon name="bell" size={18} />구인공고가 임시 등록되었습니다. API 연결 후 검수 요청이 전송됩니다.</div>}
          <div className="job-create__actions"><button type="button" className="button button--outline" onClick={() => navigate("/jobs")}>취소</button><button className="button button--dark" type="submit">구인공고 등록 <Icon name="arrow" size={18} /></button></div>
        </form>
      </main>
    </div>
  );
}

function CreateSection({ number, title, description, children }: { number: string; title: string; description: string; children: ReactNode }) {
  return <section className="create-section"><header><span>{number}</span><div><h2>{title}</h2><p>{description}</p></div></header>{children}</section>;
}

function CreateField({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return <label><span>{label}{required && " *"}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} /></label>;
}

function CreateText({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean }) {
  return <label className="create-text"><span>{label}{required && " *"}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} /></label>;
}
