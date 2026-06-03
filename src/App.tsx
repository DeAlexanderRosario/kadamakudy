import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Circle, Menu, X, Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'THE JOURNEY', href: '#journey' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCES', href: '#experiences' },
  { label: 'STAYS', href: '#stays' },
  { label: 'LOCAL LIFE', href: '#locallife' },
  { label: 'FAQ', href: '#faq' },
  { label: 'CONTACT', href: '#contact' },
];

const PEXELS = {
  hero: '/images/hero.png',
  river: '/images/houseboat-modern.png',
  lifeWater: '/images/dwelling-simple.png',
  architecture: '/images/home-traditional.jpeg',
  skyWater: '/images/man.jpeg',
  quote: '/images/home-traditional.jpeg',
  g1: '/images/fishing-structures.png',
  g2: '/images/houseboat-modern.png',
  g3: '/images/dwelling-simple.png',
  g4: '/images/home-traditional.jpeg',
  g5: '/images/fishing-structures.png',
  g6: '/images/houseboat-modern.png',
};

function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 40;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.08) {
        ripples.push({
          x: e.clientX,
          y: e.clientY + window.scrollY,
          radius: 2,
          maxRadius: Math.random() * 60 + 40,
          opacity: 0.12,
          speed: 1.0,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY + window.scrollY,
        radius: 4,
        maxRadius: 160,
        opacity: 0.35,
        speed: 1.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    const render = () => {
      // Pause animation when tab is hidden (saves CPU/GPU)
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      const scrollY = window.scrollY;
      ripples.forEach((ripple, index) => {
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.0035 * ripple.speed;

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
          return;
        }

        ctx.strokeStyle = `rgba(200, 164, 109, ${ripple.opacity})`;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y - scrollY, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(200, 164, 109, ${ripple.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y - scrollY, ripple.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      });

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(200, 164, 109, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 2) {
          ctx.fillStyle = `rgba(200, 164, 109, ${p.opacity * 0.15})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What does Kadamakudy offer travelers?",
      a: "Kadamakudy offers a peaceful escape near Kochi where you can stay with local families in authentic homestays. You can explore the beautiful backwaters, witness traditional village activities like prawn farming, and enjoy home-cooked Kerala cuisine."
    },
    {
      q: "What should I expect from the homestay accommodations?",
      a: "Expect warm, clean, and comfortable rooms hosted by welcoming local families. These are real family homes, offering a simple and authentic stay with modern essentials and home-cooked meals."
    },
    {
      q: "How can I get to Kadamakudy?",
      a: "Kadamakudy is located approximately 15 km from Ernakulam (Kochi) city center. It is easily accessible by road (car or auto-rickshaw) to the island's edge, followed by a short and scenic country boat or canoe ride to the host homes."
    },
    {
      q: "Are the experiences suitable for families?",
      a: "Yes! Kadamakudy is perfect for families, couples, and solo travelers who appreciate nature, local culture, and a peaceful, slower pace of travel."
    },
    {
      q: "How do I book a stay or visit?",
      a: "You can send an inquiry using our contact form, email hello@kadamakudy.com, or call us. We conduct a friendly, informal conversation with all prospective guests to ensure we match you with the perfect host family."
    }
  ];

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#C8A46D] uppercase block mb-3">FAQ</span>
          <h2 className="font-serif text-4xl font-light text-[#F5F0E6] leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-px bg-[#C8A46D] mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-[#2B4747] pb-4 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left py-3 focus:outline-none group"
                >
                  <span className="font-serif text-lg text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors duration-300">
                    {faq.q}
                  </span>
                  <span className="text-[#C8A46D] text-xl font-mono leading-none">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/70">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#0F2A2A] text-[#F5F0E6] overflow-x-hidden min-h-screen relative">
      <WaterCanvas />
      <div className="film-grain" aria-hidden="true" />

      {/* ─── NAVIGATION ─────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${scrolled ? 'bg-[#0F2A2A]/90 backdrop-blur-sm border-b border-[#C8A46D]/10' : ''
          }`}
      >
        {/* Logo */}
        <a href="/" aria-label="Kadamakudy — Kerala Backwaters, go to homepage" className="flex items-center gap-3 no-underline">
          <div className="w-9 h-9 rounded-full border border-[#C8A46D]/60 flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none" aria-hidden="true">
              <path d="M18 6 C12 6 8 12 8 18 C8 24 12 28 18 28 C24 28 28 24 28 18 C28 12 24 6 18 6Z" stroke="#C8A46D" strokeWidth="1" fill="none" />
              <path d="M18 10 L18 26 M10 18 L26 18" stroke="#C8A46D" strokeWidth="0.8" />
              <path d="M13 13 C15 15 21 15 23 13 M13 23 C15 21 21 21 23 23" stroke="#C8A46D" strokeWidth="0.8" />
            </svg>
          </div>
          <div>
            <div className="font-serif text-[15px] tracking-[0.25em] text-[#F5F0E6] leading-tight">KADAMAKUDY</div>
            <div className="font-sans text-[8px] tracking-[0.35em] text-[#C8A46D] uppercase leading-tight">Kerala Backwaters</div>
          </div>
        </a>

        {/* Center Coordinate stamp */}
        <div className="hidden xl:block font-mono text-[9px] tracking-[0.2em] text-[#F5F0E6]/30" aria-hidden="true">
          10.0526° N, 76.2570° E &bull; TIME ESCAPING
        </div>

        {/* Nav links */}
        <div
          id="main-menu"
          role="menu"
          className={`${menuOpen ? 'flex' : 'hidden lg:flex'} absolute lg:relative top-20 lg:top-0 left-0 lg:left-auto right-0 lg:right-auto flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 bg-[#0F2A2A]/95 lg:bg-transparent p-8 lg:p-0 w-full lg:w-auto border-b border-[#C8A46D]/10 lg:border-none`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="nav-link font-sans text-[9px] tracking-[0.25em] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors duration-350 uppercase no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:block font-sans text-[9px] tracking-[0.25em] text-[#F5F0E6]/50 uppercase hover:text-[#C8A46D] transition-colors cursor-pointer">
            Slow Down
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            className="lg:hidden w-8 h-8 rounded-full border border-[#F5F0E6]/20 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
          >
            {menuOpen ? (
              <X className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
            ) : (
              <Menu className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
            )}
          </button>
          <button
            aria-label="Open site menu"
            className="hidden lg:flex w-8 h-8 rounded-full border border-[#F5F0E6]/20 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
          >
            <Menu className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
          </button>
        </div>
      </nav>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
      <main id="main-content">

        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section
          id="journey"
          aria-label="Hero — Kadamakudy Kerala Backwaters experience"
          className="relative z-10 h-[85vh] min-h-[580px] overflow-hidden p-6 lg:p-8 flex items-center"
        >
          {/* Cinematic Framed Image */}
          <div className="absolute inset-4 lg:inset-8 overflow-hidden rounded-sm">
            <div className="relative w-full h-full canvas-frame">
              <img
                src={PEXELS.hero}
                alt="Kadamakudy Kerala backwaters — traditional wooden frames with lush tropical landscape"
                width={1920}
                height={1080}
                fetchPriority="high"
                decoding="async"
                className="hero-img absolute inset-0 w-full h-full object-cover object-center slow-drift"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A2A]/40 via-transparent to-[#0F2A2A]/90" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A2A]/50 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>

          {/* Floating Malayalam Script Watermark */}
          <div className="malayalam-watermark top-1/4 right-1/4 select-none opacity-[0.035]" aria-hidden="true">
            നിശബ്ദത
          </div>

          <div className="absolute left-12 lg:left-16 bottom-20 flex flex-col items-center gap-3" aria-hidden="true">
            <span className="font-sans text-[11px] tracking-[0.2em] text-[#C8A46D]">01</span>
            <div className="w-px h-16 bg-[#C8A46D]/30" />
          </div>

          <div className="relative z-10 w-full max-w-xl pl-12 lg:pl-16 mt-20">
            <div className="font-mono text-[9px] tracking-[0.25em] text-[#C8A46D] mb-4 uppercase" aria-hidden="true">
              10°03'09.4"N 76°15'25.2"E &bull; CHAPTER I
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl font-light text-[#F5F0E6] leading-[0.95] mb-6 tracking-tight">
              Discover the Soul of<br />
              <em className="not-italic text-[#C8A46D] font-light">Kadamakudy</em>
            </h1>
            <p className="font-sans text-[11px] tracking-[0.15em] text-[#F5F0E6]/80 leading-relaxed mb-8 max-w-[480px]">
              Stay with local families, explore peaceful <a href="#experiences" className="text-[#C8A46D] hover:underline transition-colors">backwaters</a>, and experience the timeless rhythm of Kerala’s <a href="#locallife" className="text-[#C8A46D] hover:underline transition-colors">island life</a> near Kochi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Plan your stay at Kadamakudy — contact us"
                className="cta-btn flex items-center gap-3 border border-[#C8A46D]/40 px-6 py-3 hover:border-[#C8A46D] transition-all duration-300 group"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase">Plan Your Stay</span>
                <div className="w-5 h-5 rounded-full border border-[#C8A46D]/40 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                  <ArrowRight className="w-2.5 h-2.5 text-[#C8A46D]" />
                </div>
              </button>
              <button
                onClick={() => document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Explore experiences in Kadamakudy"
                className="cta-btn flex items-center gap-3 border border-[#F5F0E6]/20 px-6 py-3 hover:border-[#C8A46D] transition-all duration-300 group"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#F5F0E6]/70 uppercase group-hover:text-[#C8A46D] transition-colors">Explore Experiences</span>
                <div className="w-5 h-5 rounded-full border border-[#F5F0E6]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                  <ArrowRight className="w-2.5 h-2.5 text-[#F5F0E6]/70 group-hover:text-[#C8A46D] transition-colors" />
                </div>
              </button>
            </div>
          </div>

          <div className="absolute right-12 bottom-20 flex flex-col items-center gap-2" aria-hidden="true">
            <span
              className="font-sans text-[9px] tracking-[0.3em] text-[#F5F0E6]/40 uppercase"
              style={{ writingMode: 'vertical-rl' }}
            >
              Scroll
            </span>
            <div className="relative w-px h-14 bg-[#F5F0E6]/20">
              <div className="scroll-dot absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C8A46D]" />
            </div>
          </div>
        </section>

        {/* ─── EDITORIAL STORY GRID (Experiences) ────────────────────────── */}
        <section
          id="story-grid"
          aria-label="Experiences — Kerala backwater life chapters"
          className="grid grid-cols-12 gap-1 sm:gap-0 relative z-10 bg-[#0F2A2A]"
        >
          {/* ROW 1 */}
          {/* Card 1: The River (Text & Trellis) */}
          <article className="chapter-card col-span-6 lg:col-span-3 bg-[#F5F0E6] text-[#0F2A2A] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[300px] relative overflow-hidden bg-trellis">
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
              <div className="sunlight-shimmer absolute inset-0 mix-blend-overlay" />
              <div className="sun-ray absolute -top-20 -left-20 w-[150%] h-[150%] mix-blend-overlay" />
              <div className="absolute bottom-0 left-0 w-[200%] h-14 flex opacity-[0.16]">
                <svg className="w-1/2 h-full wave-animated-1 text-[#8a7a5e]" viewBox="0 0 720 80" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,40 C120,60 240,20 360,40 C480,60 600,20 720,40 L720,80 L0,80 Z" />
                </svg>
                <svg className="w-1/2 h-full wave-animated-1 text-[#8a7a5e]" viewBox="0 0 720 80" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,40 C120,60 240,20 360,40 C480,60 600,20 720,40 L720,80 L0,80 Z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-[200%] h-10 flex opacity-[0.12]">
                <svg className="w-1/2 h-full wave-animated-2 text-[#C8A46D]" viewBox="0 0 720 80" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,30 C150,10 300,50 450,30 C600,10 720,30 720,30 L720,80 L0,80 Z" />
                </svg>
                <svg className="w-1/2 h-full wave-animated-2 text-[#C8A46D]" viewBox="0 0 720 80" preserveAspectRatio="none" fill="currentColor">
                  <path d="M0,30 C150,10 300,50 450,30 C600,10 720,30 720,30 L720,80 L0,80 Z" />
                </svg>
              </div>
              <svg className="absolute bottom-0 right-4 w-24 h-28 text-[#8a7a5e]/20 pointer-events-none select-none palm-tree-animated" viewBox="0 0 120 140" fill="currentColor" aria-hidden="true">
                <path d="M90,140 Q84,100 66,50 Q70,49 94,140 Z" />
                <path d="M66,50 C50,42 33,48 20,60 C38,44 52,47 66,50 Z" />
                <path d="M66,50 C52,32 37,24 30,22 C46,18 58,28 66,50 Z" />
                <path d="M66,50 C70,25 82,18 92,15 C82,30 74,42 66,50 Z" />
                <path d="M66,50 C92,36 102,40 110,48 C94,53 80,49 66,50 Z" />
                <path d="M66,50 C86,60 94,70 102,80 C88,68 76,59 66,50 Z" />
                <path d="M66,50 C55,62 48,72 40,84 C52,70 60,60 66,50 Z" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-sans text-[11px] tracking-[0.15em] text-[#8a7a5e]" aria-hidden="true">01</span>
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8a7a5e]">The River — Kochi Backwaters</span>
              </div>
              <div className="w-8 h-px bg-[#C8A46D] mb-5" aria-hidden="true" />
              <h2 className="font-serif text-[18px] font-light text-[#2b4747] leading-snug italic">
                The peaceful waterways of Kadamakudy invite you to slow down. Glide along the Kochi backwaters in a traditional hand-paddled canoe, surrounded by calm and natural beauty.
              </h2>
            </div>
            <button aria-label="View Chapter: The River — Kerala backwater stories" className="relative z-10 flex items-center gap-2 group mt-4">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors">View Chapter</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#8a7a5e] flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                <ArrowRight className="w-2 h-2 text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </article>

          {/* Card 2: Modern Houseboat (Cinematic Image Frame) */}
          <div className="chapter-card col-span-6 lg:col-span-4 p-2 sm:p-4 min-h-[200px] sm:min-h-[300px] flex items-stretch">
            <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 min-h-[268px]">
              <img
                src={PEXELS.river}
                alt="Modern Kerala houseboat gliding through the Kadamakudy backwaters at dusk"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_60%] absolute inset-0 slow-drift"
              />
              <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/20" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.2em] text-[#F5F0E6]/50" aria-hidden="true">
                9°58'12.4"N 76°14'33.1"E &bull; HOUSEBOAT
              </div>
            </div>
          </div>

          {/* Card 3: Life Along the Water (Image + Text Card) */}
          <article id="places" className="chapter-card col-span-12 lg:col-span-5 p-2 sm:p-4 min-h-[200px] sm:min-h-[300px] flex items-stretch">
            <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[268px]">
              <img
                src={PEXELS.lifeWater}
                alt="A fisherman's humble shelter along the shores of Kadamakudy backwater islands, Kerala"
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_35%] absolute inset-0 slow-drift"
              />
              <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/60" aria-hidden="true" />

              <div className="malayalam-watermark top-6 right-6 opacity-[0.02] text-8xl" aria-hidden="true">
                ജീവൻ
              </div>

              <svg className="absolute right-4 bottom-4 w-28 h-12 text-[#C8A46D]/15 pointer-events-none select-none" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                <path d="M5,25 Q50,40 95,25 Q70,42 30,42 Z" />
                <path d="M40,28 L40,15 Q43,12 45,15" />
                <path d="M55,30 L55,10 Q58,7 60,10" />
                <line x1="15" y1="27" x2="85" y2="27" />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[11px] tracking-[0.15em] text-[#C8A46D]" aria-hidden="true">02</span>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">TIMELESS SHORES</span>
                </div>
                <h2 className="font-serif text-3xl font-light text-[#F5F0E6] leading-tight mb-3">
                  Life Along<br />the Water
                </h2>
                <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
                <p className="font-serif text-sm font-light text-[#F5F0E6]/70 italic leading-relaxed max-w-[240px]">
                  Discover the warm hospitality of a traditional <a href="#locallife" className="text-[#C8A46D] hover:underline transition-colors">fishing village Kerala</a>. Connect with local families and experience an <a href="#stays" className="text-[#C8A46D] hover:underline transition-colors">authentic Kerala stay</a>.
                </p>
              </div>
              <button aria-label="Explore: Life Along the Water in Kadamakudy" className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Explore</span>
                <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                  <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
                </div>
              </button>
            </div>
          </article>

          {/* ROW 2 */}
          {/* Card 4: Floating Architecture (Wide Card) */}
          <article className="chapter-card col-span-12 lg:col-span-8 p-2 sm:p-4 min-h-[200px] sm:min-h-[320px] flex items-stretch">
            <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[288px]">
              <img
                src={PEXELS.architecture}
                alt="Traditional red-tiled roof Kerala home surrounded by palm trees and muddy embankments in Kadamakudy"
                width={1200}
                height={700}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_55%] absolute inset-0 slow-drift"
              />
              <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/70" aria-hidden="true" />

              <svg className="absolute right-6 top-6 w-36 h-36 text-[#C8A46D]/15 pointer-events-none select-none" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
                <line x1="20" y1="100" x2="80" y2="40" />
                <line x1="80" y1="40" x2="110" y2="70" />
                <line x1="80" y1="40" x2="90" y2="10" />
                <path d="M80,40 Q50,70 20,100" />
                <path d="M80,40 L110,90 Q80,110 50,90 Z" />
                <line x1="110" y1="90" x2="50" y2="90" />
                <path d="M20,100 Q15,80 30,60" />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]" aria-hidden="true">03</span>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">RUSTIC DWELLINGS</span>
                </div>
                <h2 className="font-serif text-4xl font-light text-[#F5F0E6] leading-tight mb-4">
                  Floating<br />Architecture
                </h2>
                <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60 max-w-[280px]">
                  Appreciate the architectural beauty of traditional red-tiled <a href="#stays" className="text-[#C8A46D] hover:underline transition-colors">Kerala homestay</a> dwellings that have stood for generations along the shorelines of the Kadamakudy islands.
                </p>
              </div>
              <button aria-label="Discover Kerala backwater floating architecture and traditional homes" className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Discover</span>
                <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                  <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
                </div>
              </button>
            </div>
          </article>

          {/* Card 5: The Sky and Water (Narrower Portrait image) */}
          <article className="chapter-card col-span-12 lg:col-span-4 p-2 sm:p-4 min-h-[200px] sm:min-h-[320px] flex items-stretch">
            <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[288px]">
              <img
                src={PEXELS.skyWater}
                alt="Local Kadamakudy fisherman against the Kerala backwater sky at golden hour"
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_30%] absolute inset-0 slow-drift"
              />
              <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/50" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]" aria-hidden="true">04</span>
                  <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">MIRROR OF THE SKY</span>
                </div>
                <h2 className="font-serif text-3xl font-light text-[#F5F0E6] leading-tight mb-3">
                  Mirror of the<br />Sky
                </h2>
                <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60 max-w-[200px]">
                  Witness the beautiful sunrise where the sky paints its reflection on the Vembanad Lake backwaters, creating a serene space for <a href="#about" className="text-[#C8A46D] hover:underline transition-colors">slow travel Kerala</a>.
                </p>
              </div>
              <button aria-label="Explore the sky and water reflections of Kadamakudy" className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Explore</span>
                <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                  <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
                </div>
              </button>
            </div>
          </article>

          {/* ROW 3 */}
          {/* Card 6: The Experience (Dark Card contrast) */}
          <article id="experience" className="chapter-card col-span-6 lg:col-span-3 bg-[#143C3C] border border-[#2B4747] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[280px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-end opacity-[0.06] pointer-events-none select-none" aria-hidden="true">
              <svg viewBox="0 0 160 200" className="w-40 h-48 text-[#F5F0E6]" fill="currentColor">
                <path d="M80 180 C80 180 60 150 50 120 C40 90 55 70 80 50 C105 70 120 90 110 120 C100 150 80 180 80 180Z" opacity="0.6" />
                <path d="M80 180 C80 180 40 160 30 130 C20 100 35 75 60 60" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path d="M80 180 C80 180 120 155 130 125 C140 95 125 70 100 58" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
                <ellipse cx="60" cy="100" rx="18" ry="28" transform="rotate(-20 60 100)" opacity="0.4" />
                <ellipse cx="100" cy="95" rx="16" ry="24" transform="rotate(25 100 95)" opacity="0.4" />
                <line x1="80" y1="50" x2="80" y2="180" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]" aria-hidden="true">05</span>
              </div>
              <h2 className="font-serif text-2xl font-light text-[#F5F0E6] leading-tight mb-3">
                The <a href="#stays" className="text-[#C8A46D] hover:underline">Backwater Experience</a>
              </h2>
              <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
              <p className="font-sans text-[10px] leading-relaxed text-[#F5F0E6]/60 max-w-[190px]">
                Embark on a gentle journey of <a href="#about" className="text-[#C8A46D] hover:underline">responsible travel Kerala</a>. Stay in local family homestays and belong to a landscape of peace and wonder.
              </p>
            </div>
            <button aria-label="Journey on — explore the Kadamakudy backwater experience" className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/60 group-hover:text-[#C8A46D] transition-colors">Journey On</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/40 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                <ArrowRight className="w-2 h-2 text-[#C8A46D]/60 group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </article>

          {/* Card 7: Gallery of Moments (Warm Cream Card) */}
          <article className="chapter-card col-span-6 lg:col-span-3 bg-[#E6DDC6] text-[#0F2A2A] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[280px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#8a7a5e]" aria-hidden="true">06</span>
              </div>
              <h2 className="font-serif text-2xl font-light text-[#2a3d28] leading-tight mb-3">
                Gallery of Moments
              </h2>
              <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
              <p className="font-sans text-[10px] leading-relaxed text-[#2B4747] max-w-[180px]">
                Fragments of a life woven with water, light and quiet memories.
              </p>
            </div>
            <button aria-label="Open gallery — Kerala backwater photography moments" className="flex items-center gap-2 group mt-4 w-fit">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors">Open Gallery</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#8a7a5e] flex items-center justify-center group-hover:border-[#C8A46D] transition-colors" aria-hidden="true">
                <ArrowRight className="w-2 h-2 text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </article>

          {/* Card 8: Gallery Thumbnails (Cinematic grid) */}
          <section id="gallery" aria-label="Gallery — Kadamakudy backwater photography" className="col-span-12 lg:col-span-6 bg-[#143C3C]/40 p-2 sm:p-4 min-h-[180px] sm:min-h-[280px] flex items-stretch">
            <div className="grid grid-cols-3 gap-2 h-full w-full flex-1">
              <div className="flex flex-col gap-2">
                <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g1}
                    alt="Traditional Chinese fishing nets (cheena vala) on the Kadamakudy backwaters at sunset"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="gallery-thumb h-[45%] overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g2}
                    alt="Modern houseboat cruise through Kerala backwater channels near Kadamakudy"
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gallery-thumb h-[45%] overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g3}
                    alt="Simple dwelling on stilts along the Kadamakudy backwater shore"
                    width={400}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g4}
                    alt="Red-tiled traditional Kerala home with coconut palms in Kadamakudy"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g5}
                    alt="Fishing structures and canoes along the Kadamakudy backwater network"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="gallery-thumb h-[40%] overflow-hidden rounded-sm canvas-frame">
                  <img
                    src={PEXELS.g6}
                    alt="Kerala houseboat reflected in the still waters of Kadamakudy islands"
                    width={400}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* ─── QUOTE SECTION ────────────────────────────────────────── */}
        <section aria-label="Closing quote" className="relative h-[22vh] min-h-[140px] overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-2 overflow-hidden rounded-sm canvas-frame">
            <img
              src={PEXELS.quote}
              alt=""
              role="presentation"
              width={1200}
              height={300}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30 slow-drift"
            />
            <div className="absolute inset-0 bg-[#0F2A2A]/85" aria-hidden="true" />
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <p className="font-serif text-2xl lg:text-4xl font-light italic text-[#F5F0E6]">
              “The backwaters do not ask you to hurry.”
            </p>
          </div>
        </section>

        {/* ─── ABOUT ──────────────────────────────────────────────── */}
        <section id="about" aria-label="About Kadamakudy" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="malayalam-watermark bottom-10 left-12 opacity-[0.02] text-[10rem]" aria-hidden="true">തീരം</div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-4">The Destination</span>
                <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#F5F0E6] mb-6 leading-tight">
                  About Kadamakudy:<br />A Sanctuary of Peace
                </h2>
                <div className="w-16 h-px bg-[#C8A46D] mb-6" aria-hidden="true" />
                <p className="font-serif text-[16px] font-light italic text-[#F5F0E6]/80 leading-relaxed mb-5">
                  Kadamakudy is a serene cluster of islands near Kochi where traditional life and natural beauty exist in perfect harmony.
                </p>
                <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/60 mb-5">
                  This is a living community of traditional fishing families who have shaped this landscape for generations. Here, life moves gently with the tides, and travelers are welcomed as valued guests into authentic, working homes.
                </p>
                <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/60">
                  Our goal is to foster slow, mindful travel that supports the local economy directly — your stay helps preserve the traditional lifestyle, mangrove ecosystems, and age-old fishing traditions of this beautiful island.
                </p>
              </div>
              <div className="space-y-5">
                {([
                  { label: 'Quiet Beauty', desc: 'Serene backwaters that mirror the sky — stunning crowd-free golden sunrises and unhurried sunsets.' },
                  { label: 'Authentic Connection', desc: 'Genuine friendships with island families, hearing their stories and sharing traditional home-cooked meals.' },
                  { label: 'Natural Biodiversity', desc: 'Explore mangrove channels — a natural sanctuary for over 60 species of resident and migratory birds.' },
                  { label: 'Slow Living', desc: 'Unplug from screens and reconnect with yourself, guided by the timeless rhythms of Vembanad Lake.' },
                ] as { label: string; desc: string }[]).map(({ label, desc }) => (
                  <div key={label} className="bg-[#143C3C]/60 p-5 border border-[#2B4747] hover:border-[#C8A46D]/30 transition-colors duration-300">
                    <h3 className="font-serif text-[15px] text-[#C8A46D] mb-2">{label}</h3>
                    <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/65">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── EXPERIENCES ────────────────────────────────────────── */}
        <section id="experiences" aria-label="Experiences in Kadamakudy" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-3">Immersive Rhythms</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#F5F0E6] leading-tight">Living the Rhythms of the Water</h2>
              <div className="w-16 h-px bg-[#C8A46D] mx-auto mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {([
                { img: PEXELS.river, alt: 'Wooden canoe on Kerala backwaters', title: 'Hand-Paddled Canoe Journeys', tag: 'Slow Travel', desc: 'Glide through winding water channels shaded by coconut palms and dense mangrove forests in a traditional wooden canoe — the perfect way to discover the hidden corners of the islands.' },
                { img: PEXELS.g5, alt: 'Traditional Chinese fishing nets at Kadamakudy', title: 'Traditional Net Mending', tag: 'Local Culture', desc: 'Watch fishermen operate magnificent Chinese fishing nets (cheena vala) and learn the craft of hand-net casting. Join them quietly in mending nets during peaceful afternoons.' },
                { img: PEXELS.architecture, alt: 'Traditional Kerala kitchen', title: 'Kerala Culinary Heritage', tag: 'Gastronomy', desc: 'Prepare authentic Kerala dishes with fresh coconut, local spices, curry leaves, and freshly caught fish or prawns — cooked on traditional clay stoves by your host family.' },
              ] as { img: string; alt: string; title: string; tag: string; desc: string }[]).map(({ img, alt, title, tag, desc }) => (
                <div key={title} className="bg-[#143C3C]/40 border border-[#2B4747] rounded-sm overflow-hidden group hover:border-[#C8A46D]/30 transition-all duration-300 flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={img} alt={alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#0F2A2A]/40" aria-hidden="true" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="font-serif text-xl font-light text-[#F5F0E6]">{title}</h3>
                      <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/65">{desc}</p>
                    </div>
                    <div className="pt-4 flex items-center gap-2">
                      <Circle className="w-1 h-1 fill-[#C8A46D] text-[#C8A46D]" aria-hidden="true" />
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C8A46D]">{tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STAY OPTIONS ───────────────────────────────────────── */}
        <section id="stays" aria-label="Homestay Accommodation in Kadamakudy" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-4">Welcoming Homes</span>
                  <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#F5F0E6] leading-tight">Stay with Island Families</h2>
                  <div className="w-16 h-px bg-[#C8A46D] mt-6 mb-6" aria-hidden="true" />
                  <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/70">
                    Your stay in Kadamakudy is hosted in the traditional homes of local families — comfortable, clean, and offering a firsthand experience of warm backwater island hospitality.
                  </p>
                </div>
                <div className="space-y-5">
                  {([
                    { title: 'Cozy & Clean Rooms', desc: 'Comfortable guest rooms with modern essentials, designed to breathe naturally with the backwater breeze.' },
                    { title: 'Home-Cooked Meals', desc: 'Three daily traditional meals prepared with love by your host family using fresh local ingredients and Kerala spices.' },
                    { title: 'Warm Island Hospitality', desc: 'Experience the natural warmth of Kerala culture, where guests are welcomed as extended family members.' },
                  ] as { title: string; desc: string }[]).map(({ title, desc }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full border border-[#C8A46D]/30 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <Circle className="w-1.5 h-1.5 fill-[#C8A46D] text-[#C8A46D]" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-[#F5F0E6] mb-1">{title}</h4>
                        <p className="font-sans text-[11px] text-[#F5F0E6]/60 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="relative rounded-sm overflow-hidden canvas-frame h-[440px]">
                  <img src={PEXELS.quote} alt="Traditional Kerala home interior" loading="lazy" className="w-full h-full object-cover slow-drift" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A2A] via-[#0F2A2A]/20 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#143C3C]/80 backdrop-blur-sm border border-[#2B4747]">
                    <p className="font-serif text-lg font-light text-[#F5F0E6] italic">
                      "We felt at home — sharing morning coffee with the family and watching sunlight ripple across the water."
                    </p>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#C8A46D] block mt-2">— Guest Reflection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LOCAL LIFE ─────────────────────────────────────────── */}
        <section id="locallife" aria-label="Local Life and Culture in Kadamakudy" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-4">Traditional Rhythms</span>
                <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#F5F0E6] leading-tight mb-6">
                  Traditions of a Kerala<br />Fishing Village
                </h2>
                <div className="w-16 h-px bg-[#C8A46D] mb-6" aria-hidden="true" />
                <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/70 mb-8">
                  The Kadamakudy islands are home to close-knit communities whose lives are woven with the Vembanad Lake. Traditional aquaculture, handcrafts, and a deep connection to nature shape everyday life here.
                </p>
                <div className="rounded-sm overflow-hidden canvas-frame h-[260px]">
                  <img src={PEXELS.skyWater} alt="Fisherman in canoe at sunset over Kadamakudy backwaters" loading="lazy" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-5">
                {([
                  { title: 'Prawn & Pokkali Farming', desc: 'Traditional brackish water aquaculture rotated with Pokkali rice cultivation — a sustainable, eco-friendly system practiced for generations.' },
                  { title: 'Coir Spinning & Cottage Industries', desc: 'The hand-spinning of coconut husks into coir rope is a classic island cottage industry. Watch local women work with incredible skill and quiet efficiency.' },
                  { title: 'Bird Sanctuary & Biodiversity', desc: 'A bird lover\'s paradise hosting kingfishers, herons, egrets, and rare migratory birds from continents far away.' },
                  { title: 'Nearby Attractions', desc: 'Fort Kochi (20 km), Ernakulam city (12 km), and Cherai Beach (22 km) are all within easy reach — perfect complements to island life.' },
                ] as { title: string; desc: string }[]).map(({ title, desc }) => (
                  <div key={title} className="bg-[#143C3C]/60 p-5 border border-[#2B4747] hover:border-[#C8A46D]/30 transition-colors duration-300">
                    <h3 className="font-serif text-[15px] text-[#C8A46D] mb-2">{title}</h3>
                    <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/65">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── TRAVEL TIPS ────────────────────────────────────────── */}
        <section id="tips" aria-label="Travel Tips for Kadamakudy" className="bg-[#143C3C]/30 py-20 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-3">Before You Arrive</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-light text-[#F5F0E6]">Tips for Conscious Travelers</h2>
              <div className="w-12 h-px bg-[#C8A46D] mx-auto mt-4" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {([
                { heading: 'Best Season to Visit', tip: 'October to March — pleasant tropical breezes, calm waters, and active bird migrations make this the golden window for a backwater stay.' },
                { heading: 'What to Pack', tip: 'Light breathable cotton clothing, comfortable sandals, sunscreen, insect repellent, and a curious, open heart.' },
                { heading: 'Respecting Local Rhythms', tip: 'Ask before photographing residents. Minimize single-use plastic. Move at the island\'s own pace — slow, gentle, and deeply respectful.' },
              ] as { heading: string; tip: string }[]).map(({ heading, tip }) => (
                <div key={heading} className="border border-[#2B4747] p-6 bg-[#0F2A2A]/60">
                  <div className="w-8 h-px bg-[#C8A46D] mb-4" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-light text-[#F5F0E6] mb-3">{heading}</h3>
                  <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/65">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────────── */}
        <FAQSection />

        {/* ─── CONTACT ────────────────────────────────────────────── */}
        <section id="contact" aria-label="Contact Kadamakudy — enquire about backwater homestays" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C8A46D]/5 blur-[120px] pointer-events-none" aria-hidden="true" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left Column: Context & Info */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.3em] text-[#C8A46D] uppercase block mb-3">Questions?</span>
                  <h2 className="font-serif text-5xl font-light text-[#F5F0E6] leading-tight mb-6">
                    Let's Talk
                  </h2>
                  <div className="w-16 h-px bg-[#C8A46D] mb-6" aria-hidden="true" />
                  <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/70 max-w-sm">
                    We are here to listen, align, and share. Whether you want to enquire about stays or simply share a reflection, we welcome your presence.
                  </p>
                </div>

                {/* Contact Channels */}
                <address className="space-y-6 not-italic">
                  <a href="mailto:hello@kadamakudy.com" className="flex items-center gap-4 group cursor-pointer no-underline">
                    <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300" aria-hidden="true">
                      <Mail className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase block mb-0.5">Email</span>
                      <p className="font-sans text-[11px] text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors">
                        hello@kadamakudy.com
                      </p>
                    </div>
                  </a>

                  <a href="tel:+917510616989" className="flex items-center gap-4 group cursor-pointer no-underline">
                    <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300" aria-hidden="true">
                      <Phone className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase block mb-0.5">Phone</span>
                      <p className="font-sans text-[11px] text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors">
                        +91 75106 16989
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300" aria-hidden="true">
                      <MapPin className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase block mb-0.5">Location</span>
                      <p className="font-sans text-[11px] text-[#F5F0E6]">
                        Kadamakudy, Kerala, India
                      </p>
                    </div>
                  </div>
                </address>

                {/* Before You Connect Box */}
                <div className="bg-[#143C3C]/40 border border-[#2B4747] p-6 rounded-sm space-y-4">
                  <h3 className="font-serif text-lg font-light text-[#C8A46D]">Before You Connect</h3>
                  <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60">
                    Expect a peaceful, natural escape with digital silence, delicious home-cooked meals, and authentic community connections.
                  </p>
                  <div className="h-px bg-[#2B4747] w-full" aria-hidden="true" />
                  <ul className="space-y-2.5" aria-label="Important information before contacting">
                    <li className="flex gap-2.5 items-start">
                      <Circle className="w-1.5 h-1.5 fill-[#C8A46D] text-[#C8A46D] mt-1.5 flex-shrink-0" aria-hidden="true" />
                      <span className="font-sans text-[10px] text-[#F5F0E6]/50">Friendly conversation: We chat with every guest to pair you with the ideal host home.</span>
                    </li>
                    <li className="flex gap-2.5 items-start">
                      <Circle className="w-1.5 h-1.5 fill-[#C8A46D] text-[#C8A46D] mt-1.5 flex-shrink-0" aria-hidden="true" />
                      <span className="font-sans text-[10px] text-[#F5F0E6]/50">Average response timeline: 48 to 72 hours.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-[#143C3C]/60 backdrop-blur-sm border border-[#2B4747] p-8 lg:p-10 rounded-lg relative overflow-hidden group hover:border-[#C8A46D]/30 transition-all duration-500 shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C8A46D]/10 to-transparent pointer-events-none" aria-hidden="true" />

                  <h3 className="font-serif text-2xl font-light text-[#F5F0E6] mb-6">Send an Inquiry</h3>

                  {formSubmitted && (
                    <div role="alert" className="mb-6 bg-[#C8A46D]/10 border border-[#C8A46D]/30 rounded p-4">
                      <p className="font-sans text-[11px] text-[#C8A46D]">Thank you — your inquiry has been received. We'll respond within 48–72 hours.</p>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-8" aria-label="Contact enquiry form for Kadamakudy backwater homestays">
                    <div className="relative">
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        placeholder=" "
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent"
                        required
                        autoComplete="name"
                        aria-required="true"
                      />
                      <label
                        htmlFor="form-name"
                        className="absolute left-0 top-2.5 font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/40 uppercase transition-all duration-300 pointer-events-none
                          peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[#F5F0E6]/40
                          peer-focus:top-[-12px] peer-focus:text-[9px] peer-focus:text-[#C8A46D]
                          peer-[&:not(:placeholder-shown)]:top-[-12px] peer-[&:not(:placeholder-shown)]:text-[9px] peer-[&:not(:placeholder-shown)]:text-[#C8A46D]"
                      >
                        Your Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        placeholder=" "
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent"
                        required
                        autoComplete="email"
                        aria-required="true"
                      />
                      <label
                        htmlFor="form-email"
                        className="absolute left-0 top-2.5 font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/40 uppercase transition-all duration-300 pointer-events-none
                          peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[#F5F0E6]/40
                          peer-focus:top-[-12px] peer-focus:text-[9px] peer-focus:text-[#C8A46D]
                          peer-[&:not(:placeholder-shown)]:top-[-12px] peer-[&:not(:placeholder-shown)]:text-[9px] peer-[&:not(:placeholder-shown)]:text-[#C8A46D]"
                      >
                        Your Email
                      </label>
                    </div>

                    <div className="relative">
                      <textarea
                        id="form-message"
                        name="message"
                        rows={5}
                        placeholder=" "
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent resize-none"
                        required
                        aria-required="true"
                      />
                      <label
                        htmlFor="form-message"
                        className="absolute left-0 top-2.5 font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/40 uppercase transition-all duration-300 pointer-events-none
                          peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-[#F5F0E6]/40
                          peer-focus:top-[-12px] peer-focus:text-[9px] peer-focus:text-[#C8A46D]
                          peer-[&:not(:placeholder-shown)]:top-[-12px] peer-[&:not(:placeholder-shown)]:text-[9px] peer-[&:not(:placeholder-shown)]:text-[#C8A46D]"
                      >
                        How do you wish to belong?
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#C8A46D] hover:bg-[#B98D52] text-[#0F2A2A] py-4 px-6 font-sans text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── LOCAL RESOURCES & CONNECTIONS (SEO Link Building) ───── */}
        <section aria-label="Local resources and connections" className="bg-[#143C3C]/30 border-t border-[#2B4747] py-16 px-8 lg:px-20 relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-[#C8A46D]/5 blur-[80px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

              {/* Left Column: Heading */}
              <div className="lg:col-span-5">
                <span className="font-sans text-[10px] tracking-[0.3em] text-[#C8A46D] uppercase block mb-3">Resource Hub</span>
                <h2 className="font-serif text-3xl lg:text-4xl font-light text-[#F5F0E6] leading-tight mb-4">
                  Local Connections<br />&amp; Resources
                </h2>
                <div className="w-16 h-px bg-[#C8A46D] mb-6" aria-hidden="true" />
                <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/60 max-w-sm">
                  To further understand Kadamakudy and the wider Vembanad wetland ecosystem, explore these internal and external resources. We believe in open knowledge and community visibility.
                </p>
              </div>

              {/* Right Column: Links Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">

                {/* Internal Links */}
                <div>
                  <h3 className="font-serif text-lg font-light text-[#C8A46D] mb-4">Explore Kadamakudy</h3>
                  <ul className="space-y-3" aria-label="Internal page sections">
                    <li>
                      <a href="#journey" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Kadamakudy Islands Journey</span>
                      </a>
                    </li>
                    <li>
                      <a href="#stories" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Fishing Village Kerala Stories</span>
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Kerala Backwater Homestays</span>
                      </a>
                    </li>
                    <li>
                      <a href="#gallery" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Chinese Fishing Nets Gallery</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* External Links */}
                <div>
                  <h3 className="font-serif text-lg font-light text-[#C8A46D] mb-4">External Authority Resources</h3>
                  <ul className="space-y-3" aria-label="External reference links">
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Kadamakkudy" target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Wikipedia: Kadamakkudy Islands</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Vembanad" target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Wikipedia: Vembanad Backwaters</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.keralatourism.org/" target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Official Kerala Tourism Department</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://maps.google.com/?q=Kadamakudy+Kerala+India" target="_blank" rel="noopener noreferrer" className="font-sans text-[11px] tracking-[0.1em] text-[#F5F0E6]/75 hover:text-[#C8A46D] transition-colors flex items-center gap-2 group">
                        <ArrowRight className="w-3 h-3 text-[#C8A46D]/50 group-hover:translate-x-1 transition-transform" />
                        <span>Google Maps: Kochi Backwaters Location</span>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer aria-label="Site footer" className="bg-[#0F2A2A] border-t border-[#2B4747] py-16 px-8 lg:px-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full border border-[#C8A46D]/60 flex items-center justify-center" aria-hidden="true">
                  <Circle className="w-2 h-2 fill-[#C8A46D] text-[#C8A46D]" />
                </div>
                <div>
                  <div className="font-serif text-[12px] tracking-[0.15em] text-[#F5F0E6]">KADAMAKUDY</div>
                  <div className="font-sans text-[7px] tracking-[0.25em] text-[#C8A46D] uppercase">Backwaters</div>
                </div>
              </div>
              <p className="font-sans text-[9px] leading-relaxed text-[#F5F0E6]/50">
                Conscious travel through Kerala's living art.
              </p>
            </div>
            <nav aria-label="Explore links">
              <h3 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Explore</h3>
              <ul className="space-y-2">
                <li><a href="#journey" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Journeys</a></li>
                <li><a href="#stories" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Stories</a></li>
                <li><a href="#gallery" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Gallery</a></li>
                <li><a href="#contact" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Journal</a></li>
              </ul>
            </nav>
            <nav aria-label="Company links">
              <h3 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">About Us</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Sustainability</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Careers</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Press</a></li>
              </ul>
            </nav>
            <div>
              <h3 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/kadamakudy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kadamakudy on Instagram"
                  className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
                >
                  <Instagram className="w-3 h-3 text-[#C8A46D]" aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/kadamakudy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kadamakudy on Facebook"
                  className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
                >
                  <Facebook className="w-3 h-3 text-[#C8A46D]" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/kadamakudy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kadamakudy on LinkedIn"
                  className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
                >
                  <Linkedin className="w-3 h-3 text-[#C8A46D]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2B4747] pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 uppercase">
                © 2026 Kadamakudy. All rights reserved. Kadamakudy, Kerala, India.
              </p>
              <nav aria-label="Legal links" className="flex gap-6">
                <a href="/privacy" className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 hover:text-[#C8A46D] transition-colors uppercase">
                  Privacy
                </a>
                <a href="/terms" className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 hover:text-[#C8A46D] transition-colors uppercase">
                  Terms
                </a>
                <a href="/sitemap.xml" className="font-sans text-[8px] tracking-[0.1em] text-[#e8e0d4]/40 hover:text-[#c4a96d] transition-colors uppercase">
                  Sitemap
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
