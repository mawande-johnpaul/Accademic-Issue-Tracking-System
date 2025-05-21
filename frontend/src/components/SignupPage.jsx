import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {

    // Updated college/department and course structure to match backend DEPARTMENT_CHOICES
    const COLLEGES = {
        'COCIS': ['BSCS', 'BSEE', 'BLIS', 'BIST'],
        'COBAMS': ['BSBA', 'BSCOMM', 'BSECON'],
        'CONAS': ['BSN', 'BSHRM', 'BSED'],
        'CEDAT': ['BSC CIVIL', 'BSC MECH', 'BSC ELEC', 'BSC TELECOM', 'BSC SURVEY'],
        'CAES': ['BSC AGRIC', 'BSC FOOD SCI', 'BSC FORESTRY', 'BSC AGRIBUSINESS'],
        'CHUSS': ['BA LIT', 'BA LING', 'BA HIST', 'BA PHIL'],
        'CHS': ['MBCHB', 'BDS', 'BNS', 'BPHARM'],
        'LAW': ['LLB'],
        'SCHOOL_OF_EDUCATION': ['BED ARTS', 'BED SCI', 'BED PRIMARY'],
        'SCHOOL_OF_BUSINESS': ['BBA', 'BCOM', 'BIB'],
        'SCHOOL_OF_BUILT_ENVIRONMENT': ['BSC LAND ECON', 'BSC QUANTITY SURVEY', 'BSC CONSTRUCTION MGT']
    }
    
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [webmail, setWebmail] = useState('');
    const [course, setCourse] = useState('Select a course first');
    const [department, setDepartment] = useState('');
    const [verificationPending, setVerificationPending] = useState(false);
    const [isWebmailValid, setIsWebmailValid] = useState(false); // Track webmail validity
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

    const navigate = useNavigate();

    const signup = async (event) => {
      event.preventDefault();

      // Check for empty fields
      if (!first_name || !last_name || !username || !password || !email || !webmail || !department || !course) {
        setMessage('All fields are required. Please fill in all the details.');
        return;
      }

      setIsSubmitting(true); // Disable the submit button

      try {
        const response = await axios.post('https://aitsmak.up.railway.app/signup/', { first_name, last_name, username, password, email, webmail, department, course });
        sessionStorage.setItem('token', response.data.token); // Fixed key for token
        sessionStorage.setItem('user', JSON.stringify(response.data.user));

        navigate("/login");

      } catch (error) {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          if (errors.non_field_errors) {
            setMessage(errors.non_field_errors[0]);
          } else if (errors.email) {
            setMessage(errors.email[0]);
          } else if (errors.webmail) {
            setMessage(errors.webmail[0]);
          } else {
            setMessage('Signup failed. Please check your input and try again.');
          }
        } else {
          setMessage('Signup failed. An unexpected error occurred.');
        }
        console.error(error);
      } finally {
        setIsSubmitting(false); // Re-enable the submit button
      }
    };

    /*const verifyEmail = async () => {
      const userString = sessionStorage.getItem('user');
    
      if (!userString) {
        console.error("No user found in session storage.");
        setMessage("User not found. Please sign up again.");
        return;
      }
    
      const user = JSON.parse(userString);
    
      if (!user || !user.id) {
        console.error("Invalid user object:", user);
        setMessage("Invalid user data. Please sign up again.");
        return;
      }
    
      try {
        const response = await axios.get(
          `https://aitsmak.up.railway.app/user/${user.id}/` // Ensure the endpoint matches the backend
        );
        const updatedUser = response.data;
    
        if (updatedUser.is_email_verified) {
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          setMessage('Email verified successfully! Redirecting...');
    
          if (updatedUser.role === "lecturer") {
            navigate("/lecturer");
          } else if (updatedUser.role === "registrar") {
            navigate("/registrar");
          } else {
            navigate("/student");
          }
        } else {
          setMessage('Email is not verified yet. Please check your inbox or spam folder.');
        }
      } catch (error) {
        console.error('Error checking verification:', error);
        setMessage('An error occurred while checking verification. Login Instead!');
      }
    };*/
    
    const handleWebmailChange = (e) => {
      const value = e.target.value;
      setWebmail(value);

      // Check if 'students' is in the webmail
      if (value.includes('mak.ac.ug')) {
        setIsWebmailValid(true);
        setMessage(''); // Clear any previous error message
      } else {
        setIsWebmailValid(false);
        setMessage('Webmail must contain "mak.ac.ug".');
      }
    };

    return (
      <div className='homepage'>
        <img src='banner2.jpeg' alt='banner2'></img>
          <h1 className='h2'>Create your free AITS account</h1>
          <form onSubmit={signup} className='congested-signuplower'>
            <div className='lower'>
                <div className='row'>
                  <input type="text" className='inputs' name='first_name'
                    value={first_name}
                    placeholder='First name.'
                    required
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="text" className='inputs' name='last_name'
                    value={last_name}
                    required
                    placeholder='Last name.'
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="text"  className='inputs'                   
                    value={username} 
                    placeholder='Username.'
                    required
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='row'>
                  <input type="email" className='inputs'
                    value={email} 
                    placeholder='Email'
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className='lower'>
              <div className='row'>
                <input type="text" className='inputs'
                  value={webmail} 
                  required
                  placeholder='Webmail e.g. xxxxxxx.students.mak.ac.ug'
                  onChange={handleWebmailChange} />
              </div>
              <div className='row'>
                <input type="password" className='inputs'
                  value={password} 
                  placeholder='Password.'
                  required
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className='row'>
                <select type="text" className='inputs'
                  value={department} 
                  required
                  disabled={!isWebmailValid} // Disable if webmail is invalid
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setCourse('Select a course first'); // Reset course when department changes
                  }}>
                  <option value="">Select a college</option>
                  {Object.keys(COLLEGES).map((college, index) => (
                    <option key={index} value={college}>{college}</option>
                  ))}
                </select>
              </div>
              <div className='row'>
                <select type="text" className='inputs' choices={COLLEGES[department]}
                  value={course} 
                  required
                  disabled={!isWebmailValid || !department} // Disable if webmail or department is invalid
                  onChange={(e) => setCourse(e.target.value)}>
                  <option value="Select a course first">Select a course first</option>
                  {COLLEGES[department] && COLLEGES[department].map((course, index) => (
                    <option key={index} value={course}>{course}</option>
                  ))}
                </select> 
              </div>
            </div>
          </form>
          {verificationPending ? (
            <div className='choicearea'>
              <button className='buttons' style={{ marginTop: '10px' }} onClick={verifyEmail}>
                Verify Email
              </button>
            </div>
          ) : (
            <div className='choicearea'>
              <button type="submit" className='buttons' style={{ margin: "auto" }} onClick={signup} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Signup'}
              </button>
            </div>
          )}
          <Link to='/login'>Already have an account?</Link>
          {message && <div style={{color:"red"}}>{message}</div>}
      </div>
    );
  }

export default SignupPage;