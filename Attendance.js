import React, { useState } from 'react';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const initialStudents = [
  { id: 1, name: 'John Doe', present: false },
  { id: 2, name: 'Jane Smith', present: false },
  { id: 3, name: 'Ravi Kumar', present: false }
];

const Attendance = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedDate, setSelectedDate] = useState('');

  const toggleAttendance = (id) => {
    const updated = students.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const saveAttendance = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const attendanceData = students.map(s => ({
      Name: s.name,
      Status: s.present ? "Present" : "Absent",
      Date: selectedDate
    }));

    console.log("Attendance Saved:", attendanceData);
    alert("Attendance saved successfully (check console)!");
  };

  const exportToPDF = () => {
    if (!selectedDate) return alert("Select a date first.");

    const doc = new jsPDF();
    doc.text(`Attendance on ${selectedDate}`, 10, 10);
    students.forEach((s, i) => {
      doc.text(`${i + 1}. ${s.name} - ${s.present ? 'Present' : 'Absent'}`, 10, 20 + i * 10);
    });
    doc.save(`Attendance_${selectedDate}.pdf`);
  };

  const exportToExcel = () => {
    if (!selectedDate) return alert("Select a date first.");

    const data = students.map(s => ({
      Name: s.name,
      Status: s.present ? "Present" : "Absent",
      Date: selectedDate
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, `Attendance_${selectedDate}.xlsx`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: 20, background: "#ffffffcc", borderRadius: 12 }}>
      <h2>📅 Attendance Page</h2>

      <label>
        Select Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <ul style={{ marginTop: 20 }}>
        {students.map(student => (
          <li key={student.id}>
            {student.name}
            <button className="toggle-btn" onClick={() => toggleAttendance(student.id)}>
              {student.present ? 'Present' : 'Absent'}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button className="save-btn" onClick={saveAttendance}>💾 Save Attendance</button>{' '}
        <button className="pdf-btn" onClick={exportToPDF}>📄 Export PDF</button>{' '}
        <button className="excel-btn" onClick={exportToExcel}>📊 Export Excel</button>
      </div>
    </div>
  );
};

export default Attendance;
