'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { getUserInfo } from '../../utils/auth';

export default function Ideation() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [marketAnalysis, setMarketAnalysis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    setChatMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Startup Ideation Assistant. I can help you generate innovative startup ideas, validate them with market data, and analyze competitors. What interests you or what problems would you like to solve?",
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    try {
      // Call the real API
      const response = await fetch('/api/ideation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: inputMessage,
          userId: user?._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedIdeas(data.ideas);
        
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: data.message,
          timestamp: new Date(),
          ideas: data.ideas
        };

        setChatMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(data.message || 'Failed to generate ideas');
      }
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I encountered an error while generating ideas. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeMarket = async (idea) => {
    setSelectedIdea(idea);
    setActiveTab('analysis');
    setIsLoading(true);

    try {
      // Call the API to get market analysis
      const response = await fetch('/api/ideation/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInput: idea.title,
          userId: user?._id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMarketAnalysis(data.marketAnalysis);
      } else {
        throw new Error(data.message || 'Failed to analyze market');
      }
    } catch (error) {
      console.error('Error analyzing market:', error);
      // Fallback to basic analysis
      setMarketAnalysis({
        marketSize: idea.marketSize,
        growthRate: idea.growthRate,
        competitors: [
          {
            name: "Competitor A",
            marketShare: "25%",
            strengths: ["Strong brand", "Large user base", "Established partnerships"],
            weaknesses: ["Slow innovation", "Poor user experience", "High costs"],
            opportunities: "Market expansion, technology upgrade"
          },
          {
            name: "Competitor B",
            marketShare: "18%",
            strengths: ["Innovative technology", "Agile development", "Customer focus"],
            weaknesses: ["Limited funding", "Small team", "Geographic constraints"],
            opportunities: "Funding rounds, geographic expansion"
          }
        ],
        trends: [
          "AI/ML integration accelerating",
          "Sustainability becoming priority",
          "Personalization demand increasing",
          "Mobile-first approach essential"
        ],
        risks: [
          "Regulatory changes",
          "Technology disruption",
          "Market saturation",
          "Economic downturn impact"
        ],
        recommendations: [
          "Focus on unique AI capabilities",
          "Build strong partnerships early",
          "Invest in user experience",
          "Develop scalable infrastructure"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickIdeas = [
    "Sustainable living solutions",
    "Mental health and wellness",
    "Remote work productivity",
    "Financial literacy for young adults",
    "Pet care and wellness",
    "Home automation and security",
    "Local business digitization",
    "Elderly care technology"
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI CoFounder
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Welcome, {user?.profile?.firstName || 'User'}!
                </span>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-purple-500/20 border border-purple-500/50 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              🚀 Dynamic Startup Ideation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Generate innovative startup ideas with AI, validate them with market data, and get detailed competitor analysis
            </p>
          </div>

          {/* Quick Ideas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">💡 Quick Start Ideas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickIdeas.map((idea, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(idea)}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover-lift"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              💬 AI Brainstorming Chat
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'ideas'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              💡 Generated Ideas
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'analysis'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📊 Market Analysis
            </button>
          </div>

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 order-2' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 order-1'
                      }`}>
                        {message.type === 'user' ? 'You' : 'AI'}
                      </div>
                    </div>
                    <div className={`max-w-md ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-gray-200'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        {message.ideas && (
                          <div className="mt-3 space-y-2">
                            {message.ideas.map((idea) => (
                              <div key={idea.id} className="bg-white/10 rounded-lg p-3 border border-white/20">
                                <h4 className="font-semibold text-white">{idea.title}</h4>
                                <p className="text-xs text-gray-300">{idea.description}</p>
                                <div className="mt-2 flex space-x-2">
                                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                    {idea.category}
                                  </span>
                                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                                    {idea.marketSize}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                      AI
                    </div>
                    <div className="ml-3 bg-slate-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-white/20 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your interests, problems you want to solve, or industry you're passionate about..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isGenerating}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ideas Tab */}
          {activeTab === 'ideas' && (
            <div className="space-y-6">
              {generatedIdeas.length > 0 ? (
                generatedIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover-lift">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{idea.title}</h3>
                        <p className="text-gray-300 text-lg">{idea.description}</p>
                      </div>
                      <button
                        onClick={() => analyzeMarket(idea)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Analyze Market
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Problem & Solution</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-400">Problem:</span>
                            <p className="text-gray-200">{idea.problem}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Solution:</span>
                            <p className="text-gray-200">{idea.solution}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Market & Audience</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-400">Target Audience:</span>
                            <p className="text-gray-200">{idea.targetAudience}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Revenue Model:</span>
                            <p className="text-gray-200">{idea.revenueModel}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{idea.marketSize}</div>
                        <div className="text-sm text-gray-400">Market Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{idea.growthRate}</div>
                        <div className="text-sm text-gray-400">Growth Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{idea.category}</div>
                        <div className="text-sm text-gray-400">Category</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Ideas Generated Yet</h3>
                  <p className="text-gray-300">Start a conversation in the AI Brainstorming Chat to generate your first startup ideas!</p>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Start Chatting
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {selectedIdea ? (
                <div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
                    <h2 className="text-3xl font-bold text-white mb-4">📊 Market Analysis: {selectedIdea.title}</h2>
                    <p className="text-gray-300 text-lg mb-6">{selectedIdea.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Market Overview</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Market Size:</span>
                            <span className="text-white font-semibold">{selectedIdea.marketSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Growth Rate:</span>
                            <span className="text-white font-semibold">{selectedIdea.growthRate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Key Trends</h3>
                        <div className="space-y-2">
                          {marketAnalysis?.trends?.map((trend, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              <span className="text-gray-300 text-sm">{trend}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white text-lg">Analyzing market data...</p>
                    </div>
                  ) : marketAnalysis ? (
                    <div className="space-y-6">
                      {/* Competitors */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-4">🏆 Competitive Analysis</h3>
                        <div className="space-y-4">
                          {marketAnalysis.competitors.map((competitor, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-lg font-semibold text-white">{competitor.name}</h4>
                                <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                                  {competitor.marketShare} market share
                                </span>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-semibold text-green-400 mb-2">Strengths</h5>
                                  <ul className="space-y-1">
                                    {competitor.strengths.map((strength, idx) => (
                                      <li key={idx} className="text-xs text-gray-300 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                                        {strength}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-red-400 mb-2">Weaknesses</h5>
                                  <ul className="space-y-1">
                                    {competitor.weaknesses.map((weakness, idx) => (
                                      <li key={idx} className="text-xs text-gray-300 flex items-center">
                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                                        {weakness}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risks & Recommendations */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <h3 className="text-xl font-semibold text-white mb-4">⚠️ Key Risks</h3>
                          <div className="space-y-2">
                            {marketAnalysis.risks.map((risk, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                <span className="text-gray-300 text-sm">{risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <h3 className="text-xl font-semibold text-white mb-4">💡 Recommendations</h3>
                          <div className="space-y-2">
                            {marketAnalysis.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                <span className="text-gray-300 text-sm">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Idea Selected</h3>
                  <p className="text-gray-300">Choose an idea from the chat or ideas tab to analyze its market potential.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
