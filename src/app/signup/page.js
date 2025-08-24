'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../utils/auth';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    startupName: '',
    industry: '',
    stage: 'idea',
    fundingStage: 'pre-seed'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already authenticated
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const roles = [
    {
      id: 'founder',
      title: '🚀 Startup Founder',
      description: 'Building the next big thing',
      features: ['AI-powered ideation', 'Business planning tools', 'Technical guidance', 'Fundraising support']
    },
    {
      id: 'investor',
      title: '💰 Investor',
      description: 'Funding innovative startups',
      features: ['Deal flow access', 'Startup analytics', 'Due diligence tools', 'Portfolio management']
    },
    {
      id: 'mentor',
      title: '🎓 Mentor',
      description: 'Sharing expertise & guidance',
      features: ['Mentee matching', 'Expert network', 'Knowledge sharing', 'Impact tracking']
    },
    {
      id: 'developer',
      title: '💻 Developer',
      description: 'Building technical solutions',
      features: ['Code generation', 'Architecture guidance', 'Best practices', 'Tech stack advice']
    },
    {
      id: 'advisor',
      title: '📋 Business Advisor',
      description: 'Strategic business guidance',
      features: ['Strategy consulting', 'Market analysis', 'Growth planning', 'Operational guidance']
    }
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce', 'SaaS', 'AI/ML', 'Clean Energy',
    'Biotech', 'Fintech', 'Edtech', 'Healthtech', 'Real Estate', 'Transportation', 'Entertainment', 'Other'
  ];

  const stages = [
    { value: 'idea', label: '💡 Just an idea' },
    { value: 'mvp', label: '🔨 Building MVP' },
    { value: 'early-traction', label: '📈 Early traction' },
    { value: 'growth', label: '🚀 Growing fast' },
    { value: 'scaling', label: '⚡ Scaling up' },
    { value: 'exit', label: '🎯 Planning exit' }
  ];

  const fundingStages = [
    { value: 'pre-seed', label: '🌱 Pre-seed' },
    { value: 'seed', label: '🌿 Seed' },
    { value: 'series-a', label: '🌳 Series A' },
    { value: 'series-b', label: '🌲 Series B' },
    { value: 'series-c', label: '🏔️ Series C' },
    { value: 'exit', label: '🎯 Exit' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const signupData = {
        ...formData,
        role: selectedRole
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login with success message
        router.push('/login?message=Account created successfully! Please sign in.');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedRole('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI CoFounder
            </span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
            }`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/20 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Choose Your Role</h1>
              <p className="text-gray-300">Select how you'll use AI CoFounder to accelerate your journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover-lift"
                >
                  <div className="text-4xl mb-4">{role.title.split(' ')[0]}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{role.title.split(' ').slice(1).join(' ')}</h3>
                  <p className="text-gray-300 mb-4">{role.description}</p>
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {currentStep === 2 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={goBack}
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
              >
                ← Back to role selection
              </button>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
                <p className="text-gray-300">Join AI CoFounder as a {roles.find(r => r.id === selectedRole)?.title.split(' ').slice(1).join(' ')}</p>
              </div>
              <div></div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Founder-specific fields */}
              {selectedRole === 'founder' && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="startupName" className="block text-sm font-medium text-gray-300 mb-2">
                        Startup Name
                      </label>
                      <input
                        type="text"
                        id="startupName"
                        name="startupName"
                        value={formData.startupName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's your startup called?"
                      />
                    </div>

                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select industry</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="stage" className="block text-sm font-medium text-gray-300 mb-2">
                        Startup Stage
                      </label>
                      <select
                        id="stage"
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      >
                        {stages.map((stage) => (
                          <option key={stage.value} value={stage.value}>{stage.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="fundingStage" className="block text-sm font-medium text-gray-300 mb-2">
                        Funding Stage
                      </label>
                      <select
                        id="fundingStage"
                        name="fundingStage"
                        value={formData.fundingStage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      >
                        {fundingStages.map((stage) => (
                          <option key={stage.value} value={stage.value}>{stage.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
