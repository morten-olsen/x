import * as DropdownMenuPrimitives from '@radix-ui/react-dropdown-menu';
import { styled, css } from 'styled-components';

const RightSlot = styled.div`
  margin-left: auto;
  padding-left: 20px;
  color: var(--mauve11);
`;

const content = css`
  min-width: 220px;
  background: ${({ theme }) => theme.colors.bg.base100};
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const item = css`
  font-size: 13px;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;

  &[data-state='disabled'] {
    color: ${({ theme }) => theme.colors.text.disabled};
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.bg.highlight};
    color: ${({ theme }) => theme.colors.text.highlight};
  }

  &[data-highlighted] > ${RightSlot} {
    color: white;
  }

  &[data-disabled] ${RightSlot} {
    color: var(--mauve8);
  }
`;

const Root = styled(DropdownMenuPrimitives.Root)``;

const Content = styled(DropdownMenuPrimitives.Content)`
  ${content}
`;

const Trigger = styled(DropdownMenuPrimitives.Trigger)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Portal = styled(DropdownMenuPrimitives.Portal)``;

const Item = styled(DropdownMenuPrimitives.Item)`
  ${item}
`;

const Sub = styled(DropdownMenuPrimitives.Sub)``;

const SubTrigger = styled(DropdownMenuPrimitives.SubTrigger)`
  &[data-state='open'] {
    background-color: ${({ theme }) => theme.colors.bg.highlight100};
  }

  ${item}
`;

const Icon = styled.div`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const SubContent = styled(DropdownMenuPrimitives.SubContent)`
  min-width: 220px;
  background-color: white;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const Separator = styled(DropdownMenuPrimitives.Separator)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.bg.highlight100};
  margin: 5px;
`;

const CheckboxItem = styled(DropdownMenuPrimitives.CheckboxItem)``;

const ItemIndicator = styled(DropdownMenuPrimitives.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled(DropdownMenuPrimitives.Label)`
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: var(--mauve11);
`;

const RadioGroup = styled(DropdownMenuPrimitives.RadioGroup)``;

const RadioItem = styled(DropdownMenuPrimitives.RadioItem)`
  font-size: 13px;
  line-height: 1;
  color: var(--violet11);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
`;

const Arrow = styled(DropdownMenuPrimitives.Arrow)`
  fill: ${({ theme }) => theme.colors.bg.base100};
`;

const DropdownMenu = Object.assign(Root, {
  Root,
  Content,
  Trigger,
  Portal,
  Item,
  Sub,
  SubTrigger,
  SubContent,
  Separator,
  CheckboxItem,
  ItemIndicator,
  RightSlot,
  Label,
  RadioGroup,
  RadioItem,
  Arrow,
  Icon,
});

export { DropdownMenu };
