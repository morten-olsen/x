import React from 'react';
import styled from 'styled-components';
import { Input } from '../input';

type FormFieldProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Info = styled.div``;

const Title = styled.div``;

const Description = styled.div``;

const Value = styled.div`
  flex: 1;
`;

const FormField: React.FC<FormFieldProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Wrapper>
      <Info>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Info>
      <Value>{children}</Value>
    </Wrapper>
  );
};

const Field = Object.assign(FormField, {
  Input,
});

export { Field };
