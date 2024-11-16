import React from 'react'
type Props = {}

function Login({}: Props) {
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
                <input type="email" name="email" className='rounded-md'></input>
                <label>Password</label>
                <input type="password" name="password" className='rounded-md'></input>
            </form>
            <button className='px-16 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85'>Log In</button>
        </div>
    </div>
  )
}

export default Login