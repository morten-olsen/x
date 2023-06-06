type AuthLoginComponent = React.ComponentType<{
  success: (data: any) => void;
  cancel: () => void;
}>;

type AuthClient = {
  id: string;
  login: AuthLoginComponent;
};

export type { AuthClient, AuthLoginComponent };
