import { useEffect, useState } from 'react';

const defaultBuilds = [
  {
    id: 1,
    name: 'Palmetto Performance',
    category: '1080p Gaming',
    price: 999,
    specs: 'Ryzen 5 | RTX 4060 | 16GB DDR4 | 1TB NVMe SSD',
    imagePath: '/images/PC Images/placeholder.png',
    marketplaceUrl: 'https://www.facebook.com/marketplace/'
  },
  {
    id: 2,
    name: 'Soda City Studio',
    category: 'Creator Workstation',
    price: 1649,
    specs: 'Ryzen 7 | RTX 4070 | 32GB DDR5 | 2TB NVMe SSD',
    imagePath: '/images/PC Images/placeholder.png',
    marketplaceUrl: 'https://www.facebook.com/marketplace/'
  },
  {
    id: 3,
    name: 'Gamecock Elite',
    category: '1440p Competitive',
    price: 2149,
    specs: 'Core i7 | RTX 4070 Ti Super | 32GB DDR5 | 2TB NVMe SSD',
    imagePath: '/images/PC Images/placeholder.png',
    marketplaceUrl: 'https://www.facebook.com/marketplace/'
  }
];

const trustStats = [
  { label: 'Custom builds sold', value: '50+' },
  { label: 'Commission turnaround', value: '48 hrs' },
  { label: 'Local support response', value: 'Same day' }
];

const reviews = [
  {
    quote:
      'Bought a gaming PC tower. Totally worth the money. Worked great with communication and the item is exactly as described.',
    author: 'Shannon'
  },
  {
    quote:
      'Very easy communication and pickup. Device works great. Quick responder. I would absolutely buy again.',
    author: 'Aidan'
  },
  {
    quote:
      'Great communication, product exactly as described, and very knowledgeable throughout the exchange.',
    author: 'Beth'
  }
];

