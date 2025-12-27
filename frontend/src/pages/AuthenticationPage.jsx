import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Shield, User, Store, ArrowLeft, Mail, Lock, Eye, EyeOff, Phone, Building } from 'lucide-react';
import axiosInstance from '../lib/axios';

export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState('select'); // 'select', 'signin', 'signup'
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [signInData, setSignInData] = useState({ email: '', password: '' });

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      color: 'blue',
      description: 'Full system access'
    },
    {
      id: 'user',
      title: 'Employee',
      icon: User,
      color: 'green',
      description: 'Standard user access'
    },
  ];

  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentPage('signin');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign in as:', selectedRole, signInData);
    if(signInData.email && signInData.password){

      if(selectedRole==="admin"){
        try {
            const response = await axiosInstance.post('/auth/admin/signin', signInData);
            console.log(response.data);
            navigate('/admin/dashboard');
        } catch (error) {
            console.log(error);
        }
      }

       if(selectedRole==="user"){
        try {
            const response = await axiosInstance.post('/auth/user/signin', signInData);
            console.log(response.data);
            navigate('/user/dashboard');
        } catch (error) {
            console.log(error);
        }
      }
    }
    
  };


  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600',
        icon: 'bg-blue-100 text-blue-600',
        border: 'border-blue-600',
        hover: 'hover:border-blue-300'
      },
      green: {
        bg: 'bg-green-600 hover:bg-green-700',
        text: 'text-green-600',
        icon: 'bg-green-100 text-green-600',
        border: 'border-green-600',
        hover: 'hover:border-green-300'
      },
      purple: {
        bg: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600',
        icon: 'bg-purple-100 text-purple-600',
        border: 'border-purple-600',
        hover: 'hover:border-purple-300'
      }
    };
    return colors[color];
  };

  const getCurrentRole = () => roles.find(r => r.id === selectedRole);
  const currentRole = getCurrentRole();
  const colorClasses = currentRole ? getColorClasses(currentRole.color) : null;

  // Role Selection Page
  if (currentPage === 'select') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Continue as
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              const roleColors = getColorClasses(role.color);

              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`
                    bg-white border-2 border-gray-200 ${roleColors.hover}
                    rounded-2xl p-8 transition-all duration-200
                    hover:shadow-lg transform hover:-translate-y-1
                  `}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${roleColors.icon} p-4 rounded-full`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {role.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {role.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Sign In Page
  if (currentPage === 'signin') {
    const Icon = currentRole.icon;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => setCurrentPage('select')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className={`${colorClasses.icon} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Sign in to your {currentRole.title} account
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button className={`text-sm ${colorClasses.text} hover:underline`}>
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleSignIn}
                className={`w-full ${colorClasses.bg} text-white font-semibold py-3 rounded-lg transition-colors`}
              >
                Sign In
              </button>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}