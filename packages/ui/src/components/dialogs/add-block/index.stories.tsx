import { StoryObj, Meta } from '@storybook/react';
import { AddBlockDialog } from '.';

type Story = StoryObj<typeof AddBlockDialog>;

const meta = {
  title: 'Components/Dialogs/Add Block',
  component: AddBlockDialog,
} satisfies Meta<typeof AddBlockDialog>;

const docs: Story = {
  render: () => (
    <AddBlockDialog>
      <button>Open Dialog</button>
    </AddBlockDialog>
  ),
};

export default meta;
export { docs };
