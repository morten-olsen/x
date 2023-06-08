import * as DialogPrimitives from '@radix-ui/react-dialog';
import React, { forwardRef } from 'react';
import { styled } from 'styled-components';
import { FiX } from 'react-icons/fi';
import { styles } from '../typography';

const Root = styled(DialogPrimitives.Root)``;

const Overlay = styled(DialogPrimitives.Overlay)`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(5px);
`;

const Portal = styled(DialogPrimitives.Portal)``;

const Content = styled(DialogPrimitives.Content)`
  z-index: 1000;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.bg.base100};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
`;

const Title = styled(DialogPrimitives.Title)`
  margin: 0;
  font-weight: 500;
  font-size: 17px;
  ${styles.dialogTitle}
`;

const Description = styled(DialogPrimitives.Description)`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

const Trigger = styled(DialogPrimitives.Trigger)``;

const Close = styled(DialogPrimitives.Close)`
  all: unset;
`;

const CloseButtonWrapper = styled(DialogPrimitives.Close)`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: var(--violet4);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
`;

const CloseButton = forwardRef<
  React.ComponentProps<typeof CloseButtonWrapper>,
  React.ComponentPropsWithoutRef<typeof CloseButtonWrapper>
>((props, forwardedRef) => (
  <CloseButtonWrapper {...props} ref={forwardedRef as any}>
    <FiX />
  </CloseButtonWrapper>
));

const Dialog = Object.assign(Root, {
  Overlay,
  Portal,
  Content,
  Title,
  Description,
  Trigger,
  CloseButton,
  Close,
});

export {
  Dialog,
  Root,
  Overlay,
  Portal,
  Content,
  Title,
  Description,
  Trigger,
  CloseButton,
  Close,
};
