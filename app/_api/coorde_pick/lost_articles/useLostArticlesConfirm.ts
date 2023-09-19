import { useGetRequest } from "../../useGetRequest";

export type TLostArticlesConfirmResponse = {
  id: number;
  name: string;
};

type TParams = {
  memberId: number;
};

export default function useLostArticlesConfirm(params: TParams) {
  const { data, error, isLoading } = useGetRequest<
    TLostArticlesConfirmResponse,
    TParams
  >({ path: "inspection/lost_articles/confirm", params: params });

  return { data, error, isLoading };
}
