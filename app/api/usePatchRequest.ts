import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { HostUrl } from "../model/Host-url";
import { customAxios } from "../model/api/shared/custom-axios";

export const usePatchRequest = <TParams = object, TResponse = object>({
  path,
  params,
  headers,
}: {
  path?: string;
  params?: TParams;
  headers?: object;
}) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse<TResponse>,
    AxiosError,
    TParams | undefined
  >([path], (lateParams?: TParams) => {
    const { path: latePath, ...lateParamsNonPath } =
      (lateParams as {
        path: string;
        [key: string]: unknown;
      }) ?? {};
    return customAxios().patch(
      `${HostUrl()}/igoue_admin/app_api/${latePath ?? path}`,
      lateParams ? lateParamsNonPath : params,
      {
        headers: headers ?? undefined,
      }
    );
  });

  return { mutate, error, isLoading, isSuccess };
};
