import { SignIn } from '@clerk/clerk-react';
import React from 'react';

function Signin() {
  const styles = {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundColor: "#f9f9f9" 
  };

  return (
    <div style={styles}> {/* Fixed the syntax here */}
      <SignIn signUpUrl='/Sign-up' />
    </div>
  );
}

export default Signin;
