import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './AIChatbot.css';

/**
 * AI Chatbot Component using Gemini API
 * Provides cybersafety and cybercrime related assistance
 */
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQs, setShowFAQs] = useState(true);
  const messagesEndRef = useRef(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What is cybercrime and how can I protect myself?",
      answer: "Cybercrime refers to illegal activities carried out using computers or the internet. To protect yourself: Use strong passwords, avoid suspicious links, don't share personal information online, keep software updated, and be cautious with public Wi-Fi."
    },
    {
      id: 2,
      question: "How do I identify phishing emails and scams?",
      answer: "Phishing signs include: Urgent language, requests for personal information, suspicious sender addresses, grammatical errors, unexpected attachments, and links that don't match the claimed destination. Always verify the sender before clicking any links."
    },
    {
      id: 3,
      question: "What should I do if I become a victim of cybercrime?",
      answer: "If you're a cybercrime victim: Report to local police and cybercrime helpline (1930), document all evidence, change all passwords, monitor your accounts, contact your bank if finances are involved, and file a complaint on cybercrime.gov.in."
    },
    {
      id: 4,
      question: "How can I secure my online banking and financial transactions?",
      answer: "For secure banking: Use official bank apps/websites only, enable two-factor authentication, never share OTPs or PINs, log out after transactions, avoid banking on public Wi-Fi, regularly check statements, and immediately report suspicious activities."
    },
    {
      id: 5,
      question: "What are the latest cybersecurity threats I should know about?",
      answer: "Current threats include: Ransomware attacks, social engineering scams, fake investment schemes, digital arrest frauds, UPI payment frauds, fake loan apps, cryptocurrency scams, and AI-powered deepfake scams. Stay vigilant and verify everything."
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isValidCyberQuery = (message) => {
    const cyberKeywords = [
      // English keywords
      'cyber', 'security', 'fraud', 'scam', 'phishing', 'malware', 'ransomware',
      'hacking', 'password', 'privacy', 'online', 'internet', 'digital',
      'banking', 'financial', 'safety', 'protection', 'threat', 'attack',
      'virus', 'spam', 'identity', 'theft', 'otp', 'upi', 'investment',
      'broker', 'sebi', 'crime', 'report', 'help', 'money', 'account',
      'whatsapp', 'instagram', 'facebook', 'social', 'media', 'harassment',
      'blackmail', 'extortion', 'loan', 'app', 'fake', 'sextortion',
      // Telugu keywords
      'మోసం', 'మోసగాడు', 'వాట్సాప్', 'ఫేస్బుక్', 'ఇన్స్టాగ్రామ్', 'సైబర్',
      'అకౌంట్', 'బ్యాంక్', 'పైసలు', 'రూపాయలు', 'లోన్', 'యాప్', 'ఫేక్',
      'బెదిరింపులు', 'హ్యారస్మెంట్', 'బ్లాక్మెయిల్', 'ఆన్లైన్', 'ఫోన్',
      'కాల్', 'మెసేజ్', 'చెప్పారు', 'అడుగుతున్నారు', 'అని', 'ఏమి', 'చేయాలి'
    ];
    
    const lowerMessage = message.toLowerCase();
    // Return true for any cybercrime-related content or if message has question marks (likely a question)
    return cyberKeywords.some(keyword => lowerMessage.includes(keyword)) || message.includes('?') || message.includes('ఏమి');
  };

  const callGeminiAPI = async (userMessage) => {
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY) {
        throw new Error('Gemini API key not configured');
      }

      // Initialize the Google GenAI client
      const genAI = new GoogleGenerativeAI(API_KEY);
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `System Prompt — NTR Police Commissionerate
"One-Stop Cybercrime Reporting, Prevention & Awareness Assistant"

Role & Scope:
You are the official NTR Police Commissionerate Cybercrime Assistant. You handle all types of cybercrimes, including:
- Financial fraud (UPI/IMPS/NEFT/card/wallet)
- All online scams (job, loan app, OLX, investment, parcel/customs, crypto, KYC, etc.)
- Social media crimes (harassment, impersonation, bullying, stalking, morphing, fake profiles)
- Sextortion & online extortion
- Cyberstalking / online threats
- Child online safety & CSAM reporting
- Account hacking / unauthorized access
- Ransomware, malware, spyware
- Identity theft
- Phishing, vishing, smishing
- Cyber defamation
- Fake news, misinformation
- Any cyber offence under IT Act / IPC

Tone & Behaviour:
• Professional, official, polite
• Very concise, precise, and brief
• Always provide step-by-step instructions
• Use bullets / numbered points
• Avoid long paragraphs
• Ask follow-up questions ONLY when necessary to proceed (max 1–2 targeted questions)
• Collect only essential information

Language Handling:
• Auto-detect user language
• Respond only in English or Telugu, depending on what the user uses
• Switch language immediately if the user switches

Response Format (Always):
1. Immediate Steps
2. Reporting Steps (cybercrime.gov.in / helpline 1930 / local police)
3. Evidence to Collect
4. Prevention Tips
5. Follow-up Questions ONLY if needed

Urgency Detection:
• Threat to life: Tell user to call 112 immediately
• Fresh financial fraud: Call 1930 + report at cybercrime.gov.in
• Sextortion / extortion: Preserve evidence; do NOT pay; report
• Child safety / CSAM: Mandatory reporting steps
• Active hacking: Disconnect internet, secure accounts, reset passwords

Safety & Refusal Rules:
• If query is irrelevant → "Sorry, I can assist only with cybercrime reporting, prevention, and awareness. Please tell me your cyber-related issue."
• If user asks for illegal help → deny and redirect
• Protect privacy; collect minimum necessary info
• Never ask for: OTP, full card number, CVV, passwords, private keys

User question: ${userMessage}

Provide a helpful, accurate, and concise response following the format above.`;

      // Generate content using the SDK
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text || "I apologize, but I couldn't generate a response. Please try asking about cybersafety or cybercrime prevention.";
      
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "I'm having technical difficulties. Please try again or contact support for immediate assistance with cybercrime issues.";
    }
  };

  const handleFAQClick = (faq) => {
    setShowFAQs(false);
    const newMessages = [
      { type: 'user', content: faq.question, timestamp: new Date() },
      { type: 'bot', content: faq.answer, timestamp: new Date() }
    ];
    setMessages(newMessages);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setShowFAQs(false);

    // Add user message
    const newMessages = [...messages, { type: 'user', content: userMessage, timestamp: new Date() }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      let botResponse;
      
      if (!isValidCyberQuery(userMessage)) {
        botResponse = "నేను సైబర్ సేఫ్టీ మరియు సైబర్ క్రైమ్ నివారణలో సహాయం చేస్తాను. దయచేసి ఆన్లైన్ సెక్యూరిటీ, సైబర్ మోసాలు, డిజిటల్ సేఫ్టీ లేదా సైబర్ క్రైమ్ రిపోర్టింగ్ గురించి ప్రశ్నలు అడగండి. ఆన్లైన్లో సురక్షితంగా ఉండటానికి ఎలా సహాయం చేయగలను? / I'm specialized in cybersafety and cybercrime prevention. Please ask about online security, cyber fraud prevention, digital safety, or cybercrime reporting. How can I help you stay safe online?";
      } else {
        botResponse = await callGeminiAPI(userMessage);
      }

      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: botResponse, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', content: "సాంకేతిక సమस్య కారణంగా క్షమించండి. తక్షణ సైబర్ క్రైమ్ సహాయం కోసం 1930 కు కాల్ చేయండి లేదా cybercrime.gov.in సందర్శించండి / I apologize for the technical issue. For immediate cybercrime assistance, please call 1930 or visit cybercrime.gov.in", timestamp: new Date() }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset to FAQs when opening
      setShowFAQs(true);
      setMessages([]);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-chatbot">
      {/* Chatbot Icon */}
      <div className="ai-chatbot__icon" onClick={toggleChat}>
        <div className="ai-chatbot__icon-inner">
          🤖
        </div>
        {!isOpen && <div className="ai-chatbot__pulse"></div>}
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="ai-chatbot__window">
          {/* Header */}
          <div className="ai-chatbot__header">
            <div className="ai-chatbot__header-info">
              <div className="ai-chatbot__avatar">🛡️</div>
              <div>
                <h4 className="ai-chatbot__title">CyberSafety AI Assistant</h4>
                <span className="ai-chatbot__subtitle">Ask me about cybersecurity & fraud prevention</span>
              </div>
            </div>
            <button className="ai-chatbot__close" onClick={toggleChat}>×</button>
          </div>

          {/* Content Area */}
          <div className="ai-chatbot__content">
            {showFAQs ? (
              // FAQ Section
              <div className="ai-chatbot__faqs">
                <h5 className="ai-chatbot__faqs-title">Frequently Asked Questions</h5>
                <div className="ai-chatbot__faqs-list">
                  {faqs.map((faq) => (
                    <div 
                      key={faq.id} 
                      className="ai-chatbot__faq-item"
                      onClick={() => handleFAQClick(faq)}
                    >
                      <span className="ai-chatbot__faq-icon">❓</span>
                      <span className="ai-chatbot__faq-text">{faq.question}</span>
                    </div>
                  ))}
                </div>
                <div className="ai-chatbot__start-chat">
                  <p>Or start a conversation by typing your cybersafety question below:</p>
                </div>
              </div>
            ) : (
              // Chat Messages
              <div className="ai-chatbot__messages">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`ai-chatbot__message ai-chatbot__message--${message.type}`}
                  >
                    <div className="ai-chatbot__message-content">
                      {message.content}
                    </div>
                    <div className="ai-chatbot__message-time">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="ai-chatbot__message ai-chatbot__message--bot">
                    <div className="ai-chatbot__message-content ai-chatbot__typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="ai-chatbot__input-area">
            <div className="ai-chatbot__input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybersafety, fraud prevention..."
                className="ai-chatbot__input"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className="ai-chatbot__send-button"
                disabled={!inputMessage.trim() || isLoading}
              >
                <span className="ai-chatbot__send-icon">➤</span>
              </button>
            </div>
            <div className="ai-chatbot__disclaimer">
              This AI assistant provides general cybersafety guidance. For emergencies, call 1930.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;