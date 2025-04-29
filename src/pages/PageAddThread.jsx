import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchAddThread } from '@store/threads/action';
import ThreadInput from '@components/thread/input';

const PageAddThread = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    // Validate thread data
    if (!title || !body || !category) {
      alert('Please fill in all fields');
      return;
    }

    const threadData = {
      title: title.trim(),
      body: body.trim(),
      category: category.trim().toLowerCase()
    };

    try {
      dispatch(fetchAddThread(threadData));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="max-w-md">
          <h2>Buat Thread Baru</h2>
          <ThreadInput addThread={onAddThread} />
        </div>
      </div>
    </div>
  );
};

export default PageAddThread;