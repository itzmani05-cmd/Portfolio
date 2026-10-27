import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import data from '../data/portfolioData.json';
import logo from '../assets/laptop.png';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { label: 'Contact', id: 'contact' },
];

const allSectionIds = ['about', 'experience', 'projects', 'skills', 'testimonials', 'github', 'education', 'contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { about } = data;
  const activeSection = useActiveSection(allSectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled || isOpen ? ' scrolled' : ''}`}>
      <div className="nav-bar max-sm:h-16! max-sm:px-4!">
        <a href="#" className="nav-brand max-[380px]:text-[17px]!">
          <img src={logo} alt="Manikandan M logo" width="34" height="34" />
          <span>Mani<b>kandan</b></span>
        </a>

        <div className="nav-links-desktop">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={`nav-link${activeSection === link.id ? ' active' : ''}`}>
              {link.label}
            </a>
          ))}

          <a href={about.resumeLink || '/resume.pdf'} download="Manikandan_M_Resume.pdf" className="btn btn-primary nav-cta">
            Resume <FiDownload size={13} />
          </a>
        </div>

        <button onClick={() => setIsOpen((v) => !v)} aria-label="Toggle menu" className="nav-mobile-btn">
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="nav-mobile-panel max-sm:px-4! max-sm:max-h-[calc(100svh-4rem)] max-sm:overflow-y-auto">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsOpen(false)}
              className={`nav-link${activeSection === link.id ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a href={about.resumeLink || '/resume.pdf'} download="Manikandan_M_Resume.pdf" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ marginTop: 8 }}>
            <FiDownload size={14} /> Download Resume
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
