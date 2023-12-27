import SearchFeedOverview from "@/components/Feed/SearchFeeds/SearchFeedOverview";
import { PATH, SEARCH_SCOPE } from "@/global/constants";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

export default function SearchPage() {
  const navigate = useNavigate();
  const [queryInput, setQueryInput] = useState("");
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const queryScope = searchParams.get("scope") as "feed";

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
        <SearchInputBar onChange={onTypeQueryInput} />
      </form>
      <NavLink to={PATH.search(queryInput, "feed")}>피드</NavLink>
      <NavLink to={PATH.search(queryInput, "account")}>계정</NavLink>
      <NavLink to={PATH.search(queryInput, "tag")}>태그</NavLink>
      {query && queryScope === SEARCH_SCOPE.FEED && (
        <SearchFeedOverview query={query} />
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
