'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '../../components/AuthGuard';
import { getUserInfo, logout } from '../../utils/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get user info from auth utility
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role) => {
    const roleNames = {
      founder: '🚀 Startup Founder',
      investor: '💰 Investor',
      mentor: '🎓 Mentor',
      developer: '💻 Developer',
      advisor: '📋 Business Advisor'
    };
    return roleNames[role] || role;
  };

  const getStageDisplayName = (stage) => {
    const stageNames = {
      idea: '💡 Just an idea',
      mvp: '🔨 Building MVP',
      'early-traction': '📈 Early traction',
      growth: '🚀 Growing fast',
      scaling: '⚡ Scaling up',
      exit: '🎯 Planning exit'
    };
    return stageNames[stage] || stage;
  };

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
                  onClick={handleLogout}
                  className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome to AI CoFounder, {user?.profile?.firstName || 'User'}! 👋
                </h1>
                <p className="text-gray-300 text-lg">
                  Your AI-powered startup journey starts here
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">Role</div>
                <div className="text-lg font-semibold text-purple-400">
                  {getRoleDisplayName(user?.role)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link href="/ideation" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover-lift">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-white mb-2">Startup Ideation</h3>
              <p className="text-gray-300 mb-4">Generate and validate startup ideas with AI</p>
              <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg text-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Start Ideating
              </div>
            </Link>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover-lift">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Business Planning</h3>
              <p className="text-gray-300 mb-4">Create business models and financial plans</p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Plan Business
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover-lift">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Technical Development</h3>
              <p className="text-gray-300 mb-4">Build MVP and technical architecture</p>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Start Building
              </button>
            </div>
          </div>

          {/* User Profile & Startup Info */}
          {user?.role === 'founder' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Your Startup</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Startup Name</label>
                    <p className="text-white font-semibold">{user.startup.name || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Industry</label>
                    <p className="text-white font-semibold">{user.startup.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Stage</label>
                    <p className="text-white font-semibold">{getStageDisplayName(user.startup.stage)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white font-semibold">
                      {user.profile.firstName || 'Not'} {user.profile.lastName || 'specified'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Role</label>
                    <p className="text-white font-semibold">{getRoleDisplayName(user.role)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✅</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Account created successfully</p>
                  <p className="text-gray-400 text-sm">Welcome to AI CoFounder!</p>
                </div>
                <span className="text-gray-400 text-sm ml-auto">Just now</span>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">📧</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Email verification sent</p>
                  <p className="text-gray-400 text-sm">Please check your inbox</p>
                </div>
                <span className="text-gray-400 text-sm ml-auto">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
