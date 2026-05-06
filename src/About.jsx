import { useEffect } from 'react'
import aboutImg from './assets/about.png'

function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const expertiseAreas = [
        { icon: '🌐', title: 'Custom Web & Application Development' },
        { icon: '☁️', title: 'Cloud Architecture & DevOps Automation' },
        { icon: '🚀', title: 'Product Engineering & MVP Development' },
        { icon: '🏢', title: 'Enterprise Software Solutions' },
        { icon: '⚙️', title: 'Scalable Backend Systems' },
        { icon: '🔗', title: 'API Development & System Integrations' },
    ]

    const approach = [
        {
            step: '01',
            emoji: '1️⃣',
            title: 'Product Strategy',
            desc: 'We analyze business goals, market demands, and user behavior to design technology roadmaps that ensure sustainable success.',
        },
        {
            step: '02',
            emoji: '2️⃣',
            title: 'User-Centric Design',
            desc: 'Our UI/UX design process focuses on intuitive, high-conversion digital experiences that enhance engagement and retention.',
        },
        {
            step: '03',
            emoji: '3️⃣',
            title: 'Scalable Engineering',
            desc: 'From cloud-native applications to automation-first infrastructure, we build reliable, secure, and performance-optimized systems.',
        },
    ]

    const whyChoose = [
        'Experienced Product Engineers',
        'Scalable Cloud Infrastructure Expertise',
        'Automation-Driven Development Process',
        'Agile & Transparent Execution',
        'Cost-Effective Digital Solutions',
        'Long-Term Technology Partnerships',
    ]

    return (
        <div className="about-page">
            {/* Hero Banner */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <div className="about-grid-bg"></div>
                    <div className="about-glow-orb about-glow-1"></div>
                    <div className="about-glow-orb about-glow-2"></div>
                </div>
                <div className="about-hero-split">
                    <div className="about-hero-content">
                        <p className="about-tagline">About SasTech</p>
                        <h1 className="about-hero-title">
                            Engineering Trust.<br />
                            <span>Building Digital Advantage.</span>
                        </h1>
                        <p className="about-hero-subtitle">
                            A leading software development and product engineering studio in India, delivering scalable digital solutions for ambitious startups, enterprises, and global brands.
                        </p>
                    </div>
                    <div className="about-hero-image">
                        <div className="about-image-glow"></div>
                        <img src={aboutImg} alt="About SasTech" />
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="about-section">
                <div className="about-container">
                    <h2 className="about-section-title">
                        Who We <span>Are</span>
                    </h2>
                    <div className="about-text-block">
                        <p>
                            SasTech is a modern digital transformation company blending product strategy, UI/UX design, and full-stack engineering to create future-ready digital products.
                        </p>
                        <p>
                            We are a founder-led technology company specializing in cloud solutions, automation services, web development, and custom software engineering. Our mission is simple — to help businesses build secure, scalable, and high-performance technology ecosystems that drive long-term growth.
                        </p>
                    </div>

                    <div className="about-expertise-grid">
                        {expertiseAreas.map((area, index) => (
                            <div key={index} className="about-expertise-card">
                                <span className="about-expertise-icon">{area.icon}</span>
                                <span className="about-expertise-title">{area.title}</span>
                            </div>
                        ))}
                    </div>
                    <p className="about-highlight-text">
                        We help brands across India and international markets turn ideas into powerful digital platforms.
                    </p>
                </div>
            </section>

            {/* Our Approach */}
            <section className="about-section about-approach-section">
                <div className="about-container">
                    <h2 className="about-section-title">
                        Our Approach: <span>Strategy + Design + Engineering</span>
                    </h2>
                    <div className="about-approach-grid">
                        {approach.map((item, index) => (
                            <div key={index} className="about-approach-card">
                                <div className="about-approach-step">{item.step}</div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="about-section">
                <div className="about-container">
                    <h2 className="about-section-title">
                        Why Choose <span>SasTech?</span>
                    </h2>
                    <div className="about-why-grid">
                        {whyChoose.map((reason, index) => (
                            <div key={index} className="about-why-card">
                                <span className="about-check">✔</span>
                                <span>{reason}</span>
                            </div>
                        ))}
                    </div>
                    <p className="about-highlight-text" style={{ marginTop: '40px' }}>
                        We don't just deliver projects — we build digital assets that create competitive advantage.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="about-section about-vision-section">
                <div className="about-container">
                    <div className="about-vm-grid">
                        <div className="about-vm-card">
                            <div className="about-vm-icon">🔭</div>
                            <h3>Our Vision</h3>
                            <p>
                                To become a trusted global technology partner known for innovation, engineering excellence, and digital scalability.
                            </p>
                        </div>
                        <div className="about-vm-card">
                            <div className="about-vm-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>
                                To empower businesses with cutting-edge software, cloud infrastructure, and automation systems that accelerate digital growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-section about-cta-section">
                <div className="about-container" style={{ textAlign: 'center' }}>
                    <h2 className="about-section-title">
                        Let's Build the <span>Future Together</span>
                    </h2>
                    <p className="about-cta-text">
                        Whether you're launching a startup, modernizing enterprise systems, or scaling digital operations — SasTech delivers strategic, secure, and scalable technology solutions tailored to your business.
                    </p>
                    <a href="/contact" className="about-cta-btn">
                        📩 Contact Us Today
                    </a>
                </div>
            </section>
        </div>
    )
}

export default About
