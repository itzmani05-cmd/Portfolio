import { useActiveSection } from '../hooks/useActiveSection';

const items = [
  { id: 'about', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'github', label: 'GitHub' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SideDots = () => {
  const active = useActiveSection(items.map((i) => i.id));
  return (
    <nav className="side-dots" aria-label="Section navigation">
      {items.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-label={label}>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
};

export default SideDots;
