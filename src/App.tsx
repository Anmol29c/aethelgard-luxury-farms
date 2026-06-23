import { useState, useEffect, useRef, useCallback, FormEvent, ChangeEvent } from 'react';
import {
  Menu,
  X,
  Leaf,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  ChevronDown,
  Check,
  AlertCircle,
  Send,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Heart,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react';

// Luxury stock images from Pexels
const heroImage = 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=1920';
const botanicalImage1 = 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800';
const botanicalImage2 = 'https://images.pexels.com/photos/1407170/pexels-photo-1407170.jpeg?auto=compress&cs=tinysrgb&w=800';
const greenhouseImage = 'https://images.pexels.com/photos/2198028/pexels-photo-2198028.jpeg?auto=compress&cs=tinysrgb&w=1200';
const fieldImage = 'https://images.pexels.com/photos/2165755/pexels-photo-2165755.jpeg?auto=compress&cs=tinysrgb&w=1920';

// Interface definitions
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

interface ClimateData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  soilMoisture: number;
  pH: number;
  lightIntensity: number;
  lastUpdated: string;
}

interface Herb {
  id: string;
  name: string;
  latinName: string;
  image: string;
  shortDescription: string;
  benefits: string[];
  cultivationNotes: string;
  harvestSeason: string;
}

// Herb data for the Sommelier Guide
const herbs: Herb[] = [
  {
    id: 'lavender',
    name: 'Provence Lavender',
    latinName: 'Lavandula angustifolia',
    image: 'https://images.pexels.com/photos/1421905/pexels-photo-1421905.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Our signature lavender, cultivated at 1,200m elevation for unparalleled aromatic intensity.',
    benefits: [
      'Promotes deep relaxation and restful sleep',
      'Natural stress and anxiety relief',
      'Soothes skin irritation and inflammation',
      'Antimicrobial and healing properties',
    ],
    cultivationNotes: 'Hand-harvested at peak bloom, dried in traditional stone barns, and distilled within 24 hours using our copper alembic.',
    harvestSeason: 'Late June - Early July',
  },
  {
    id: 'chamomile',
    name: 'German Chamomile',
    latinName: 'Matricaria chamomilla',
    image: 'https://images.pexels.com/photos/1248555/pexels-photo-1248555.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Gentle yet potent chamomile grown in our protected valley microclimate.',
    benefits: [
      'Calms digestive discomfort',
      'Supports healthy sleep patterns',
      'Natural anti-inflammatory',
      'Gentle immune system support',
    ],
    cultivationNotes: 'Seeded in early spring, flowers are hand-picked at full bloom and shade-dried to preserve volatile oils.',
    harvestSeason: 'May - August',
  },
  {
    id: 'rosemary',
    name: 'Tuscan Rosemary',
    latinName: 'Salvia rosmarinus',
    image: 'https://images.pexels.com/photos/1172576/pexels-photo-1172576.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'Robust rosemary from our terraced hillside gardens, aged for 3+ years before first harvest.',
    benefits: [
      'Enhances memory and cognitive function',
      'Stimulates hair growth',
      'Natural preservative properties',
      'Supports healthy circulation',
    ],
    cultivationNotes: 'Our rosemary is never harvested before the plant reaches maturity at 3 years, ensuring optimal essential oil concentration.',
    harvestSeason: 'Year-round (peak: Summer)',
  },
  {
    id: 'mint',
    name: 'Spearmint Noir',
    latinName: 'Mentha spicata',
    image: 'https://images.pexels.com/photos/1407170/pexels-photo-1407170.jpeg?auto=compress&cs=tinysrgb&w=600',
    shortDescription: 'A proprietary cultivar developed exclusively for Aethelgard with notes of chocolate and pine.',
    benefits: [
      'Aids digestion and soothes stomach',
      'Natural breath freshener',
      'Cooling and invigorating',
      'Rich in antioxidants',
    ],
    cultivationNotes: 'Grown in dedicated irrigation zones with mineral-rich spring water, harvested in early morning for maximum oil content.',
    harvestSeason: 'Spring - Early Autumn',
  },
];

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'Our Story' },
    { href: '#sommelier', label: 'Herb Guide' },
    { href: '#conditions', label: 'Growing' },
    { href: '#membership', label: 'Membership' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <Leaf className="w-8 h-8 text-gold-600 transition-transform duration-300 group-hover:rotate-12" />
            <div className="flex flex-col">
              <span className="font-serif text-xl text-forest-900 tracking-tight">
                Aethelgard
              </span>
              <span className="text-[10px] uppercase tracking-ultra-wide text-forest-600 -mt-1">
                Botanical Farms
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#membership" className="btn-primary text-xs py-3 px-6">
              Join the Guild
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-forest-800 hover:text-gold-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream-50/98 backdrop-blur-lg shadow-xl transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center py-8 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-light text-forest-800 hover:text-gold-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#membership" className="btn-primary mt-4 text-sm">
            Join the Guild
          </a>
        </div>
      </div>
    </nav>
  );
}

