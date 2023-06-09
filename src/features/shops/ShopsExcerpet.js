import React from "react";
import { Link } from "react-router-dom";
import { useGetShopsQuery } from "./shopsSlice";
import { useGetShopByIdQuery } from "./shopsSlice";
import ShopOhner from "./ShopOhner";
import { Card, Row, Col, CardImg, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import restaurantImg from "../../images/restaurant.jpg";
import supremarktImg from "../../images/supermarkt.jpg";
import friseurImg from "../../images/friseur.jpg";
import kleidungLadenImg from "../../images/kleidung-laden.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";

function ShopsExcerpet({ shop }) {
  const checkImage = (cat) => {
    let cardImg = friseurImg;
    switch (cat) {
      case "Restaurant": {
        cardImg = restaurantImg;
        break;
      }
      case "Supermarkt": {
        cardImg = supremarktImg;
        break;
      }
      case "Kleidung Laden": {
        cardImg = kleidungLadenImg;
        break;
      }
      default: {
        cardImg = friseurImg;
      }
    }
    return cardImg;
  };

  return (
    <Col md="6" lg="4" xl="43">
      <div className="cardsContainer">
        <Card className="backSide">
          <Card.Body>
            <Card.Text>
              <div className="contactContainer">
                <p>
                  <strong>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </strong>
                  {shop.contact.email ?? ""}
                </p>
                <p>
                  <strong>
                    <FontAwesomeIcon icon={faPhoneVolume} />
                  </strong>
                  {shop.contact.phone ?? ""}
                </p>

                <p>
                  <strong>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </strong>
                  <span className="inline-block">
                    <span>
                      {`${shop.address.street ?? ""} ${
                        shop.address.housNo ?? ""
                      }`}
                    </span>
                    <span className="block">
                      {`${shop.address.postal ?? ""} ${
                        shop.address.city ?? ""
                      }`}
                    </span>
                  </span>
                </p>
              </div>
              <ShopOhner userId={shop.userId} />
            </Card.Text>
            <Link
              className="btn btn-primary"
              to={`/shop/${shop.id}`}
              title={shop.name + "-" + shop.category}
            >
              Jetzt besuchen
            </Link>
          </Card.Body>
        </Card>
        <Card className="frontSide" key={shop.id}>
          <Card.Img variant="top" src={checkImage(shop.category)} />
          <Card.Body>
            <div className="catBox">
              <p className="catName">{shop.category}</p>
            </div>
            <div className="body-title h4">
              {shop.name}
              <span className="block span4">
                <i>{shop.slogan}</i>
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}
export default ShopsExcerpet;
