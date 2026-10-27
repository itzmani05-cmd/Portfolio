import data from '../data/portfolioData.json';
import { FiArrowUpRight } from 'react-icons/fi';

const trust = [
  { value: '8', label: 'Projects shipped' },
  { value: '500+', label: 'Colleges served' },
  { value: '200K+', label: 'Seats managed' },
];

const About = () => {
  const { about } = data;

  return (
    <section id="about">
      <div className="hero-grid max-lg:gap-10! max-sm:px-4!">
        <div>
          <p className="availability-badge hero-stagger-1">Coimbatore · open to freelance and full-time roles</p>

          <h1 className="hero-name hero-stagger-2 max-sm:text-[clamp(2rem,11vw,2.8rem)]!">
            <em>{about.name}</em>
            <span className="mt-4 block text-[clamp(1.3rem,2.6vw,2rem)] font-medium leading-snug tracking-normal text-[var(--text-2)]">
              I build the tools institutions use every day,<br className="max-sm:hidden" /> and I stay for the part after launch.
            </span>
          </h1>


          <p className="hero-bio hero-stagger-4 max-sm:text-[0.95rem]!">{about.tagline} {about.description.split(". ")[0]}.</p>

          <div className="hero-btns hero-stagger-5 max-sm:[&_.btn:not(.btn-icon)]:flex-auto">
            <a href="#contact" className="btn btn-primary">
              Get in touch <FiArrowUpRight size={17} />
            </a>
            <a href="#projects" className="btn btn-ghost">View My Work</a>
          </div>

          <div className="hero-trust hero-stagger-6 max-lg:gap-x-8! max-[380px]:gap-x-5!">
            {trust.map((t) => (
              <div className="hero-trust-item" key={t.label}>
                <strong>{t.value}</strong>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-visual hero-stagger-img" aria-label="Selected work">
          <h2 className="work-list-head">Selected work</h2>
          <ol className="work-list">
            {data.projects.slice(0, 4).map((p) => (
              <li key={p.projectNo}>
                <a href="#projects">
                  <span className="work-list-no">{String(p.projectNo).padStart(2, '0')}</span>
                  <span>
                    <strong>{p.title}</strong>
                    <small>{p.tagline}</small>
                  </span>
                  <FiArrowUpRight size={16} />
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
};

export default About;
