import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import data from '../data/portfolioData.json';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';


// bg = thumbnail background, blob = accent glow, ink = accent text/bars, soft = tint for mock blocks
const palette = [
  { bg: '#ebe6dc', blob: '#ddd5c4', ink: '#c2410c', soft: '#e2dccf' },
  { bg: '#e4e7e0', blob: '#d3d8cd', ink: '#3f5a4a', soft: '#d9ddd2' },
  { bg: '#ece4dd', blob: '#e0d2c6', ink: '#8a3b1d', soft: '#e3d8cd' },
];

const scaleMeta = {
  3: '200K+ seats',
  1: '100+ students',
  2: '500+ colleges',
};

const isPlaceholder = (p) => p.highlights?.every((h) => /to be updated/i.test(h));

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay max-sm:p-3!" onClick={onClose}>
      <div className="modal-box max-sm:px-5! max-sm:py-6! max-sm:max-h-[90svh]!" role="dialog" aria-modal="true" aria-label={project.title} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><FiX size={18} /></button>
        <h3 className="project-title">{project.title}</h3>
        <p className="modal-text">{project.description}</p>
        {project.highlights?.length > 0 && (
          <ul className="modal-list">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        )}
      </div>
    </div>,
    document.body
  );
};

const ProjectCard = ({ project, visible, delay, index }) => {
  const [open, setOpen] = useState(false);
  const p = palette[index % palette.length];
  const scale = scaleMeta[project.projectNo];
  const summary = /to be updated/i.test(project.description)
    ? project.tagline
    : project.description;

  return (
    <article
      className={`project-card reveal${visible ? ' in-view' : ''}`}
      style={{ transitionDelay: `${delay}s`, '--pt-bg': p.bg, '--pt-blob': p.blob, '--pt-ink': p.ink, '--pt-soft': p.soft }}
    >
      <div className="project-head">
        <span>{String(index + 1).padStart(2, '0')}</span>
        {scale && <span>{scale}</span>}
      </div>

      <div>
        <div className="project-meta">
          {project.categories?.map((c) => <span key={c}>{c}</span>)}
        </div>
        <h3 className="project-title" style={{ marginTop: 10 }}>{project.title}</h3>
        <p className="project-tagline clamp-3">{summary}</p>
        {!isPlaceholder(project) && (
          <button type="button" className="read-more" onClick={() => setOpen(true)}>Read more</button>
        )}
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}

        {project.techStack?.length > 0 && (
          <div className="chip-wrap" style={{ gap: 6, marginTop: 16 }}>
            {project.techStack.map((tech) => {
              const { icon: Icon, color } = getTechIcon(tech);
              return <span key={tech} className="tag"><Icon color={color} size={11} />{tech}</span>;
            })}
          </div>
        )}

        <div className="link-row">
          {project.liveDemoLink && (
            <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="link-btn live">
              Live Demo <FiArrowUpRight size={14} />
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="link-btn">
              <FiGithub size={14} /> Source
            </a>
          )}
          {!project.liveDemoLink && !project.githubLink && (
            <span className="pill plain"><FiExternalLink size={12} /> Private / client project</span>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const { projects } = data;
  const [ref, inView] = useInView(0.05);
  const sliderRef = useRef(null);
  const slide = (dir) => {
    const el = sliderRef.current;
    if (el) el.scrollBy({ left: dir * (el.firstElementChild?.offsetWidth || 400) + dir * 24, behavior: 'smooth' });
  };

  // Hide projects that still only contain placeholder copy.
  const all = [...projects]
    .filter((p) => !(isPlaceholder(p) && !p.techStack?.length))
    .sort((a, b) => a.projectNo - b.projectNo);


  return (
    <section id="projects" className="section-pt section-pb">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects that solved real problems."
        subtitle="Products I've designed, built and deployed — each one shipped to real users."
      />

      <div className="work-bar justify-end!">
        <div className="slider-nav">
          <button type="button" className="btn btn-icon" onClick={() => slide(-1)} aria-label="Previous project"><FiArrowLeft size={18} /></button>
          <button type="button" className="btn btn-icon" onClick={() => slide(1)} aria-label="Next project"><FiArrowRight size={18} /></button>
        </div>
      </div>

      <div ref={(el) => { ref.current = el; sliderRef.current = el; }} className="projects-grid">
        {all.map((project, i) => (
          <ProjectCard key={project.projectNo} project={project} visible={inView} delay={(i % 2) * 0.1} index={all.indexOf(project)} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
