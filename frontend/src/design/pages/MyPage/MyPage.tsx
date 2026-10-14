import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import "../Home/Home.css";
import "./MyPage.css";
import { getLoginUser, ROLE_LABEL, type LoginUser, type UserRole } from "../../utils/auth";

type PageRole = Exclude<UserRole, "ADMIN">;
type Manager = { id: number; name: string; position: string; phone: string; email: string; primary: boolean };
type Profile = {
  name: string;
  manager: string;
  email: string;
  phone: string;
  address: string;
  introduction: string;
  businessNumber: string;
  website: string;
  country: string;
  serviceScope: string;
  ports: string;
  services: string;
  fax: string;
  telegram: string;
  kakaoId: string;
  openChat: string;
  note: string;
};

const roleCopy: Record<PageRole, { eyebrow: string; title: string; description: string }> = {
  USER: { eyebrow: "PERSONAL PROFILE", title: "일반회원 마이페이지", description: "내 정보와 구직 활동 정보를 안전하게 관리하세요." },
  COMPANY: { eyebrow: "COMPANY PROFILE", title: "기업회원 마이페이지", description: "기업 프로필과 채용 담당자 정보를 최신 상태로 관리하세요." },
  STORE: { eyebrow: "VENDOR PROFILE", title: "업체회원 마이페이지", description: "업체 소개와 서비스 정보를 고객에게 정확하게 알려주세요." },
};

const initialProfiles: Record<PageRole, Profile> = {
  USER: {
    name: "김세일", manager: "푸른항로", email: "sailor@example.com", phone: "010-1234-5678",
    address: "부산광역시 영도구", introduction: "더 넓은 바다에서 성장하고 싶은 항해사입니다.",
    businessNumber: "", website: "", country: "", serviceScope: "", ports: "", services: "",
    fax: "", telegram: "", kakaoId: "", openChat: "", note: "",
  },
  COMPANY: {
    name: "대한해운 주식회사", manager: "김민수", email: "hr@daehanshipping.co.kr", phone: "051-123-4567",
    address: "부산광역시 중구 중앙대로 00", introduction: "신뢰와 전문성을 바탕으로 해운 산업의 내일을 함께 만듭니다.",
    businessNumber: "123-45-67890", website: "https://daehanshipping.co.kr", country: "", serviceScope: "",
    ports: "", services: "", fax: "", telegram: "", kakaoId: "", openChat: "", note: "",
  },
  STORE: {
    name: "부산 오션서플라이", manager: "이도현", email: "contact@oceansupply.co.kr", phone: "+82 51-234-5678",
    address: "부산광역시 영도구 해양로 00", introduction: "부산항을 중심으로 신속하고 믿을 수 있는 선용품 서비스를 제공합니다.",
    businessNumber: "234-56-78901", website: "https://oceansupply.co.kr", country: "대한민국",
    serviceScope: "직접 입력", ports: "부산항, 울산항, 마산항", services: "선식 및 선용품 공급, 선박 부품 긴급 배송, 통관 지원",
    fax: "+82 51-234-5679", telegram: "@ocean_supply", kakaoId: "oceansupply", openChat: "https://open.kakao.com/o/example",
    note: "24시간 긴급 발주 상담이 가능합니다.",
  },
};

