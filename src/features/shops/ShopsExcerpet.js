import React from "react";
import { Link } from "react-router-dom";
import { useGetShopsQuery } from "./shopsSlice";
import { useGetShopByIdQuery } from "./shopsSlice";
import ShopOhner from "./ShopOhner";
import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ShopsExcerpet({ shop }) {
  // console.log("Schop:" + shop);
  // let {
  //   data: shop,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetShopByIdQuery(shopId);

  // let shop1 = shop.entities[shopId];
  let content = "Loading ...";

  // if (isSuccess) {
  //   // console.log("Success ...");
  //   // console.log(shop1);
  //   content = (

  //   );
  // }
  // if (isError) {
  //   console.log("error:" + error);
  // }

  return (
    <Col lg="6" xl="4">
      <Card
        className="linkContainer"
        style={{ color: "#0000ee" }}
        key={shop.id}
      >
        <Link to={`/shop/${shop.id}`} title={shop.name + "-" + shop.category}>
          <h3>
            {shop.name}
            <span className="block span4">
              <i>{shop.category}</i>
            </span>
          </h3>
          <p className="slogan">{shop.slogan}</p>
          {/* <p className="city">
          <strong>Stadt:</strong> {shop.address.city ?? ""}
        </p> */}
          <ShopOhner userId={shop.userId} />
        </Link>
      </Card>
    </Col>
  );
}
export default ShopsExcerpet;
