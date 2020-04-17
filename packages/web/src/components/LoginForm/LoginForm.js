import React, {useEffect, useState} from 'react';

export default function LoginForm ({onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
  },[]);

  async function handleSubmit (e) {
    e.preventDefault();

    await onSubmit({
      email,
      password,
    });

    //setEmail('');
    //setPassword('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
