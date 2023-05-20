import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { Link, useParams } from "react-router-dom";
import { useGetShopsByUserIdQuery } from "../shops/shopsSlice";

export const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: shopsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsByUserIdQuery(userId);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = shopsForUser;
    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].name}</Link>
      </li>
    ));
  } else {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
