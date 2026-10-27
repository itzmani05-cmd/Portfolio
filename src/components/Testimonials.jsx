import data from '../data/portfolioData.json';
import { useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';

const gradients = [
  'linear-gradient(135deg, #8b5cf6, #6366f1)',
  'linear-gradient(135deg, #22d3ee, #6366f1)',
  'linear-gradient(135deg, #f472b6, #8b5cf6)',
  'linear-gradient(135deg, #34d399, #22d3ee)',
];

const initials = (text = '') =>
  text.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const TestimonialCard = ({ item, index, visible }) => {

  return (
    <div className={`reveal${visible ? ' in-view' : ''}`} style={{ transitionDelay: `${index * 0.1}s`, height: '100%' }}>
      <figure className="card testi-card max-sm:p-[22px]!">
        <div className="testi-quote-mark" aria-hidden="true">“</div>
        <blockquote className="testi-text">{item.message}</blockquote>

        <figcaption className="testi-author">
          <div className="testi-logo" style={{ background: item.logo ? '#fff' : gradients[index % gradients.length] }}>
            {item.logo ? <img src={item.logo} alt={`${item.company} logo`} /> : initials(item.company || item.name)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="testi-name">{item.name}</div>
            <div className="testi-role">{item.position}{item.company && <> · <b>{item.company}</b></>}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

const Testimonials = () => {
  const { testimonials } = data;
  const [ref, inView] = useInView(0.08);
  const sliderRef = useRef(null);
  const slide = (dir) => {
    const el = sliderRef.current;
    if (el) el.scrollBy({ left: dir * ((el.firstElementChild?.offsetWidth || 400) + 20), behavior: "smooth" });
  };

  if (!testimonials?.length) return null;

  return (
    <section id="testimonials" className="section-pt section-pb">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by teams & clients"
        subtitle="Kind words from the people I've built products for."
      />
      <div className="testi-bar">
        <button type="button" className="btn btn-icon" onClick={() => slide(-1)} aria-label="Previous testimonial"><FiArrowLeft size={18} /></button>
        <button type="button" className="btn btn-icon" onClick={() => slide(1)} aria-label="Next testimonial"><FiArrowRight size={18} /></button>
      </div>
      <div ref={(el) => { ref.current = el; sliderRef.current = el; }} className="testi-grid">
        {testimonials.map((item, i) => (
          <TestimonialCard key={item.id} item={item} index={i} visible={inView} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
