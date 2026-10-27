import {
  About,
  CommandPalette,
  Contact,
  Education,
  Experience,
  Footer,
  GithubStats,
  Navbar,
  Projects,
  ScrollProgress,
  ScrollToTop,
  Skills,
  SideDots,
  TechMarquee,
  Testimonials,
} from './components';
import { useScrollVars } from './hooks/useScrollVars';
import { appShell, mainContent, pageContainer } from './config/layout';

const portfolioSections = [
  Experience,
  Projects,
  Skills,
  Testimonials,
  GithubStats,
  Education,
  Contact,
];

function App() {
  useScrollVars();
  return (
    <div style={appShell}>
      <ScrollProgress />
      <CommandPalette />

      <Navbar />
      <SideDots />

      <main style={mainContent}>
        <About />
        <TechMarquee />
        <div style={pageContainer}>
          {portfolioSections.map((Section) => (
            <Section key={Section.name} />
          ))}
        </div>
      </main>

      <Footer container={pageContainer} />
      <ScrollToTop />
    </div>
  );
}

export default App;
