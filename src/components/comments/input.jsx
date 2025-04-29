import React from 'react';
import PropTypes from 'prop-types';
import useInputs from '@hooks/useInputs';

const CommentInput = ({ addComment }) => {
  const [comment, onCommentChange, setComment] = useInputs('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment(comment);
    setComment('');
  };

  return (
    <fieldset className="fieldset my-1.5 bg-base-200 border-base-300 rounded-box w-md border p-4">
      <legend className="fieldset-legend">Tambahkan Komentar</legend>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="input w-full"
          value={comment}
          onChange={onCommentChange}
          placeholder="Add your comment here..."
          required
        />
        <button
          type="submit"
          className="btn btn-secondary"
        >
          Add
        </button>
      </form>
    </fieldset>
  );
};

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;