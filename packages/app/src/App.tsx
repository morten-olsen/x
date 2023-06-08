import { useMemo } from 'react';
import { XProvider, Root } from '@morten-olsen/x-blocks';
import { UIProvider } from '@morten-olsen/x-ui';
import { IndexedDBDatabase } from '@morten-olsen/x-db-indexeddb';

import text from '@morten-olsen/x-plugin-text';
import container from '@morten-olsen/x-plugin-container';
import ui from '@morten-olsen/x-plugin-ui';
import github from '@morten-olsen/x-plugin-github';
import { playground } from '@morten-olsen/x-plugin-code-playground';
import linear from '@morten-olsen/x-plugin-linear';
import slack from '@morten-olsen/x-plugin-slack';

import { githubAuth } from '@morten-olsen/x-auth-github';
import { linearAuth } from '@morten-olsen/x-auth-linear';
import { slackAuth } from '@morten-olsen/x-auth-slack';
import { Login } from './components/login';

const App: React.FC = () => {
  const database = useMemo(() => new IndexedDBDatabase(), []);
  const plugins = useMemo(
    () => [text, container, ui, playground, github, linear, slack],
    [],
  );
  const auth = useMemo(
    () => ({
      clients: [githubAuth, linearAuth, slackAuth],
      render: Login,
    }),
    [],
  );
  const root = useMemo(
    () => ({
      id: 'root-ui',
      type: 'ui',
      plugin: 'ui',
      content: {},
    }),
    [],
  );
  return (
    <UIProvider>
      <XProvider database={database} plugins={plugins} auth={auth}>
        <Root block={root} />
      </XProvider>
    </UIProvider>
  );
};

export default App;
