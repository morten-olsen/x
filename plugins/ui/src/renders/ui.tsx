import { Root } from '@morten-olsen/x-blocks';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { emitter } from '../events';

const Wrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div<{
  visible: boolean;
}>`
  width: 300px;
  max-width: 80vw;
  height: 100vh;
  z-index: 2;
  border-right: 1px solid ${({ theme }) => theme.colors.bg.base100};
  background: ${({ theme }) => theme.colors.bg.base};
  overflow-y: auto;
  @media screen and (max-width: 800px) {
    position: absolute;
    transition: transform 0.2s ease-in-out;
    ${({ visible }) =>
      visible ? 'transform: translateX(0);' : 'transform: translateX(-100%);'}
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100vh;
  overflow: auto;
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  ${({ visible }) => (visible ? 'opacity: 1;' : 'opacity: 0;')}
  backdrop-filter: blur(5px);
  transition: opacity 0.4s ease-in-out;
`;

const UI: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const sidebarId = useMemo(
    () => ({
      id: 'root-sidebar',
      type: 'sidebar',
      plugin: 'ui',
      content: {},
    }),
    [],
  );

  useEffect(() => {
    const hide = () => {
      setSidebarVisible(true);
    };
    emitter.on('sidebar:open', hide);
    return () => {
      emitter.off('sidebar:open', hide);
    };
  }, []);

  const workspaceId = useMemo(
    () => ({
      id: 'root-workspace',
      type: 'workspace',
      plugin: 'ui',
      content: {},
    }),
    [],
  );

  return (
    <Wrapper>
      <Overlay
        onClick={() => setSidebarVisible(false)}
        visible={sidebarVisible}
      />
      <SidebarWrapper visible={sidebarVisible}>
        <Root block={sidebarId} />
      </SidebarWrapper>
      <ContentWrapper>
        <Root block={workspaceId} />
      </ContentWrapper>
    </Wrapper>
  );
};

export { UI };
