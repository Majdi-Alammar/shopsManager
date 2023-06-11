import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const AddShopForm = () => {
  const [addNewShop, { isLoading }] = useAddNewShopMutation();
  const navigate = useNavigate();
  const refHeaderImg = useRef();

  // Products
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    slogan: "",
    userId: "",

    address: {
      street: "",
      housNo: "",
      postal: "",
      city: "",
      land: "",
      lat: "",
      long: "",
    },
    contact: {
      email: "",
      phone: "",
    },
    aboutUs: {
      aboutTitle: "",
      aboutContent: "",
    },
    headerPic: {
      picTitle: "",
      picUrl: "",
      headerClaim: {
        claimTitle: "",
        claimSubTitle: "",
      },
    },
    products: [],
  });
  formData.userId = useSelector(selectCurrentUser).id;
  console.log(formData);
  // All Events
  const handleChange = (e) => {
    const { name, value } = e.target;
    let fileName = null;
    if (e.target.files) {
      fileName = e.target.files[0];
    }
    console.log(`${name}: ${value} FileName=> ${fileName}`);
    switch (name) {
      case "picTitle": {
        setFormData((prevData) => ({
          ...prevData,
          headerPic: { ...prevData.headerPic, [name]: value },
        }));
        break;
      }
      case "picUrl": {
        setFormData((prevData) => ({
          ...prevData,
          headerPic: { ...prevData.headerPic, [name]: fileName },
        }));
        break;
      }
      case "claimTitle":
      case "claimSubTitle": {
        setFormData((prevData) => ({
          ...prevData,
          headerPic: {
            ...prevData.headerPic,
            headerClaim: {
              ...prevData.headerPic.headerClaim,
              [name]: value,
            },
          },
        }));
        break;
      }
      case "aboutTitle":
      case "aboutContent": {
        setFormData((prevData) => ({
          ...prevData,
          aboutUs: { ...prevData.aboutUs, [name]: value },
        }));
        break;
      }
      case "email":
      case "phone": {
        setFormData((prevData) => ({
          ...prevData,
          contact: { ...prevData.contact, [name]: value },
        }));
        break;
      }
      case "street":
      case "postal":
      case "city":
      case "land":
      case "lat":
      case "long":
      case "housNo": {
        setFormData((prevData) => ({
          ...prevData,
          address: { ...prevData.address, [name]: value },
        }));
        break;
      }
      default: {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const onProductsChanged = (e, id, elem) => {
    const newProducts = formData.products.map((pro) => {
      if (pro.id === Number(id)) {
        const newPro = { ...pro };
        newPro[elem] = e.target.value;
        console.log(newPro);
        return newPro;
      } else {
        return pro;
      }
    });
    setFormData((prevData) => ({
      ...prevData,
      products: [...newProducts],
    }));
    // setProducts([...newProducts]);
  };
  const addNewProduct = (e) => {
    e.preventDefault();
    const newProducts = [...formData.products];
    let newId = -1;
    newProducts.map((pro) => {
      if (pro.id > newId) {
        newId = pro.id;
      }
      console.log(newId);
    });
    newProducts.push({ id: newId + 1, name: "", price: "", description: "" });
    console.log(newProducts);
    setProducts([...newProducts]);
    setFormData((prevData) => ({
      ...prevData,
      products: [...newProducts],
    }));
  };

  const canSave =
    [
      formData.name,
      formData.category,
      formData.slogan,
      formData.userId,
      formData.address.housNo,
      formData.address.street,
      formData.address.postal,
      formData.address.city,
      formData.contact.email,
      formData.contact.phone,
    ].every(Boolean) && !isLoading;
  // console.log(canSave);
  const onSaveShopClicked = async () => {
    if (canSave) {
      try {
        await addNewShop({
          ...formData,
        }).unwrap();
        setFormData({
          name: "",
          category: "",
          slogan: "",
          userId: "",
          lat: "",
          long: "",
          address: {
            street: "",
            housNo: "",
            postal: "",
            city: "",
            land: "",
          },
          contact: {
            email: "",
            phone: "",
          },
          aboutUs: {
            aboutTitle: "",
            aboutContent: "",
          },
          headerPic: {
            picTitle: "",
            picUrl: File,
            headerClaim: {
              claimTitle: "",
              claimSubTitle: "",
            },
          },
          products: [],
        });
        navigate(`/user/${formData.userId}`);
      } catch (err) {
        console.error("Faild to save the Shop", err);
      }
    }
  };

  const productsList = formData.products.map((pro) => {
    return (
      <div className="col-lg-6" key={pro.id}>
        <fieldset className="porBox row ">
          <legend>{pro.name}</legend>
          <Form.Group controlId={`${pro.id}`}>
            <Form.Control
              type="text"
              placeholder="Produkt Name angeben"
              value={pro.name}
              onChange={(e) => onProductsChanged(e, pro.id, "name")}
              required="required"
            />
          </Form.Group>

          <Form.Group c controlId={`${pro.id}-productPrice`}>
            <Form.Control
              type="number"
              placeholder="Preis in Euro eingeben!"
              value={pro.price}
              onChange={(e) => onProductsChanged(e, pro.id, "price")}
            />
          </Form.Group>

          <Form.Group controlId={`${pro.id}-productDescription`}>
            <Form.Control
              type="text"
              placeholder="Beschreibung eingeben!"
              value={pro.description}
              onChange={(e) => onProductsChanged(e, pro.id, "description")}
            />
          </Form.Group>
        </fieldset>
      </div>
    );
  });

  return (
    <>
      <div className="row">
        <h2>Laden Hinzufügen</h2>
      </div>
      <Form className="addEditForm row" validated={true}>
        <div className="mainSide">
          <div className="siteHeader">
            <Row className="flex-row align-items-center">
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-between align-items-center"
              >
                <Form.Group className="mb-12" controlId="shopName">
                  <Form.Control
                    type="text"
                    placeholder="Ladenname angeben"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    required="required"
                  />
                </Form.Group>
              </Col>
              <Col
                xs={12}
                className="d-flex justify-content-between align-items-center"
              >
                <Form.Group controlId="shopCategory">
                  <Form.Control
                    as="select"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                    required="required"
                  >
                    <option value="">Kategorie auswählen</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Supermarkt">Supermarkt</option>
                    <option value="Parpershop">Parpershop</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="shopSlogan">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.slogan}
                    placeholder="Slogan angeben"
                    onChange={handleChange}
                    name="slogan"
                    required="required"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="placeHolder headerImageContainer">
            <Row>
              <Col>
                <Form.Group className="mb-12" controlId="shopPicUrl">
                  <Form.Control
                    type="file"
                    placeholder="Headerbild auswählen"
                    // value={formData.headerPic.picUrl}
                    onChange={handleChange}
                    name="picUrl"
                    ref={refHeaderImg}
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopPicTitle">
                  <Form.Control
                    type="text"
                    placeholder="Title des Headerbilds angeben"
                    value={formData.headerPic.picTitle}
                    onChange={handleChange}
                    name="picTitle"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="row claimRow">
              <div className="col claimCol">
                <div className="claim">
                  <Form.Group className="mb-12" controlId="shopClaimTitle">
                    <Form.Control
                      type="text"
                      placeholder="Claim Überschrift"
                      value={formData.headerPic.headerClaim.claimTitle}
                      onChange={handleChange}
                      name="claimTitle"
                    />
                  </Form.Group>
                  <Form.Group className="mb-12" controlId="shopClaimSubTitle">
                    <Form.Control
                      type="text"
                      placeholder="Claim Unterschrift"
                      value={formData.headerPic.headerClaim.claimSubTitle}
                      onChange={handleChange}
                      name="claimSubTitle"
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>

          <Row className="storContainer about">
            <Col lg="12">
              <Form.Group className="row" controlId="shopAboutTitle">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={formData.aboutUs.aboutTitle}
                  onChange={handleChange}
                  name="aboutTitle"
                />
              </Form.Group>
              <Form.Group className="row" controlId="shopAboutContent">
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.aboutUs.aboutContent}
                  onChange={handleChange}
                  name="aboutContent"
                  placeholder="Text bis 4000 Bochstaben! "
                />
              </Form.Group>
            </Col>
          </Row>

          {products ? (
            <Row className="storContainer products">
              <p className="h1">Produkte</p>
              {productsList.length > 0 ? (
                <div className="col-lg-12">
                  <fieldset className="row">
                    {productsList}
                    <div className="col-lg-12">
                      <Button variant="primary" onClick={addNewProduct}>
                        Neuen Produkt Hinzufügen
                      </Button>
                    </div>
                  </fieldset>
                </div>
              ) : (
                <div className="col-lg-12">
                  <fieldset className="productsBox ">
                    <p>Es gibt keine Produkte zurzeit</p>
                    <Button variant="primary" onClick={addNewProduct}>
                      Neuen Produkt Hinzufügen
                    </Button>
                  </fieldset>
                </div>
              )}
            </Row>
          ) : (
            ""
          )}

          <div className="storContainer map">
            <Row>
              <Col lg="6">
                <Form.Group className="mb-12" controlId="shopHousNo">
                  <Form.Control
                    type="text"
                    placeholder="Hausnummer"
                    value={formData.address.housNo}
                    onChange={handleChange}
                    name="housNo"
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopStreet">
                  <Form.Control
                    type="text"
                    placeholder="Straße"
                    value={formData.address.street}
                    onChange={handleChange}
                    name="street"
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopCity">
                  <Form.Control
                    type="text"
                    placeholder="Stadt"
                    value={formData.address.city}
                    onChange={handleChange}
                    name="city"
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopPostal">
                  <Form.Control
                    type="number"
                    placeholder="Postleitzahl"
                    value={formData.address.postal}
                    onChange={handleChange}
                    name="postal"
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopLand">
                  <Form.Control
                    type="text"
                    placeholder="Land"
                    value={formData.address.land}
                    onChange={handleChange}
                    name="land"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopLat">
                  <Form.Control
                    type="text"
                    placeholder="Lat"
                    value={formData.address.lat}
                    onChange={handleChange}
                    name="lat"
                  />
                </Form.Group>
                <Form.Group className="mb-12" controlId="shopLong">
                  <Form.Control
                    type="text"
                    placeholder="Long"
                    value={formData.address.long}
                    onChange={handleChange}
                    name="long"
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <iframe
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.2711801263754!2d6.570461825180064!3d51.32537937554762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8b003fcd85671%3A0x16810cec84e18c60!2sKrefeld!5e0!3m2!1sde!2sde!4v1671712453479!5m2!1sde!2sde"
                ></iframe>
              </Col>
            </Row>
          </div>

          <Row>
            <Col lg="12">
              <div className="teaserCol">
                <div className="teaser">
                  <p className="h1">
                    Kontaktieren Sie uns
                    <span className="block">
                      Für Fragen und Bestellungen sind wir immer für Sie da!
                    </span>
                  </p>
                  <div className="contactContainer">
                    <Form.Group className="row" controlId="shopEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={formData.contact.email}
                        onChange={handleChange}
                        name="email"
                        required="required"
                      />
                    </Form.Group>
                  </div>
                  <div className="contactContainer">
                    <Form.Group className="row" controlId="shopPhone">
                      <Form.Control
                        type="number"
                        placeholder="Telefon"
                        value={formData.contact.phone}
                        onChange={handleChange}
                        name="phone"
                        required="required"
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="col-lg-12">
            <Button
              type="submit"
              variant="primary"
              onClick={onSaveShopClicked}
              disabled={!canSave}
            >
              Laden Speichern
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddShopForm;
