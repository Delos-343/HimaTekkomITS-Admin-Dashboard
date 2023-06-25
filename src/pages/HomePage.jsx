import React from 'react';
import NotesApp from './NewsApp';

const HomePage = () => {
  return (
    <>
      <div className="w-full py-10 justify-center items-middle font-semibold tracking-wide text-center text-5xl">
        Admin Dashboard
      </div>
      <NotesApp />
    </>
  )
}

export default HomePage
