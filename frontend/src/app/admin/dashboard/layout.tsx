import { Metadata } from 'next';

import ClientDashboardLayout from './ClientDashboardLayout';

export const metadata: Metadata = {
  title: {
    template: 'K-Renov | Dashboard',
    default: 'K-Renov | Dashboard',
  },
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
};

export default DashboardLayout;
