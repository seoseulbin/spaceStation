import { useState } from "react";
import { useCategory } from "./Category.hooks";
import * as S from "./Category.styles";
import ApiBoundary from "@/components/common/ApiBoundary";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  categoryId: string;
}

export default function Category(props: CategoryProps) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

function ApiComponent({ categoryId }: CategoryProps) {
  const navigate = useNavigate();
  const { categorys } = useCategory();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryId,
  ); // 활성화된 카테고리 검증

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
                  navigate(`/category/${category._id}`);
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
