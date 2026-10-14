import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../components/common/Icon";
import CompanyLogo from "../Home/components/CompanyLogo";
import HomeHeader from "../Home/components/HomeHeader";
import { partners } from "../Partners/partnersData";
import "../Home/Home.css";
import "./Chats.css";

export default function Chats() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const activePartner = partners.find((partner) => partner.id === Number(partnerId)) || partners[0];
  const hasSelectedRoom = Boolean(partnerId);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Record<number, string[]>>({});

  return (
    <div className="subpage chats-page">
      <HomeHeader />
      <main className={`chats-shell container ${hasSelectedRoom ? "has-room" : "show-list"}`}>
        <aside className="chat-list">
          <header><div><span>MY CHATS</span><h1>내 채팅</h1></div><strong>{partners.length}</strong></header>
          <label><Icon name="search" size={17} /><input placeholder="업체명 검색" /></label>
          <div>{partners.map((partner, index) => <button className={partner.id === activePartner.id ? "is-active" : ""} key={partner.id} onClick={() => navigate(`/chats/${partner.id}`)}>
            <CompanyLogo code={partner.logoCode} compact /><div><strong>{partner.name}</strong><p>{index === 0 ? "입항 예정 항구를 알려주세요." : "서비스 문의 대화방입니다."}</p></div><span>{index === 0 ? "방금" : `${index + 1}일 전`}</span>
          </button>)}</div>
        </aside>
        <section className="chat-room">
          <header><button className="chat-mobile-back" onClick={() => navigate("/chats")}><Icon name="chevron" size={18} /></button><div><CompanyLogo code={activePartner.logoCode} compact /><div><strong>{activePartner.name}</strong><span><i />상담 가능 · 평균 15분 이내 응답</span></div></div><button onClick={() => navigate(`/partners/detail/${activePartner.id}`)}>업체 정보 <Icon name="chevron" size={15} /></button></header>
          <div className="chat-room__messages"><div className="chat-date">오늘</div><div className="room-message is-received">안녕하세요. {activePartner.name}입니다.<br />필요한 서비스와 입항 예정 항구를 알려주시면 확인해드리겠습니다.<small>오전 10:20</small></div>{(messages[activePartner.id] || []).map((item, index) => <div className="room-message is-sent" key={`${item}-${index}`}>{item}<small>방금</small></div>)}</div>
          <form onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setMessages((current) => ({ ...current, [activePartner.id]: [...(current[activePartner.id] || []), message.trim()] })); setMessage(""); } }}>
            <button type="button" aria-label="파일 첨부">+</button><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="메시지를 입력해주세요" /><button aria-label="메시지 전송"><Icon name="arrow" size={19} /></button>
          </form>
        </section>
      </main>
    </div>
  );
}
