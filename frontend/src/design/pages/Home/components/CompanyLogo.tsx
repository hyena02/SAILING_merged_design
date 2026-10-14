import Icon, { type IconName } from "../../../components/common/Icon";

const brands: Record<string, { icon: IconName; className: string; name: string; sub: string }> = {
  DH: { icon: "ship", className: "company-logo__mark--blue", name: "DAEHAN", sub: "SHIPPING" },
  OB: { icon: "compass", className: "company-logo__mark--cyan", name: "OCEAN", sub: "BRIDGE" },
  BM: { icon: "anchor", className: "company-logo__mark--indigo", name: "BLUE", sub: "MARINE" },
  HL: { icon: "ship", className: "company-logo__mark--green", name: "H-LINE", sub: "SHIPPING" },
  PO: { icon: "compass", className: "company-logo__mark--blue", name: "PAN", sub: "OCEAN" },
  KS: { icon: "anchor", className: "company-logo__mark--purple", name: "KSS", sub: "LINE" },
  SW: { icon: "ship", className: "company-logo__mark--orange", name: "SEAWORLD", sub: "FERRY" },
};

interface CompanyLogoProps {
  code: string;
  imageUrl?: string;
  compact?: boolean;
}

export default function CompanyLogo({ code, imageUrl, compact = false }: CompanyLogoProps) {
  const brand = brands[code] ?? brands.DH;

  if (imageUrl) {
    return <img className={`company-logo__image ${compact ? "is-compact" : ""}`} src={imageUrl} alt={`${brand.name} 회사 로고`} />;
  }

  return (
    <div className={`company-logo ${compact ? "is-compact" : ""}`}>
      <span className={`company-logo__mark ${brand.className}`}><Icon name={brand.icon} size={compact ? 20 : 26} /></span>
      <span className="company-logo__wordmark">
        <strong>{brand.name}</strong>
        <small>{brand.sub}</small>
      </span>
    </div>
  );
}
