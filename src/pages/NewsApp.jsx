import React, { useState } from 'react';
import { NewsList } from "../components/newsapp";
import { NotesApp } from "../components/notesapp";

const HomePage = () => {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full py-10 justify-center items-middle font-semibold tracking-wider text-center text-5xl">
        Dawe's TA ~ Dashboard
      </div>
      <div className="flex justify-center items-center mb-5 tracking-widest">
        <ul className="flex space-x-14">
          <li
            className={`cursor-pointer text-lg font-semibold ${
              activeTab === 'notes' ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick('notes')}
          >
            Notes
          </li>
          <li
            className={`cursor-pointer text-lg font-semibold ${
              activeTab === 'news' ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick('news')}
          >
            News
          </li>
        </ul>
      </div>
      {activeTab === 'notes' && (
        <div className="flex justify-center">
          <NotesApp />
        </div>
      )}
      {activeTab === 'news' && (
        <div className="flex justify-center">
          <NewsList />
        </div>
      )}
    </>
  );
};

export default HomePage;
