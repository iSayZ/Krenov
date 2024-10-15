import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'K-Renov | Connexion Dashboard',
  },
};

const AdminLoginLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export default AdminLoginLayout;
