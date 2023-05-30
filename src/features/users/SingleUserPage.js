import React from "react";
import { Link, useParams } from "react-router-dom";

import { useGetShopsByUserIdQuery } from "../shops/shopsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import ShopOhner from "../shops/ShopOhner";
import { Row } from "react-bootstrap";
import ShopsExcerpet from "../shops/ShopsExcerpet";

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
    let shops = ids.map((shopId) => (
      <ShopsExcerpet key={Number(shopId)} shop={entities[shopId]} />
    ));

    content = (
      <>
        <Row>
          <h2>
            <span className="block">Alle Laden von </span> {user?.name}{" "}
            {user?.lastName}
          </h2>
        </Row>

        <Row className="teaserContainer">{shops}</Row>
      </>
    );
  } else if (isError || isErrorUser) {
    content = <p>{error || errorUser}</p>;
  }

  return content;
};

export default SingleUserPage;
