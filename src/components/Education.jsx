import data from '../data/portfolioData.json';
import { FiAward, FiBookOpen } from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';

const Education = () => {
  const { education, certificates } = data;
  const [ref, inView] = useInView();

  return (
    <section id="education" className="section-pt section-pb">
      <SectionHeading eyebrow="Background" title="Education & credentials" />

      <div ref={ref} className="duo-grid">
        <div className={`reveal${inView ? ' in-view' : ''}`}>
          <h3 className="mini-head">Education</h3>
          <div className="stack">
            {education.map((edu) => (
              <div key={edu.id} className="card row-card">
                <span className="icon-box" style={{ background: 'rgba(194,65,12,0.1)', color: '#c2410c' }}><FiBookOpen size={20} /></span>
                <div style={{ flex: 1 }}>
                  <h4 className="row-title">{edu.degree}</h4>
                  <p className="row-sub">{edu.institution}</p>
                  <div className="exp-meta" style={{ marginTop: 12 }}>
                    <span className="pill">{edu.year}</span>
                    {edu.cgpa && <span className="pill plain">CGPA {edu.cgpa}</span>}
                  </div>
                  {edu.clubs?.map((club) => (
                    <p key={club.name} className="row-sub" style={{ marginTop: 10 }}>
                      <b>{club.role}</b> · {club.name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {certificates?.length > 0 && (
          <div className={`reveal${inView ? ' in-view' : ''}`} style={{ transitionDelay: '0.12s' }}>
            <h3 className="mini-head">Certifications</h3>
            <div className="stack">
              {certificates.map((cert) => (
                <div key={cert.id} className="card row-card">
                  <span className="icon-box" style={{ background: 'rgba(245,158,11,0.12)', color: '#d97706' }}><FiAward size={20} /></span>
                  <div>
                    <h4 className="row-title">{cert.title}</h4>
                    <p className="row-sub">Issued by {cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
