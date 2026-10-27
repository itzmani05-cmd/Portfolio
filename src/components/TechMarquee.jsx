import { getTechIcon } from './TechIcon';

const items = ['React JS', 'React Native', 'Node JS', 'Express JS', 'Nest JS', 'MongoDB', 'PostgreSQL', 'Prisma', 'Supabase', 'AWS EC2', 'AWS S3', 'NGINX', 'Tailwind CSS', 'Ant Design', 'Figma'];

const TechMarquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...items, ...items].map((name, i) => {
        const { icon: Icon, color } = getTechIcon(name);
        return (
          <span key={`${name}-${i}`} className="skill-badge"><Icon color={color} size={15} />{name}</span>
        );
      })}
    </div>
  </div>
);

export default TechMarquee;