// Hero Section with Parallax
function HeroSection() {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setOffset(window.scrollY * 0.3);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-forest-900/60 to-cream-50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.2s' }}>
          <span className="inline-block px-6 py-2 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-ultra-wide backdrop-blur-sm">
            Est. 1892 in the Alpine Foothills
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Cultivating
          <span className="block mt-2 italic text-gold-400">Nature's Finest</span>
        </h1>

        <p className="text-cream-200/80 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.6s' }}>
          For over a century, we have tenderly cultivated the world's most
          exquisite botanicals, honoring traditions while embracing
          sustainable innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <a href="#about" className="btn-primary group">
            Discover Our Craft
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#sommelier" className="btn-secondary">
            Explore Botanicals
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-slow">
        <ChevronDown className="w-6 h-6 text-cream-50/60" />
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 bg-cream-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-gold-600 text-sm uppercase tracking-ultra-wide">
              Our Heritage
            </span>
            <h2 className="section-title mt-4">
              Rooted in Excellence,<br />
              <span className="italic text-gold-600">Growing with Purpose</span>
            </h2>
            <div className="divider-gold justify-start mt-8" />
            <p className="text-forest-700 font-light leading-relaxed mt-8">
              Founded in 1892 by botanist Eleanor Aethelgard, our farm has been
              a sanctuary for rare and potent botanicals for four generations.
              Today, we continue her legacy of uncompromising quality and
              sustainable cultivation.
            </p>
            <p className="text-forest-700 font-light leading-relaxed mt-6">
              Each of our 47 botanical varieties is cultivated using
              time-honored techniques enhanced by cutting-edge organic
              practices. Our soils have never known synthetic chemicals,
              and our water flows pure from ancient Alpine springs.
            </p>

            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { number: '130+', label: 'Years of Heritage' },
                { number: '47', label: 'Botanical Varieties' },
                { number: '100%', label: 'Organic Certified' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-4xl text-forest-900">{stat.number}</div>
                  <div className="text-xs uppercase tracking-wider text-forest-600 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={greenhouseImage}
                alt="Aethelgard Botanical Farms greenhouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 overflow-hidden shadow-2xl">
              <img
                src={botanicalImage1}
                alt="Botanical detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm p-6 shadow-xl">
              <Award className="w-8 h-8 text-gold-600 mb-2" />
              <div className="text-forest-900 font-serif text-lg">Premium Grade</div>
              <div className="text-forest-600 text-xs uppercase tracking-wider">
                Certified Organic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Herb Sommelier Guide Section
function HerbSommelierSection() {
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [hoveredHerb, setHoveredHerb] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sommelier" className="py-32 bg-forest-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fieldImage})` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-gold-400 text-sm uppercase tracking-ultra-wide">
            Botanical Expertise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-50 tracking-tight mt-4">
            Herb Sommelier Guide
          </h2>
          <p className="text-cream-200/70 font-light max-w-2xl mx-auto mt-6">
            Explore our curated selection of premium botanicals. Click each herb
            to discover its unique properties and cultivation story.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {herbs.map((herb, index) => (
            <div
              key={herb.id}
              className={`group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onMouseEnter={() => setHoveredHerb(herb.id)}
              onMouseLeave={() => setHoveredHerb(null)}
              onClick={() => setSelectedHerb(selectedHerb?.id === herb.id ? null : herb)}
            >
              <div
                className={`relative overflow-hidden aspect-[3/4] transition-all duration-500 ${
                  selectedHerb?.id === herb.id
                    ? 'ring-2 ring-gold-500 shadow-2xl scale-105'
                    : hoveredHerb === herb.id
                    ? 'shadow-xl scale-102'
                    : ''
                }`}
              >
                <img
                  src={herb.image}
                  alt={herb.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    selectedHerb?.id === herb.id
                      ? 'bg-forest-900/60'
                      : hoveredHerb === herb.id
                      ? 'bg-forest-900/40'
                      : 'bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent'
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-cream-50 font-serif text-xl mb-1">
                    {herb.name}
                  </div>
                  <div className="text-cream-200/70 text-sm italic">
                    {herb.latinName}
                  </div>
                  {selectedHerb?.id === herb.id && (
                    <div className="mt-4 flex items-center gap-2 text-gold-400 text-xs uppercase tracking-wider">
                      <Check className="w-4 h-4" /> Selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`transition-all duration-700 overflow-hidden ${
            selectedHerb ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {selectedHerb && (
            <div className="bg-cream-50 p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-gold-600 text-sm uppercase tracking-ultra-wide">
                      Detailed Profile
                    </span>
                    <div className="h-px flex-1 bg-cream-300" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest-900 mb-2">
                    {selectedHerb.name}
                  </h3>
                  <div className="text-forest-600 italic mb-6">
                    {selectedHerb.latinName}
                  </div>
                  <p className="text-forest-700 font-light leading-relaxed mb-8">
                    {selectedHerb.shortDescription}
                  </p>
                  <p className="text-forest-600 font-light leading-relaxed">
                    {selectedHerb.cultivationNotes}
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-forest-500 mb-4">
                      Therapeutic Benefits
                    </div>
                    <div className="space-y-3">
                      {selectedHerb.benefits.map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-forest-700"
                        >
                          <Sparkles className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
                          <span className="font-light">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-forest-600">
                    <Clock className="w-5 h-5" />
                    <span className="font-light">
                      Harvest Season: <strong className="font-medium">{selectedHerb.harvestSeason}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedHerb(null)}
                    className="text-sm text-forest-600 hover:text-gold-600 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" /> Close Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Live Growing Conditions Section
function GrowingConditionsSection() {
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchClimateData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const now = new Date();
      const hour = now.getHours();
      const baseTemp = 22 + Math.sin((hour / 24) * Math.PI * 2) * 8;

      const simulatedData: ClimateData = {
        temperature: Math.round(baseTemp + (Math.random() - 0.5) * 2),
        humidity: Math.round(65 + Math.sin((hour / 24) * Math.PI) * 15 + (Math.random() - 0.5) * 5),
        windSpeed: Math.round(5 + Math.random() * 10),
        soilMoisture: Math.round(42 + Math.random() * 8),
        pH: Math.round((6.2 + Math.random() * 0.3) * 100) / 100,
        lightIntensity: Math.round(
          hour >= 6 && hour <= 18
            ? Math.sin(((hour - 6) / 12) * Math.PI) * 80000 + 20000
            : 500 + Math.random() * 1000
        ),
        lastUpdated: now.toLocaleTimeString(),
      };

      setClimateData(simulatedData);
    } catch {
      setError('Unable to fetch microclimate data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClimateData();
    const interval = setInterval(fetchClimateData, 30000);
    return () => clearInterval(interval);
  }, [fetchClimateData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const metrics = climateData
    ? [
        {
          icon: Thermometer,
          label: 'Temperature',
          value: `${climateData.temperature}°C`,
          status: climateData.temperature >= 18 && climateData.temperature <= 28 ? 'optimal' : 'moderate',
        },
        {
          icon: Droplets,
          label: 'Humidity',
          value: `${climateData.humidity}%`,
          status: climateData.humidity >= 55 && climateData.humidity <= 75 ? 'optimal' : 'moderate',
        },
        {
          icon: Wind,
          label: 'Wind Speed',
          value: `${climateData.windSpeed} km/h`,
          status: 'optimal',
        },
        {
          icon: Leaf,
          label: 'Soil Moisture',
          value: `${climateData.soilMoisture}%`,
          status: climateData.soilMoisture >= 40 && climateData.soilMoisture <= 60 ? 'optimal' : 'moderate',
        },
        {
          icon: Sparkles,
          label: 'Soil pH',
          value: climateData.pH.toFixed(2),
          status: climateData.pH >= 6.0 && climateData.pH <= 6.5 ? 'optimal' : 'moderate',
        },
        {
          icon: Sun,
          label: 'Light Intensity',
          value: `${Math.round(climateData.lightIntensity / 1000)}k lux`,
          status: 'optimal',
        },
      ]
    : [];

  return (
    <section
      ref={sectionRef}
      id="conditions"
      className="py-32 bg-cream-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className={`grid lg:grid-cols-2 gap-16 items-center`}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-gold-600 text-sm uppercase tracking-ultra-wide">
              Real-Time Monitoring
            </span>
            <h2 className="section-title mt-4">
              Live Growing<br />
              <span className="italic text-gold-600">Conditions</span>
            </h2>
            <div className="divider-gold justify-start mt-8" />
            <p className="text-forest-700 font-light leading-relaxed mt-8">
              Our proprietary sensor network monitors 1,200+ data points across
              the farm, ensuring optimal growing conditions for each botanical
              variety. Data refreshes every 30 seconds.
            </p>
            <p className="text-forest-600 font-light leading-relaxed mt-6">
              This microclimate intelligence allows us to adjust irrigation,
              shade, and harvesting schedules in real-time, resulting in
              botanicals with superior potency profiles.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-forest-500 animate-pulse" />
                <span className="text-sm text-forest-600">Optimal Range</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold-400" />
                <span className="text-sm text-forest-600">Moderate</span>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="card-luxury p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold-600" />
                  <span className="text-forest-900 font-serif text-lg">
                    Zone Alpha - Main Gardens
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
                  <span className="text-xs text-forest-500 uppercase tracking-wider">
                    Live
                  </span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-12 h-12 border-2 border-forest-200 border-t-gold-500 rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 text-red-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-cream-100/50 p-5 transition-all duration-300 hover:bg-cream-200/50"
                    >
                      <metric.icon className="w-5 h-5 text-forest-600 mb-3" />
                      <div className="text-xs uppercase tracking-wider text-forest-500 mb-1">
                        {metric.label}
                      </div>
                      <div className="font-serif text-2xl text-forest-900 mb-2">
                        {metric.value}
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          metric.status === 'optimal'
                            ? 'bg-forest-500'
                            : 'bg-gold-400'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {climateData && (
                <div className="mt-8 pt-6 border-t border-cream-200 flex items-center justify-between">
                  <span className="text-xs text-forest-500">
                    Last Updated: {climateData.lastUpdated}
                  </span>
                  <button
                    onClick={fetchClimateData}
                    disabled={isLoading}
                    className="text-xs text-gold-600 hover:text-gold-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <Wind className="w-3 h-3" /> Refresh
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Membership Form Section
function MembershipFormSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true;
    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your full name';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s\-']+$/.test(value)) return 'Please enter a valid name';
        break;
      case 'email':
        if (!value.trim()) return 'Please enter your email address';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number';
        break;
      case 'interest':
        if (!value) return 'Please select your area of interest';
        break;
      case 'message':
        if (!value.trim()) return 'Please share why you wish to join';
        if (value.trim().length < 20) return 'Please write at least 20 characters';
        break;
    }
    return undefined;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      interest: true,
      message: true,
    });

    if (hasErrors) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
      });
      setTouched({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    { value: '', label: 'Select your area of interest' },
    { value: 'wholesale', label: 'Wholesale Partnership' },
    { value: 'retail', label: 'Retail Membership' },
    { value: 'consulting', label: 'Botanical Consulting' },
    { value: 'events', label: 'Farm Events & Workshops' },
    { value: 'other', label: 'Other Inquiries' },
  ];

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="py-32 bg-forest-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${botanicalImage2})` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div className={`grid lg:grid-cols-2 gap-16 items-center`}>
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-gold-400 text-sm uppercase tracking-ultra-wide">
              Exclusive Access
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-50 tracking-tight mt-4">
              Join the<br />
              <span className="italic text-gold-400">Aethelgard Guild</span>
            </h2>
            <p className="text-cream-200/70 font-light max-w-lg mt-8 leading-relaxed">
              As a Guild member, you gain privileged access to our rarest
              botanicals, seasonal harvests, and exclusive farm experiences.
              Membership is by application only.
            </p>

            <div className="mt-12 space-y-6">
              {[
                {
                  icon: Sparkles,
                  title: 'Priority Harvest Access',
                  desc: 'First access to limited seasonal releases',
                },
                {
                  icon: Heart,
                  title: 'Exclusive Events',
                  desc: 'Private tours, workshops, and tastings',
                },
                {
                  icon: Award,
                  title: 'Curated Collections',
                  desc: 'Member-only botanical bundles',
                },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <div className="text-cream-50 font-medium">{benefit.title}</div>
                    <div className="text-cream-200/60 font-light text-sm mt-1">
                      {benefit.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <form onSubmit={handleSubmit} className="bg-cream-50 p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-forest-900 mb-8">
                Membership Application
              </h3>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-forest-600" />
                  </div>
                  <h4 className="font-serif text-xl text-forest-900 mb-2">
                    Application Received
                  </h4>
                  <p className="text-forest-600 font-light">
                    Thank you for your interest in the Aethelgard Guild. We will
                    review your application and respond within 3-5 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-8 text-sm text-forest-600 hover:text-gold-600 transition-colors"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-forest-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-luxury"
                      placeholder="Enter your full name"
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="error-message">
                        <AlertCircle className="w-4 h-4" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-luxury"
                      placeholder="your@email.com"
                    />
                    {touched.email && errors.email && (
                      <p className="error-message">
                        <AlertCircle className="w-4 h-4" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-forest-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-luxury"
                      placeholder="+1 (555) 000-0000"
                    />
                    {touched.phone && errors.phone && (
                      <p className="error-message">
                        <AlertCircle className="w-4 h-4" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-forest-700 mb-2">
                      Area of Interest *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-luxury appearance-none cursor-pointer"
                    >
                      {interestOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {touched.interest && errors.interest && (
                      <p className="error-message">
                        <AlertCircle className="w-4 h-4" /> {errors.interest}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-forest-700 mb-2">
                      Why do you wish to join? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="input-luxury resize-none"
                      placeholder="Tell us about your interest in botanicals..."
                    />
                    {touched.message && errors.message && (
                      <p className="error-message">
                        <AlertCircle className="w-4 h-4" /> {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-forest-500 mt-2">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-5 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Application
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>

                  {submitStatus === 'error' && Object.keys(errors).length === 0 && (
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      Please correct the errors above
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer id="contact" className="bg-forest-950 border-t border-forest-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-gold-500" />
              <div>
                <div className="font-serif text-xl text-cream-50">Aethelgard</div>
                <div className="text-[10px] uppercase tracking-ultra-wide text-cream-200/60">
                  Botanical Farms
                </div>
              </div>
            </div>
            <p className="text-cream-200/60 font-light leading-relaxed max-w-md">
              Cultivating nature's finest botanicals since 1892. Our commitment
              to sustainable agriculture and uncompromising quality has made us
              the trusted source for premium organic botanicals worldwide.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-forest-800 flex items-center justify-center text-cream-200/60 hover:text-gold-400 hover:border-gold-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-gold-500 mb-6">
              Quick Links
            </div>
            <div className="space-y-3">
              {['Our Story', 'Botanical Guide', 'Growing Conditions', 'Membership', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-cream-200/60 hover:text-cream-50 font-light transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-gold-500 mb-6">
              Contact Us
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-1 flex-shrink-0" />
                <span className="text-cream-200/60 font-light text-sm">
                  127 Alpine Valley Road<br />
                  Aethelgard Valley, AV 18927
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-cream-200/60 font-light text-sm">
                  +1 (888) 289-1892
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="text-cream-200/60 font-light text-sm">
                  guild@aethelgard.farm
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-forest-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-cream-200/40 text-sm font-light">
            © 2024 Aethelgard Botanical Farms. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-cream-200/40 text-sm font-light">
            <a href="#" className="hover:text-cream-200 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream-200 transition-colors">Terms</a>
            <a href="#" className="hover:text-cream-200 transition-colors">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <HerbSommelierSection />
        <GrowingConditionsSection />
        <MembershipFormSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
