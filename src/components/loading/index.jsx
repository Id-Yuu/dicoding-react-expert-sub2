import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export const Loading = () => {
  return (
    <div className="loading-bar">
      <LoadingBar showFastActions style={{ backgroundColor: 'blue', height: '5px' }}/>
    </div>
  );
};
