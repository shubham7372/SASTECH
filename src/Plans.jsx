import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowLeft, Sparkles, LayoutList, Plug, Globe, CloudCog, CreditCard, Smartphone, Landmark, Wallet, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react'

const plans = [
    {
        name: 'Business Website Plan',
        price: '13,999',
        originalPrice: '18,000',
        priceNum: 1399900,
        period: '',
        gst: '+ 18% GST Exclude',
        description: 'Perfect for small businesses & individuals starting online.',
        offerIncluded: true,
        helperText: 'Quick support · Professional delivery',
        features: [
            '8 Pages Professional Business Website',
            '1 Year Free Domain (.com / .in / .org)',
            '1 Year Free Cloud Hosting',
            'Premium Custom Design (Fully Coded – No WordPress)',
            'Admin Panel Access to Manage Website',
            'Lifetime 24/7 Hosting Support',
            'Unlimited Images & Videos Upload',
            'Free SSL Certificate (HTTPS Security)',
            'SEO-Friendly & Performance Optimized',
            '100% Mobile Responsive Design',
            'Live Chat Integration',
            'Social Media Linking (FB, Instagram, etc.)',
            'Call Button & WhatsApp Chat Integration',
            'Contact/Inquiry Form',
            'Payment Gateway Integration',
            '1 Year Free Technical Support',
            'Annual Renewal ₹4,000 (Hosting)',
        ],
        footnote: '*Offer applies to Domain+Hosting for first year only. Renewal charges apply from year 2.',
        cta: 'Call Now',
        popular: false,
        payable: true,
    },
    {
        name: 'Premium Web Development Package',
        price: '28,999',
        originalPrice: '38,999',
        priceNum: 2899900,
        period: '',
        gst: '+ 18% GST Exclude',
        description: 'A complete premium dynamic website package for growing businesses.',
        offerIncluded: true,
        helperText: 'Quick support · Professional delivery',
        features: [
            '18 Pages Premium Dynamic Website',
            '1 Year Free Domain (.com / .in / .org)',
            '1 Year Free High-Speed Cloud Hosting',
            'Premium Custom Website Design (Fully Dynamic)',
            'Full Admin Panel Access',
            'Google Search Console Setup',
            'Lifetime 24/7 Hosting Support',
            'Unlimited Images & Videos Upload',
            'Free SSL Certificate (HTTPS Security)',
            'SEO-Friendly Website Structure',
            '100% Responsive Layout (Mobile, Tablet, Desktop)',
            'Live Chat Integration',
            'Payment Gateway Integration (Optional)',
            'Social Media Integration',
            'Click-to-Call Button',
            'WhatsApp Chat Button',
            'Advanced Inquiry Form',
            'WooCommerce-Compatible (Optional)',
            '1 Year Free Technical Support',
            'Annual Hosting Renewal ₹4,000',
        ],
        footnote: '*Offer applies to Domain+Hosting for first year only. Renewal charges apply from year 2.',
        cta: 'Call Now',
        popular: true,
        payable: true,
    },
    {
        name: 'Custom Website Plan',
        price: '???',
        originalPrice: '',
        priceNum: 0,
        period: '',
        gst: '+ 18% GST Exclude',
        description: 'Flexible plan tailored to your specific needs.',
        offerIncluded: true,
        helperText: 'Quick support · Professional delivery',
        features: [
            'Number of Pages According to Your Requirement',
            '1 Year Free Domain Name (.com .in .org)',
            '1 Year Free Cloud Hosting',
            'Dynamic Custom Website Design – built to your specifications',
            'Advance Admin Panel Access – According to your requirements.',
            'Google Search Console Setup (for SEO and site performance insights)',
            'Lifetime 24/7 Free Hosting Support',
            'Unlimited Images & Videos Upload',
            'Free SSL Certificates',
            'SEO Friendly Website',
            '100% Mobile-Friendly & Responsive Design',
            'Live Chat Integration',
            'Payment Gateway Integration',
            'Social Media Integration (Facebook, Instagram, etc.)',
            'Call Button & WhatsApp Chat Integration',
            'WhatsApp/Chat Integration',
            'Inquiry/Contact Form',
            'E-commerce Features (Online Store, Product Listings, Cart & Checkout)',
            'Year Free Technical Support For Website',
        ],
        footnote: '*Offer applies to Domain+Hosting for first year only. Renewal charges apply from year 2.',
        cta: 'Call Now',
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

function CountdownTimer() {
    const [time, setTime] = useState({ h: 1, m: 23, s: 10 })

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => {
                let { h, m, s } = prev
                if (s > 0) { s-- }
                else if (m > 0) { m--; s = 59 }
                else if (h > 0) { h--; m = 59; s = 59 }
                else { h = 23; m = 59; s = 59 } // reset
                return { h, m, s }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    return (
        <div className="countdown-boxes">
            <span className="cd-box">{pad(time.h)}</span>:
            <span className="cd-box">{pad(time.m)}</span>:
            <span className="cd-box">{pad(time.s)}</span>
        </div>
    )
}

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
                        {/* Offer + Popular Badge Row */}
                        <div className="pricing-badges-row">
                            {plan.offerIncluded && (
                                <span className="offer-badge">Offer Included</span>
                            )}
                            {plan.popular && (
                                <span className="popular-badge-inline">
                                    <Sparkles size={12} /> Most Popular
                                </span>
                            )}
                        </div>

                        <div className="pricing-card-header">
                            <h3 className="pricing-plan-name">{plan.name}</h3>
                            <p className="pricing-desc">{plan.description}</p>

                            {/* Price Block */}
                            <div className="pricing-price-block">
                                {plan.originalPrice && (
                                    <div className="pricing-original-row">
                                        <span className="original-price">₹{plan.originalPrice}</span>
                                        <span className="discount-in-label">ENDS IN</span>
                                    </div>
                                )}
                                <div className="pricing-price-row">
                                    <div className="pricing-price">
                                        <span className="currency">₹</span>
                                        <span className="amount">{plan.price}</span>
                                    </div>
                                    <div className="pricing-countdown">
                                        <CountdownTimer />
                                    </div>
                                </div>
                                {plan.gst && <span className="pricing-gst">{plan.gst}</span>}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href="tel:+917372849408"
                            className={`pricing-cta ${plan.popular ? 'pricing-cta-primary' : 'pricing-cta-outline'}`}
                        >
                            {plan.cta}
                        </a>

                        {/* Helper Text */}
                        {plan.helperText && (
                            <p className="pricing-helper">{plan.helperText}</p>
                        )}

                        {/* Features */}
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

                        {/* Footnote */}
                        {plan.footnote && (
                            <p className="pricing-footnote">{plan.footnote}</p>
                        )}
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
