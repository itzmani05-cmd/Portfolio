import data from '../data/portfolioData.json';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

const tiles = [
  { key: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', color: '#34d399', href: (c) => `https://wa.me/${c.phone?.replace(/[^0-9]/g, '')}`, value: (c) => c.phone },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', color: '#60a5fa', href: (c) => c.linkedin, value: () => 'manikandan005' },
  { key: 'github', icon: FiGithub, label: 'GitHub', color: '#e2e8f0', href: (c) => c.github, value: () => 'itzmani05-cmd' },
  { key: 'location', icon: FiMapPin, label: 'Based in', color: '#f472b6', href: () => null, value: (c) => c.location },
];

const Contact = () => {
  const { contact } = data;
  const [ref, inView] = useInView(0.1);

  return (
    <section id="contact" className="section-pt section-pb">
      <div ref={ref} className={`cta-panel on-dark reveal max-sm:rounded-3xl!${inView ? ' in-view' : ''}`}>
        <span className="sh-eyebrow">Contact</span>
        <h2 className="cta-title">Need something built? <em>Write to me.</em></h2>
        <p className="cta-sub">Freelance work, a full-time role, or a quick question about one of the projects above. Email is fastest; I usually reply within a day.</p>
        <div className="cta-btns max-sm:[&_.btn]:basis-full">
          <a href={`mailto:${contact.email}`} className="btn btn-primary"><FiMail size={16} /> {contact.email}</a>
          <a href={`https://wa.me/${contact.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <FaWhatsapp size={17} /> Chat on WhatsApp
          </a>
        </div>

        <div className="contact-grid max-sm:grid-cols-1!">
          {tiles.map(({ key, icon: Icon, label, color, href, value }) => {
            const val = value(contact);
            if (!val) return null;
            const link = href(contact);
            const Tag = link ? 'a' : 'div';
            return (
              <Tag key={key} className="contact-tile" {...(link ? { href: link, target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="icon-box" style={{ background: `${color}1f`, color }}><Icon size={20} /></span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="lbl">{label}</div>
                  <div className="val max-sm:whitespace-normal! max-sm:[overflow-wrap:anywhere]">{val}</div>
                </div>
                {link && <FiArrowUpRight size={16} color="#8890a8" />}
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
