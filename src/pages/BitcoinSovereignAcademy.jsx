import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionButton, NavigationButton } from '../components/ui';
import { moduleGroups, getModulesByGroup } from '../modules/ModuleRegistry';
import './BitcoinSovereignAcademy.css';

const learningHighlights = [
  {
    title: 'Foundations First',
    description:
      'Start with the money problem, understand why Bitcoin matters, and build unstoppable conviction in the solution.',
  },
  {
    title: 'Hands-On Mastery',
    description:
      'Practice real skills through interactive labs, custody drills, transaction builders, and Bitcoin tooling walkthroughs.',
  },
  {
    title: 'Technical Depth',
    description:
      'Dive under the hood with approachable explanations of hashing, mining, scripting, and network architecture.',
  },
  {
    title: 'Advanced Fluency',
    description:
      'Finish with Lightning, cutting-edge innovations, and myth-busting context so you can educate others with confidence.',
  },
];

const BitcoinSovereignAcademy = () => {
  const navigate = useNavigate();
  const sortedGroups = Object.entries(moduleGroups).sort(([, a], [, b]) => a.order - b.order);

  return (
    <div className="academy-page">
      <section className="academy-hero">
        <div className="academy-hero__content">
          <span className="academy-badge">Bitcoin Sovereign Academy</span>
          <h1>Own Your Education. Master Your Sovereignty.</h1>
          <p>
            The entire Learn Bitcoin by Doing journey is now organized as a guided academy experience. Follow the recommended path
            or jump directly into the skills you need to become truly sovereign.
          </p>
          <div className="academy-hero__actions">
            <ActionButton
              size="lg"
              priority="high"
              onClick={() => navigate('/?view=learning')}
              className="academy-primary-action"
            >
              Start Learning
            </ActionButton>
            <NavigationButton
              size="lg"
              direction="forward"
              onClick={() => {
                const section = document.getElementById('module-path');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  navigate('/bitcoin-sovereign-academy#module-path');
                }
              }}
              className="academy-secondary-action"
            >
              Explore the Path
            </NavigationButton>
          </div>
          <div className="academy-hero__cta">
            <span>Just want the quick overview?</span>
            <Link to="/bitcoin-first-principles.html" className="academy-inline-link">
              Read the manifesto
            </Link>
          </div>
        </div>
      </section>

      <section className="academy-highlights">
        <h2>Your Sovereign Learning Journey</h2>
        <div className="academy-highlight-grid">
          {learningHighlights.map((item) => (
            <div key={item.title} className="academy-highlight-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="module-path" className="academy-module-path">
        <header className="academy-section-header">
          <h2>Follow the Academy Path</h2>
          <p>
            Each phase builds on the last. Complete them in order for a curated experience, or choose individual modules to fill
            specific knowledge gaps.
          </p>
        </header>
        <div className="academy-module-groups">
          {sortedGroups.map(([groupId, group]) => {
            const modules = getModulesByGroup(groupId);
            return (
              <div key={groupId} className="academy-module-group">
                <div className="academy-module-group__header">
                  <span className="academy-module-emoji" aria-hidden="true">
                    {group.emoji}
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                </div>
                <div className="academy-module-list">
                  {modules.map((module) => (
                    <Link key={module.id} to={`/module/${module.id}`} className="academy-module-card">
                      <div className="academy-module-card__content">
                        <h4>{module.title}</h4>
                        <p>{module.description}</p>
                      </div>
                      <span className="academy-module-card__cta" aria-hidden="true">
                        Start →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="academy-next-steps">
        <div className="academy-next-steps__content">
          <h2>Continue Building Sovereignty</h2>
          <p>
            Track your progress, unlock achievements, and revisit modules any time from the homepage dashboard. The academy keeps
            everything organized so your learning momentum never stalls.
          </p>
          <div className="academy-next-steps__actions">
            <ActionButton size="md" onClick={() => navigate('/?view=progress')}>
              View My Progress
            </ActionButton>
            <ActionButton
              size="md"
              variant="secondary"
              onClick={() => navigate('/?view=learning')}
              className="academy-outline-action"
            >
              Return to Dashboard
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BitcoinSovereignAcademy;
