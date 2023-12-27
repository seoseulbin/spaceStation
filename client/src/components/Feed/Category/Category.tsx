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

  function fontColorSet(category: string) {
    switch (category) {
      case "집":
        return "#E58D5C";
      case "카페":
        return "#D5267A";
      case "회사":
        return "#A452DE";
      case "학원":
        return "#FFA000";
      case "학교":
        return "#ADE085";
      case "회의실":
        return "#FE87CE";
      case "유치원":
        return "#97DDF3";
      case "서점":
        return "#6D8DFF";
      default:
        return "white";
    }
  }

  return (
    <>
      <S.Container>
        <S.CategoryList>
          {categorys?.map((category) => {
            return (
              <S.Category
                key={category._id}
                $isActive={category._id === activeCategory ? true : false}
                $fontColor={fontColorSet(category.category)}
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
