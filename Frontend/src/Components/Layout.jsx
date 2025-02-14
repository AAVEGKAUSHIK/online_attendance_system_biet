import React, { useState } from 'react';
import { LayoutDashboard, UserCheck, PieChart, LogOut, Menu, X } from 'lucide-react';

function Layout({ children, currentPage, onPageChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance Sheet', icon: UserCheck },
    { id: 'report', label: 'Overall Report', icon: PieChart },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      
      <div className={`fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm shadow-lg transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 bg-gradient-to-r from-pink-400 to-purple-600">
          <h1 className="text-2xl font-[anzo5] text-white">Teacher Portal</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 transition-colors ${
                  currentPage === item.id ? 'bg-gradient-to-r from-pink-400/10 to-purple-600/10 border-r-4 border-pink-500' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-pink-50 transition-colors mt-auto">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>


      <div className={`flex-1 overflow-auto transition-all duration-300 ${
        isSidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        <header className="bg-white/80 backdrop-blur-sm shadow">
          <div className="px-6 py-4 flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <h2 className="text-xl font-[anzo5] text-gray-800">
              {menuItems.find(item => item.id === currentPage)?.label}
            </h2>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default Layout;