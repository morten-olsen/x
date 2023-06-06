import { StoryObj, Meta } from '@storybook/react';
import { Dialog } from '.';

type Story = StoryObj<typeof Dialog>;

const meta = {
  title: 'Components/Base/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

const docs: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseButton />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  ),
};

export default meta;
export { docs };
