import React from 'react'

type Props = {}

function menu({}: Props) {
  return (
    <div style={{
        backgroundImage: `url(/login.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
    }}
    className='h-screen w-screen'
    >
        <div className='h-screen w-screen items-center justify-center flex flex-col space-y-6 text-center'>
            <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>Note</button>
            <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>Orar</button>
            <button className='px-24 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60'>Medii</button>
            <button className='px-20 py-4 rounded-sm bg-current bg-red-600 bg-opacity-85 w-60 text-center'>Absente</button>
        </div>

    </div>
  )
}

export default menu