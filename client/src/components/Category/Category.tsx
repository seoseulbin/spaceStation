import { useState } from "react";
import { useCategory } from "./Category.hooks";
import * as S from "./Category.styles";

export default function Category() {
  const { categorys, isLoading, isError, error } = useCategory();
  const [activeCategory, setActiveCategory] = useState<number | null>(0); // 활성화된 카테고리 검증

  if (isLoading) return "loading...";
  if (isError) return error.message;

  return (
    <>
      <S.Container>
        <S.CategoryList>
          {categorys?.map((category, index) => {
            return (
              <S.Category
                key={index}
                isActive={index === activeCategory ? true : false}
                onClick={() => {
                  setActiveCategory(index);
                }}
              >
                {category.category}
              </S.Category>
            );
          })}
        </S.CategoryList>
      </S.Container>
    </>
  );
}
