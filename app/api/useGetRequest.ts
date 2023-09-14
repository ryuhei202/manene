import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HostUrl } from "../model/Host-url";
import { customAxios } from "../model/api/shared/custom-axios";

export const useGetRequest = <TResponse, TParams = object>({
  path,
  params,
  isEnabled,
}: {
  path: string;
  params?: TParams;
  isEnabled?: boolean;
}) => {
  const { data, refetch, error, isLoading } = useQuery<TResponse, AxiosError>(
    [path, params],
    () =>
      customAxios()
        .get(`${HostUrl()}/igoue_admin/app_api/${path}`, {
          headers: {
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          params: {
            ...params,
          },
        })
        .then((r) => {
          return r.data;
        })
        .catch((e) => {
          throw new Error(e.response.data.message);
        }),
    {
      enabled: isEnabled ?? true,
    }
  );

  return {
    data,
    refetch,
    error,
    isLoading,
  };
};
