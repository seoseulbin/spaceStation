import { useCategory } from "./Category.hooks";
import * as S from "./Category.styles";

export default function Category() {
  const { categorys, isLoading, isError, error } = useCategory();

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      <S.Container>
        <S.CategoryList>
          {categorys?.map((category, index) => {
            return <li key={index}>{category.category}</li>;
          })}
        </S.CategoryList>
      </S.Container>
    </>
  );
}
