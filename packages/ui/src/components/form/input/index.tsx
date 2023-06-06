import { styled } from 'styled-components';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const Wrapper = styled.div``;

const Error = styled.div``;

const Field = styled.input`
  all: unset;
  width: 100%;
  text-align: right;
`;

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  error,
  required,
  autoFocus,
  className,
  style,
}) => {
  return (
    <Wrapper className={className} style={style}>
      <Field
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export { Input };
