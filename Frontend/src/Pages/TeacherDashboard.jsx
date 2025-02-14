import React, { useState } from 'react';
import Layout from '../Components/Layout';  // Changed path
import Dashboard from '../Components/Dashboard';
import AttendanceSheet from '../Components/AttendenceSheet';
import OverallReport from '../Components/OverallReport';

function TeacherDashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'attendance' && <AttendanceSheet />}
      {currentPage === 'report' && <OverallReport />}
    </Layout>
  );
}

export default TeacherDashboard;