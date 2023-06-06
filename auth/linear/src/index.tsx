import { AuthClient, AuthLoginComponent } from '@morten-olsen/x-blocks';
import { useState } from 'react';

const Login: AuthLoginComponent = ({ success }) => {
  const [apiKey, setApiKey] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={() => success({ apiKey })}>Save</button>
    </div>
  );
};
const linearAuth: AuthClient = {
  id: 'linear',
  login: Login,
};

export { linearAuth };
