import { useInView } from '../hooks/useInView';

const SectionHeading = ({ eyebrow, title, subtitle }) => {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} className={`sh${inView ? ' in-view' : ''}`}>
      <span className="sh-eyebrow">{eyebrow}</span>
      <h2 className="sh-title"><span>{title}</span></h2>
      {subtitle && <p className="sh-sub">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
