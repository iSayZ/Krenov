import { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    template: `${process.env.NEXT_APP_NAME} | Dashboard`,
    default: `${process.env.NEXT_APP_NAME} | Dashboard`,
  },
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default AdminLayout;
