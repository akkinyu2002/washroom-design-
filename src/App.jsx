import { useEffect, useRef, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from './components/HeroScene'
import ShowcaseScene from './components/ShowcaseScene'
import FeatureScene from './components/FeatureScene'
import SceneBoundary, { SceneFallback } from './components/SceneBoundary'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { img: '/images/vanity.png', title: 'Floating Vanity', desc: 'Marble & walnut elegance' },
  { img: '/images/shelving.png', title: 'Open Shelving', desc: 'Gold-framed display unit' },
  { img: '/images/cabinet.png', title: 'Storage Cabinet', desc: 'Soft-close luxury drawers' },
]

const features = [
  { icon: '◈', title: 'Premium Materials', desc: 'Hand-selected marble, solid walnut, and brushed gold hardware crafted to last a lifetime.' },
  { icon: '✦', title: 'Smart Storage', desc: 'Maximise every inch with clever compartments, hidden drawers, and modular shelf systems.' },
  { icon: '◇', title: 'Beginner Friendly', desc: 'Easy-to-install designs with detailed guides — no contractor required for a luxury look.' },
  { icon: '⬡', title: 'Timeless Design', desc: 'Clean lines and warm neutrals that complement any bathroom style for years to come.' },
]

const testimonials = [
  { stars: '★★★★★', text: '"Completely transformed our master bathroom. The vanity is stunning and the storage is incredibly practical."', author: 'Sarah Mitchell', role: 'Interior Designer' },
  { stars: '★★★★★', text: '"I was nervous about installing it myself, but the instructions were flawless. Looks like a five-star hotel now."', author: 'James Porter', role: 'Homeowner' },
  { stars: '★★★★★', text: '"The quality is unmatched at this price point. Marble tops, gold fixtures — everything feels premium."', author: 'Elena Vasquez', role: 'Architect' },
]

function Loader() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', color: '#c9a96e',
      fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
      letterSpacing: '0.15em'
    }}>
      LOADING...
    </div>
  )
}

export default function App() {
  const navRef = useRef()
  const heroRef = useRef()

  useEffect(() => {
    // Navbar scroll effect
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 60)
      }
    }
    window.addEventListener('scroll', onScroll)

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('active'),
      })
    })

    // Gallery parallax
    gsap.utils.toArray('.gallery__item').forEach((item, i) => {
      gsap.fromTo(item,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          delay: i * 0.15,
          scrollTrigger: { trigger: item, start: 'top 88%' }
        }
      )
    })

    // Feature cards stagger
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.fromTo(card,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7,
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      )
    })

    // Testimonial cards
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 88%' }
        }
      )
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Navbar */}
      <nav ref={navRef} className="navbar" id="navbar">
        <a href="#" className="navbar__logo">Lux<span>Bath</span></a>
        <ul className="navbar__links">
          <li><a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery') }}>Gallery</a></li>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features') }}>Features</a></li>
          <li><a href="#showcase" onClick={(e) => { e.preventDefault(); scrollTo('showcase') }}>3D Showroom</a></li>
          <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials') }}>Reviews</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="hero" id="hero">
        <div className="hero__canvas">
          <SceneBoundary fallback={<SceneFallback label="3D hero unavailable" />}>
            <Suspense fallback={<Loader />}>
              <HeroScene />
            </Suspense>
          </SceneBoundary>
        </div>
        <div className="hero__overlay">
          <p className="hero__tag">Luxury Bathroom Design</p>
          <h1 className="hero__title">Storage That Feels <em>Expensive</em></h1>
          <p className="hero__subtitle">
            Practical, realistic, and beginner-friendly bathroom solutions
            that elevate your space without the premium price tag.
          </p>
          <button className="hero__cta" onClick={() => scrollTo('showcase')}>
            Enter Showroom →
          </button>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Gallery */}
      <section className="section gallery" id="gallery">
        <div className="gallery__header reveal">
          <p className="section__tag">Curated Collection</p>
          <h2 className="section__title">Designs That Inspire</h2>
          <p className="section__desc">
            Each piece is crafted to balance beauty and function — storage
            solutions that look like they belong in a luxury hotel.
          </p>
        </div>
        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <div className="gallery__item" key={i} id={`gallery-item-${i}`}>
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="gallery__item-overlay">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section features" id="features">
        <div className="features__layout">
          <div className="features__canvas">
            <SceneBoundary fallback={<SceneFallback label="3D feature preview unavailable" />}>
              <Suspense fallback={<Loader />}>
                <FeatureScene />
              </Suspense>
            </SceneBoundary>
          </div>
          <div className="features__list">
            <div className="reveal">
              <p className="section__tag">Why LuxBath</p>
              <h2 className="section__title">Built for Real Homes</h2>
            </div>
            {features.map((f, i) => (
              <div className="feature-card" key={i} id={`feature-${i}`}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Showcase */}
      <section className="section showcase" id="showcase">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <p className="section__tag">Interactive Showroom</p>
          <h2 className="section__title" style={{ margin: '0 auto' }}>
            Explore in 3D
          </h2>
          <p className="section__desc" style={{ margin: '0 auto' }}>
            Rotate, zoom, and interact with our luxury bathroom furniture
            in a fully immersive 3D environment.
          </p>
        </div>
        <div className="showcase__canvas">
          <SceneBoundary fallback={<SceneFallback label="3D showroom unavailable" />}>
            <Suspense fallback={<Loader />}>
              <ShowcaseScene />
            </Suspense>
          </SceneBoundary>
        </div>
        <p className="showcase__hint">↻ Drag to rotate the showroom</p>
      </section>

      {/* Testimonials */}
      <section className="section testimonials" id="testimonials">
        <div className="reveal">
          <p className="section__tag">Client Stories</p>
          <h2 className="section__title" style={{ margin: '0 auto' }}>
            Loved by Homeowners
          </h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i} id={`testimonial-${i}`}>
              <div className="testimonial-card__stars">{t.stars}</div>
              <p className="testimonial-card__text">{t.text}</p>
              <p className="testimonial-card__author">
                {t.author} — <span>{t.role}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section" id="contact">
        <div className="reveal">
          <p className="section__tag">Get Started</p>
          <h2 className="section__title">
            Ready to Transform Your Bathroom?
          </h2>
          <p className="section__desc">
            Browse our full catalogue or book a free design consultation
            with our luxury bathroom specialists.
          </p>
          <button className="hero__cta" style={{ marginTop: '1rem' }}>
            Book Consultation →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <h3>Lux<span>Bath</span></h3>
            <p>
              Premium bathroom storage solutions that look expensive
              while staying practical and beginner-friendly.
            </p>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <a href="#gallery">Gallery</a>
            <a href="#features">Features</a>
            <a href="#showcase">3D Showroom</a>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div className="footer__col">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 LuxBath Studio. All rights reserved.</p>
          <p>Crafted with precision & care</p>
        </div>
      </footer>
    </>
  )
}