export default function MyPage({ pageRole }: { pageRole: PageRole }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginUser | null>(getLoginUser);
  const [profile, setProfile] = useState<Profile>(() => ({ ...initialProfiles[pageRole], name: pageRole === "USER" ? getLoginUser()?.name || initialProfiles.USER.name : initialProfiles[pageRole].name }));
  const [image, setImage] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [saved, setSaved] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [managerOpen, setManagerOpen] = useState(false);
  const [partnerImage, setPartnerImage] = useState("");
  const [partnerPreviewOpen, setPartnerPreviewOpen] = useState(false);
  const [managers, setManagers] = useState<Manager[]>([
    { id: 1, name: "김민수", position: "채용매니저", phone: "010-2345-6789", email: "hr@company.co.kr", primary: true },
    { id: 2, name: "박서연", position: "인사담당자", phone: "010-9876-5432", email: "recruit@company.co.kr", primary: false },
  ]);
  const isPersonal = pageRole === "USER";
  const isCompany = pageRole === "COMPANY";
  const copy = roleCopy[pageRole];
  const verificationStatus = documentName ? "검토 중" : isCompany ? "검토 중" : "미제출";

  useEffect(() => {
    const updateUser = () => setUser(getLoginUser());
    window.addEventListener("sailingAuthChange", updateUser);
    return () => window.removeEventListener("sailingAuthChange", updateUser);
  }, []);

  const update = (field: keyof Profile, value: string) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };
  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };
  const confirmSave = () => {
    if (!password.trim()) {
      setPasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }
    setSaved(true);
    setPassword("");
    setPasswordError("");
    setPasswordOpen(false);
  };

  return (
    <div className="subpage mypage">
      <HomeHeader />
      <main className="mypage-main">
        <section className="mypage-banner">
          <div className="container"><span>{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.description}</p></div>
        </section>
        <div className="container mypage-layout">
          <aside className="mypage-sidebar">
            <div className="profile-summary">
              <div className={`profile-avatar ${isPersonal ? "is-personal" : ""}`}>
                {image ? <img src={image} alt="프로필 미리보기" /> : <Icon name={isPersonal ? "user" : "building"} size={34} />}
              </div>
              <strong>{profile.name}</strong><span>{ROLE_LABEL[pageRole]}</span>
            </div>
            <nav><button className="is-active"><Icon name="user" size={18} />프로필 관리</button><button onClick={() => isPersonal && navigate("/mypage/personal/likes")}><Icon name="heart" size={18} />관심 공고</button><button onClick={() => isPersonal && navigate("/mypage/personal/writing")}><Icon name="comment" size={18} />내가 쓴 글</button></nav>
            {!user && <button className="mypage-demo" onClick={() => navigate("/login")}>로그인 후 이용하기</button>}
          </aside>

          <section className="profile-card">
            <div className="profile-card__heading"><div><span>PROFILE SETTINGS</span><h2>프로필 정보 수정</h2></div><em>필수 정보는 *로 표시됩니다.</em></div>
            <div className="profile-image-editor">
              <div className={`profile-avatar profile-avatar--large ${isPersonal ? "is-personal" : ""}`}>
                {image ? <img src={image} alt="프로필 미리보기" /> : <Icon name={isPersonal ? "user" : "building"} size={40} />}
              </div>
              <div><strong>{isPersonal ? "프로필 사진" : "기업·업체 로고"}</strong><p>JPG, PNG 파일을 등록할 수 있습니다.</p>
                <label className="button button--outline">이미지 변경<input type="file" accept="image/png,image/jpeg" onChange={uploadImage} /></label>
              </div>
            </div>

            <form onSubmit={(event) => { event.preventDefault(); setPasswordOpen(true); }}>
              <ProfileSection title={isPersonal ? "기본 정보" : isCompany ? "기업 기본 정보" : "업체 기본 정보"} description="회원 가입 시 입력한 정보를 확인하고 수정할 수 있습니다.">
                <div className="profile-form-grid">
                  <Field label={isPersonal ? "이름" : isCompany ? "기업명" : "업체 이름"} value={profile.name} onChange={(value) => update("name", value)} required />
                  {isCompany ? <label className="manager-field"><span>대표 담당자 *</span><div><input value={managers.find((manager) => manager.primary)?.name || profile.manager} readOnly /><button type="button" onClick={() => setManagerOpen(true)}>담당자 관리</button></div></label> :
                    <Field label={isPersonal ? "닉네임" : "대표자 이름"} value={profile.manager} onChange={(value) => update("manager", value)} required />}
                  {!isPersonal && <Field label="사업자등록번호" value={profile.businessNumber} onChange={(value) => update("businessNumber", value)} required />}
                  <Field label={isPersonal ? "연락처" : isCompany ? "담당자 연락처" : "대표자 전화번호"} value={profile.phone} onChange={(value) => update("phone", value)} required />
                  <Field label={isPersonal ? "이메일" : isCompany ? "담당자 이메일" : "대표자 이메일"} type="email" value={profile.email} onChange={(value) => update("email", value)} required />
                  {!isPersonal && <Field label="홈페이지 주소" value={profile.website} onChange={(value) => update("website", value)} />}
                  <Field wide label={isPersonal ? "주소" : isCompany ? "기업 주소" : "업체 대표주소"} value={profile.address} onChange={(value) => update("address", value)} required={!isPersonal} />
                  <TextField label={isPersonal ? "자기소개" : isCompany ? "기업 소개" : "업체 소개"} value={profile.introduction} onChange={(value) => update("introduction", value)} maxLength={500} />
                </div>
              </ProfileSection>

              {pageRole === "STORE" && (
                <>
                  <ProfileSection title="한인선식 카드 관리" description="/partners 목록과 업체 상세에 표시되는 대표 이미지와 공개 정보를 관리합니다.">
                    <div className="partner-profile-editor">
                      <label className={partnerImage ? "has-image" : ""}>
                        <input type="file" accept="image/png,image/jpeg" onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) setPartnerImage(URL.createObjectURL(file));
                        }} />
                        {partnerImage ? <img src={partnerImage} alt="한인선식 대표 이미지 미리보기" /> : <span><Icon name="building" size={28} /><strong>업체 대표 사진 첨부</strong><small>항만, 매장, 서비스 현장 이미지를 권장합니다.</small></span>}
                        <em>{partnerImage ? "사진 변경" : "사진 선택"}</em>
                      </label>
                      <div><strong>공개 화면 미리보기</strong><p>저장 전에도 한인선식 카드와 상세 화면 구성을 확인할 수 있습니다.</p><button type="button" className="button button--outline" onClick={() => setPartnerPreviewOpen(true)}>업체 상세 미리보기 <Icon name="chevron" size={15} /></button></div>
                    </div>
                  </ProfileSection>
                  <ProfileSection title="서비스 정보" description="서비스 가능한 국가와 항구, 제공 업무를 관리합니다.">
                    <div className="profile-form-grid">
                      <Field label="서비스 국가" value={profile.country} onChange={(value) => update("country", value)} required />
                      <label><span>서비스 범위 *</span><select value={profile.serviceScope} onChange={(event) => update("serviceScope", event.target.value)} required>
                        <option value="전 항구 서비스">전 항구 서비스</option><option value="직접 입력">직접 입력</option>
                      </select></label>
                      <Field wide label="서비스 항구" value={profile.ports} onChange={(value) => update("ports", value)} required={profile.serviceScope === "직접 입력"} />
                      <TextField label="서비스 내역" value={profile.services} onChange={(value) => update("services", value)} maxLength={1000} required />
                    </div>
                  </ProfileSection>
                  <ProfileSection title="추가 연락처" description="고객이 업체에 연락할 수 있는 추가 채널입니다. 선택 항목은 비워둘 수 있습니다.">
                    <div className="profile-form-grid">
                      <Field label="FAX" value={profile.fax} onChange={(value) => update("fax", value)} />
                      <Field label="대표자 텔레그램" value={profile.telegram} onChange={(value) => update("telegram", value)} />
                      <Field label="카카오톡 아이디" value={profile.kakaoId} onChange={(value) => update("kakaoId", value)} />
                      <Field label="카카오톡 오픈채팅방" value={profile.openChat} onChange={(value) => update("openChat", value)} />
                      <TextField label="비고" value={profile.note} onChange={(value) => update("note", value)} />
                    </div>
                  </ProfileSection>
                </>
              )}

              {!isPersonal && (
                <ProfileSection title={`${isCompany ? "기업" : "업체"} 인증`} description="등록된 서류와 인증 진행 상태를 확인하거나 최신 서류로 변경할 수 있습니다.">
                  <div className="verification-card">
                    <div className="verification-status">
                      <span className={`status-dot ${verificationStatus === "미제출" ? "is-empty" : ""}`} />
                      <div><span>현재 인증 상태</span><strong>{verificationStatus}</strong>
                        <p>{verificationStatus === "미제출" ? "인증 서류를 제출하면 담당자가 순차적으로 검토합니다." : "담당자가 제출된 서류를 확인하고 있습니다. 승인까지 영업일 기준 1~3일이 소요됩니다."}</p>
                      </div>
                    </div>
                    <label className={`document-upload ${documentName ? "has-file" : ""}`}>
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setDocumentName(event.target.files?.[0]?.name ?? "")} />
                      <span><Icon name="briefcase" size={22} /></span>
                      <div><strong>{documentName || (isCompany ? "사업자등록증_대한해운.pdf" : "인증 서류를 제출해주세요")}</strong>
                        <small>{documentName ? "새 서류가 선택되었습니다." : isCompany ? "2025.05.20 제출 · PDF" : "PDF, JPG, PNG · 최대 10MB"}</small></div>
                      <em>{documentName || isCompany ? "서류 변경" : "서류 제출"}</em>
                    </label>
                    <p className="verification-help"><Icon name="bell" size={16} />서류 변경 시 인증 상태가 다시 ‘검토 중’으로 전환될 수 있습니다.</p>
                  </div>
                </ProfileSection>
              )}

              {saved && <div className="profile-saved"><Icon name="bell" size={18} />프로필 정보가 저장되었습니다.</div>}
              <div className="profile-actions"><button type="button" className="button button--outline" onClick={() => navigate("/")}>취소</button><button className="button button--dark" type="submit">변경사항 저장 <Icon name="arrow" size={18} /></button></div>
            </form>
          </section>
        </div>
      </main>

      {passwordOpen && (
        <div className="password-modal-backdrop" onMouseDown={() => setPasswordOpen(false)}>
          <div className="password-modal" role="dialog" aria-modal="true" aria-labelledby="password-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="password-modal__close" onClick={() => setPasswordOpen(false)} aria-label="닫기"><Icon name="x" size={20} /></button>
            <span className="password-modal__icon"><Icon name="user" size={24} /></span>
            <h2 id="password-modal-title">비밀번호 확인</h2>
            <p>회원정보를 안전하게 변경하기 위해<br />현재 비밀번호를 입력해주세요.</p>
            <label><span>현재 비밀번호</span><input autoFocus type="password" value={password} onChange={(event) => { setPassword(event.target.value); setPasswordError(""); }} onKeyDown={(event) => event.key === "Enter" && confirmSave()} placeholder="비밀번호를 입력해주세요" /></label>
            {passwordError && <small className="password-error">{passwordError}</small>}
            <div><button className="button button--outline" onClick={() => setPasswordOpen(false)}>취소</button><button className="button button--dark" onClick={confirmSave}>확인</button></div>
          </div>
        </div>
      )}
      {managerOpen && <ManagerModal managers={managers} onChange={setManagers} onClose={() => setManagerOpen(false)} />}
      {partnerPreviewOpen && <div className="password-modal-backdrop" onMouseDown={() => setPartnerPreviewOpen(false)}><div className="partner-preview-modal" onMouseDown={(event) => event.stopPropagation()}><button className="password-modal__close" onClick={() => setPartnerPreviewOpen(false)}><Icon name="x" size={20} /></button>{partnerImage ? <img src={partnerImage} alt="업체 대표 이미지" /> : <div className="partner-preview-placeholder"><Icon name="building" size={38} /></div>}<div className="partner-preview-content"><span>선식·선용품 · {profile.country}</span><h2>{profile.name}</h2><p>{profile.introduction}</p><div>{profile.services.split(",").map((item) => item.trim()).filter(Boolean).map((item) => <em key={item}>{item}</em>)}</div><dl><div><dt>서비스 항구</dt><dd>{profile.ports}</dd></div><div><dt>전화</dt><dd>{profile.phone}</dd></div><div><dt>이메일</dt><dd>{profile.email}</dd></div><div><dt>주소</dt><dd>{profile.address}</dd></div></dl></div></div></div>}
    </div>
  );
}

