import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetShopsQuery } from "./shopsSlice";

const SingleShopPage = () => {
  const { shopId } = useParams();

  const { shop, isLoading } = useGetShopsQuery("getShops", {
    selectFromResult: ({ data, isLoading }) => ({
      shop: data?.entities[shopId],
      isLoading,
    }),
  });
  if (isLoading) return <p>Loading...</p>;

  if (!shop) {
    return (
      <section>
        <h2>Shop not found!</h2>
      </section>
    );
  } else {
    const {
      id,
      ohnerId: userId,
      name,
      category,
      slogan,
      address,
      contact,
      aboutUs,
      headerPic,
      products,
    } = { ...shop };

    return (
      // <article>
      //   <h2>{shop.name}</h2>
      //   <p>{shop.slogan}</p>
      //   <p className="shopCredit">
      //     <Link to={`/shop/edit/${shop.id}`}>Edit shop</Link>
      //     <ShopOhner userId={shop.userId} />
      //   </p>
      // </article>
      <div className="mainSide">
        <div className="fixedButton">
          <Link className="fixedBtn btn" to={`/shop/edit/${shop.id}`}>
            Bearbeiten
          </Link>
        </div>
        <div className="headerImageContainer">
          <div className="row claimRow">
            <div className="col claimCol">
              <div className="claim">
                <h1>{shop.headerPic.headerClaim.claimTitle} </h1>
                <p>{shop.headerPic.headerClaim.claimSubTitle} </p>
              </div>
            </div>
          </div>
        </div>
        {(aboutUs.aboutContent || aboutUs.aboutTitle) && (
          <div className="storContainer about">
            <h1>{aboutUs.aboutTitle ? aboutUs.aboutTitle : ""}</h1>
            <p>{aboutUs.aboutContent ? aboutUs.aboutContent : ""}</p>
          </div>
        )}

        {products ? (
          <div className="storContainer products">
            <p className="h1">Unsere Produkte</p>
            <div className="porductsCol">
              {products.map((pro) => {
                return (
                  <div key={pro.id} className="teaser">
                    <div className="left">
                      <h3>{pro.name}</h3>
                      <p>{pro.description}</p>
                    </div>
                    <span className="price">{pro.price} €</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {(address.street ||
          address.housNo ||
          address.postal ||
          address.city ||
          address.land) && (
          <div className="storContainer map">
            <div key={id + "-addresse"} className="row">
              <div className="col col-6">
                <p className="h1">
                  {name} <span className="block">{slogan}</span>
                </p>
                <p className="h4">Anschrift:</p>
                <p>
                  <span className="block">
                    <span>
                      {address.street} {address.housNo},{" "}
                    </span>
                    <span>
                      {address.postal} {address.city}{" "}
                    </span>
                  </span>
                </p>
              </div>
              <div className="col col-6">
                <iframe
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.2711801263754!2d6.570461825180064!3d51.32537937554762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b003fcd85671%3A0x16810cec84e18c60!2sKrefeld!5e0!3m2!1sde!2sde!4v1671712453479!5m2!1sde!2sde"
                ></iframe>
              </div>
            </div>
          </div>
        )}
        {(contact.email || contact.phone) && (
          <div className="storContainer contact">
            <div className="teaserCol">
              <div className="teaser">
                {" "}
                <p className="h1">
                  Kontaktieren Sie uns
                  <span className="block">
                    {" "}
                    Für Fragen und Bestellungen sind wir immer für Sie da!
                  </span>
                </p>
                <div className="contactContainer">
                  <p>
                    <span className="block">
                      <b>E-Mail: </b>
                      {contact.email}
                    </span>
                  </p>
                </div>
                <div className="contactContainer">
                  <p>
                    <span className="block">
                      <b>Telefonnummer: </b>
                      {contact.phone}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default SingleShopPage;
