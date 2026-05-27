import './HomePage.css'

const features = [
  {
    title: 'Task Management',
    description: 'Create, update, delete, and organize tasks in one dashboard.',
  },
  {
    title: 'Authentication',
    description: 'Login and signup flows with secure access control.',
  },
  {
    title: 'Responsive UI',
    description: 'Designed for desktop and mobile screens with a clean layout.',
  },
]

export default function HomePage() {
  return (
    <main className="homepage">
      <header className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">Task Manager</span>
          <h1>Build a smarter workflow with task tracking.</h1>
          <p>
            Launch a full-stack productivity app with React and Node.js. Start with a
            polished landing page, then add authentication, dashboard, and task CRUD.
          </p>
          <div className="hero-actions">
            <button className="button primary">Get Started</button>
            <button className="button secondary">View Features</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card__header">
              <span>Daily tasks</span>
              <strong>78%</strong>
            </div>
            <div className="hero-card__body">
              <p>Keep track of due tasks, completed items, and next actions.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>What we will build next</h2>
        <p>
          Follow a layer-by-layer development workflow: home page first, then login/signup,
          task dashboard, filters, and backend integration.
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
