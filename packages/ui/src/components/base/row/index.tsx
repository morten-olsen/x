import React from 'react';
import styled from 'styled-components';
import { BaseElement } from '../element';

type RowProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
};

const Cell = styled(BaseElement)`
  padding: 0 ${({ theme }) => `${theme.space.md / 2}${theme.units.space}`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(BaseElement)`
  flex: 1;
  justify-content: flex-start;
  cursor: default;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.highlight100};
    color: ${({ theme }) => theme.colors.text.highlight};
  }
`;

const Content = styled(BaseElement)`
  padding: 0 ${({ theme }) => `${theme.space.md / 2}${theme.units.space}`};
  flex: 1;
  justify-content: flex-start;
`;

const Title = styled.div``;

const Description = styled(BaseElement)``;

const Root: React.FC<RowProps> = ({
  left,
  right,
  title,
  description,
  children,
  onPress,
}) => {
  return (
    <Wrapper onClick={onPress} $px="sm" $pm={0.5} $fr>
      {left}
      <Content $fc>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children}
      </Content>
      {right}
    </Wrapper>
  );
};

const Row = Object.assign(Root, {
  Cell,
});

export { Row };
