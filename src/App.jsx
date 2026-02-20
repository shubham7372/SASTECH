import { useState, useEffect, useRef } from 'react'
import './App.css'
import logo from './assets/logo.jpg'
import { Phone, Globe, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, X, Menu } from 'lucide-react'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    enquiry: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setSubmitStatus(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // YOU MUST REPLACE THIS ACCESS KEY WITH YOUR OWN FROM https://web3forms.com/
    const ACCESS_KEY = "fe8954f1-a71e-4986-975f-dda742e6368b"

    const data = {
      ...formData,
      access_key: ACCESS_KEY,
      subject: `New Enquiry from ${formData.name}`,
      from_name: "SAS TECH Website",
      message: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\n\nEnquiry:\n${formData.enquiry}`
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+91',
          enquiry: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const services = [
    { title: "🌐 Website Development", desc: "Crafting modern, responsive static and dynamic websites tailored to your business goals." },
    { title: "🧩 PHP Development", desc: "Scalable and secure server-side applications using robust PHP frameworks." },
    { title: "⚛️ MERN Stack", desc: "Full-stack development with MongoDB, Express, React, and Node.js for high-performance apps." },
    { title: "🐍 Python Development", desc: "Leveraging Python for automation, web backends, and data-driven solutions." },
    { title: "💻 C & C++ Apps", desc: "High-performance desktop applications and system software with optimized code." },
    { title: "🧱 .NET Development", desc: "Enterprise-grade solutions building reliable and scalable applications on the .NET framework." }
  ]

  const workflow = [
    { name: "Consultation", desc: "Understanding your vision and business requirements." },
    { name: "Design", desc: "Creating modern UI/UX focused on user engagement." },
    { name: "Development", desc: "Robust coding following industry best practices." },
    { name: "Testing", desc: "Rigorous quality assurance for bug-free performance." },
    { name: "Deployment", desc: "Launching your product with long-term maintenance." }
  ]

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="splash-content">
          <img src={logo} alt="SAS TECH" className="splash-logo" />
          <h1 className="splash-text">
            <span>Welcome to</span>
            <span className="brand-name">SASTECH</span>
          </h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`app-container ${!showSplash ? 'fade-in' : ''}`}>
      <nav className="navbar glass">
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="SAS TECH" style={{ height: '40px', borderRadius: '5px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>SAS TECH</span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact-info">Contact</a>
        </div>
        <button className="get-started-btn desktop-only" onClick={toggleModal}>ENQUIRE NOW</button>
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#contact-info" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="mobile-enquire-btn" onClick={() => { setMenuOpen(false); toggleModal(); }}>ENQUIRE NOW</button>
        </div>
      </div>

      <section id="home" className="hero-section" ref={heroRef} onMouseMove={handleMouseMove}>
        <div className="grid-bg"></div>
        <div className="glow-orb"></div>

        {/* 3D Rotating Neon Frames */}
        <div className="neon-frame frame-1" style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }}></div>
        <div className="neon-frame frame-2" style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}></div>
        <div className="neon-frame frame-3" style={{ transform: `translate(${mousePos.x * -5}px, ${mousePos.y * 5}px)` }}></div>

        <div className="hero-content">
          <h1 className="hero-title">
            SAS <span>TECH</span>
          </h1>
          <p className="hero-subtitle">
            A full-service software and web development company specializing in
            end-to-end digital solutions.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">Our Portfolio</button>
            <button className="btn-secondary" onClick={toggleModal}>Learn More</button>
          </div>
        </div>

        {/* Floating Glass Tech Tags with Parallax */}
        <div className="float-box fb-a" style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)` }}>API</div>
        <div className="float-box fb-b" style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * 20}px)` }}>CLOUD</div>
        <div className="float-box fb-c" style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * -18}px)` }}>SECURE</div>
        <div className="float-box fb-d" style={{ transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -10}px)` }}>DEPLOY</div>
        <div className="float-box fb-e" style={{ transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 8}px)` }}>SCALE</div>
      </section>

      <section id="services">
        <h2 className="section-title">Our <span style={{ color: 'var(--primary)' }}>Services</span></h2>
        <p className="section-subtitle">Comprehensive solutions for your digital growth.</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-num">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="process">
        <h2 className="section-title" style={{ marginBottom: '50px' }}>How We <span style={{ color: 'var(--primary)' }}>Work</span></h2>
        <div className="process-steps">
          {workflow.map((step, index) => (
            <div key={index} className="step">
              <span className="step-num">0{index + 1}</span>
              <h3 style={{ marginBottom: '10px' }}>{step.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}><X size={24} /></button>
            <section id="contact" className="contact-form-section">
              <h2 className="section-title">Get in <span style={{ color: 'var(--primary)' }}>Touch</span></h2>
              <p className="section-subtitle" style={{ fontSize: '0.9rem' }}>Have a project in mind? Let's discuss how we can help you.</p>

              <form className="contact-form" onSubmit={handleSubmit}>
                {submitStatus === 'success' && (
                  <div style={{ padding: '15px', background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #4ade80' }}>
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div style={{ padding: '15px', background: 'rgba(248, 113, 113, 0.2)', color: '#f87171', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', border: '1px solid #f87171' }}>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <div className="phone-input">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                    >
                      <option value="+91">India (+91)</option>
                      <option value="+92">Pakistan (+92)</option>
                      <option value="+880">Bangladesh (+880)</option>
                      <option value="+94">Sri Lanka (+94)</option>
                      <option value="+977">Nepal (+977)</option>
                      <option value="+975">Bhutan (+975)</option>
                      <option value="+960">Maldives (+960)</option>
                      <option value="+93">Afghanistan (+93)</option>
                      <option value="+95">Myanmar (+95)</option>
                      <option value="+66">Thailand (+66)</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Enquiry</label>
                  <textarea
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="submit-btn"
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}

      <footer id="contact-info" className="footer">
        <div className="footer-dark-shape" />
        <div className="footer-content">
          <div className="footer-left">
            <h2>SAS TECH</h2>
            <p className="subtitle">Software & Web Solutions</p>
            <div className="contact-info">
              <a href="tel:+917372849408" className="contact-item">
                <div className="contact-icon"><Phone size={18} /></div>
                <span>+91 7372849408</span>
              </a>
              <a href="https://www.sastech.in" target="_blank" rel="noopener noreferrer" className="contact-item mt-contact">
                <div className="contact-icon"><Globe size={18} /></div>
                <span>www.sastech.in</span>
              </a>
              <a href="mailto:shubhamwork800@gmail.com" className="contact-item mt-contact">
                <div className="contact-icon"><Mail size={18} /></div>
                <span>shubhamwork800@gmail.com</span>
              </a>
              <div className="contact-item mt-contact">
                <div className="contact-icon"><MapPin size={18} /></div>
                <span>Innovation Hub, Tech Park, India</span>
              </div>
            </div>
          </div>

          <div className="footer-center">
            <div className="social-icons">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Linkedin size={20} /></a>
            </div>
            <div className="brand-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={logo} alt="SAS TECH" style={{ height: '40px', borderRadius: '5px' }} />
                <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--bg-deep)' }}>SAS TECH</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(5, 8, 5, 0.7)', fontWeight: 600 }}>DELIVERING EXCELLENCE</p>
            </div>
          </div>

          <div className="footer-right">
            <div className="profile-circle">
              <img src={logo} alt="SAS TECH Logo" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
