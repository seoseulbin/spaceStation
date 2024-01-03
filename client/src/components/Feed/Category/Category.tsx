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

  const dict = categorys.reduce<{ [key: string]: number }>(
    (acc, category, index) => {
      return { ...acc, [category._id]: index };
    },
    {},
  );

  function fontColorSet(index: number) {
    switch (index) {
      case 0:
        return "#765E47";
      case 1:
        return "#E0756A";
      case 2:
        return "#81B2CC";
      case 3:
        return "#ACCC71";
      case 4:
        return "#FFC469";
      case 5:
        return "#FE87CE";
      case 6:
        return "#D089DB";
      case 7:
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
                $isActive={category._id === categoryId}
                onClick={() => {
                  navigate(`/category/${category._id}`);
                }}
              >
                {category.category}
              </S.Category>
            );
          })}
          {categoryId && (
            <S.CategoryStyle
              $index={dict[categoryId]}
              $fontColor={fontColorSet(dict[categoryId])}
            />
          )}
        </S.CategoryList>
      </S.Container>
    </>
  );
}
