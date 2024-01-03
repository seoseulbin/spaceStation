import { useSearchUsers } from "../User/User.hooks";
import ApiBoundary from "../common/ApiBoundary";
import User from "../User/User";
import { Fragment } from "react";
import { Loading } from "../common/Loading/Loading";
import * as S from "./UserList.style";
import EmptyCard from "../common/EmptyCard/EmptyCard";

export default function SearchedUserList({ query }: { query: string }) {
  return (
    <ApiBoundary>
      <ApiComponent query={query} />
    </ApiBoundary>
  );
}

function ApiComponent({ query }: { query: string }) {
  const {
    data: { pages },
    hasNextPage,
    setTarget,
  } = useSearchUsers(query);

  return (
    <>
      {pages[0].data.length === 0 && <EmptyCard type="USER" />}
      {pages.map(({ data: users }) =>
        users.map((user) => (
          <Fragment key={user._id}>
            <S.UserProfileContainer>
              <User userId={user._id} />
            </S.UserProfileContainer>
          </Fragment>
        )),
      )}
      {hasNextPage && (
        <div ref={setTarget}>
          <Loading />
        </div>
      )}
    </>
  );
}
