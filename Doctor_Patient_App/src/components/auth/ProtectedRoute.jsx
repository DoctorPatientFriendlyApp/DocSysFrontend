import React from 'react'
import { Navigate } from 'react-router-dom'




function ProtectedRoute({allowedRoles ,children}) {

    const storeduser = localStorage.getItem("user");

     if(!storeduser) { return <Navigate to="/login" replace />}

    const user = JSON.parse(storeduser);
    console.log(user);
                                                            // Avoid redirect loop when already on access-denied page
    if(allowedRoles && !allowedRoles.includes(user.role) && location.pathname !== "/access-denied"){

       return <Navigate to="/access-denied" replace />;
    }

  return children;
}

export default ProtectedRoute
