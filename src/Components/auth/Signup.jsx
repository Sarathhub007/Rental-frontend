import { SignUp } from '@clerk/clerk-react';
import React from 'react';

function Signup() {
  const styles = {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    height: "100vh", // Full viewport height
    backgroundColor: "#f9f9f9" // Optional: Light background
  };

  return (
    <div style={styles}>
      <SignUp signInUrl='/Sign-in' />
    </div>
  );
}

export default Signup;
