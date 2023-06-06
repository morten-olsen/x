import { Dialog } from '@morten-olsen/x-ui';

type Props = {
  children: React.ReactNode;
};

const Login: React.FC<Props> = ({ children }) => {
  return (
    <Dialog open={true}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export { Login };
