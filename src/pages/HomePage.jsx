import React, { useState } from 'react';
import { NewsApp } from "../components/newsapp";
import { NotesApp } from "../components/notesapp";
import { YoutubeApp } from '../components/youtubeapp';

const HomePage = () => {
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full py-10 justify-center items-middle font-thin tracking-wider text-center text-5xl text-black">
        Admin Dashboard
      </div>
      <div className="flex justify-center items-center mb-5 tracking-widest">
        <ul className="flex space-x-14">
          <li
            className={`cursor-pointer text-lg font-semibold ${
              activeTab === 'notes' ? 'text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick('notes')}
          >
            Notes
          </li>
          <li
            className={`cursor-pointer text-lg font-semibold ${
              activeTab === 'news' ? 'text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick('news')}
          >
            News
          </li>
          <li
            className={`cursor-pointer text-lg font-semibold ${
              activeTab === 'youtubeID' ? 'text-gray-900' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick('youtubeID')}
          >
           YoutubeID
          </li>
        </ul>
      </div>
      {activeTab === 'news' && (
        <div className="flex justify-center">
          <NewsApp />
        </div>
      )}
      {activeTab === 'notes' && (
        <div className="flex justify-center">
          <NotesApp />
        </div>
      )}
      {activeTab === 'youtubeID' && (
        <div className="flex justify-center">
          <YoutubeApp />
        </div>
      )}
    </>
  );
};

export default HomePage;
