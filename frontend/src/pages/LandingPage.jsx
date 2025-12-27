import React, { useState, useEffect } from 'react';
import { FileText, Shield, Users, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';

export default function InvoiceLanding() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const [role, setRole] = useState(null);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get("/role");
        console.log(response.data.role);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRole();
  },[]);

  const navigate = useNavigate();

  const handleLoginClick = (type) => {
    if(role==="admin"){
      navigate('/admin/dashboard');
    }else if(role==="user"){
      navigate('/user/dashboard');
    }else{
      setLoginType(type);
      setShowLogin(true);
    }
    
  };

  const handleLoginSubmit = async () => {
    console.log('Sign in as:', loginType, email, password);
        if(email && password){
    
          if(loginType==="admin"){
            try {
                const response = await axiosInstance.post('/auth/admin/signin', {email, password});
                console.log(response.data);
                navigate('/admin/dashboard');
            } catch (error) {
                console.log(error);
            }
          }
    
           if(loginType==="employee"){
            try {
                const response = await axiosInstance.post('/auth/user/signin', {email, password});
                console.log(response.data);
                navigate('/user/dashboard');
            } catch (error) {
                console.log(error);
            }
          }
        }
    
  };

  const handleBack = () => {
    setShowLogin(false);
    setEmail('');
    setPassword('');
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 -left-4"></div>
          <div className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-0 right-4"></div>
        </div>

        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-blue-100">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to home
          </button>

          <div className="text-center mb-8">
            <div className={`${loginType === 'admin' ? 'bg-linear-to-br from-blue-500 to-blue-600' : 'bg-linear-to-br from-blue-400 to-blue-500'} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              {loginType === 'admin' ? (
                <Shield className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-2">
              {loginType === 'admin' ? 'Admin Login' : 'Employee Login'}
            </h2>
            <p className="text-blue-600">
              Enter your credentials to continue
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-blue-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-700 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLoginSubmit}
              className={`w-full ${loginType === 'admin' ? 'bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-linear-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'} text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-blue-600">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-blue-700 hover:text-blue-900">
              Contact administrator
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 -left-4"></div>
        <div className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 top-0 right-4"></div>
        <div className="absolute w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-8 left-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-10 py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-linear-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-900">InvoiceHub</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Streamline Your
              <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"> Invoice Management</span>
            </h1>
            <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8">
              Professional invoice generation made simple. Create, track, and manage invoices with ease.
            </p>
          </div>

          {/* Login Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Admin Login Card */}
            <div
              onMouseEnter={() => setHoveredCard('admin')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-blue-100 hover:border-blue-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="bg-linear-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Admin Portal</h3>
                <p className="text-blue-700 mb-6">
                  Full control over invoice management, user administration, and system settings.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    Manage all invoices
                  </li>
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    User management
                  </li>
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    Analytics & reports
                  </li>
                </ul>
                
                <button
                  onClick={() => handleLoginClick('admin')}
                  className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  Login as Admin
                  <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${hoveredCard === 'admin' ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            </div>

            {/* Employee Login Card */}
            <div
              onMouseEnter={() => setHoveredCard('employee')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-blue-100 hover:border-blue-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="bg-linear-to-br from-blue-400 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-3">Employee Portal</h3>
                <p className="text-blue-700 mb-6">
                  Create and manage your invoices efficiently with streamlined tools and templates.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    Create invoices
                  </li>
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    Track submissions
                  </li>
                  <li className="flex items-center text-blue-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2 shrink-0" />
                    View history
                  </li>
                </ul>
                
                <button
                  onClick={() => handleLoginClick('employee')}
                  className="w-full bg-linear-to-r from-blue-400 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  Login as Employee
                  <ArrowRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${hoveredCard === 'employee' ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 mt-20 border-t border-blue-200">
          <div className="text-center text-blue-600 text-sm">
            <p>&copy; 2025 InvoiceHub. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}