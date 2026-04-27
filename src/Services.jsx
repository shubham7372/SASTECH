import servicesHeroImg from './assets/services-hero.png'
import { Monitor, Smartphone, Layout, Code2, Headphones, Server } from 'lucide-react'

const servicesList = [
    {
        icon: <Monitor size={36} />,
        title: "E-commerce Development",
        desc: "Building robust, scalable online stores with secure payment gateways, inventory management, and seamless shopping experiences."
    },
    {
        icon: <Smartphone size={36} />,
        title: "Website & App Development",
        desc: "Creating modern, responsive websites and mobile applications tailored to your brand with cutting-edge technology."
    },
    {
        icon: <Layout size={36} />,
        title: "Custom Website Development",
        desc: "Designing and developing bespoke websites that reflect your brand identity and deliver outstanding user experiences."
    },
    {
        icon: <Code2 size={36} />,
        title: "Custom Software Development",
        desc: "Engineering tailor-made software solutions that streamline your operations and drive business efficiency."
    },
    {
        icon: <Headphones size={36} />,
        title: "24/7 Technical Support",
        desc: "Round-the-clock dedicated support ensuring your systems run smoothly with quick issue resolution."
    },
    {
        icon: <Server size={36} />,
        title: "Backend Development",
        desc: "Building powerful, secure, and scalable server-side architectures using the latest frameworks and APIs."
    }
]

function Services() {
    return (
        <section className="services-page">
            {/* Hero: Left content + Right image */}
            <div className="services-hero-split">
                <div className="services-hero-left">
                    <span className="services-badge">What We Offer</span>
                    <h1 className="services-hero-title">
                        My <span>Services</span>
                    </h1>
                    <p className="services-hero-desc">
                        Modern web, app, and backend solutions—plus project upgrades and ongoing support for business growth.
                    </p>
                    <div className="services-hero-stats">
                        <div className="stat-item">
                            <span className="stat-num">50+</span>
                            <span className="stat-label">Projects Delivered</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">30+</span>
                            <span className="stat-label">Happy Clients</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">6+</span>
                            <span className="stat-label">Core Services</span>
                        </div>
                    </div>
                </div>
                <div className="services-hero-right">
                    <div className="services-img-glow"></div>
                    <img src={servicesHeroImg} alt="Our Services" className="services-hero-img" />
                </div>
            </div>

            {/* Services Grid */}
            <div className="services-grid-section">
                <h2 className="section-title">Our <span style={{ color: 'var(--primary)' }}>Services</span></h2>
                <p className="section-subtitle">Comprehensive solutions for your digital growth.</p>
                <div className="services-grid">
                    {servicesList.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-num">0{index + 1}</div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
