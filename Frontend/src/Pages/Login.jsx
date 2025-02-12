import React, { useState } from 'react';
import { BookOpen, GraduationCap, Lock, User, School, ChevronDown, UserCog, Users } from 'lucide-react';

function Login() {
  const [userType, setUserType] = useState('student');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'student':
        return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case 'teacher':
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
      case 'hod':
        return <Users className="w-5 h-5 text-indigo-600" />;
      case 'admin':
        return <UserCog className="w-5 h-5 text-indigo-600" />;
      default:
        return <User className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-indigo-600 p-8 md:p-12 flex items-center justify-center">
        <div className="max-w-md text-white">
       
          <div className='mb-12'>
            <img src="https://pbs.twimg.com/profile_images/1160534287235420162/ZmkFOBZi_400x400.png" alt="BIET Jhansi Logo" className="mx-auto h-16 w-16" /> 
          </div>
          <div className="flex items-center gap-2 mb-8">
            <School className="w-8 h-8" />
            <h1 className="text-2xl font-bold">BIET JHANSI</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6">Welcome To Online Attendance Management System</h2>
        </div>
      </div>

      <div className="md:w-1/2 bg-white p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Login to Your Account</h2>
          <form className="space-y-6">
          
            <div className="relative">
              <button
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  {['student', 'teacher', 'hod', 'admin'].map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer flex items-center gap-2"
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
                className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>

            <div className="space-y-2 text-center">
              <div>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
