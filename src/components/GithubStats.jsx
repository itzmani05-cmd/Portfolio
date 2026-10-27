import data from '../data/portfolioData.json';
import { FiGitCommit, FiAward, FiBook, FiExternalLink } from 'react-icons/fi';
import { FaFire, FaGithub } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import SectionHeading from './SectionHeading';

const LEVEL_COLORS = [
  'rgba(20,16,30,0.06)',
  'rgba(194,65,12,0.25)',
  'rgba(194,65,12,0.5)',
  'rgba(194,65,12,0.8)',
  '#14110f',
];
const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const buildGrid = (contributions) => {
  if (!contributions?.length) return [];

  const sorted = [...contributions].sort((a, b) => new Date(a.date) - new Date(b.date));

  const firstDate = new Date(sorted[0].date);
  const startSunday = new Date(firstDate);
  startSunday.setDate(firstDate.getDate() - firstDate.getDay());

  const byDate = {};
  sorted.forEach(c => { byDate[c.date] = { count: c.count, level: c.level }; });

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const weeks = [];
  let cursor = new Date(startSunday);

  while (cursor <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(cursor);
      if (dayDate > today) {
        week.push(null);
      } else {
        const key = dayDate.toISOString().slice(0, 10);
        const info = byDate[key] || { count: 0, level: 0 };
        week.push({ level: info.level, count: info.count, date: dayDate.toDateString() });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
};

const AnimatedCounter = ({ end, suffix = '', color = 'var(--text)', started }) => {
  const [count, setCount]  = useState(0);
  const rafRef = useRef(null);
  const t0Ref  = useRef(null);
  const DURATION = 1600;
  const ease = t => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    if (!started) return;
    t0Ref.current = null;
    const tick = ts => {
      if (!t0Ref.current) t0Ref.current = ts;
      const p = Math.min((ts - t0Ref.current) / DURATION, 1);
      setCount(Math.floor(ease(p) * end));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(end);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, end]);

  return (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.5rem, 3.6vh, 2.1rem)', fontWeight: 700,
      color, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em',
    }}>
      {count}{suffix}
    </span>
  );
};

const StatCard = ({ stat, inView, delay }) => {
  const { label, value, suffix, sub, color, bg, border, icon: Icon } = stat;

  return (
    <div
     
      className={`card reveal${inView ? ' in-view' : ''}`}
      style={{
        padding: 'clamp(12px, 2.4vh, 20px) 18px',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
        transitionDelay: `${delay}s`,
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, border: `1px solid ${border}` }}>
        <Icon size={20} />
      </div>
      <AnimatedCounter end={value} suffix={suffix} color={color} started={inView} />
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 6 }}>
        {label}
      </span>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</span>
    </div>
  );
};

