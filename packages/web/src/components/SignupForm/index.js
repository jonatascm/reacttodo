import React, {useEffect, useState} from 'react';

export default function SignupForm ({onSubmit}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
  },[]);

  async function handleSubmit (e) {
    e.preventDefault();

    await onSubmit({
      email,
      password,
      name,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="input-block">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={ e => setName(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={ e => setEmail(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={ e => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}
