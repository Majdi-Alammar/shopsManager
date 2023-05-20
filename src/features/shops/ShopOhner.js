import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";

const ShopOhner = ({ userId }) => {
  const { user: ohner } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <span>
      <strong>Besitzer:</strong>{" "}
      {ohner ? (
        <Link className="inlineBlock" to={`/user/${userId}`}>
          {ohner.name} {ohner.lastName}
        </Link>
      ) : (
        "Unknown Ohner"
      )}
    </span>
  );
};

export default ShopOhner;