const GithubStats = () => {
  const { githubStats, contact } = data;
  const username = contact.github.split('/').filter(Boolean).pop();
  const [ref, inView] = useInView(0.1);
  const [repoCount, setRepoCount] = useState(Number(githubStats?.totalRepositories) || 0);
  const [tooltip, setTooltip] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(Boolean(username));

  useEffect(() => {
    if (!username) return;

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then(r => r.json())
      .then(d => {
        if (d.contributions) setHeatmap(buildGrid(d.contributions));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(d => { if (d.public_repos !== undefined) setRepoCount(d.public_repos); })
      .catch(() => {});
  }, [username]);

  if (!githubStats) return null;

  const monthLabels = [];
  let lastMonth = -1;
  heatmap.forEach((week, wi) => {
    const first = week.find(d => d !== null);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) { monthLabels.push({ label: MONTHS[m], wi }); lastMonth = m; }
  });

  const STATS = [
    { label: 'Contributions', value: Number(githubStats.totalContributions), suffix: '+',     sub: githubStats.totalRange,   color: '#c2410c', bg: 'rgba(194,65,12,0.08)',  border: 'rgba(194,65,12,0.28)',  icon: FiGitCommit },
    { label: 'Current Streak', value: Number(githubStats.currentStreak),     suffix: ' days', sub: githubStats.currentDate,  color: '#d97706', bg: 'rgba(245,158,11,0.1)', border: 'rgba(251,191,36,0.25)', icon: FaFire      },
    { label: 'Longest Streak', value: Number(githubStats.longestStreak),     suffix: ' days', sub: githubStats.longestRange, color: '#0f9d63', bg: 'rgba(18,163,107,0.09)', border: 'rgba(52,211,153,0.25)', icon: FiAward     },
    { label: 'Repositories',   value: repoCount,                             suffix: '',      sub: 'Public & private',       color: '#0891b2', bg: 'rgba(8,145,178,0.09)', border: 'rgba(34,211,238,0.25)', icon: FiBook      },
  ];

  return (
    <section id="github" className="section-pt section-pb">
      <SectionHeading
        eyebrow="Open Source"
        title="Consistent, every single week"
        subtitle="A snapshot of my commit history, contribution streaks and open-source work."
      />

      <div ref={ref} className="gh-stats">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} inView={inView} delay={i * 0.09} />
        ))}
      </div>

      <div
        className={`card reveal${inView ? ' in-view' : ''}`}
        style={{ padding: 'clamp(14px, 2.4vh, 22px) 24px', overflowX: 'auto', transitionDelay: '0.38s' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>Contribution Activity</h3>
          <div style={{
            fontSize: 11, color: 'var(--muted)', background: 'rgba(20,16,30,0.06)',
            padding: '4px 12px', borderRadius: 6, minWidth: 150, textAlign: 'center',
          }}>
            {tooltip
              ? <span style={{ color: 'var(--text-2)' }}>{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''} · {tooltip.date}</span>
              : <span>Hover a cell</span>
            }
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', gap: 2, width: '100%' }}>
            {Array.from({ length: 53 }).map((_, wi) => (
              <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {Array.from({ length: 7 }).map((_, di) => (
                  <div key={di} style={{ width: '100%', height: 10, borderRadius: 2, background: 'rgba(20,16,30,0.06)', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${(wi + di) * 0.02}s` }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

            <div style={{ position: 'relative', height: 16, marginBottom: 4, paddingLeft: 28, width: '100%' }}>
              {monthLabels.map(({ label, wi }) => (
                <span
                  key={`${label}-${wi}`}
                  style={{
                    position: 'absolute',
                    left: `calc(28px + ${(wi / Math.max(heatmap.length, 1)) * 100}% * ((100% - 28px) / 100%))`,
                    fontSize: 10, color: 'var(--muted)', fontWeight: 600,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                {DAY_LABELS.map((d, i) => (
                  <span key={d} style={{ fontSize: 9, color: 'var(--muted)', height: 10, lineHeight: '11px', width: 24, textAlign: 'right' }}>
                    {i % 2 === 1 ? d : ''}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 2, flex: 1, width: '100%' }}>
                {heatmap.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                    {week.map((day, di) => (
                      <div
                        key={di}
                        onMouseEnter={() => day && setTooltip(day)}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          width: '100%', height: 10, borderRadius: 2,
                          background: day ? LEVEL_COLORS[day.level] : 'rgba(20,16,30,0.04)',
                          border: '1px solid rgba(20,16,30,0.06)',
                          transition: 'transform 0.1s, filter 0.1s',
                          cursor: day?.count > 0 ? 'pointer' : 'default',
                        }}
                        onMouseOver={e => { if (day?.level > 0) { e.currentTarget.style.transform = 'scale(1.5)'; e.currentTarget.style.filter = 'brightness(1.5)'; } }}
                        onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'brightness(1)'; }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 12, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', marginRight: 2 }}>Less</span>
              {LEVEL_COLORS.map((bg, i) => (
                <div key={i} style={{ width: 11, height: 10, borderRadius: 2, background: bg, border: '1px solid rgba(20,16,30,0.08)' }} />
              ))}
              <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 2 }}>More</span>
            </div>

          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 'clamp(14px, 3vh, 24px)' }}>
        <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <FaGithub size={16} /> View GitHub Profile <FiExternalLink size={13} />
        </a>
      </div>
    </section>
  );
};

export default GithubStats;
