import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Lock, User, School, ChevronDown, UserCog, Users } from 'lucide-react';
import logo from '../../public/Images/biet.png';

function Login() {
  const [userType, setUserType] = useState('student');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'Student':
        return <GraduationCap className="w-5 h-5 text-pink-600" />;
      case 'teacher':
        return <BookOpen className="w-5 h-5 text-pink-600" />;
      case 'HOD':
        return <Users className="w-5 h-5 text-pink-600" />;
      case 'Admin':
        return <UserCog className="w-5 h-5 text-pink-600" />;
      default:
        return <User className="w-5 h-5 text-pink-600" />;
    }
  };

 
  const [isAnimated, setIsAnimated] = useState(false);

 
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-pink-50 to-purple-50">
    
      <div className="md:w-1/2 bg-gradient-to-r from-pink-500 to-purple-600 p-8 md:p-12 flex items-center justify-center">
        <div className="max-w-2xl text-white text-center">
          <div className="mb-8 md:mb-16">
            <img
              src={logo}
              alt="BIET Logo"
              className="mx-auto h-24 w-24 md:h-32 md:w-32 rounded-md shadow-lg"
            />
          </div>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <School className="w-8 h-8" />
            <h1 className="text-[18px] md:text--[18px] font-[anzo3] font-semibold whitespace-nowrap">
              BUNDELKHAND INSTITUTE OF ENGINEERING & TECHNOLOGY, JHANSI
            </h1>
          </div>
       
          <h2
            className={`text-3xl md:text-4xl font-[anzo1] mb-6 transition-all duration-3000 ease-out ${
              isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Welcome To Online Attendance Management System
          </h2>
        </div>
      </div>

      
      <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Login to Your Account</h2>
          <form className="space-y-6">
       
            <div className="relative">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="flex items-center gap-2">
                  {getUserTypeIcon(userType)}
                  <span className="capitalize">{userType}</span>
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
                  {['Student', 'Teacher', 'HOD', 'Admin'].map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-pink-50 cursor-pointer flex items-center gap-2 transition-colors"
                      onClick={() => {
                        setUserType(type);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {getUserTypeIcon(type)}
                      <span className="capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

         
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm hover:shadow-md transition-shadow"
                placeholder="Username"
                required
              />
            </div>

  
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white shadow-sm hover:shadow-md transition-shadow"
                placeholder="Password"
                required
              />
            </div>

       
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Login
            </button>

       
            <div className="text-center">
              <a href="#" className="text-sm text-pink-600 hover:text-pink-800 transition-colors">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;