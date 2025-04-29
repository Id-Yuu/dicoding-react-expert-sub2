import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadsList from '@components/thread/lists';
import fetchAllLeaderBoards from '@store/shared/action';
import {
  fetchUpVoteThread,
  fetchDownVoteThread,
  fetchClearVoteThread,
} from '@store/threads/action';

const PageHome = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const { threads = [], users = [], authUser } = useSelector((states) => states);

  useEffect(() => {
    dispatch(fetchAllLeaderBoards());
  }, [dispatch, authUser]);

  const dispatchAction = (action) => (id) => {
    dispatch(action(id));
  };

  const onUpVoteThread = dispatchAction(fetchUpVoteThread);
  const onDownVoteThread = dispatchAction(fetchDownVoteThread);
  const onNeturalizeVoteThread = dispatchAction(fetchClearVoteThread);

  const categories = new Set(threads.map((thread) => thread.category));

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const filteredThreads = filter
    ? threadList.filter((thread) => thread.category === filter)
    : threadList;

  const handleCategoryClick = (category) => () => {
    setFilter(filter === category ? '' : category);
  };

  const renderCategoryButton = (category) => (
    <button
      role="tab"
      className="tab"
      key={category}
      onClick={handleCategoryClick(category)}
    >
      {`#${category}`}
    </button>
  );

  return (
    <div className="container mx-auto">
      <div role="tablist" className="tabs tabs-box">
        {Array.from(categories).map(renderCategoryButton)}
      </div>
      <div className="flex justify-evenly items-center py-3">
        <h1>Threads</h1>
        <Link className="btn btn-secondary" to="/new">
          Create Thread
        </Link>
      </div>
      <ThreadsList
        threads={filteredThreads}
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neturalizeVote={onNeturalizeVoteThread}
      />
    </div>
  );
};

export default PageHome;