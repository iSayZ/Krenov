import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: `${process.env.NEXT_PUBLIC_APP_NAME} | Connexion Dashboard`,
  },
};

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default AdminLoginLayout;
