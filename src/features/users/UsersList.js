import { useGetUsersQuery } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((userId) => (
      <div className="linkContainer" key={userId}>
        <Link to={`/user/${userId}`}>
          <h4>
            {users.entities[userId].gender === "male" ? "Herr" : "Frau"}{" "}
            {users.entities[userId].name} {users.entities[userId].lastName}
          </h4>
          <p>
            <strong className="inlineBlock">E-Mail:</strong>{" "}
            <span className="inlineBlock">
              {users.entities[userId].contact.email}
            </span>
          </p>
          <p>
            <strong className="inlineBlock">Telefon:</strong>{" "}
            <span className="inlineBlock">
              {users.entities[userId].contact.phone}
            </span>
          </p>
          <p>
            <strong className="inlineBlock">Adresse:</strong>{" "}
            <span className="inlineBlock">
              {users.entities[userId].address.street}{" "}
              {users.entities[userId].address.housNo},<br />
              {users.entities[userId].address.postal}{" "}
              {users.entities[userId].address.city}{" "}
              {/* {users.entities[userId].address.land} */}
            </span>
          </p>
        </Link>
      </div>
    ));

    content = (
      <>
        <h1>Bezitzer</h1>
        <div className="teaserContainer">{renderedUsers}</div>
      </>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default UsersList;
