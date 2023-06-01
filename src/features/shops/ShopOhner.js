import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ShopOhner = ({ userId }) => {
  const { user: ohner } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <p>
      <strong>
        <FontAwesomeIcon icon={faUser} />
      </strong>
      {ohner ? `${ohner.name} ${ohner.lastName}` : "Unknown Ohner"}
    </p>
  );
};

export default ShopOhner;
