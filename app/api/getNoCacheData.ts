import { HostUrl } from "../model/Host-url";
import { toCamelCaseObject } from "../service/toCamelCaseObject";

export default async function getNoCacheData<TResponse, TParams = object>({
  path,
  params,
}: {
  path: string;
  params?: TParams;
}) {
  const res = await fetch(`${HostUrl()}/igoue_admin/app_api/${path}`, {
    cache: "no-store",
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: TResponse = await res.json();
  if (Array.isArray(data)) {
    return data.map((d) => {
      return toCamelCaseObject(d as Record<string, unknown>);
    }) as TResponse;
  } else {
    return toCamelCaseObject(data as Record<string, unknown>) as TResponse;
  }
}
