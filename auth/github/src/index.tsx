import { AuthClient, AuthLoginComponent } from '@morten-olsen/x-blocks';
import { useState } from 'react';

const Login: AuthLoginComponent = ({ success }) => {
  const [pat, setPat] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Personal access token"
        value={pat}
        onChange={(e) => setPat(e.target.value)}
      />
      <button onClick={() => success({ pat })}>Save</button>
    </div>
  );
};
const githubAuth: AuthClient = {
  id: 'github',
  login: Login,
};

export { githubAuth };
