import { useState } from "react";
import { useCategory } from "./Category.hooks";
import * as S from "./Category.styles";
import ApiBoundary from "@/components/common/ApiBoundary";

export default function Category() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const { categorys } = useCategory();
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // 활성화된 카테고리 검증

  return (
    <>
      <S.Container>
        <S.CategoryList>
          {categorys?.map((category) => {
            return (
              <S.Category
                key={category._id}
                $isActive={category._id === activeCategory ? true : false}
                onClick={() => {
                  setActiveCategory(category._id);
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
