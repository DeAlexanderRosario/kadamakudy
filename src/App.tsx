import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Circle, Menu, X, Mail, Phone, MapPin, Send, Star, Instagram, Facebook, Linkedin } from 'lucide-react';

const NAV_LINKS = ['THE JOURNEY', 'STORIES', 'PLACES', 'EXPERIENCE', 'GALLERY', 'JOURNAL', 'CONTACT'];

const PEXELS = {
  // Your actual backwaters images - replace with uploaded paths
  hero: '/images/hero.png', // Rustic wooden frames with fabric
  river: '/images/houseboat-modern.png', // Contemporary curved architecture
  lifeWater: '/images/dwelling-simple.png', // Humble fisherman's shelter
  architecture: '/images/home-traditional.jpeg', // Red-tiled roof with palms
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

    // Particles (sun motes)
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    // Ripples
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }> = [];

    // Initialize background spores
    for (let i = 0; i < 40; i++) {
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
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() < 0.08) {
        ripples.push({
          x: e.clientX,
          y: e.clientY + window.scrollY,
          radius: 2,
          maxRadius: Math.random() * 60 + 40,
          opacity: 0.12,
          speed: 1.0
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
        speed: 1.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render ripples
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

      // Render particles
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}



export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', contactForm);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#0F2A2A] text-[#F5F0E6] overflow-x-hidden min-h-screen relative">
      <WaterCanvas />
      <div className="film-grain" />
      {/* ─── NAVIGATION ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 ${
          scrolled ? 'bg-[#0F2A2A]/90 backdrop-blur-sm border-b border-[#C8A46D]/10' : ''
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#C8A46D]/60 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
              <path d="M18 6 C12 6 8 12 8 18 C8 24 12 28 18 28 C24 28 28 24 28 18 C28 12 24 6 18 6Z" stroke="#C8A46D" strokeWidth="1" fill="none" />
              <path d="M18 10 L18 26 M10 18 L26 18" stroke="#C8A46D" strokeWidth="0.8" />
              <path d="M13 13 C15 15 21 15 23 13 M13 23 C15 21 21 21 23 23" stroke="#C8A46D" strokeWidth="0.8" />
            </svg>
          </div>
          <div>
            <div className="font-serif text-[15px] tracking-[0.25em] text-[#F5F0E6] leading-tight">KADAMAKUDY</div>
            <div className="font-sans text-[8px] tracking-[0.35em] text-[#C8A46D] uppercase leading-tight">Kerala Backwaters</div>
          </div>
        </div>

        {/* Center Coordinate stamp */}
        <div className="hidden xl:block font-mono text-[9px] tracking-[0.2em] text-[#F5F0E6]/30">
          10.0526° N, 76.2570° E &bull; TIME ESCAPING
        </div>

        {/* Nav links */}
        <div className={`${menuOpen ? 'flex' : 'hidden lg:flex'} absolute lg:relative top-20 lg:top-0 left-0 lg:left-auto right-0 lg:right-auto flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 bg-[#0F2A2A]/95 lg:bg-transparent p-8 lg:p-0 w-full lg:w-auto border-b border-[#C8A46D]/10 lg:border-none`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setMenuOpen(false)}
              className="nav-link font-sans text-[9px] tracking-[0.25em] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors duration-350 uppercase"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <span className="hidden lg:block font-sans text-[9px] tracking-[0.25em] text-[#F5F0E6]/50 uppercase hover:text-[#C8A46D] transition-colors cursor-pointer">
            Slow Down
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-8 h-8 rounded-full border border-[#F5F0E6]/20 flex items-center justify-center hover:border-[#C8A46D] transition-colors"
          >
            {menuOpen ? (
              <X className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
            ) : (
              <Menu className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
            )}
          </button>
          <button className="hidden lg:flex w-8 h-8 rounded-full border border-[#F5F0E6]/20 flex items-center justify-center hover:border-[#C8A46D] transition-colors">
            <Menu className="w-3.5 h-3.5 text-[#F5F0E6]/70" />
          </button>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative z-10 h-[85vh] min-h-[580px] overflow-hidden p-6 lg:p-8 flex items-center">
        {/* Cinematic Framed Image */}
        <div className="absolute inset-4 lg:inset-8 overflow-hidden rounded-sm">
          <div className="relative w-full h-full canvas-frame">
            <img
              src={PEXELS.hero}
              alt="Kerala Backwaters"
              className="hero-img absolute inset-0 w-full h-full object-cover object-center slow-drift"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A2A]/40 via-transparent to-[#0F2A2A]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A2A]/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Floating Malayalam Script Watermark */}
        <div className="malayalam-watermark top-1/4 right-1/4 select-none opacity-[0.035]">
          നിശബ്ദത
        </div>

        <div className="absolute left-12 lg:left-16 bottom-20 flex flex-col items-center gap-3">
          <span className="font-sans text-[11px] tracking-[0.2em] text-[#C8A46D]">01</span>
          <div className="w-px h-16 bg-[#C8A46D]/30" />
        </div>

        <div className="relative z-10 w-full max-w-xl pl-12 lg:pl-16 mt-20">
          <div className="font-mono text-[9px] tracking-[0.25em] text-[#C8A46D] mb-4 uppercase">
            10°03'09.4"N 76°15'25.2"E &bull; CHAPTER I
          </div>
          <h1 className="font-serif text-6xl lg:text-8xl font-light text-[#F5F0E6] leading-[0.95] mb-6 tracking-tight">
            Not Tourist.<br />
            <em className="not-italic text-[#C8A46D] font-light">Witness.</em>
          </h1>
          <p className="font-sans text-[10px] tracking-[0.25em] text-[#F5F0E6]/70 uppercase leading-relaxed mb-8 max-w-[340px]">
            Stay in working homes. Learn from fishermen.<br />Understand a place where time moves<br />with the water.
          </p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-btn flex items-center gap-3 border border-[#C8A46D]/40 px-6 py-3 hover:border-[#C8A46D] transition-all duration-300 group"
          >
            <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase">Start Belonging</span>
            <div className="w-5 h-5 rounded-full border border-[#C8A46D]/40 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
              <ArrowRight className="w-2.5 h-2.5 text-[#C8A46D]" />
            </div>
          </button>
        </div>

        <div className="absolute right-12 bottom-20 flex flex-col items-center gap-2">
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

      {/* ─── EDITORIAL GRID ──────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-1 sm:gap-0 relative z-10 bg-[#0F2A2A]">
        {/* ROW 1 */}
        {/* Card 1: The River (Text & Trellis) */}
        <div className="chapter-card col-span-6 lg:col-span-3 bg-[#F5F0E6] text-[#0F2A2A] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[300px] relative overflow-hidden bg-trellis">
          {/* Immersive Wave & Sunlight effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div className="sunlight-shimmer absolute inset-0 mix-blend-overlay" />
            <div className="sun-ray absolute -top-20 -left-20 w-[150%] h-[150%] mix-blend-overlay" />
            
            {/* Moving Waves */}
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

            {/* Swaying Coconut Tree */}
            <svg className="absolute bottom-0 right-4 w-24 h-28 text-[#8a7a5e]/20 pointer-events-none select-none palm-tree-animated" viewBox="0 0 120 140" fill="currentColor">
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
              <span className="font-sans text-[11px] tracking-[0.15em] text-[#8a7a5e]">01</span>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8a7a5e]">The River</span>
            </div>
            <div className="w-8 h-px bg-[#C8A46D] mb-5" />
            <p className="font-serif text-[18px] font-light text-[#2b4747] leading-snug italic">
              The river does not rush.<br />It already knows where<br />it belongs.
            </p>
          </div>
          <button className="relative z-10 flex items-center gap-2 group mt-4">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors">View Chapter</span>
            <div className="chapter-arrow w-4 h-4 rounded-full border border-[#8a7a5e] flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
              <ArrowRight className="w-2 h-2 text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors" />
            </div>
          </button>
        </div>

        {/* Card 2: Modern Houseboat (Cinematic Image Frame) */}
        <div className="chapter-card col-span-6 lg:col-span-4 p-2 sm:p-4 min-h-[200px] sm:min-h-[300px] flex items-stretch">
          <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 min-h-[268px]">
            <img src={PEXELS.river} alt="Kerala river" className="w-full h-full object-cover object-[center_60%] absolute inset-0 slow-drift" />
            <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/20" />
            <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.2em] text-[#F5F0E6]/50">
              9°58'12.4"N 76°14'33.1"E &bull; HOUSEBOAT
            </div>
          </div>
        </div>

        {/* Card 3: Life Along the Water (Image + Text Card) */}
        <div className="chapter-card col-span-12 lg:col-span-5 p-2 sm:p-4 min-h-[200px] sm:min-h-[300px] flex items-stretch">
          <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[268px]">
            <img src={PEXELS.lifeWater} alt="Life along water" className="w-full h-full object-cover object-[center_35%] absolute inset-0 slow-drift" />
            <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/60" />
            
            {/* Malayalam calligraphy watermark overlay */}
            <div className="malayalam-watermark top-6 right-6 opacity-[0.02] text-8xl">
              ജീവൻ
            </div>

            {/* Hand-Drawn Canoe Sketch overlay */}
            <svg className="absolute right-4 bottom-4 w-28 h-12 text-[#C8A46D]/15 pointer-events-none select-none" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="0.8">
              <path d="M5,25 Q50,40 95,25 Q70,42 30,42 Z" />
              <path d="M40,28 L40,15 Q43,12 45,15" />
              <path d="M55,30 L55,10 Q58,7 60,10" />
              <line x1="15" y1="27" x2="85" y2="27" />
            </svg>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-[11px] tracking-[0.15em] text-[#C8A46D]">02</span>
                <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">TIMELESS SHORES</span>
              </div>
              <h3 className="font-serif text-3xl font-light text-[#F5F0E6] leading-tight mb-3">
                Life Along<br />the Water
              </h3>
              <div className="w-8 h-px bg-[#C8A46D] mb-4" />
              <p className="font-serif text-sm font-light text-[#F5F0E6]/70 italic leading-relaxed max-w-[240px]">
                Simple lives. Timeless rhythms. Stories passed down with the wind.
              </p>
            </div>
            <button className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Explore</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
                <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* ROW 2 */}
        {/* Card 4: Floating Architecture (Wide Card) */}
        <div className="chapter-card col-span-12 lg:col-span-8 p-2 sm:p-4 min-h-[200px] sm:min-h-[320px] flex items-stretch">
          <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[288px]">
            <img src={PEXELS.architecture} alt="Floating architecture" className="w-full h-full object-cover object-[center_55%] absolute inset-0 slow-drift" />
            <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/70" />

            {/* Hand-Drawn Chinese Fishing Net SVG overlay */}
            <svg className="absolute right-6 top-6 w-36 h-36 text-[#C8A46D]/15 pointer-events-none select-none" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8">
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
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]">03</span>
                <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">RUSTIC DWELLINGS</span>
              </div>
              <h3 className="font-serif text-4xl font-light text-[#F5F0E6] leading-tight mb-4">
                Floating<br />Architecture
              </h3>
              <div className="w-8 h-px bg-[#C8A46D] mb-4" />
              <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60 max-w-[280px]">
                Homes that breathe with the water. Built by tradition, held by nature. Tiled roofs matching the mud embankments.
              </p>
            </div>
            <button className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Discover</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
                <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* Card 5: The Sky and Water (Narrower Portrait image) */}
        <div className="chapter-card col-span-12 lg:col-span-4 p-2 sm:p-4 min-h-[200px] sm:min-h-[320px] flex items-stretch">
          <div className="w-full h-full relative overflow-hidden rounded-sm canvas-frame flex-1 flex flex-col justify-between p-8 min-h-[288px]">
            <img src={PEXELS.skyWater} alt="Sky and water" className="w-full h-full object-cover object-[center_30%] absolute inset-0 slow-drift" />
            <div className="img-overlay absolute inset-0 bg-[#0F2A2A]/50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]">04</span>
                <span className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase">GLIMMERING COUPLING</span>
              </div>
              <h3 className="font-serif text-3xl font-light text-[#F5F0E6] leading-tight mb-3">
                The Sky &<br />Water
              </h3>
              <div className="w-8 h-px bg-[#C8A46D] mb-4" />
              <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60 max-w-[200px]">
                Where the sky meets its reflection and both become something beautiful.
              </p>
            </div>
            <button className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors">Explore</span>
              <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/50 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
                <ArrowRight className="w-2 h-2 text-[#C8A46D]/80 group-hover:text-[#C8A46D] transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* ROW 3 */}
        {/* Card 6: The Experience (Dark Card contrast) */}
        <div className="chapter-card col-span-6 lg:col-span-3 bg-[#143C3C] border border-[#2B4747] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[280px] relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-end opacity-[0.06] pointer-events-none select-none">
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
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#C8A46D]">05</span>
            </div>
            <h3 className="font-serif text-2xl font-light text-[#F5F0E6] leading-tight mb-3">
              The Experience
            </h3>
            <div className="w-8 h-px bg-[#C8A46D] mb-4" />
            <p className="font-sans text-[10px] leading-relaxed text-[#F5F0E6]/60 max-w-[190px]">
              This is not a place you visit. It is a feeling you carry long after you leave.
            </p>
          </div>
          <button className="relative z-10 flex items-center gap-2 group mt-4 w-fit">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#C8A46D]/60 group-hover:text-[#C8A46D] transition-colors">Journey On</span>
            <div className="chapter-arrow w-4 h-4 rounded-full border border-[#C8A46D]/40 flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
              <ArrowRight className="w-2 h-2 text-[#C8A46D]/60 group-hover:text-[#C8A46D] transition-colors" />
            </div>
          </button>
        </div>

        {/* Card 7: Gallery of Moments (Warm Cream Card) */}
        <div className="chapter-card col-span-6 lg:col-span-3 bg-[#E6DDC6] text-[#0F2A2A] p-4 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[280px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-[10px] tracking-[0.2em] text-[#8a7a5e]">06</span>
            </div>
            <h3 className="font-serif text-2xl font-light text-[#2a3d28] leading-tight mb-3">
              Gallery of Moments
            </h3>
            <div className="w-8 h-px bg-[#C8A46D] mb-4" />
            <p className="font-sans text-[10px] leading-relaxed text-[#2B4747] max-w-[180px]">
              Fragments of a life woven with water, light and quiet memories.
            </p>
          </div>
          <button className="flex items-center gap-2 group mt-4 w-fit">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors">Open Gallery</span>
            <div className="chapter-arrow w-4 h-4 rounded-full border border-[#8a7a5e] flex items-center justify-center group-hover:border-[#C8A46D] transition-colors">
              <ArrowRight className="w-2 h-2 text-[#8a7a5e] group-hover:text-[#C8A46D] transition-colors" />
            </div>
          </button>
        </div>

        {/* Card 8: Gallery Thumbnails (Cinematic grid) */}
        <div className="col-span-12 lg:col-span-6 bg-[#143C3C]/40 p-2 sm:p-4 min-h-[180px] sm:min-h-[280px] flex items-stretch">
          <div className="grid grid-cols-3 gap-2 h-full w-full flex-1">
            <div className="flex flex-col gap-2">
              <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g1} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-thumb h-[45%] overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g2} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="gallery-thumb h-[45%] overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g3} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g4} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="gallery-thumb flex-1 overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g5} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="gallery-thumb h-[40%] overflow-hidden rounded-sm canvas-frame">
                <img src={PEXELS.g6} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUOTE FOOTER ────────────────────────────────────────── */}
      <footer className="relative h-[22vh] min-h-[140px] overflow-hidden flex items-center justify-center p-4">
        {/* Cinematic Framed Image */}
        <div className="absolute inset-2 overflow-hidden rounded-sm canvas-frame">
          <img src={PEXELS.quote} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-30 slow-drift" />
          <div className="absolute inset-0 bg-[#0F2A2A]/85" />
        </div>
        <div className="relative z-10 text-center px-8">
          <p className="font-serif text-xl lg:text-3xl font-light italic text-[#F5F0E6] tracking-wide">
            "Every river eventually becomes memory."
          </p>
          <div className="divider-ornament justify-center mt-4">
            <Circle className="w-1 h-1 fill-[#C8A46D] text-[#C8A46D]" />
          </div>
        </div>
      </footer>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden">
        {/* Decorative Malayalam Background Glyph */}
        <div className="malayalam-watermark bottom-10 left-12 opacity-[0.02] text-[10rem]">
          തീരം
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#C8A46D] uppercase block mb-4">The Place</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#F5F0E6] mb-6 leading-tight">
                Kadamakudy Isn't Pretty on Purpose
              </h2>
              <div className="w-16 h-px bg-[#C8A46D] mb-6" />
              <p className="font-serif text-[16px] font-light italic text-[#F5F0E6]/80 leading-relaxed mb-5">
                It's a working landscape. You'll see poverty alongside beauty. Struggle alongside grace. This isn't packaged for comfort.
              </p>
              <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/60 mb-5">
                We refuse to hide what makes this place real. The fishermen we work with are not props in someone's narrative. They're neighbors. We stay in their homes because we respect their boundaries, their rhythms, and their right to say no.
              </p>
              <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/60">
                If you come here, you're committing to seeing — not just looking. To listening — not just hearing. To understanding that transformation isn't always comfortable.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#143C3C]/60 p-6 border border-[#2B4747]">
                <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3 font-semibold">What We Do</h4>
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/75">
                  We connect respectful travelers with local families. We don't curate experiences — we facilitate genuine presence. Money goes directly to the families who host you.
                </p>
              </div>
              <div className="bg-[#143C3C]/60 p-6 border border-[#2B4747]">
                <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3 font-semibold">What We Don't Do</h4>
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/75">
                  We don't run sunset tours. We don't perform culture. We don't pretend poverty is picturesque. We don't accept tourists who see locals as scenery.
                </p>
              </div>
              <div className="bg-[#143C3C]/60 p-6 border border-[#2B4747]">
                <h4 className="font-sans text-[11px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3 font-semibold">Requirements</h4>
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/75">
                  Humility. Curiosity. Patience with discomfort. Respect for boundaries. A willingness to question what you know about travel and yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#0F2A2A] py-24 px-8 lg:px-20 relative overflow-hidden border-t border-[#2B4747]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C8A46D]/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Context & Info */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] text-[#C8A46D] uppercase block mb-3">Questions?</span>
                <h2 className="font-serif text-5xl font-light text-[#F5F0E6] leading-tight mb-6">
                  Let's Talk
                </h2>
                <div className="w-16 h-px bg-[#C8A46D] mb-6" />
                <p className="font-sans text-[12px] leading-relaxed text-[#F5F0E6]/70 max-w-sm">
                  We are here to listen, align, and share. Whether you want to enquire about stays or simply share a reflection, we welcome your presence.
                </p>
              </div>

              {/* Minimal Contact Channels */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer animate-fade-in">
                  <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300">
                    <Mail className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase mb-0.5">Email</h4>
                    <p className="font-sans text-[11px] text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors">
                      hello@kadamakudy.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300">
                    <Phone className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase mb-0.5">Phone</h4>
                    <p className="font-sans text-[11px] text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors">
                      +91 (484) 2888-444
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full border border-[#C8A46D]/20 flex items-center justify-center group-hover:border-[#C8A46D] transition-all duration-300">
                    <MapPin className="w-4 h-4 text-[#C8A46D] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#F5F0E6]/50 uppercase mb-0.5">Location</h4>
                    <p className="font-sans text-[11px] text-[#F5F0E6] group-hover:text-[#C8A46D] transition-colors">
                      Kadamakudy, Kerala, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom 'Before You Contact' Box */}
              <div className="bg-[#143C3C]/40 border border-[#2B4747] p-6 rounded-sm space-y-4">
                <h4 className="font-serif text-lg font-light text-[#C8A46D]">Before You Contact</h4>
                <p className="font-sans text-[11px] leading-relaxed text-[#F5F0E6]/60">
                  Ensure you are aligned with our ethos. We are not a luxury resort. Expect digital silence, real working hours, and organic community host boundaries.
                </p>
                <div className="h-px bg-[#2B4747] w-full" />
                <ul className="space-y-2.5">
                  <li className="flex gap-2.5 items-start">
                    <Circle className="w-1.5 h-1.5 fill-[#C8A46D] text-[#C8A46D] mt-1.5 flex-shrink-0" />
                    <span className="font-sans text-[10px] text-[#F5F0E6]/50">Mutual screening: We interview every guest.</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <Circle className="w-1.5 h-1.5 fill-[#C8A46D] text-[#C8A46D] mt-1.5 flex-shrink-0" />
                    <span className="font-sans text-[10px] text-[#F5F0E6]/50">Average response timeline: 48 to 72 hours.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Premium Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#143C3C]/60 backdrop-blur-sm border border-[#2B4747] p-8 lg:p-10 rounded-lg relative overflow-hidden group hover:border-[#C8A46D]/30 transition-all duration-500 shadow-2xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C8A46D]/10 to-transparent pointer-events-none" />
                
                <h3 className="font-serif text-2xl font-light text-[#F5F0E6] mb-6">Send an Inquiry</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="relative">
                    <input
                      type="text"
                      id="form-name"
                      placeholder=" "
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent"
                      required
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
                      placeholder=" "
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent"
                      required
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
                      rows={5}
                      placeholder=" "
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="peer w-full bg-transparent border-b border-[#2B4747] py-2.5 text-[#F5F0E6] font-sans text-xs focus:outline-none focus:border-[#C8A46D] transition-colors placeholder-transparent resize-none"
                      required
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

                  <button className="w-full bg-[#C8A46D] hover:bg-[#B98D52] text-[#0F2A2A] py-4 px-6 font-sans text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]">
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#0F2A2A] border-t border-[#2B4747] py-16 px-8 lg:px-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full border border-[#C8A46D]/60 flex items-center justify-center">
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
            <div>
              <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Journeys</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Stories</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Gallery</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">About Us</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Sustainability</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Careers</a></li>
                <li><a href="#" className="font-sans text-[9px] text-[#F5F0E6]/60 hover:text-[#C8A46D] transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-[9px] tracking-[0.2em] text-[#C8A46D] uppercase mb-3">Connect</h4>
              <div className="flex gap-3">
                <button className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors">
                  <Instagram className="w-3 h-3 text-[#C8A46D]" />
                </button>
                <button className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors">
                  <Facebook className="w-3 h-3 text-[#C8A46D]" />
                </button>
                <button className="w-7 h-7 rounded-full border border-[#C8A46D]/30 flex items-center justify-center hover:border-[#C8A46D] transition-colors">
                  <Linkedin className="w-3 h-3 text-[#C8A46D]" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2B4747] pt-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <p className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 uppercase">
                © 2026 Kadamakudy. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 hover:text-[#C8A46D] transition-colors uppercase">
                  Privacy
                </a>
                <a href="#" className="font-sans text-[8px] tracking-[0.1em] text-[#F5F0E6]/40 hover:text-[#C8A46D] transition-colors uppercase">
                  Terms
                </a>
                <a href="#" className="font-sans text-[8px] tracking-[0.1em] text-[#e8e0d4]/40 hover:text-[#c4a96d] transition-colors uppercase">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
