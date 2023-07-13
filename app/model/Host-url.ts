export const HostUrl = (): string => {
  return process.env.NEXT_PUBLIC_HOST_URL ?? "";
};
