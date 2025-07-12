import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Student Attendance System</h1>
      <Link to="/attendance">
        <button>Go to Attendance Page</button>
      </Link>
    </div>
  );
};

export default Home;
