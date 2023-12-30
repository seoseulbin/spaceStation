import SearchFeedOverview from "@/components/Search/SearchFeedOverview";
import SearchedUserList from "@/components/Search/UserList";
import { PATH, SEARCH_SCOPE, SearchScopeType } from "@/global/constants";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import {
  NavLink,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const queryScope = searchParams.get("scope") as SearchScopeType;

  const [queryInput, setQueryInput] = useState(query ?? "");

  if (query && !Object.values(SEARCH_SCOPE).includes(queryScope)) {
    toast.error("잘못된 접근입니다");
    return <Navigate replace to={PATH.search()} />;
  }

  const onTypeQueryInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryInput(e.currentTarget.value);
  };
  const handleBackArrowFunction = () => {
    window.history.back();
  };

  const onSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(PATH.search(queryInput, queryScope ?? "feed"));
  };

  return (
    <>
      <HeaderContainer onSubmit={onSearch}>
        <ArrowButtonDiv onClick={handleBackArrowFunction}>
          <IoIosArrowBack size="35" />
        </ArrowButtonDiv>
        <SearchInputBar
          autoFocus
          type="search"
          onChange={onTypeQueryInput}
          value={queryInput}
          placeholder="검색어를 입력해주세요 ദ്ദി˙∇˙)ว"
        />
      </HeaderContainer>
      <SeachNavBarContainer>
        <SearchNavLink $isActive={queryScope}>
          <NavLink to={PATH.search(queryInput, "feed")}>피드</NavLink>
        </SearchNavLink>
        <SearchNavLink $isActive={queryScope}>
          <NavLink to={PATH.search(queryInput, "account")}>계정</NavLink>
        </SearchNavLink>
      </SeachNavBarContainer>
      {query && queryScope === SEARCH_SCOPE.FEED && (
        <SearchFeedOverview query={query} />
      )}
      {query && queryScope === SEARCH_SCOPE.ACCOUNT && (
        <SearchedUserList query={query} />
      )}
    </>
  );
}

const HeaderContainer = styled.form`
  display: flex;
  padding-inline: 15px;
  align-items: center;
`;
const ArrowButtonDiv = styled.div`
  cursor: pointer;
`;
const SearchInputBar = styled.input`
  box-sizing: border-box;
  width: calc(100% - 2rem);
  height: 2.5rem;
  margin: 1rem;
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.deepback};
  padding: 0 1rem;
`;

const SeachNavBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.deepback};
`;

const SearchNavLink = styled.div<{ $isActive: string }>`
  width: 20%;
  height: 50px;
  margin: 0 10px;
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  &:nth-child(1) {
    & a {
      color: ${(props) =>
        props.$isActive === "feed"
          ? "#81b2cc"
          : "${({ theme }) => theme.colors.deepback}"};
    }
    border-bottom: 2px solid
      ${(props) =>
        props.$isActive === "feed"
          ? "#81b2cc"
          : "${({ theme }) => theme.colors.deepback}"};
  }

  &:nth-child(2) {
    & a {
      color: ${(props) =>
        props.$isActive === "account"
          ? "#e0756a"
          : "${({ theme }) => theme.colors.deepback}"};
    }
    border-bottom: 2px solid
      ${(props) =>
        props.$isActive === "account"
          ? "#e0756a"
          : "${({ theme }) => theme.colors.deepback}"};
  }
`;
