'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ideation');

  const features = [
    {
      title: "AI-Powered Strategy",
      description: "Get intelligent business insights and strategic recommendations tailored to your startup's unique challenges.",
      icon: "🎯",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Market Analysis",
      description: "AI-driven market research and competitive analysis to position your startup for success.",
      icon: "📊",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Growth Optimization",
      description: "Data-driven growth strategies and performance optimization using advanced AI algorithms.",
      icon: "🚀",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const typingTexts = [
    "Dynamic Startup Ideation & Validation",
    "AI-Powered Business Planning & Modeling",
    "Technical Co-Founder Capabilities",
    "Fundraising & Investor Networking",
    "Continuous Learning & Mentorship"
  ];

  const featureCategories = {
    ideation: {
      title: "🚀 Dynamic Startup Ideation",
      description: "AI generates and validates startup ideas with market data",
      features: [
        "Generative AI startup idea suggestions",
        "Market validation with real-time data",
        "Interactive brainstorming chat sessions",
        "Competitor analysis & market positioning",
        "Problem-solution fit validation"
      ],
      icon: "💡",
      color: "from-blue-500 to-cyan-500"
    },
    planning: {
      title: "📋 Personalized Business Planning",
      description: "Automated business model generation and financial modeling",
      features: [
        "AI-generated Lean Canvas & Business Model Canvas",
        "Intelligent pitch deck creation",
        "Financial modeling & break-even analysis",
        "Go-to-market strategy development",
        "Revenue model simulation"
      ],
      icon: "📊",
      color: "from-green-500 to-emerald-500"
    },
    technical: {
      title: "⚡ Technical Co-Founder Capabilities",
      description: "Code generation and technical architecture assistance",
      features: [
        "MVP feature list generation",
        "Technical architecture documentation",
        "Code generation for React/Node.js stacks",
        "Cloud deployment assistance",
        "Proof-of-concept development"
      ],
      icon: "💻",
      color: "from-purple-500 to-pink-500"
    },
    fundraising: {
      title: "💰 Fundraising & Networking",
      description: "Investor pitch simulation and networking strategies",
      features: [
        "AI pitch review & feedback",
        "Investor Q&A simulation",
        "Investor/accelerator matching",
        "Cold email template generation",
        "Contact strategy optimization"
      ],
      icon: "🎯",
      color: "from-orange-500 to-red-500"
    },
    mentorship: {
      title: "🎓 Continuous Learning & Mentorship",
      description: "Personalized learning paths and expert guidance",
      features: [
        "Curated learning paths",
        "Live office hours with experts",
        "Community Q&A sessions",
        "Tech & business course recommendations",
        "Mentor matching system"
      ],
      icon: "🧠",
      color: "from-indigo-500 to-purple-500"
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (currentTypingIndex < typingTexts.length) {
        const currentText = typingTexts[currentTypingIndex];
        if (typedText.length < currentText.length) {
          setTypedText(currentText.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => {
            setCurrentTypingIndex(prev => prev + 1);
            setTypedText('');
          }, 2000);
        }
      } else {
        setCurrentTypingIndex(0);
        setTypedText('');
      }
    }, 100);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Feature rotation
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
      clearInterval(featureInterval);
    };
  }, [currentTypingIndex, typedText, typingTexts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-float animation-delay-2000 opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float animation-delay-4000 opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 lg:p-8">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center animate-pulse-glow">
            <span className="text-2xl">🤖</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI CoFounder
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-purple-300 transition-colors hover:scale-105 transform">Features</a>
          <a href="#how-it-works" className="hover:text-purple-300 transition-colors hover:scale-105 transform">How It Works</a>
          <a href="#pricing" className="hover:text-purple-300 transition-colors hover:scale-105 transform">Pricing</a>
          <a href="#contact" className="hover:text-purple-300 transition-colors hover:scale-105 transform">Contact</a>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-purple-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-purple-300 mb-4">
              Your Complete AI CoFounder for Startup Success
            </h2>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {typedText}
              <span className={`inline-block w-1 h-8 bg-purple-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text-animate">
              From Idea to Exit
            </span>
            <br />
            <span className="text-white">AI-Powered Startup Journey</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your startup vision into reality with AI CoFounder. From ideation to fundraising, 
            technical development to mentorship - we're your 24/7 virtual co-founder.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1000+</div>
              <div className="text-sm text-gray-400">Startups Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-sm text-gray-400">AI Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">95%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">$50M+</div>
              <div className="text-sm text-gray-400">Funding Raised</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover-lift">
              Start Your AI Journey
            </Link>
            <Link href="/login" className="border-2 border-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 hover-lift">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Complete Startup Ecosystem
            </span>
          </h2>
          
          {/* Feature Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(featureCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                {featureCategories[category].icon} {featureCategories[category].title.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/10 hover-lift">
            <div className="text-center mb-8">
              <div className={`text-6xl mb-4 ${activeCategory === 'ideation' ? 'animate-bounce' : ''}`}>
                {featureCategories[activeCategory].icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{featureCategories[activeCategory].title}</h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {featureCategories[activeCategory].description}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCategories[activeCategory].features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-slate-900/50 rounded-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 bg-gradient-to-r ${featureCategories[activeCategory].color} rounded-full`}></div>
                    <span className="text-gray-200">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Demo */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience AI CoFounder
            </span>
          </h2>
          
          <div className="bg-gradient-to-r from-slate-800/50 to-purple-800/50 rounded-3xl p-8 lg:p-12 backdrop-blur-sm border border-white/10 hover-lift">
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono">AI CoFounder is online - Ready to help with your startup!</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 animate-slide-in-left">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                  <div className="bg-slate-800 rounded-lg p-3 max-w-md">
                    <p className="text-sm">Hello! I'm your AI CoFounder. I can help you with startup ideation, business planning, technical development, fundraising, and mentorship. What would you like to work on today?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end animate-slide-in-right">
                  <div className="bg-blue-600 rounded-lg p-3 max-w-md">
                    <p className="text-sm">I have an idea for a sustainable food delivery app. Can you help me validate it and create a business plan?</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">You</div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slide-in-left">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                  <div className="bg-slate-800 rounded-lg p-3 max-w-md">
                    <p className="text-sm">Excellent! Let me analyze the sustainable food delivery market. I'll research competitors, validate demand, create a Lean Canvas, and help you develop a go-to-market strategy. Should we start with market validation?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end animate-slide-in-right">
                  <div className="bg-blue-600 rounded-lg p-3 max-w-md">
                    <p className="text-sm">Yes, that sounds perfect! Can you also help me with the technical architecture?</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">You</div>
                </div>
                
                <div className="flex items-start space-x-3 animate-slide-in-left">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                  <div className="bg-slate-800 rounded-lg p-3 max-w-md">
                    <p className="text-sm">Absolutely! I'll generate an MVP feature list, create technical architecture docs, and even help you bootstrap the codebase with React/Node.js. I can also assist with cloud deployment to get your proof-of-concept live quickly!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your AI CoFounder Journey
            </span>
          </h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Ideate", description: "AI generates & validates startup ideas", icon: "💡", delay: "0s" },
              { step: "02", title: "Plan", description: "Business model & financial planning", icon: "📋", delay: "0.2s" },
              { step: "03", title: "Build", description: "Technical development & MVP creation", icon: "⚡", delay: "0.4s" },
              { step: "04", title: "Fund", description: "Pitch optimization & investor matching", icon: "💰", delay: "0.6s" },
              { step: "05", title: "Scale", description: "Growth optimization & mentorship", icon: "🚀", delay: "0.8s" }
            ].map((item, index) => (
              <div key={index} className="text-center group" style={{ animationDelay: item.delay }}>
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto group-hover:scale-110 transition-transform duration-300 animate-fade-in-up`}>
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold animate-bounce">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO, TechFlow",
                content: "AI CoFounder helped us validate our idea, create a business plan, and raise $2M in seed funding. The technical guidance was invaluable!",
                avatar: "👩‍💼",
                achievement: "Raised $2M"
              },
              {
                name: "Marcus Rodriguez",
                role: "Founder, GreenTech",
                content: "From ideation to MVP in 3 months! The AI-generated technical architecture and code samples saved us countless development hours.",
                avatar: "👨‍💼",
                achievement: "MVP in 3 months"
              },
              {
                name: "Priya Patel",
                role: "CTO, DataViz",
                content: "The investor pitch simulation was game-changing. We secured meetings with top VCs and closed our Series A within 6 months.",
                avatar: "👩‍💻",
                achievement: "Series A closed"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-purple-300">{testimonial.role}</div>
                  </div>
                  <div className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-white font-semibold">
                    {testimonial.achievement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Build Your Startup with AI?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of founders who've already accelerated their journey from idea to exit with AI CoFounder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-full text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover-lift">
              Start Free Trial
            </Link>
            <Link href="/login" className="border-2 border-purple-400 px-10 py-4 rounded-full text-xl font-semibold hover:bg-purple-400 hover:text-slate-900 transition-all duration-300 hover-lift">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <span className="text-lg font-bold">AI CoFounder</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