function ManagerModal({ managers, onChange, onClose }: { managers: Manager[]; onChange: (managers: Manager[]) => void; onClose: () => void }) {
  const [draft, setDraft] = useState({ name: "", position: "", phone: "", email: "" });
  const addManager = () => {
    if (!draft.name || !draft.phone || !draft.email) return;
    onChange([...managers, { id: Date.now(), ...draft, primary: managers.length === 0 }]);
    setDraft({ name: "", position: "", phone: "", email: "" });
  };
  return (
    <div className="password-modal-backdrop" onMouseDown={onClose}>
      <div className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="manager-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="password-modal__close" onClick={onClose} aria-label="닫기"><Icon name="x" size={20} /></button>
        <div className="manager-modal__heading"><span><Icon name="user" size={22} /></span><div><h2 id="manager-title">채용 담당자 관리</h2><p>구인공고 등록 시 선택할 담당자를 관리하고 대표 관리자를 지정하세요.</p></div></div>
        <div className="manager-list">
          {managers.map((manager) => <div className="manager-item" key={manager.id}>
            <span className="manager-avatar">{manager.name.slice(0, 1)}</span>
            <div><strong>{manager.name} <small>{manager.position}</small></strong><p>{manager.phone} · {manager.email}</p></div>
            <button type="button" className={manager.primary ? "is-primary" : ""} onClick={() => onChange(managers.map((item) => ({ ...item, primary: item.id === manager.id })))}>{manager.primary ? "대표 관리자" : "대표로 설정"}</button>
            <button type="button" className="manager-remove" disabled={manager.primary} onClick={() => onChange(managers.filter((item) => item.id !== manager.id))}><Icon name="x" size={15} /></button>
          </div>)}
        </div>
        <div className="manager-add">
          <h3>새 담당자 등록</h3>
          <div><input placeholder="이름" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /><input placeholder="직책" value={draft.position} onChange={(event) => setDraft({ ...draft, position: event.target.value })} /><input placeholder="연락처" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /><input type="email" placeholder="이메일" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></div>
          <button type="button" className="button button--outline" onClick={addManager}>담당자 추가</button>
        </div>
        <div className="manager-modal__actions"><button className="button button--dark" onClick={onClose}>확인</button></div>
      </div>
    </div>
  );
}

function ProfileSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <section className="profile-section"><div className="profile-section__heading"><h3>{title}</h3><p>{description}</p></div>{children}</section>;
}

function Field({ label, value, onChange, type = "text", required = false, wide = false }: {
  label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; wide?: boolean;
}) {
  return <label className={wide ? "is-wide" : ""}><span>{label}{required && " *"}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} /></label>;
}

function TextField({ label, value, onChange, maxLength, required = false }: {
  label: string; value: string; onChange: (value: string) => void; maxLength?: number; required?: boolean;
}) {
  return <label className="is-wide"><span>{label}{required && " *"}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} maxLength={maxLength} required={required} />{maxLength && <small>{value.length} / {maxLength}</small>}</label>;
}
