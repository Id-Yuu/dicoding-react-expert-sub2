const BASE_URL = 'https://forum-api.dicoding.dev/v1';

// Auth functions
const getAccessToken = () => localStorage.getItem('accessToken');
const putAccessToken = (token) => localStorage.setItem('accessToken', token);

// Helper function for authenticated requests
const _fetchWithAuth = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

// Auth API calls
const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const { status, message, data: { user } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return user;
};

const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const { status, message, data: { token } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return token;
};

const getOwnProfile = async () => {
  const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
  const { status, message, data: { user } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return user;
};

// Users API calls
const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const { status, message, data: { users } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return users;
};

// Threads API calls
const createThread = async ({ title, body, category }) => {
  const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, category }),
  });

  const { status, message, data: { thread } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return thread;
};

const getAllThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`);
  const { status, message, data: { threads } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return threads;
};

const getThreadDetail = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  const { status, message, data: { detailThread } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return detailThread;
};

// Comments API calls
const createComment = async ({ content, threadId }) => {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  const { status, message, data: { comment } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return comment;
};

// Vote API calls
const upVoteThread = async (id) => {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const { status, message } = await response.json();
  if (status !== 'success') throw new Error(message);
};

const downVoteThread = async (id) => {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/down-vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const { status, message } = await response.json();
  if (status !== 'success') throw new Error(message);
};

const neutralizeThreadVote = async (id) => {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/neutral-vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const { status, message } = await response.json();
  if (status !== 'success') throw new Error(message);
};

// Comment votes API calls
const validateIds = (threadId, commentId = null) => {
  if (!threadId) {
    throw new Error('Thread ID is required');
  }
  if (commentId !== null && !commentId) {
    throw new Error('Comment ID is required');
  }
};

const handleCommentVote = async (threadId, commentId, voteType) => {
  validateIds(threadId, commentId);

  const response = await _fetchWithAuth(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const { status, message } = await response.json();
  if (status !== 'success') throw new Error(message);
};

const upVoteComment = (threadId, commentId) =>
  handleCommentVote(threadId, commentId, 'up-vote');

const downVoteComment = (threadId, commentId) =>
  handleCommentVote(threadId, commentId, 'down-vote');

const neutralVoteComment = (threadId, commentId) =>
  handleCommentVote(threadId, commentId, 'neutral-vote');

// Leaderboard API calls
const getLeaderBoards = async () => {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const { status, message, data: { leaderboards } = {} } = await response.json();
  if (status !== 'success') throw new Error(message);
  return leaderboards;
};

const api = {
  // Auth
  getAccessToken,
  putAccessToken,
  register,
  login,
  getOwnProfile,
  // Users
  getAllUsers,
  // Threads
  createThread,
  getAllThreads,
  getThreadDetail,
  // Comments
  createComment,
  // Thread votes
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  // Comment votes
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  // Leaderboards
  getLeaderBoards,
};

export default api;