import { BlocksProvider } from './blocks';
import { DatabaseProvider } from './database';
import { type Plugin, PluginsProvider } from './plugins';
import { type Database } from './database';
import { BlockRelationsProvider } from './block-relations';
import { ApiProvider } from './api';
import { AuthClient, AuthProvider } from './auth';
import { BlockRefProvider } from './block-ref';
import { NotificationsProvider } from './notifications';

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
      <NotificationsProvider>
        <AuthProvider clients={auth.clients} render={auth.render}>
          <BlockRelationsProvider>
            <BlocksProvider>
              <PluginsProvider plugins={plugins}>
                <ApiProvider>{children}</ApiProvider>
              </PluginsProvider>
            </BlocksProvider>
          </BlockRelationsProvider>
        </AuthProvider>
      </NotificationsProvider>
    </BlockRefProvider>
  </DatabaseProvider>
);

export { XProvider };
