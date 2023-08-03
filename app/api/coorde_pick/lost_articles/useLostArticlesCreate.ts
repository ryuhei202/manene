import { usePostRequest } from "../../usePostRequest";

type TLostArticlesCreateResponse = {
  id: number;
};

type TParams = {
  memberId: number;
  message: string;
};

export default function useLostArticlesCreate() {
  const { mutate, error, isLoading, isSuccess } = usePostRequest<
    TParams,
    TLostArticlesCreateResponse
  >({ path: "inspection/lost_articles" });

  return { mutate, error, isLoading, isSuccess };
}
