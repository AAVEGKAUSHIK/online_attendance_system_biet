import React from 'react';
import { Users, BookOpen, Calendar, Clock } from 'lucide-react';

function Dashboard() {
  const stats = [
    { label: 'Total Students', value: '120', icon: Users, color: 'bg-gradient-to-r from-pink-400 to-purple-600' },
    { label: 'Subjects', value: '4', icon: BookOpen, color: 'bg-gradient-to-r from-pink-400 to-purple-600' },
    { label: 'Classes Today', value: '3', icon: Calendar, color: 'bg-gradient-to-r from-pink-400 to-purple-600' },
    { label: 'Hours', value: '6', icon: Clock, color: 'bg-gradient-to-r from-pink-400 to-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(function(stat, index) {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {[
            { time: '9:00 AM', subject: 'Mathematics', class: 'CSE Year 2' },
            { time: '11:00 AM', subject: 'Physics', class: 'ME Year 1' },
            { time: '2:00 PM', subject: 'Chemistry', class: 'EE Year 1' },
          ].map(function(schedule, index) {
            return (
              <div key={index} className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <div className="flex-shrink-0 w-20">
                  <p className="text-sm font-medium text-gray-900">{schedule.time}</p>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{schedule.subject}</p>
                  <p className="text-sm text-gray-500">{schedule.class}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
