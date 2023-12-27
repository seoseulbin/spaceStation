import SearchFeedOverview from "@/components/Search/SearchFeedOverview";
import SearchedUserList from "@/components/Search/UserList";
import { PATH, SEARCH_SCOPE, SearchScopeType } from "@/global/constants";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
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

  const onSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(PATH.search(queryInput, queryScope ?? "feed"));
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <SearchInputBar onChange={onTypeQueryInput} value={queryInput} />
      </form>
      <NavLink to={PATH.search(queryInput, "feed")}>피드</NavLink>
      <NavLink to={PATH.search(queryInput, "account")}>계정</NavLink>
      <NavLink to={PATH.search(queryInput, "tag")}>태그</NavLink>
      {query && queryScope === SEARCH_SCOPE.FEED && (
        <SearchFeedOverview query={query} />
      )}
      {query && queryScope === SEARCH_SCOPE.ACCOUNT && (
        <SearchedUserList query={query} />
      )}
    </>
  );
}

const SearchInputBar = styled.input`
  box-sizing: border-box;
  width: calc(100% - 2rem);
  height: 2.5rem;
  margin: 1rem;
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.deepback};
  padding: 0 1rem;
`;
