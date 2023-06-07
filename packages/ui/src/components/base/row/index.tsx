import React from 'react';
import styled from 'styled-components';
import { BaseElement } from '../element';

type RowProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
};

const Cell = styled(BaseElement)`
  padding: 0 ${({ theme }) => `${theme.space.md / 2}${theme.units.space}`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled(BaseElement)<{ $onpress?: boolean }>`
  flex: 1;
  justify-content: flex-start;
  cursor: default;

  ${({ $onpress, theme }) =>
    $onpress &&
    `
  &:hover {
    background-color: ${theme.colors.bg.highlight100};
    color: ${theme.colors.text.highlight};
  }
  `}
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
  className,
  onPress,
}) => {
  return (
    <Wrapper
      className={className}
      onClick={onPress}
      $onpress={!!onPress}
      $px="sm"
      $pm={0.5}
      $fr
    >
      {left}
      <Content $fc>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
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
