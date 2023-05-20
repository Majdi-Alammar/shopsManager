import React from "react";
import { Link } from "react-router-dom";
import { useGetShopsQuery } from "./shopsSlice";
import ShopOhner from "./ShopOhner";

function ShopsExcerpet({ shopId }) {
  // console.log(shopId);
  const { shop } = useGetShopsQuery("getShops", {
    selectFromResult: ({ data }) => ({
      shop: data?.entities[shopId],
    }),
  });
  // console.log(shop);
  return (
    <div className="linkContainer " key={shop.id}>
      <Link to={`/shop/${shop.id}`} title={shop.name + "-" + shop.category}>
        <h3>
          {shop.name}
          <span className="block span4">
            <i>{shop.category}</i>
          </span>
        </h3>
        <p className="slogan">{shop.slogan}</p>
        <p className="city">
          <strong>Stadt:</strong> {shop.address.city ?? ""}
        </p>
        <ShopOhner userId={shop.userId} />
      </Link>
    </div>
  );
}
export default ShopsExcerpet;
