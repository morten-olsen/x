import { styled } from 'styled-components';
import { Theme } from '../../../theme';

type SizeKey = keyof Theme['space'];

const getSize = (
  theme: Theme,
  sizes: (SizeKey | undefined)[],
  multi: number = 1,
) => {
  while (sizes.length) {
    const size = sizes.shift();
    if (size) {
      const value = theme.space[size];
      if (value) {
        return `${value * multi}${theme.units.space}`;
      }
    }
  }
  return '0';
};

const BaseElement = styled.div<{
  $m?: SizeKey;
  $mt?: SizeKey;
  $mr?: SizeKey;
  $mb?: SizeKey;
  $ml?: SizeKey;
  $mx?: SizeKey;
  $my?: SizeKey;
  $mm?: number;
  $p?: SizeKey;
  $pt?: SizeKey;
  $pr?: SizeKey;
  $pb?: SizeKey;
  $pl?: SizeKey;
  $px?: SizeKey;
  $py?: SizeKey;
  $pm?: number;
  $fr?: boolean;
  $fc?: boolean;
  $flexWrap?: boolean;
  $f?: number;
  $items?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  $justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
}>`
  all: unset;
  margin-top: ${({ theme, $mt, $my, $m, $mm }) =>
    getSize(theme, [$mt, $my, $m], $mm)};
  margin-right: ${({ theme, $mr, $mx, $m, $mm }) =>
    getSize(theme, [$mr, $mx, $m], $mm)};
  margin-bottom: ${({ theme, $mb, $my, $m, $mm }) =>
    getSize(theme, [$mb, $my, $m], $mm)};
  margin-left: ${({ theme, $ml, $mx, $m, $mm }) =>
    getSize(theme, [$ml, $mx, $m], $mm)};
  padding-top: ${({ theme, $pt, $py, $p, $pm }) =>
    getSize(theme, [$pt, $py, $p], $pm)};
  padding-right: ${({ theme, $pr, $px, $p, $pm }) =>
    getSize(theme, [$pr, $px, $p], $pm)};
  padding-bottom: ${({ theme, $pb, $py, $p, $pm }) =>
    getSize(theme, [$pb, $py, $p], $pm)};
  padding-left: ${({ theme, $pl, $px, $p, $pm }) =>
    getSize(theme, [$pl, $px, $p], $pm)};
  ${({ $fr }) => $fr && 'display: flex;'}
  ${({ $fc }) => $fc && 'flex-direction: column; display: flex;'}
  ${({ $f }) => $f && `flex: ${$f};`}
  ${({ $flexWrap }) => $flexWrap && 'flex-wrap: wrap;'}
  ${({ $items }) => $items && `align-items: ${$items};`}
  ${({ $justify }) => $justify && `justify-content: ${$justify};`}
`;

export { BaseElement };
