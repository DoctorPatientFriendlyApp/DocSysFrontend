import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccessDenied() {
  const navigate = useNavigate();
  const handleGoBack=()=>{  
    navigate('/doctor/home');
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 text-center">
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted">You do not have permission to view this page.</p>
         <button className='btn btn-primary mt-3' onClick={handleGoBack}> Go Home </button>
      </div>
    </div>
  );
}
