import data from '../data/portfolioData.json';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import logo from '../assets/laptop.png';

const Footer = ({ container }) => {
  const { contact, about } = data;
  const socials = [
    { icon: FiMail, label: 'Email', href: `mailto:${contact.email}` },
    { icon: FiGithub, label: 'GitHub', href: contact.github },
    { icon: FiLinkedin, label: 'LinkedIn', href: contact.linkedin },
  ];

  return (
    <footer className="footer on-dark">
      <div style={container}>
        <div className="footer-row max-sm:flex-col max-sm:items-start!">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} alt="" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)' }}>{about.name}</div>
              <div style={{ fontSize: 13 }}>{about.title}</div>
            </div>
          </div>
          <div className="footer-social">
            {socials.map(({ icon: Icon, label, href }) => href && (
              <a key={label} href={href} target={label === 'Email' ? '_self' : '_blank'} rel="noreferrer" aria-label={label} title={label}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12, marginTop: 28, opacity: 0.7 }}>© {new Date().getFullYear()} {about.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
