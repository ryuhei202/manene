import { QueryClient } from "@tanstack/react-query";
import { HostUrl } from "../model/Host-url";
import { customAxios } from "../model/api/shared/custom-axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default async function fetchData<
  TResponse,
  TParams = object,
  THeaders = object
>({
  path,
  params,
  headers,
}: {
  path: string;
  params?: TParams;
  headers?: THeaders;
  isEnabled?: boolean;
}) {
  const data: TResponse = await queryClient.fetchQuery({
    queryKey: [path, params],
    queryFn: () =>
      customAxios()
        .get(`${HostUrl()}/igoue_admin/app_api/${path}`, {
          headers: headers ?? undefined,
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
  });

  return data;
}
