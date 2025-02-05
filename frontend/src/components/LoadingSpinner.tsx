export const LoadingSpinner = () => (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div
        className="m-auto inline-block size-12 animate-spin rounded-full border-[3px] border-current border-t-transparent text-foreground"
        role="status"
        aria-label="loading"
      />
    </div>
  );