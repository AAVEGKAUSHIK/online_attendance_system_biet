import React, { useState } from 'react';

const MOCK_STUDENTS = [
  { id: 1, name: 'John Doe', rollNo: 'CSE001', regNo: '2024CSE001' },
  { id: 2, name: 'Jane Smith', rollNo: 'CSE002', regNo: '2024CSE002' },
  { id: 3, name: 'Mike Johnson', rollNo: 'CSE003', regNo: '2024CSE003' },
  { id: 4, name: 'Sarah Williams', rollNo: 'CSE004', regNo: '2024CSE004' },
  { id: 5, name: 'David Brown', rollNo: 'CSE005', regNo: '2024CSE005' },
  { id: 6, name: 'Emily Davis', rollNo: 'CSE006', regNo: '2024CSE006' },
  { id: 7, name: 'Michael Wilson', rollNo: 'CSE007', regNo: '2024CSE007' },
  { id: 8, name: 'Lisa Anderson', rollNo: 'CSE008', regNo: '2024CSE008' },
  { id: 9, name: 'Robert Taylor', rollNo: 'CSE009', regNo: '2024CSE009' },
  { id: 10, name: 'Jennifer Martin', rollNo: 'CSE010', regNo: '2024CSE010' }
];

export function AttendenceSheet() {
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');
  const [showSheet, setShowSheet] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenerateSheet = () => {
    if (subject && branch && year && date) {
      setShowSheet(true);
      setAttendance({});
    }
  };

  const handleAttendanceChange = (studentId, present) => {
    setAttendance(prev => ({ ...prev, [studentId]: present }));
  };

  const handleMarkAll = (present) => {
    const newAttendance = MOCK_STUDENTS.reduce((acc, student) => {
      acc[student.id] = present;
      return acc;
    }, {});
    setAttendance(newAttendance);
  };

  const handleSubmit = () => {
    console.log('Attendance submitted:', {
      subject,
      branch,
      year,
      date,
      attendance
    });
  };

  const filteredStudents = MOCK_STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="computer">Computer Science</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="">Select Branch</option>
            <option value="cse">Computer Science & Engineering</option>
            <option value="me">Mechanical Engineering</option>
            <option value="ee">Electrical Engineering</option>
            <option value="civil">Civil Engineering</option>
            <option value="civil">Electronics and Communication Engineering</option>
            <option value="civil">Chemical Engineering</option>
            <option value="civil">Information Technology </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateSheet}
        disabled={!subject || !branch || !year || !date}
        className={`bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-500 hover:to-purple-700 transition-all ${
          (!subject || !branch || !year || !date) && 'opacity-50 cursor-not-allowed'
        }`}
      >
        Generate Sheet
      </button>

      {showSheet && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by name, roll no, or reg no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleMarkAll(true)}
                className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-500 hover:to-purple-700 transition-all text-sm"
              >
                Mark All Present
              </button>
              <button
                onClick={() => handleMarkAll(false)}
                className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-4 py-2 rounded-md hover:from-pink-500 hover:to-purple-700 transition-all text-sm"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reg No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.regNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              checked={attendance[student.id] === true}
                              onChange={() => handleAttendanceChange(student.id, true)}
                              className="form-radio h-4 w-4 text-pink-500"
                            />
                            <span className="ml-2 text-sm text-pink-600">Present</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              checked={attendance[student.id] === false}
                              onChange={() => handleAttendanceChange(student.id, false)}
                              className="form-radio h-4 w-4 text-purple-600"
                            />
                            <span className="ml-2 text-sm text-purple-600">Absent</span>
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-pink-400 to-purple-600 text-white px-6 py-2 rounded-md hover:from-pink-500 hover:to-purple-700 transition-all"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendenceSheet;