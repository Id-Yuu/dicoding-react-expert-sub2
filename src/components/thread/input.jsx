import React from 'react';
import PropTypes from 'prop-types';
import useInputs from '@hooks/useInputs';

const ThreadInput = ({ addThread }) => {
  const [title, onTitleChange] = useInputs('');
  const [category, onCategoryChange] = useInputs('');
  const [body, onBodyChange] = useInputs('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addThread({ title, category, body });
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">Tambah Thread</legend>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={title}
          onChange={onTitleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          className="input"
          value={category}
          onChange={onCategoryChange}
          placeholder="Category"
          required
        />
        <textarea
          className="textarea"
          value={body}
          onChange={onBodyChange}
          placeholder="Body"
          required
        />
        <button type="submit" className="btn btn-secondary">
          Add Thread
        </button>
      </form>
    </fieldset>
  );
};

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;