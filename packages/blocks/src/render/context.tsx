import { createContext, useContext, useMemo } from 'react';
import { BlockProvider } from '../block';
import { RenderContent } from './content';
import { BlockRef, stringifyRef } from '../block-ref';
import { ErrorBoundary } from './error';
import { DefaultError } from './defult-error';

type RenderContextValue = {
  parents: string[];
  id: BlockRef;
  readOnly: boolean;
  parent?: BlockRef;
};

type RenderProviderProps = {
  id: BlockRef;
  view?: string;
  readOnly?: boolean | 'inherit';
};

const RenderContext = createContext<RenderContextValue | null>(null);

const Render: React.FC<RenderProviderProps> = ({
  id,
  view,
  readOnly: readOnlyProp,
}) => {
  const parentContext = useContext(RenderContext);
  const parents = useMemo(
    () => [...(parentContext?.parents ?? [])],
    [parentContext],
  );
  const readOnly = useMemo(() => {
    if (readOnlyProp === true || readOnlyProp === false) {
      return readOnlyProp;
    }
    return parentContext?.readOnly ?? false;
  }, [readOnlyProp, parentContext?.readOnly]);

  const nextParents = useMemo(() => {
    return [...parents, stringifyRef(id)];
  }, [parents, id]);

  const isCircular = useMemo(() => {
    return parents.includes(stringifyRef(id));
  }, [parents, id]);

  const value = useMemo(
    () => ({ parents: nextParents, id, readOnly, parent: parentContext?.id }),
    [nextParents, id, readOnly, parentContext?.id],
  );

  if (isCircular) {
    return <DefaultError message="Circular reference" />;
  }

  return (
    <ErrorBoundary>
      <RenderContext.Provider value={value}>
        <BlockProvider id={id}>
          <RenderContent view={view} />
        </BlockProvider>
      </RenderContext.Provider>
    </ErrorBoundary>
  );
};

export { RenderContext, Render };
