import { styled, css } from 'styled-components';
import { BaseElement } from '../element';

const styles = {
  header: css`
    font-size: 32px;
    font-weight: bold;
  `,
  body: css`
    font-size: 14px;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: ${({ theme }) => theme.lineHeights.base};
    font-size: 16px;
    overflow-wrap: break-word;
  `,
  title: css`
    font-size: 14px;
    font-weight: bold;
  `,
  subtitle: css`
    font-weight: normal;
    font-size: 14px;
  `,
  dialogTitle: css`
    font-size: 24px;
    font-weight: 500;
  `,
  tiny: css`
    font-size: 10px;
  `,
} satisfies Record<string, ReturnType<typeof css>>;

type TypographyProps = {
  variant?: keyof typeof styles;
};

const getStyle = (variant: TypographyProps['variant']) => {
  if (variant && styles[variant]) {
    return styles[variant];
  }
  return styles.body;
};

const Typography = styled(BaseElement)<TypographyProps>`
  ${({ variant }) => getStyle(variant)}
`;

export { Typography, styles };
