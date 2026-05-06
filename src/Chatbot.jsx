import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'

const SYSTEM_PROMPT = `You are SAS TECH's AI assistant — a friendly, professional chatbot for a software & web development company called SAS TECH (www.sastech.in).

About SAS TECH:
- We build dynamic websites, web applications, and full-stack software solutions.
- Services: Premium Web Development, E-commerce, App Development, Custom Software, UI/UX Design, and 24/7 Hosting Support.
- Advanced Technology Stack: 
  - Languages/Frameworks: CSS, HTML, Java, Angular, Swift, Python, React, Flutter, iOS, Android, Node.js, PHP, .NET
  - Databases: Firebase, AWS, MongoDB, Ruby on Rails (ROR), Azure
  - Design & AI Tools: Figma, Sketch, Adobe XD, Gemini, ChatGPT, TensorFlow, Core ML
- Pricing Plans: 
  - Business Website Plan (₹13,999) - 8 pages, perfect for small businesses.
  - Premium Web Development Package (₹28,999) - 18 pages, dynamic features, most popular.
  - Custom Website Plan - Flexible pricing according to requirements.
  - Included in plans: 1 Year Free Domain & Cloud Hosting, Free SSL, Admin Panel, Live Chat.
- Contact: Phone +91 7372849408, Email shubhamwork800@gmail.com
- Location: Innovation Hub, Tech Park, India
- Office Hours: Mon-Fri 9AM-7PM, Sat 10AM-4PM, Closed Sunday

Rules:
- Keep responses concise & helpful (2-4 sentences max).
- Always be friendly, professional, and knowledgeable about the technologies we use.
- For complex requirements, suggest the user fill the Contact form, call via WhatsApp, or call directly.
- If asked about something outside your knowledge, politely redirect to contacting the team.
- Use emojis sparingly for a modern feel.
- Never share code or internal logic details.`

/* Get time-appropriate greeting */
function getTimeGreeting() {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return 'Good Morning'
    if (hour >= 12 && hour < 17) return 'Good Afternoon'
    return 'Good Evening'
}

/* Check if message is a greeting */
function isGreeting(text) {
    const lower = text.toLowerCase().trim()
    return /^(hi+|hii+|hell+o+|hey+|hola|namaste|greetings?|yo+|sup|helo+|hlo+|hy+)\b/i.test(lower)
}

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey there! 👋 I'm SAS TECH's AI assistant. How can I help you today? Ask me about our services, pricing, or anything else!",
        },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // Conversation phase: 'idle' → 'askName' → 'askEmail' → 'normal'
    const [chatPhase, setChatPhase] = useState('idle')
    const [userInfo, setUserInfo] = useState({ name: '', email: '' })
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const addBotMessage = (text, delay = 600) => {
        setIsLoading(true)
        setTimeout(() => {
            setMessages((prev) => [...prev, { role: 'assistant', content: text }])
            setIsLoading(false)
        }, delay)
    }

    const sendEnquiryEmail = async (name, email) => {
        const ACCESS_KEY = 'fe8954f1-a71e-4986-975f-dda742e6368b'
        const data = {
            access_key: ACCESS_KEY,
            name: name,
            email: email,
            subject: `New Lead from Chatbot: ${name}`,
            from_name: 'SAS TECH Website — Chatbot',
            message: `New enquiry received via Chatbot!\n\nName: ${name}\nEmail: ${email}\n\nThe customer has shared their contact details and is now chatting with the AI.`,
        }

        try {
            await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            })
            console.log('Chatbot enquiry sent successfully')
        } catch (error) {
            console.error('Chatbot enquiry error:', error)
        }
    }

    const sendMessage = async () => {
        const trimmed = input.trim()
        if (!trimmed || isLoading) return

        setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
        setInput('')

        // ─── Phase: idle — detect greeting and ask for name ───
        if (chatPhase === 'idle') {
            if (isGreeting(trimmed)) {
                const greeting = getTimeGreeting()
                addBotMessage(
                    `${greeting} Sir/Ma'am! 🙏 Welcome to SAS TECH. How may I help you?\n\nBefore we begin, may I know your **Name** please?`
                )
                setChatPhase('askName')
                return
            }
            // If not a greeting, fall through to normal AI chat
        }

        // ─── Phase: askName — collect name, then ask email ───
        if (chatPhase === 'askName') {
            setUserInfo((prev) => ({ ...prev, name: trimmed }))
            addBotMessage(
                `Thank you, ${trimmed}! 😊 Could you also share your **Email address** so we can stay in touch?`
            )
            setChatPhase('askEmail')
            return
        }

        // ─── Phase: askEmail — collect email, then proceed ───
        if (chatPhase === 'askEmail') {
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(trimmed)) {
                addBotMessage('That doesn\'t look like a valid email. Could you please enter a valid email address? 📧')
                return
            }
            setUserInfo((prev) => ({ ...prev, email: trimmed }))
            
            // Send enquiry to company email
            sendEnquiryEmail(userInfo.name, trimmed)

            addBotMessage(
                `Perfect! Thank you for sharing your details, ${userInfo.name}! 🎉 I've forwarded your enquiry to our team, and they'll get in touch if needed.\n\nNow, how can I assist you today? Feel free to ask about our **Services**, **Pricing**, **Technology Stack**, or anything else!`
            )
            setChatPhase('normal')
            return
        }

        // ─── Phase: normal / idle (non-greeting) — regular AI chat ───
        setIsLoading(true)

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY

            if (!apiKey) {
                const fallback = getFallbackResponse(trimmed)
                setTimeout(() => {
                    setMessages((prev) => [...prev, { role: 'assistant', content: fallback }])
                    setIsLoading(false)
                }, 800)
                return
            }

            // Build context with user info if collected
            let contextPrompt = SYSTEM_PROMPT
            if (userInfo.name) {
                contextPrompt += `\n\nThe user's name is "${userInfo.name}" and their email is "${userInfo.email}". Address them by name when appropriate.`
            }

            const chatHistory = messages.map((msg) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            }))

            chatHistory.push({ role: 'user', parts: [{ text: trimmed }] })

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: contextPrompt }] },
                        contents: chatHistory,
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 250,
                        },
                    }),
                }
            )

            const data = await response.json()
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try again!"

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
        } catch (error) {
            console.error('Chatbot error:', error)
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Oops! Something went wrong. You can reach us directly at +91 7372849408 or shubhamwork800@gmail.com 📞" },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Chat Window */}
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">
                            <Bot size={22} />
                        </div>
                        <div>
                            <h4>SAS TECH AI</h4>
                            <span className="chatbot-status">● Online</span>
                        </div>
                    </div>
                    <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.role}`}>
                            <div className="chat-message-icon">
                                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className="chat-bubble">{msg.content}</div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message assistant">
                            <div className="chat-message-icon">
                                <Bot size={16} />
                            </div>
                            <div className="chat-bubble typing">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            chatPhase === 'askName'
                                ? 'Enter your name...'
                                : chatPhase === 'askEmail'
                                    ? 'Enter your email...'
                                    : 'Type your message...'
                        }
                        disabled={isLoading}
                    />
                    <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="chatbot-send">
                        <Send size={18} />
                    </button>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                className={`fab fab-chatbot ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Chat with AI"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </>
    )
}

