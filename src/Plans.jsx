import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Sparkles, LayoutList, Plug, Globe, CloudCog } from 'lucide-react'

const plans = [
    {
        name: 'Basic',
        price: '24,999',
        period: '/project',
        description: 'Perfect for small businesses looking to establish their online presence.',
        features: [
            '1-Page Website',
            'Basic UI Design',
            'Mobile Responsive',
            'Contact Form Integration',
            '1 Revision Round',
            '7-Day Delivery',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Professional',
        price: '49,999',
        period: '/project',
        description: 'Ideal for growing businesses that need a feature-rich, polished web presence.',
        features: [
            'Up to 5 Pages',
            'Custom UI/UX Design',
            'SEO Optimized',
            'CMS Integration',
            'Social Media Integration',
            '3 Revision Rounds',
            '14-Day Delivery',
            'Free Domain + Hosting Setup',
        ],
        cta: 'Choose Professional',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '1,00,000',
        period: '/project',
        description: 'For businesses that demand a full-stack, custom-built digital solution.',
        features: [
            'Unlimited Pages',
            'Full-Stack Custom App',
            'API & Database Integration',
            'Admin Dashboard',
            'Payment Gateway Setup',
            'Priority Support',
            'Unlimited Revisions',
            '30-Day Delivery',
            '3 Months Free Maintenance',
        ],
        cta: 'Contact Us',
        popular: false,
    },
]

const factors = [
    {
        icon: <LayoutList size={28} />,
        title: 'Scope & Features',
        desc: 'Screens, modules, user roles, workflows, automation depth.',
    },
    {
        icon: <Plug size={28} />,
        title: 'Integrations',
        desc: 'Payment gateways, CRMs, ERPs, third-party APIs, legacy systems.',
    },
    {
        icon: <Globe size={28} />,
        title: 'Design & Content',
        desc: 'Custom UI/UX, copywriting, localization, asset production.',
    },
    {
        icon: <CloudCog size={28} />,
        title: 'Hosting & Support',
        desc: 'Cloud requirements, compliance, monitoring, SLA expectations.',
    },
]

function Plans({ onEnquire }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="plans-page">
            {/* Background effects */}
            <div className="plans-grid-bg"></div>
            <div className="plans-glow-orb"></div>

            <div className="plans-header">
                <Link to="/" className="plans-back-btn">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>
                <h1 className="plans-title">
                    Our <span>Plans</span>
                </h1>
                <p className="plans-subtitle">
                    Choose the perfect plan for your business. All plans include
                    responsive design, clean code, and dedicated support.
                </p>
            </div>

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                    >
                        {plan.popular && (
                            <div className="popular-badge">
                                <Sparkles size={14} />
                                Most Popular
                            </div>
                        )}

                        <div className="pricing-card-header">
                            <h3 className="pricing-plan-name">{plan.name}</h3>
                            <div className="pricing-price">
                                <span className="currency">₹</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">{plan.period}</span>
                            </div>
                            <p className="pricing-desc">{plan.description}</p>
                        </div>

                        <ul className="pricing-features">
                            {plan.features.map((feature, i) => (
                                <li key={i}>
                                    <span className="feature-check">
                                        <Check size={16} />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`pricing-cta ${plan.popular ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                            onClick={onEnquire}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            {/* Factors Section */}
            <div className="factors-section">
                <span className="factors-label">HOW PRICING IS CALCULATED</span>
                <h2 className="factors-title">Factors we <span>consider</span></h2>
                <div className="factors-grid">
                    {factors.map((factor, index) => (
                        <div key={index} className="factor-card">
                            <div className="factor-icon">{factor.icon}</div>
                            <h4 className="factor-name">{factor.title}</h4>
                            <p className="factor-desc">{factor.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="plans-footer-note">
                <p>Need a custom plan? <button className="inline-link" onClick={onEnquire}>Contact us</button> for a tailored quote.</p>
            </div>
        </div>
    )
}

export default Plans
