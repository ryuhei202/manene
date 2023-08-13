import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { HostUrl } from "../model/Host-url";
import { customAxios } from "../model/api/shared/custom-axios";

export const usePutRequest = <
  TParams = object,
  TResponse = object,
  TError = AxiosError
>({
  path,
  params,
  headers,
}: {
  path: string;
  params?: TParams;
  headers?: object;
}) => {
  const { mutate, error, isLoading, isSuccess } = useMutation<
    AxiosResponse<TResponse>,
    TError,
    TParams | undefined
  >([path], (lateParams?: TParams) =>
    customAxios().put(
      `${HostUrl()}/igoue_admin/app_api/${path}`,
      lateParams ?? params,
      {
        headers: headers ?? undefined,
      }
    )
  );

  return { mutate, error, isLoading, isSuccess };
};
