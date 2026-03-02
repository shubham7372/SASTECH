import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Sparkles, LayoutList, Plug, Globe, CloudCog, CreditCard, Smartphone, Landmark, Wallet, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react'

const plans = [
    {
        name: 'Basic',
        price: '24,999',
        priceNum: 2499900, // in paise for Razorpay
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
        cta: 'Pay & Get Started',
        popular: false,
        payable: true,
    },
    {
        name: 'Professional',
        price: '49,999',
        priceNum: 4999900,
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
        cta: 'Pay & Choose Professional',
        popular: true,
        payable: true,
    },
    {
        name: 'Enterprise',
        price: '1,00,000',
        priceNum: 10000000,
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
        payable: false,
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

const paymentMethods = [
    { icon: <CreditCard size={20} />, label: 'Credit / Debit Cards' },
    { icon: <Smartphone size={20} />, label: 'UPI' },
    { icon: <Landmark size={20} />, label: 'Net Banking' },
    { icon: <Wallet size={20} />, label: 'Wallets' },
]

function Plans({ onEnquire }) {
    const [toast, setToast] = useState(null) // { type: 'success' | 'error', message }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [toast])

    const handlePayment = (plan) => {
        if (!window.Razorpay) {
            setToast({ type: 'error', message: 'Payment gateway failed to load. Please refresh and try again.' })
            return
        }

        const options = {
            key: 'rzp_test_YourTestKeyHere', // Replace with your Razorpay key
            amount: plan.priceNum,
            currency: 'INR',
            name: 'SAS Technologies',
            description: `${plan.name} Plan – ${plan.description}`,
            image: '/src/assets/logo.jpg',
            handler: function (response) {
                setToast({
                    type: 'success',
                    message: `Payment successful! ID: ${response.razorpay_payment_id}. Our team will contact you shortly.`,
                })
            },
            prefill: {
                name: '',
                email: '',
                contact: '',
            },
            notes: {
                plan_name: plan.name,
                plan_price: plan.price,
            },
            theme: {
                color: '#a6ce39',
            },
            modal: {
                ondismiss: function () {
                    setToast({ type: 'error', message: 'Payment was cancelled. You can try again anytime.' })
                },
            },
        }

        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
            setToast({
                type: 'error',
                message: `Payment failed: ${response.error.description}. Please try again.`,
            })
        })
        rzp.open()
    }

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
                            onClick={() => plan.payable ? handlePayment(plan) : onEnquire()}
                        >
                            {plan.payable && <CreditCard size={18} />}
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            {/* Accepted Payment Methods */}
            <div className="payment-methods-section">
                <div className="payment-methods-badge">
                    <ShieldCheck size={20} />
                    <span>Secure Payments Powered by Razorpay</span>
                </div>
                <div className="payment-methods-list">
                    {paymentMethods.map((method, i) => (
                        <div key={i} className="payment-method-item">
                            {method.icon}
                            <span>{method.label}</span>
                        </div>
                    ))}
                </div>
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

            {/* Payment Toast Notification */}
            {toast && (
                <div className={`payment-toast ${toast.type}`}>
                    <div className="payment-toast-icon">
                        {toast.type === 'success' ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                    </div>
                    <div className="payment-toast-body">
                        <strong>{toast.type === 'success' ? 'Payment Successful!' : 'Payment Issue'}</strong>
                        <p>{toast.message}</p>
                    </div>
                    <button className="payment-toast-close" onClick={() => setToast(null)}>×</button>
                </div>
            )}
        </div>
    )
}

export default Plans