const initialForm = {
  name: '',
  email: '',
  budget: '',
  preferences: '',
  useCase: '',
  timeline: ''
};

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export default function App() {
  const [builds, setBuilds] = useState(defaultBuilds);
  const [isLoadingBuilds, setIsLoadingBuilds] = useState(true);
  const [buildsError, setBuildsError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState({
    pending: false,
    success: '',
    error: ''
  });

  useEffect(() => {
    async function loadBuilds() {
      try {
        const response = await fetch('/api/builds');
        if (!response.ok) {
          throw new Error(`Build request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (Array.isArray(payload.builds) && payload.builds.length > 0) {
          setBuilds(payload.builds);
        }
      } catch (error) {
        setBuildsError('Using fallback build inventory while the API is unavailable.');
      } finally {
        setIsLoadingBuilds(false);
      }
    }

    loadBuilds();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ pending: true, success: '', error: '' });

    try {
      const response = await fetch('/api/commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Unable to send commission request.');
      }

      setSubmitState({
        pending: false,
        success: 'Commission request submitted. You can follow up from your inbox or email thread.',
        error: ''
      });
      setForm(initialForm);
    } catch (error) {
      setSubmitState({
        pending: false,
        success: '',
        error: error.message
      });
    }
  }

  return (
    <div className="min-h-screen bg-ink text-sand">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <img
            src="/images/Logos/LongLogo.png"
            alt="Columbia Custom PCs"
            className="h-10 w-auto sm:h-12"
          />
          <nav className="hidden gap-6 text-sm font-bold uppercase tracking-[0.2em] text-mist md:flex">
            <a href="#builds" className="transition hover:text-white">
              Builds
            </a>
            <a href="#commissions" className="transition hover:text-white">
              Commissions
            </a>
            <a href="#reviews" className="transition hover:text-white">
              Reviews
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-hero-grid" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
            style={{ backgroundImage: "url('/images/PC Images/heroBackground.png')" }}
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
            <div className="max-w-3xl">
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.4em] text-accent">
                Custom Builds | Columbia, SC
              </p>
              <h1 className="mt-5 font-display text-5xl uppercase leading-none text-white sm:text-6xl lg:text-7xl">
                Custom PCs built around how you actually work and play.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
                Gaming rigs, creator workstations, and everyday performance builds assembled in
                Columbia, SC with honest pricing, clear communication, and local support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#commissions"
                  className="rounded-full bg-accent px-6 py-3 font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff8256]"
                >
                  Start A Build
                </a>
                <a
                  href="#builds"
                  className="rounded-full border border-white/20 px-6 py-3 font-bold uppercase tracking-[0.2em] text-white transition hover:border-white"
                >
                  See Inventory
                </a>
              </div>
            </div>

            <div className="grid gap-4 self-end">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur"
                >
                  <p className="font-display text-4xl uppercase text-white">{stat.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-mist">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16" id="builds">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Available Builds
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase text-white">Current Inventory</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-mist">
              Browse ready-to-buy systems below, or reach out for a custom parts list built around
              your budget and goals.
            </p>
          </div>

          {buildsError ? (
            <p className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-sand">
              {buildsError}
            </p>
          ) : null}

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {builds.map((build) => (
              <article
                key={build.id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-steel shadow-panel"
              >
                <img
                  src={build.imagePath}
                  alt={build.name}
                  className="h-56 w-full object-cover"
                />
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                        {build.category}
                      </p>
                      <h3 className="mt-2 font-accent text-2xl font-bold text-white">
                        {build.name}
                      </h3>
                    </div>
                    <p className="font-display text-3xl uppercase text-white">
                      {currency(build.price)}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-mist">{build.specs}</p>
                  <a
                    href={build.marketplaceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:border-accent hover:text-accent"
                  >
                    Marketplace Listing
                  </a>
                </div>
              </article>
            ))}
          </div>

          {isLoadingBuilds ? <p className="mt-6 text-sm text-mist">Loading build inventory...</p> : null}
        </section>

        <section className="bg-[#0b1728] py-16" id="commissions">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Commission System
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase text-white">
                Submit what you need and get a scoped quote.
              </h2>
              <p className="mt-5 text-base leading-8 text-mist">
                Tell us your budget, preferred parts, and what you want the PC to handle. We will
                reach out with recommendations, pricing, and next steps.
              </p>
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mist">
                  Typical requests
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-sand">
                  <li>1440p and 4K gaming towers</li>
                  <li>Adobe and DaVinci Resolve workstations</li>
                  <li>Budget-conscious school and remote work rigs</li>
                </ul>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                  Name
                  <input
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                  Email
                  <input
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                  Budget
                  <input
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="$1200 - $1600"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                  Timeline
                  <input
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    placeholder="Within 2 weeks"
                  />
                </label>
              </div>

              <label className="mt-5 grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                Preferred Parts Or Aesthetics
                <textarea
                  className="min-h-28 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                  name="preferences"
                  value={form.preferences}
                  onChange={handleChange}
                  placeholder="AMD CPU, white case, RGB fans, 2TB SSD..."
                />
              </label>

              <label className="mt-5 grid gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mist">
                Use Case
                <textarea
                  className="min-h-32 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-base normal-case text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                  name="useCase"
                  value={form.useCase}
                  onChange={handleChange}
                  placeholder="Competitive gaming, streaming, CAD, editing, school, or office work..."
                  required
                />
              </label>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitState.pending}
                  className="rounded-full bg-accent px-6 py-3 font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff8256] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState.pending ? 'Submitting...' : 'Submit Request'}
                </button>

                {submitState.success ? (
                  <p className="text-sm text-[#9ee6b0]">{submitState.success}</p>
                ) : null}
                {submitState.error ? <p className="text-sm text-[#ff9b9b]">{submitState.error}</p> : null}
              </div>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16" id="reviews">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-accent text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                Customer Reviews
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase text-white">Marketplace Trust</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-mist">
              Real feedback from local buyers who wanted straightforward communication, fair
              pricing, and a machine that worked exactly as promised.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <blockquote
                key={review.author}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-panel"
              >
                <p className="font-display text-3xl text-accent">5/5</p>
                <p className="mt-4 text-base leading-8 text-sand">"{review.quote}"</p>
                <footer className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-mist">
                  {review.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>columbiacustompcs@gmail.com</p>
          <p>Custom builds, commission quotes, and local marketplace fulfillment.</p>
        </div>
      </footer>
    </div>
  );
}
