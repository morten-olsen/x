import { BlockRef } from '../block-ref';
import { BlockProvider } from './context';

type WrappedProps = {
  id: BlockRef;
};

const withBlock = <T extends any>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<T & { id: BlockRef }> => {
  const WithPlugin: React.FC<WrappedProps & T> = (props) => (
    <BlockProvider id={props.id}>
      <WrappedComponent {...props} />
    </BlockProvider>
  );

  WithPlugin.displayName = `WithPlugin(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WithPlugin;
};

export type { WrappedProps };
export { withBlock };
