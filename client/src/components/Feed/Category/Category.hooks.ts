import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/global/reactQeury";
import { CategoryType } from "./Category.type";
import categoryAPI from "./Category.api";

/**
 * 샘플 훅
 */
export const useCategory = () => {
  const { data: categorys } = useQuery<CategoryType[], Error>({
    queryKey: [queryKeys.category],
    queryFn: categoryAPI.getCategory,
  });

  return { categorys };
};
