import React from "react";
import { Link, useParams } from "react-router-dom";

import { useGetShopsByUserIdQuery } from "../shops/shopsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import ShopOhner from "../shops/ShopOhner";

const SingleUserPage = () => {
  const { userId } = useParams();
  //   console.log(userId);

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: shopsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsByUserIdQuery(userId);

  let content;
  if (isLoading || isLoadingUser) {
    content = <p>Loading...</p>;
  } else if (isSuccess && isSuccessUser) {
    const { ids, entities } = shopsForUser;
    content = (
      <section>
        <h2>
          <span className="block">Alle Laden von </span> {user?.name}{" "}
          {user?.lastName}
        </h2>

        <div className="teaserContainer">
          {ids.map((id) => (
            <div className="linkContainer" key={entities[id].id}>
              <Link to={`/shop/${entities[id].id}`}>
                <h4>
                  {entities[id].name}
                  <span className="block span4">{entities[id].category}</span>
                </h4>
                <p>{entities[id].slogan}</p>
                <p className="city">{entities[id].city ?? "City"}</p>
                <ShopOhner userId={entities[id].userId} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  } else if (isError || isErrorUser) {
    content = <p>{error || errorUser}</p>;
  }

  return content;
};

export default SingleUserPage;
