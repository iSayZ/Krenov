import Link from 'next/link';
import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen w-screen bg-background p-10 text-foreground">
      <div className="flex size-full flex-col rounded border border-solid border-border bg-card shadow-xl">
        <div className="flex w-full items-center justify-between border-b border-solid border-border p-6 font-semibold">
          <nav className="flex space-x-4">
            <h1 className="text-2xl font-bold">Krenov - Dashboard</h1>
          </nav>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className="cursor-pointer hover:underline hover:decoration-solid"
            >
              Retour au site
            </Link>
            <p>/</p>
            <p className="cursor-pointer hover:underline hover:decoration-solid">
              Se déconnecter
            </p>
          </nav>
        </div>
        <div className="inset-0 flex size-full">
          <div className="flex w-auto flex-none flex-col border-r border-solid border-border p-6 font-semibold">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="hover:underline hover:decoration-solid"
              >
                Accueil
              </Link>
              <Link
                href="/dashboard/realisations"
                className="hover:underline hover:decoration-solid"
              >
                Mes réalisations
              </Link>
            </nav>
          </div>
          <div className="size-full p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
