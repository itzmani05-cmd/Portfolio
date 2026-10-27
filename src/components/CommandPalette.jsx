import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FiCommand,
  FiCornerDownLeft,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiHash,
  FiLinkedin,
  FiMail,
  FiSearch,
} from 'react-icons/fi';
import data from '../data/portfolioData.json';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'github', label: 'GitHub Activity' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const CommandPalette = () => {
  const { about, contact } = data;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const sectionItems = SECTIONS.map((s) => ({
      key: `section-${s.id}`,
      type: 'Section',
      label: s.label,
      icon: FiHash,
      run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
    }));

    const linkItems = [
      contact?.github && {
        key: 'link-github', type: 'Link', label: 'Open GitHub Profile', icon: FiGithub,
        run: () => window.open(contact.github, '_blank', 'noreferrer'),
      },
      contact?.linkedin && {
        key: 'link-linkedin', type: 'Link', label: 'Open LinkedIn Profile', icon: FiLinkedin,
        run: () => window.open(contact.linkedin, '_blank', 'noreferrer'),
      },
      contact?.email && {
        key: 'link-email', type: 'Link', label: `Email ${contact.email}`, icon: FiMail,
        run: () => { window.location.href = `mailto:${contact.email}`; },
      },
      about?.resumeLink && {
        key: 'link-resume', type: 'Link', label: 'Download Resume', icon: FiDownload,
        run: () => { const a = document.createElement('a'); a.href = about.resumeLink; a.download = 'Manikandan_M_Resume.pdf'; a.click(); },
      },
    ].filter(Boolean);

    return [...sectionItems, ...linkItems];
  }, [about, contact]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const activate = useCallback((item) => {
    if (!item) return;
    item.run();
    close();
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('open-command-palette', onOpenEvent);
    return () => window.removeEventListener('open-command-palette', onOpenEvent);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      const isToggleCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isToggleCombo) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); activate(filtered[activeIndex]); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, activeIndex, close, activate]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onMouseDown={close}>
      <div className="cmdk-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <FiSearch size={16} color="#64748b" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            placeholder="Jump to a section or link…"
            className="cmdk-input"
          />
          <span className="cmdk-kbd">ESC</span>
        </div>

        <div className="cmdk-list">
          {filtered.length === 0 && (
            <div className="cmdk-empty">No matches for &ldquo;{query}&rdquo;</div>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                className={`cmdk-item${i === activeIndex ? ' cmdk-item-active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => activate(item)}
              >
                <Icon size={15} />
                <span className="cmdk-item-label">{item.label}</span>
                <span className="cmdk-item-type">{item.type}</span>
                {i === activeIndex && <FiCornerDownLeft size={13} className="cmdk-item-enter" />}
              </button>
            );
          })}
        </div>

        <div className="cmdk-footer">
          <span><FiCommand size={11} /> K to toggle</span>
          <span className="cmdk-footer-external"><FiExternalLink size={11} /> opens in new tab</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
