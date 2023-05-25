import React from "react";
import { useSelector } from "react-redux";
import { selectShopIds } from "./shopsSlice";
import ShopsExcerpet from "./ShopsExcerpet";
import { useGetShopsQuery } from "./shopsSlice";
import { useState, useEffect } from "react";

const initialState = [];

const ShopsList = () => {
  // const [category, setCategory] = useState("all");
  const [filterItems, setFilterItems] = useState({
    category: "all",
    city: "all",
  });

  const {
    data: shops,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsQuery("getShops");
  const orderedShopIds = useSelector(selectShopIds);
  // console.log(shops.entities);
  // console.log(shops ? shops.entities : "No Shops");
  let content;
  if (isLoading) {
    content = <p>"Loading... "</p>;
  } else if (isSuccess) {
    // console.log(filterItems);
    if (filterItems.category === "all" && filterItems.city === "all") {
      content = orderedShopIds;
    } else if (filterItems.category === "all" && filterItems.city !== "all") {
      content = orderedShopIds.filter(
        (shopId) => shops.entities[shopId].address.city === filterItems.city
      );
    } else if (filterItems.category !== "all" && filterItems.city === "all") {
      content = orderedShopIds.filter(
        (shopId) => shops.entities[shopId].category === filterItems.category
      );
    } else {
      content = orderedShopIds.filter(
        (shopId) =>
          shops.entities[shopId].category === filterItems.category &&
          shops.entities[shopId].address.city === filterItems.city
      );
    }
    if (content.length) {
      content = content.map((shopId) => (
        <ShopsExcerpet key={shopId} shopId={shopId} />
      ));
    } else {
      content = "Es gibt kein Ergebnis ...";
    }
  } else if (isError) {
    content = <p>{error}</p>;
  }
  const onFilter = (e, elem) => {
    setFilterItems({
      ...filterItems,
      [elem]: e.target.value,
    });
  };
  const resetFilterItem = (e, key) => {
    setFilterItems({
      ...filterItems,
      [key]: "all",
    });
  };

  return (
    <section>
      <div className="filterContainer">
        <select
          id="filterCatSelect"
          className="filterCatSelect small"
          onChange={(e) => {
            return onFilter(e, "category");
          }}
          value={filterItems.category}
        >
          <option value="all" defaultValue>
            All Kategories
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

        <select
          id="filterCatSelect"
          className="filterCatSelect small"
          onChange={(e) => {
            return onFilter(e, "city");
          }}
          value={filterItems.city}
        >
          <option value="all" defaultValue>
            All Städte
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
        <div className="filterItemsContainer">
          {Object.keys(filterItems).map((key) => {
            if (filterItems[key] !== "all") {
              return (
                <p key={filterItems[key]} className="filterItem">
                  <span>{filterItems[key]}</span>
                  <span
                    onClick={(e) => resetFilterItem(e, key)}
                    className="delete"
                  >
                    X
                  </span>
                </p>
              );
            }
          })}
        </div>
      </div>
      <div className="teaserContainer">{content}</div>
    </section>
  );
};

export default ShopsList;
