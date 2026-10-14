import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AccountFields from "../../components/auth/AccountFields";
import ChoiceGroup from "../../components/auth/ChoiceGroup";
import FormField from "../../components/auth/FormField";
import Icon from "../../components/common/Icon";

const initialForm = { name: "", nickname: "", birth: "", gender: "", nationality: "", username: "", password: "", confirmPassword: "" };

export default function PersonalSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [completed, setCompleted] = useState(false);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const formatBirth = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 8);
    return [numbers.slice(0, 4), numbers.slice(4, 6), numbers.slice(6, 8)].filter(Boolean).join(".");
  };

  return (
    <AuthLayout wide title="당신의 새로운 커리어를 시작하세요">
      <SignupTop title="일반회원 가입" subtitle="채용정보와 커뮤니티를 이용할 개인 정보를 입력해주세요." onBack={() => navigate("/signup")} />
      <form className="auth-form signup-form" onSubmit={(event) => { event.preventDefault(); setCompleted(true); }}>
        <div className="form-section">
          <SectionHeading number="01" title="기본 정보" description="본인 확인과 커뮤니티 활동에 사용됩니다." />
          <div className="form-grid">
            <FormField label="이름" name="name" value={form.name} onChange={(value) => update("name", value.replace(/[\s~!@#$%^&*()_+={}\[\]|\\:;"'<>,?/]/g, ""))}
              placeholder="실제 명의를 입력해주세요" required hint="특수기호와 공백은 사용할 수 없습니다." />
            <FormField label="닉네임" name="nickname" value={form.nickname} onChange={(value) => update("nickname", value)}
              placeholder="커뮤니티에서 사용할 이름" required />
            <FormField label="생년월일" name="birth" value={form.birth} onChange={(value) => update("birth", formatBirth(value))}
              placeholder="1999.01.01" required maxLength={10} hint="8자리 숫자로 입력해주세요." />
          </div>
          <div className="form-grid">
            <ChoiceGroup label="성별" options={["남성", "여성"]} value={form.gender} onChange={(value) => update("gender", value)} />
            <ChoiceGroup label="국적" options={["내국인", "외국인"]} value={form.nationality} onChange={(value) => update("nationality", value)} />
          </div>
        </div>
        <AccountFields username={form.username} password={form.password} confirmPassword={form.confirmPassword}
          onChange={(field, value) => update(field, value)} />
        {completed && <SuccessNotice />}
        <FormActions onBack={() => navigate("/signup")} label="일반회원으로 가입하기" />
      </form>
    </AuthLayout>
  );
}

export function SignupTop({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <>
      <button className="auth-back" onClick={onBack}><Icon name="chevron" size={17} /> 회원 유형 선택</button>
      <div className="signup-progress"><span className="is-done">1 유형 선택</span><i /><span>2 정보 입력</span><i /><span>3 가입 완료</span></div>
      <div className="auth-heading"><span>CREATE ACCOUNT</span><h1>{title}</h1><p>{subtitle}</p></div>
    </>
  );
}

export function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="form-section__heading"><span>{number}</span><div><h2>{title}</h2><p>{description}</p></div></div>;
}

export function FormActions({ onBack, label }: { onBack: () => void; label: string }) {
  return <div className="form-actions"><button type="button" onClick={onBack}>이전</button><button type="submit">{label}<Icon name="arrow" size={18} /></button></div>;
}

export function SuccessNotice() {
  return <div className="success-notice"><span><Icon name="ship" size={21} /></span><div><strong>입력 내용이 확인되었습니다.</strong><p>현재는 UI 단계이며, API 연결 후 실제 가입이 완료됩니다.</p></div></div>;
}
