import { Link } from 'react-router-dom'
import './HomePage.css'

const features = [
  {
    title: 'Organize Your Work',
    description: 'Centralize all your tasks in one clean, intuitive dashboard. No more scattered notes or missed deadlines.',
  },
  {
    title: 'Stay Secure',
    description: 'Your tasks and data are protected with enterprise-grade security. Only you can access your information.',
  },
  {
    title: 'Works Everywhere',
    description: 'Access your tasks from any device. Seamless experience on desktop, tablet, or mobile.',
  },
]

export default function HomePage() {
  return (
    <main className="homepage">
      <header className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">Task Manager</span>
          <h1>Take control of your productivity.</h1>
          <p>
            Streamline your workflow with a powerful task management system. Create, organize, and track your
            work with ease. Stay focused on what matters most.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/signup">
              Start Free
            </Link>
            <Link className="button secondary" to="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card__header">
              <span>Productivity Score</span>
              <strong>85%</strong>
            </div>
            <div className="hero-card__body">
              <p>Users complete 40% more tasks with organized tracking and smart filtering.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Why choose Task Manager?</h2>
        <p>
          Designed for efficiency and simplicity. Focus on completing your tasks while we handle
          the organization, search, and tracking in the background.
        </p>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
