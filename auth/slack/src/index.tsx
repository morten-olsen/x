import { AuthClient, AuthLoginComponent } from '@morten-olsen/x-blocks';
import { useState } from 'react';

const Login: AuthLoginComponent = ({ success }) => {
  const [token, setToken] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={() => success({ token })}>Save</button>
    </div>
  );
};
const slackAuth: AuthClient = {
  id: 'slack',
  login: Login,
};

export { slackAuth };
