import React from "react";
import { useSelector } from "react-redux";
import { selectShopIds } from "./shopsSlice";
import ShopsExcerpet from "./ShopsExcerpet";
import { useGetShopsQuery } from "./shopsSlice";
import { useState, useEffect } from "react";

const initialState = [];

const ShopsList = () => {
  const [category, setCategory] = useState("all");

  const {
    data: shops,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsQuery("getShops");
  const orderedShopIds = useSelector(selectShopIds);
  // console.log(orderedShopIds);
  //console.log(shops ? shops : "No Shops");
  let content;
  if (isLoading) {
    content = <p>"Loading... "</p>;
  } else if (isSuccess) {
    if (category === "all") {
      content = orderedShopIds.map((shopId) => (
        <ShopsExcerpet key={shopId} shopId={shopId} />
      ));
    } else {
      content = orderedShopIds.map((shopId) =>
        //console.log(shops.entities[shopId])
        shops.entities[shopId].category === category ? (
          <ShopsExcerpet key={shopId} shopId={shopId} />
        ) : (
          ""
        )
      );
    }
  } else if (isError) {
    content = <p>{error}</p>;
  }
  const onFilterByCat = (e) => {
    setCategory(e.target.value);
  };
  return (
    <section>
      <div className="filterContainer">
        <label htmlFor="filterCatSelect">
          <strong>Kategorie Auswählen:</strong>
        </label>
        <select
          id="filterCatSelect"
          className="filterCatSelect small"
          onChange={onFilterByCat}
        >
          <option value="all" defaultValue>
            All
          </option>
          <option value="Kleidung Laden" defaultValue>
            Kleidung Laden
          </option>
          <option value="Supermarkt" defaultValue>
            Supermarkt
          </option>
          <option value="Restaurant" defaultValue>
            Restaurant
          </option>
          <option value="Parpershop" defaultValue>
            Parpershop
          </option>
        </select>
        <label htmlFor="filterCitySelect">
          <strong>Stadt Auswählen:</strong>
        </label>
        <select id="filterCatSelect" className="filterCatSelect small">
          <option value="all" defaultValue>
            All
          </option>
          <option value="Krefeld" defaultValue>
            Krefeld
          </option>
          <option value="Düsseldorf" defaultValue>
            Duesseldorf
          </option>
          <option value="Berlin" defaultValue>
            Berlin
          </option>
        </select>
      </div>
      <div className="teaserContainer">{content}</div>
    </section>
  );
};

export default ShopsList;
