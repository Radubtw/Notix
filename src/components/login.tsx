import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
type Props = {}

function Login({}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var isProfessor = "false";
  const handleIsProfessorChange = async () => 
  {
    if (isProfessor === "true")
      isProfessor = "false"
    else isProfessor = "true"
  }
  const handleLogin = async () => {
    try {
      console.log("IsProfessor:" , isProfessor)
      const response = await axios.post(
        'http://localhost:3001/api/session/login',
        {
          email,
          password,
          isProfessor
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login response: ', response.data);
      if (response.status === 200)
      {
        const checkSessionResponse = await axios.get('http://localhost:3001/api/session/check-session', {
          withCredentials: true,
        });
      
        console.log('Check session response:', checkSessionResponse.data);

        if (checkSessionResponse.status == 200){
          navigate('/menu')
        } else {
          console.error('Login Failed:', 'User not logged in');
        }
      } else {
        console.error('Login failed: ', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{
        backgroundImage: `url(/login.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}
    className='h-screen w-screen'
    >
        <div className='h-screen w-screen items-center justify-center flex flex-col space-y-20'>
            <h1 className='text-white text-9xl text-center justify-center'>NOTIX</h1>
            <form className='px-40 py-12 bg-opacity-75 rounded-md bg-white flex flex-col text-center text-black text-xl'>
                <label>Email</label>
                <input 
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='rounded-md text-center'>
                </input>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  id = "password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded-md text-center'>
                </input>
                <label>Sunt profesor</label>
                <input
                type="checkbox"
                name="Sunt Profesor"
                id="isProfessor"
                value={isProfessor}
                onClick={handleIsProfessorChange}>
                </input>
            </form>
            <button className='px-16 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85' type="button" onClick={handleLogin}>Log In</button>
        </div>
    </div>
  )
}

export default Login