import React, { useState } from 'react';

const Add_To_Playlist = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleToggleVisibility = () => {
    setIsPublic(prevState => !prevState);
  };

  return (
    <div>
      <span className='mr-2'>Add to Playlist</span>
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="currentColor" 
        className="bi bi-play" 
        viewBox="0 0 16 16"
      >
        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
      </svg>

      <div>
        <button onClick={handleToggleVisibility} className="btn btn-primary mt-2">
          {isPublic ? 'Make Private' : 'Make Public'}
        </button>
      </div>
    </div>
  );
};

export default Add_To_Playlist;
