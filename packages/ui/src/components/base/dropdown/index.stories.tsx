import { StoryObj, Meta } from '@storybook/react';
import { DropdownMenu } from '.';

type Story = StoryObj<typeof DropdownMenu>;

const meta = {
  title: 'Components/Base/DropDown',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

const docs: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Open Dialog</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            Item 1<DropdownMenu.RightSlot>Foo</DropdownMenu.RightSlot>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              Item 2<DropdownMenu.RightSlot>⌘+A</DropdownMenu.RightSlot>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent sideOffset={2} alignOffset={-5}>
                <DropdownMenu.Item>Sub Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Sub Item 2</DropdownMenu.Item>
                <DropdownMenu.Item>Sub Item 3</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  ),
};

export default meta;
export { docs };
