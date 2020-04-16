import React, {useEffect, useState} from 'react';

export default function TodoForm ({onSubmit, title, type="create"}) {
  const [isDone, setIsDones] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
  },[]);

  async function handleSubmit (e) {
    e.preventDefault();

    if(type==="create"){
      await onSubmit({ description });
    }else{
      await onSubmit({ description, isDone });

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {type==="create" ? null :
        <div className="input-block">
          <label htmlFor="isDone">Done</label>
          <input
            type="text"
            name="isDone"
            id="isDone"
            required
            value={isDone}
            onChange={ e => setIsDones(e.target.value)}
          />
        </div>
      }
      <div className="input-block">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          required
          value={description}
          onChange={ e => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
