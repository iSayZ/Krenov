import { Suspense } from 'react';

import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}