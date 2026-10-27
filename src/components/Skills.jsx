import { FiLayout, FiDatabase, FiTerminal, FiLayers, FiCode } from 'react-icons/fi';
import { getTechIcon } from './TechIcon';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';

const categoryMeta = {
  'Programming Languages': { icon: FiTerminal, color: '#c2410c', skills: ['JavaScript', 'Python', 'Java', 'C'] },
  'Frontend & Mobile': { icon: FiLayout, color: '#c2410c', skills: ['React JS', 'React Native', 'HTML & CSS', 'Tailwind CSS', 'Ant Design'] },
  'Backend & Cloud': { icon: FiLayers, color: '#c2410c', skills: ['Node JS', 'Express JS', 'Nest JS', 'AWS EC2', 'AWS S3', 'NGINX'] },
  'Database & ORM': { icon: FiDatabase, color: '#c2410c', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Supabase', 'Prisma'] },
  Tools: { icon: FiCode, color: '#c2410c', skills: ['Git & GitHub', 'VS Code', 'Postman', 'Figma', 'npm'] },
};

const categoryNames = Object.keys(categoryMeta);

const SkillCategoryCard = ({ category, meta, delay, visible }) => {
  const Icon = meta.icon;

  return (
    <div className={`reveal${visible ? ' in-view' : ''}`} style={{ transitionDelay: `${delay}s` }}>
      <div className="card" style={{ height: '100%' }}>
        <div className="skill-cat-head">
          <div className="skill-cat-icon" style={{ background: `${meta.color}1f`, color: meta.color }}>
            <Icon size={19} />
          </div>
          <h3 className="skill-cat-title">{category}</h3>
        </div>
        <div className="chip-wrap">
          {meta.skills.map((name) => {
            const { icon: SkillIcon, color } = getTechIcon(name);
            return <span key={name} className="skill-badge"><SkillIcon color={color} size={14} />{name}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section-pt section-pb">
      <SectionHeading
        eyebrow="Expertise"
        title="A full toolkit for modern products"
        subtitle="From pixel-perfect interfaces to cloud infrastructure — the technologies I use to deliver."
      />

      <div ref={ref} className="grid-skills-categories">
        {categoryNames.map((category, i) => (
          <SkillCategoryCard key={category} category={category} meta={categoryMeta[category]} delay={i * 0.08} visible={inView} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
