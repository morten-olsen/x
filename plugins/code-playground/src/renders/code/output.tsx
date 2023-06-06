import {
  createElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { resolveCheck } from '.';

function isClassComponent(
  component: unknown,
): component is React.ComponentClass {
  return (
    typeof component === 'function' && !!component.prototype.isReactComponent
  );
}

function isFunctionComponent(component: unknown): component is React.FC {
  return (
    typeof component === 'function' &&
    String(component).includes('return React.createElement')
  );
}

function isReactComponent(
  component: unknown,
): component is React.ComponentType {
  return isClassComponent(component) || isFunctionComponent(component);
}

function isElement(element: unknown): element is React.ReactElement {
  return isValidElement(element);
}

function isDOMTypeElement(
  element: unknown,
): element is React.DOMElement<any, any> {
  return isElement(element) && typeof element.type === 'string';
}

function isCompositeTypeElement(
  element: unknown,
): element is React.ReactElement<any, any> {
  return isElement(element) && typeof element.type === 'function';
}

type OutputProps = {
  value: unknown;
};

const render = async (value: unknown): Promise<any> => {
  if (value && (value as any)._resolve) {
    const response = typeof value === 'function' ? value() : value;
    return render(await Promise.resolve(response));
  }
  if (isReactComponent(value)) {
    return createElement(value);
  }
  if (isDOMTypeElement(value)) {
    return createElement(value.type, value.props);
  }
  if (isCompositeTypeElement(value)) {
    return createElement(value.type, value.props);
  }
  if (isElement(value)) {
    return value;
  }
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
};

const Output: React.FC<OutputProps> = ({ value }) => {
  const [result, setResult] = useState<any>(null);
  useEffect(() => {
    const run = async () => {
      setResult(await render(value));
    };
    run();
  }, [value]);

  return <div>{result}</div>;
};

export { Output };
