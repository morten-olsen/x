import { Root } from '@morten-olsen/x-blocks';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.div`
  width: 300px;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.bg.base100};
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100vh;
  overflow: auto;
`;
const UI: React.FC = () => {
  const sidebarId = useMemo(
    () => ({
      id: 'root-sidebar',
      type: 'sidebar',
      plugin: 'ui',
      content: {},
    }),
    [],
  );

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
      <SidebarWrapper>
        <Root block={sidebarId} />
      </SidebarWrapper>
      <ContentWrapper>
        <Root block={workspaceId} />
      </ContentWrapper>
    </Wrapper>
  );
};

export { UI };
