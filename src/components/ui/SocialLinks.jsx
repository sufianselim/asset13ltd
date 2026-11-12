import { Briefcase, Camera, ThumbsUp } from "lucide-react";
import { siteConfig } from "../../lib/config.js";

const socialItems = [
  { key: "instagram", label: "Instagram", Icon: Camera },
  { key: "facebook", label: "Facebook", Icon: ThumbsUp },
  { key: "linkedin", label: "LinkedIn", Icon: Briefcase }
];

export default function SocialLinks() {
  const available = socialItems.filter(({ key }) => siteConfig.social[key]);
  if (!available.length) return null;

  return (
    <div className="social-links">
      {available.map(({ key, label, Icon }) => (
        <a
          key={key}
          className="social-link"
          href={siteConfig.social[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Asset 13 LTD on ${label}`}
        >
          <Icon size={16} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
