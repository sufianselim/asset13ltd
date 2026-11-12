import {
  Building2,
  Compass,
  Eye,
  MessagesSquare,
  Route,
  ShieldCheck
} from "lucide-react";
import { whyChoose } from "../../data/site.js";

const iconMap = {
  compass: Compass,
  build: Building2,
  eye: Eye,
  route: Route,
  shield: ShieldCheck,
  service: MessagesSquare
};

export default function WhyChoose() {
  return (
    <section className="section section--navy" aria-labelledby="why-title">
      <div className="container">
        <div className="section-head section-head--light">
          <div>
            <p className="eyebrow eyebrow--light">{whyChoose.eyebrow}</p>
            <h2 id="why-title" className="balance">
              {whyChoose.title}
            </h2>
          </div>
          <p className="section-intro">{whyChoose.intro}</p>
        </div>

        <div className="why-grid">
          {whyChoose.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Compass;

            return (
              <div
                className="why-item reveal"
                key={item.title}
                style={{ "--reveal-delay": `${index * 0.06}s` }}
              >
                <span className="icon-tile" aria-hidden="true">
                  <Icon size={21} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
