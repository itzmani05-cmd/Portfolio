import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 200,
        width: 46,
        height: 46,
        borderRadius: 13,
        background: '#14110f',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 28px rgba(11,0,26,0.35)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        transition: 'opacity 0.35s, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s',
        pointerEvents: visible ? 'all' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 14px 36px rgba(59,130,246,0.55)';
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(11,0,26,0.35)';
        e.currentTarget.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)';
      }}
    >
      <FiArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
