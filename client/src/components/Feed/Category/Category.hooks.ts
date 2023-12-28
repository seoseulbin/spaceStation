import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/global/reactQeury";
import { CategoryType } from "./Category.type";
import categoryAPI from "./Category.api";

export const useCategory = () => {
  const { data: categorys } = useSuspenseQuery<CategoryType[], Error>({
    queryKey: [queryKeys.category],
    queryFn: categoryAPI.getCategory,
  });

  return { categorys };
};
