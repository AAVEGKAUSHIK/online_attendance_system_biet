import React, { useState } from 'react';
import { Users, Calendar, BarChart3, Menu, X } from 'lucide-react';
import TeacherAssignment from '../HodComponent/TeacherAssigenment';
import TimeTable from '../HodComponent/TimeTable';
import Reports from '../HodComponent/Reports';

const HOD_DATA = {
  name: "Dr. Sarah Johnson",
  department: "Computer Science",
  photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
};

function HODDashboard() {
  const [activeTab, setActiveTab] = useState('teachers');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'teachers', label: 'Teacher Assignment', icon: Users },
    { id: 'timetable', label: 'Time Table', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-amber-50 flex">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-teal-600 to-indigo-700 backdrop-blur-xl transform transition-transform duration-300 ease-out border-r border-indigo-500/20 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative shadow-2xl shadow-indigo-900/30`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-indigo-500/20">
            <div className="flex items-center space-x-3">
              <img 
                src={HOD_DATA.photoUrl} 
                alt={HOD_DATA.name}
                className="w-14 h-14 rounded-full border-2 border-indigo-200/50 shadow-lg"
              />
              <div>
                <h2 className="text-white font-bold text-lg font-poppins">{HOD_DATA.name}</h2>
                <p className="text-indigo-200/80 text-sm mt-1">HOD - {HOD_DATA.department}</p>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 group ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-teal-500 to-indigo-600 shadow-lg shadow-teal-500/30'
                          : 'bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10'
                      }`}
                    >
                      <Icon size={22} className={activeTab === item.id ? 'text-black' : 'text-indigo-200 group-hover:text-teal-300'} />
                      <span className={activeTab === item.id ? 'text-white font-semibold' : 'text-indigo-100 group-hover:text-white'}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

  
      <div className="flex-1">
      
        <header className="lg:hidden bg-gradient-to-r from-teal-600/60 to-indigo-700/60 backdrop-blur-md p-4 border-b border-indigo-500/20">
          <div className="flex items-center justify-between">
            {/* Toggle Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-indigo-100 p-2 hover:bg-white/10 rounded-xl transition-colors hover:text-white"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <div className="text-white font-semibold font-poppins">{HOD_DATA.department}</div>
          </div>
        </header>

        <div className="p-6">
          <div className="bg-gradient-to-br from-teal-50/80 via-indigo-50/80 to-amber-50/80 backdrop-blur-2xl rounded-2xl border border-indigo-300/20 shadow-2xl shadow-indigo-900/30">
            {activeTab === 'teachers' && <TeacherAssignment />}
            {activeTab === 'timetable' && <TimeTable />}
            {activeTab === 'reports' && <Reports />}
          </div>
        </div>
      </div>

     
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 lg:hidden z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default HODDashboard;