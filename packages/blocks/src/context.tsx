import { BlocksProvider } from './blocks';
import { DatabaseProvider } from './database';
import { type Plugin, PluginsProvider } from './plugins';
import { type Database } from './database';
import { BlockRelationsProvider } from './block-relations';
import { ApiProvider } from './api';
import { AuthClient, AuthProvider } from './auth';
import { BlockRefProvider } from './block-ref';

type XProviderProps = {
  children: React.ReactNode;
  database: Database;
  plugins: Plugin[];
  auth: {
    clients: AuthClient[];
    render: React.ComponentType<{ children: React.ReactNode }>;
  };
};

const XProvider: React.FC<XProviderProps> = ({
  children,
  database,
  plugins,
  auth,
}) => (
  <DatabaseProvider database={database}>
    <BlockRefProvider>
      <AuthProvider clients={auth.clients} render={auth.render}>
        <PluginsProvider plugins={plugins}>
          <BlockRelationsProvider>
            <BlocksProvider>
              <ApiProvider>{children}</ApiProvider>
            </BlocksProvider>
          </BlockRelationsProvider>
        </PluginsProvider>
      </AuthProvider>
    </BlockRefProvider>
  </DatabaseProvider>
);

export { XProvider };