/* Smart fallback responses when no API key is configured */
function getFallbackResponse(input) {
    const lower = input.toLowerCase()

    if (lower.match(/price|pricing|cost|plan|package|budget|rate/)) {
        return "We offer 3 awesome plans:\n• Business Website (₹13,999) — 8 pages, domain+hosting\n• Premium Web Package (₹28,999) — 18 pages, fully dynamic\n• Custom Website — tailored to your exact needs!\nAll include 1 yr free domain & hosting. Visit our Plans page for details! 💰"
    }
    if (lower.match(/service|what do you|offer|build|develop|work/)) {
        return "We specialize in Web & App Development, E-commerce, Custom Software, and UI/UX Design! We also offer 24/7 Hosting Support. From landing pages to full-stack apps — we've got you covered! 🚀"
    }
    if (lower.match(/contact|phone|call|email|reach|talk/)) {
        return "You can reach us at:\n📞 +91 7372849408\n📧 shubhamwork800@gmail.com\n🌐 www.sastech.in\n\nOr click the WhatsApp button on our site!"
    }
    if (lower.match(/tech|stack|language|framework|database|ai|ml|tool/)) {
        return "We use an Advanced Tech Stack including:\n• Core: React, Node.js, Angular, Python, PHP, .NET, Java\n• Mobile: Flutter, iOS, Android\n• DB/Cloud: AWS, Azure, Firebase, MongoDB\n• AI/ML: Gemini, ChatGPT API, TensorFlow, Core ML."
    }
    if (lower.match(/mern|react|node|mongo/)) {
        return "Our MERN Stack expertise (MongoDB, Express, React, Node.js) lets us build powerful, scalable web applications. Perfect for dashboards, SaaS products & more! ⚡"
    }
    if (lower.match(/php|laravel/)) {
        return "We develop robust PHP solutions including custom CMS and dynamic websites. Reliable & efficient! 🔧"
    }
    if (lower.match(/time|deliver|how long|deadline|duration/)) {
        return "Delivery timelines typically depend on project complexity, but for our standard website plans we aim for ultra-fast, professional delivery. Contact us for a detailed estimate! ⏱️"
    }
    if (lower.match(/locat|address|office|where/)) {
        return "📍 We're located at Innovation Hub, Tech Park, India.\n\nOffice Hours: Mon-Fri 9AM-7PM, Sat 10AM-4PM."
    }
    if (lower.match(/thank|thanks|bye|goodbye/)) {
        return "Thank you for chatting with us! 🙏 Feel free to reach out anytime. Have a great day!"
    }

    return "Thanks for your question! For detailed info, I'd recommend reaching out to our team directly at +91 7372849408 or visiting our Contact page. We'd love to help! 😊"
}

export default Chatbot

