import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, Globe, Send } from 'lucide-react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        countryCode: '+91',
        email: '',
        project: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        const ACCESS_KEY = 'fe8954f1-a71e-4986-975f-dda742e6368b'

        const data = {
            access_key: ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `New Enquiry from ${formData.name}`,
            from_name: 'SAS TECH Website — Contact Page',
            message: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.countryCode} ${formData.phone}\nProject Type: ${formData.project}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            })
            const result = await response.json()
            if (result.success) {
                setSubmitStatus('success')
                setFormData({ name: '', phone: '', countryCode: '+91', email: '', project: '', subject: '', message: '' })
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="contact-page">
            <div className="plans-grid-bg"></div>
            <div className="plans-glow-orb"></div>

            <div className="plans-header">
                <Link to="/" className="plans-back-btn">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>
                <h1 className="plans-title">
                    Contact <span>Us</span>
                </h1>
                <p className="plans-subtitle">
                    Have a project in mind? Reach out and let's build something amazing together.
                </p>
            </div>

            <div className="contact-page-grid">
                {/* Contact Form */}
                <div className="contact-page-form-card">
                    <h3 className="contact-card-title">
                        <Send size={20} /> Send us a Message
                    </h3>

                    {submitStatus === 'success' && (
                        <div className="form-status success">
                            ✅ Message sent successfully! We'll get back to you soon.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="form-status error">
                            ❌ Something went wrong. Please try again or email us directly.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="contact-form-row">
                            <div className="contact-field">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="contact-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-form-row">
                            <div className="contact-field">
                                <label>Mobile Number</label>
                                <div className="contact-phone-input">
                                    <select name="countryCode" value={formData.countryCode} onChange={handleChange}>
                                        <option value="+91">+91</option>
                                        <option value="+92">+92</option>
                                        <option value="+880">+880</option>
                                        <option value="+94">+94</option>
                                        <option value="+977">+977</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+971">+971</option>
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
                            <div className="contact-field">
                                <label>Project Type</label>
                                <select name="project" value={formData.project} onChange={handleChange} required>
                                    <option value="" disabled>Select a project</option>
                                    <option value="WordPress">WordPress</option>
                                    <option value="PHP Development">PHP Development</option>
                                    <option value="MERN Stack">MERN Stack</option>
                                    <option value="Python Development">Python Development</option>
                                    <option value=".NET Development">.NET Development</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="contact-field">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                                required
                            />
                        </div>

                        <div className="contact-field">
                            <label>Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your project, requirements, timeline..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>

                {/* Contact Info Sidebar */}
                <div className="contact-page-info">
                    <div className="contact-info-card">
                        <h3 className="contact-card-title">Get in Touch</h3>
                        <div className="contact-info-items">
                            <a href="tel:+917372849408" className="contact-info-item">
                                <div className="contact-info-icon"><Phone size={20} /></div>
                                <div>
                                    <span className="info-label">Phone</span>
                                    <span className="info-value">+91 7372849408</span>
                                </div>
                            </a>
                            <a href="mailto:shubhamwork800@gmail.com" className="contact-info-item">
                                <div className="contact-info-icon"><Mail size={20} /></div>
                                <div>
                                    <span className="info-label">Email</span>
                                    <span className="info-value">shubhamwork800@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://www.sastechs.in" target="_blank" rel="noopener noreferrer" className="contact-info-item">
                                <div className="contact-info-icon"><Globe size={20} /></div>
                                <div>
                                    <span className="info-label">Website</span>
                                    <span className="info-value">www.sastechs.in</span>
                                </div>
                            </a>
                            <div className="contact-info-item">
                                <div className="contact-info-icon"><MapPin size={20} /></div>
                                <div>
                                    <span className="info-label">Address</span>
                                    <span className="info-value">Innovation Hub, Tech Park, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info-card">
                        <h3 className="contact-card-title">Office Hours</h3>
                        <div className="office-hours">
                            <div className="hours-row">
                                <span>Monday – Friday</span>
                                <span className="hours-value">9:00 AM – 7:00 PM</span>
                            </div>
                            <div className="hours-row">
                                <span>Saturday</span>
                                <span className="hours-value">10:00 AM – 4:00 PM</span>
                            </div>
                            <div className="hours-row">
                                <span>Sunday</span>
                                <span className="hours-value closed">Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
