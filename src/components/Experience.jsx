import data from '../data/portfolioData.json';
import { FiMapPin, FiCalendar, FiCheck } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';

const HighlightText = ({ text }) => {
  const parts = text.split(/(\d[\d,+]*[+%]?(?:\s*\+)?(?:\s*colleges?|\s*seats?|\s*institutions?)?)/gi);
  return (
    <span>
      {parts.map((part, i) => (/\d/.test(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))}
    </span>
  );
};

const Experience = () => {
  const { experience } = data;
  const [ref, inView] = useInView();

  return (
    <section id="experience" className="section-pt section-pb">
      <SectionHeading
        eyebrow="Career"
        title="Experience that ships to production"
        subtitle="Real systems, real users — from statewide government platforms to modern learning products."
      />

      <div ref={ref} className="timeline">
        {experience.map((exp, i) => (
          <div key={exp.id} className={`tl-item reveal${inView ? ' in-view' : ''}`} style={{ transitionDelay: `${i * 0.13}s` }}>
            <span className="tl-dot" />
            <div className={`card${exp.companyUrl ? ' cursor-pointer' : ''}`} style={{ padding: 'clamp(22px, 4vw, 34px)' }}>
              <div className="exp-head">
                <div>
                  <h3 className="exp-role max-sm:text-xl!">{exp.role}</h3>
                  <p className="exp-company" style={{ color: "var(--accent)" }}>{exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${exp.company} (opens website)`} className="after:absolute after:inset-0 after:content-['']" style={{ color: "inherit" }}>{exp.company}</a>
                  ) : exp.company}</p>
                </div>
                <div className="exp-meta">
                  <span className="pill"><FiCalendar size={12} /> {exp.duration}</span>
                  {exp.location && <span className="pill plain"><FiMapPin size={12} /> {exp.location}</span>}
                </div>
              </div>

              {exp.summary && <p className="exp-summary max-sm:text-[0.97rem]!">{exp.summary}</p>}

              {exp.highlights?.length > 0 && (
                <ul className="check-list">
                  {exp.highlights.slice(0, 4).map((h, idx) => (
                    <li key={idx}><FiCheck size={15} /><HighlightText text={h} /></li>
                  ))}
                </ul>
              )}

              {exp.techStack && (
                <div className="tag-row">
                  {exp.techStack.map((tech) => {
                    const { icon: Icon, color } = getTechIcon(tech);
                    return <span key={tech} className="tag"><Icon color={color} size={12} />{tech}</span>;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
