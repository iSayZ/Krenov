export const getApiUrl = () => {
  if (typeof window === 'undefined') {
    console.log('windows undefined', process.env.API_BASE_URL);
    return process.env.API_BASE_URL;
  }
  console.log(
    'process.env.NEXT_PUBLIC_API_BASE_URL',
    process.env.NEXT_PUBLIC_API_BASE_URL
  );
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};
