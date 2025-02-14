import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';


const TEACHER_LIST = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Prof. Jane Smith' },
  { id: 3, name: 'Dr. Alice Johnson' },
  { id: 4, name: 'Prof. Robert Brown' },
];


const SUBJECT_LIST = [
  { id: 1, name: 'Data Structures' },
  { id: 2, name: 'Database Systems' },
  { id: 3, name: 'Operating Systems' },
  { id: 4, name: 'Computer Networks' },
  { id: 5, name: 'Software Engineering' },
];

const INITIAL_TEACHERS = [
  { id: 1, name: 'Dr. John Doe', subject: 'Data Structures', semester: 3, branch: 'CSE', startTime: '09:00', endTime: '10:00' },
  { id: 2, name: 'Prof. Jane Smith', subject: 'Database Systems', semester: 5, branch: 'CSE', startTime: '11:00', endTime: '12:00' },
];

export function TeacherAssigenment() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [showForm, setShowForm] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    semester: 1,
    branch: 'CSE',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers([...teachers, { id: Date.now(), ...newTeacher }]);
    setShowForm(false);
    setNewTeacher({ name: '', subject: '', semester: 1, branch: 'CSE', startTime: '', endTime: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-[anzo2] text-[#2D62BD]">Teacher Assignment</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-purple-600 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-purple-50 transition"
        >
          <Plus size={20} />
          <span className='font-[anzo3]'>Assign Teacher</span>
        </button>
      </div>

      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white/20 p-4 rounded-lg border border-x-8 backdrop-blur-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-black">{teacher.name}</h3>
                <p className="text-black/70">{teacher.subject}</p>
                <div className="mt-2 flex space-x-4 text-sm text-black/50">
                  <span>Semester: {teacher.semester}</span>
                  <span>Branch: {teacher.branch}</span>
                  <span>Timing: {teacher.startTime} - {teacher.endTime}</span>
                </div>
              </div>
              <button
                onClick={() => setTeachers(teachers.filter(t => t.id !== teacher.id))}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5 text-black" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Assign New Teacher</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teacher Name</label>
                  <select
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  >
                    <option value="" disabled>Select a teacher</option>
                    {TEACHER_LIST.map((teacher) => (
                      <option key={teacher.id} value={teacher.name}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <select
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    {SUBJECT_LIST.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Semester</label>
                    <select
                      value={newTeacher.semester}
                      onChange={(e) => setNewTeacher({ ...newTeacher, semester: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Branch</label>
                    <select
                      value={newTeacher.branch}
                      onChange={(e) => setNewTeacher({ ...newTeacher, branch: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="CSE">CSE</option>
                      <option value="ECE">ECE</option>
                      <option value="ME">ME</option>
                      <option value="CE">CE</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                      type="time"
                      value={newTeacher.startTime}
                      onChange={(e) => setNewTeacher({ ...newTeacher, startTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                      type="time"
                      value={newTeacher.endTime}
                      onChange={(e) => setNewTeacher({ ...newTeacher, endTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Assign Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAssigenment;