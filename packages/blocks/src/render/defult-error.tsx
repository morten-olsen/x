type ErrorProps = {
  message: string;
};

const DefaultError: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{message}</p>
    </div>
  );
};

export { DefaultError };
