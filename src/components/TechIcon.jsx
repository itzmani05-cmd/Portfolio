import { 
  SiJavascript, SiPython, SiReact, SiHtml5, SiTailwindcss, SiAntdesign,
  SiNodedotjs, SiExpress, SiNestjs, SiNginx,
  SiMysql, SiMongodb, SiSupabase, SiPrisma, SiPostgresql,
  SiGithub, SiInsomnia, SiFigma, SiC,
  SiPostman, SiNpm
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';

const iconMap = {
  'javascript': { icon: SiJavascript, color: '#d4b800' },
  'python': { icon: SiPython, color: '#3776ab' },
  'java': { icon: FaJava, color: '#f89820' },
  'c': { icon: SiC, color: '#5c6bc0' },
  'react js': { icon: SiReact, color: '#61dafb' },
  'react native': { icon: SiReact, color: '#61dafb' },
  'html & css': { icon: SiHtml5, color: '#e34f26' },
  'tailwind css': { icon: SiTailwindcss, color: '#06b6d4' },
  'ant design': { icon: SiAntdesign, color: '#0170fe' },
  'node js': { icon: SiNodedotjs, color: '#339933' },
  'express js': { icon: SiExpress, color: '#16121f' },
  'nest js': { icon: SiNestjs, color: '#ea2845' },
  'nginx': { icon: SiNginx, color: '#009639' },
  'aws ec2': { icon: FaAws, color: '#ff9900' },
  'aws s3': { icon: FaAws, color: '#ff9900' },
  'mysql': { icon: SiMysql, color: '#4479a1' },
  'mongodb': { icon: SiMongodb, color: '#47a248' },
  'supabase': { icon: SiSupabase, color: '#3ecf8e' },
  'prisma': { icon: SiPrisma, color: '#16121f' },
  'postgresql': { icon: SiPostgresql, color: '#4169e1' },
  'git & github': { icon: SiGithub, color: '#16121f' },
  'insomnia': { icon: SiInsomnia, color: '#4000bf' },
  'figma': { icon: SiFigma, color: '#f24e1e' },
  'antd': { icon: SiAntdesign, color: '#0170fe' },
  'vs code': { icon: FiCode, color: '#007acc' },
  'postman': { icon: SiPostman, color: '#ff6c37' },
  'npm': { icon: SiNpm, color: '#cb3837' },
};

export const getTechIcon = (name) => {
  const key = name.toLowerCase();
  const match = iconMap[key];
  if (match) return match;
  return { icon: FiCode, color: '#94a3b8' };
};
