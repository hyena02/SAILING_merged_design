import { useMemo, useState } from "react";
import Icon from "../../components/common/Icon";
import HomeHeader from "../Home/components/HomeHeader";
import { getLoginUser } from "../../utils/auth";
import "../Home/Home.css";
import "./Talents.css";

const talents = [
  { id: 1, name: "김도윤", role: "2등 항해사", career: "경력 5년", age: "30대", nationality: "내국인", education: "한국해양대학교 졸업", location: "부산", email: "doyun.kim@example.com", phone: "010-25**-78**", intro: "벌크선과 컨테이너선 승선 경험을 보유한 항해사입니다." },
  { id: 2, name: "이서준", role: "3등 기관사", career: "경력 2년", age: "20대", nationality: "내국인", education: "목포해양대학교 졸업", location: "인천", email: "seojun.lee@example.com", phone: "010-43**-11**", intro: "LNG선 기관부 근무를 목표로 꾸준히 역량을 쌓고 있습니다." },
  { id: 3, name: "Maria Santos", role: "조리부", career: "경력 8년", age: "40대", nationality: "외국인", education: "Manila Maritime College", location: "전국", email: "maria.s@example.com", phone: "+63 9** *** ****", intro: "다국적 선원 대상 조리와 식자재 관리 경험이 풍부합니다." },
  { id: 4, name: "박준영", role: "선박 엔지니어", career: "경력 12년", age: "40대", nationality: "내국인", education: "부경대학교 대학원", location: "울산", email: "jy.park@example.com", phone: "010-76**-32**", intro: "선박 정비와 현장 감독 업무를 함께 수행해왔습니다." },
  { id: 5, name: "최영수", role: "기관장", career: "경력 25년", age: "50대", nationality: "내국인", education: "해양수산연수원", location: "부산", email: "ys.choi@example.com", phone: "010-91**-45**", intro: "안전 운항과 후배 해기사 교육을 중요하게 생각합니다." },
  { id: 6, name: "Nguyen Minh", role: "갑판부", career: "경력 6년", age: "30대", nationality: "외국인", education: "Vietnam Maritime University", location: "전국", email: "minh.nguyen@example.com", phone: "+84 9** *** ***", intro: "외항 컨테이너선 갑판 업무와 장비 운용이 가능합니다." },
];

export default function Talents() {
  const [career, setCareer] = useState("전체 경력");
  const [age, setAge] = useState("전체 연령");
  const [nationality, setNationality] = useState("전체 국적");
  const [sanctioned, setSanctioned] = useState<number[]>([]);
  const [hidden, setHidden] = useState<number[]>([]);
  const isAdmin = getLoginUser()?.role === "ADMIN";
  const filtered = useMemo(() => talents.filter((talent) => !hidden.includes(talent.id) && (career === "전체 경력" || talent.career.includes(career)) && (age === "전체 연령" || talent.age === age) && (nationality === "전체 국적" || talent.nationality === nationality)), [career, age, nationality, hidden]);
  return <div className="subpage talents-page"><HomeHeader /><main><section className="talents-hero"><div className="container"><span>SAILING TALENTS</span><h1>검증된 해운 인재를<br />먼저 만나보세요</h1><p>승선 경력과 전문 역량을 갖춘 인재들의 공개 프로필입니다.</p></div></section><section className="talents-board container">
    <div className="talents-heading"><div><span>TALENT POOL</span><h2>인재정보</h2><p>조건에 맞는 해운·선박 전문 인재를 찾아보세요.</p></div><strong>{filtered.length}명</strong></div>
    <div className="talent-filters"><select value={career} onChange={(event) => setCareer(event.target.value)}><option>전체 경력</option><option>경력 2년</option><option>경력 5년</option><option>경력 8년</option><option>경력 12년</option><option>경력 25년</option></select><select value={age} onChange={(event) => setAge(event.target.value)}><option>전체 연령</option><option>20대</option><option>30대</option><option>40대</option><option>50대</option></select><select value={nationality} onChange={(event) => setNationality(event.target.value)}><option>전체 국적</option><option>내국인</option><option>외국인</option></select></div>
    {isAdmin && <div className="talent-admin-notice"><Icon name="bell" size={18} />관리자 검토 모드입니다. 공개 프로필을 숨기거나 계정을 제재할 수 있습니다.</div>}
    <div className="talent-grid">{filtered.map((talent) => <article className={`talent-card ${sanctioned.includes(talent.id) ? "is-sanctioned" : ""}`} key={talent.id}>{isAdmin && <div className="talent-admin-actions"><button onClick={() => setHidden((current) => [...current, talent.id])}>프로필 숨김</button><button onClick={() => setSanctioned((current) => current.includes(talent.id) ? current.filter((id) => id !== talent.id) : [...current, talent.id])}>{sanctioned.includes(talent.id) ? "제재 해제" : "계정 제재"}</button></div>}<div className="talent-card__top"><span>{talent.name.slice(0, 1)}</span><div><h3>{talent.name}</h3><strong>{talent.role}</strong></div><em>{sanctioned.includes(talent.id) ? "제재중" : "구직중"}</em></div><p>{talent.intro}</p><dl><div><dt>경력</dt><dd>{talent.career}</dd></div><div><dt>연령대</dt><dd>{talent.age}</dd></div><div><dt>국적</dt><dd>{talent.nationality}</dd></div><div><dt>학력</dt><dd>{talent.education}</dd></div><div><dt>희망지역</dt><dd>{talent.location}</dd></div></dl><footer><span><Icon name="comment" size={14} />{talent.email}</span><span>{talent.phone}</span></footer></article>)}</div>
  </section></main></div>;
}
