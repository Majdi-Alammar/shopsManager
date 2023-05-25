import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const AddShopForm = () => {
  const [addNewShop, { isLoading }] = useAddNewShopMutation();
  const navigate = useNavigate();

  const [name, steName] = useState();
  const [category, setCategory] = useState();
  const [slogan, setSlogan] = useState();
  // Addresse
  const [housNo, setHousNo] = useState();
  const [street, setStreet] = useState();
  const [postal, setPostal] = useState();
  const [city, setCity] = useState();
  const [land, setLand] = useState();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();

  // Contact
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  // About us
  const [aboutTitle, setAboutTitle] = useState();
  const [aboutContent, setAboutContent] = useState();

  // header Pic
  const [picTitle, setPicTitle] = useState();
  const [picUrl, setPicUrl] = useState();
  const [claimTitle, setClaimTitle] = useState();
  const [claimSubTitle, setClaimSubTitle] = useState();

  // Products
  const [products, setProducts] = useState([]);

  // Ohner
  const userId = useSelector(selectCurrentUser).id;

  // All Events
  const onNameChanged = (e) => steName(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onSloganChanged = (e) => setSlogan(e.target.value);
  // const onOhnerChanged = (e) => setUserId(e.target.value);

  // Events: Addresse
  const onHousNoChanged = (e) => setHousNo(e.target.value);
  const onStreetChanged = (e) => setStreet(e.target.value);
  const onCityChanged = (e) => setCity(e.target.value);
  const onPostalChanged = (e) => setPostal(e.target.value);
  const onLandChanged = (e) => setLand(e.target.value);
  const onLatChanged = (e) => setLat(e.target.value);
  const onLongChanged = (e) => setLong(e.target.value);

  // Events: Contact
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  // Events: About us
  const onAboutContentChanged = (e) => setAboutContent(e.target.value);
  const onAboutTitleChanged = (e) => setAboutTitle(e.target.value);

  // Events: header Pic
  const onPicTitleChanged = (e) => setPicTitle(e.target.value);
  const onPicUrlChanged = (e) => setPicUrl(e.target.value);
  const onClaimTitleChanged = (e) => setClaimTitle(e.target.value);
  const onClaimSubTitleChanged = (e) => setClaimSubTitle(e.target.value);

  const onProductsChanged = (e, id, elem) => {
    const newProducts = products.map((pro) => {
      if (pro.id === Number(id)) {
        const newPro = { ...pro };
        newPro[elem] = e.target.value;
        return newPro;
      } else {
        return pro;
      }
    });

    setProducts([...newProducts]);
  };
  const addNewProduct = (e) => {
    e.preventDefault();
    const newProducts = [...products];
    let newId = -1;
    newProducts.map((pro) => {
      if (pro.id > newId) {
        newId = pro.id;
      }
      console.log(newId);
    });
    newProducts.push({ id: newId + 1, name: "", price: 0, description: "" });
    console.log(newProducts);
    setProducts([...newProducts]);
  };

  const canSave =
    [
      name,
      category,
      slogan,
      userId,
      housNo,
      street,
      postal,
      city,
      email,
      phone,
    ].every(Boolean) && !isLoading;

  const onSaveShopClicked = async () => {
    if (canSave) {
      try {
        await addNewShop({
          userId,
          name,
          category,
          slogan,
          address: { street, housNo, postal, city, land },
          contact: { email, phone },
          aboutUs: { aboutTitle, aboutContent },
          headerPic: {
            picTitle,
            picUrl,
            headerClaim: { claimTitle, claimSubTitle },
          },
          products: [...products],
        }).unwrap();
        steName("");
        setCategory("");
        setSlogan("");
        // setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Faild to save the Shop", err);
      }
    }
  };

  let usersOptions;
  // if (isSuccess) {
  //   usersOptions = users.ids.map((id) => (
  //     <option key={id} value={id}>
  //       {users.entities[id].name}
  //     </option>
  //   ));
  // }

  const productsList = products.map((pro) => {
    return (
      <fieldset className="porBox">
        <legend>{pro.name}</legend>
        <label htmlFor="productName">Produktname:</label>
        <input
          type="text"
          id={`${pro.id}`}
          name="productName"
          value={pro.name}
          onChange={(e) => onProductsChanged(e, pro.id, "name")}
        />
        <label htmlFor="productPrice">Preis:</label>
        <input
          type="text"
          id={`${pro.id}-productPrice`}
          name="productPrice"
          value={pro.price}
          onChange={(e) => onProductsChanged(e, pro.id, "price")}
        />
        <label htmlFor="productDescription">Beschreibung:</label>
        <input
          type="text"
          id={`${pro.id}-productDescription`}
          name="productDescription"
          value={pro.description}
          onChange={(e) => onProductsChanged(e, pro.id, "description")}
        />
      </fieldset>
    );
  });

  return (
    <section>
      <h2>Laden Hinzufügen</h2>
      <form className="addEditForm">
        <fieldset name="Allgemein">
          <legend>Allgemein</legend>
          <label htmlFor="shopName">Shop Name*:</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={name}
            onChange={onNameChanged}
          />
          {/* <label htmlFor="shopOhner">Shop Ohner*:</label>
          <select id="shopOhner" value={userId} onChange={onOhnerChanged}>
            <option value="">Wählen Sie bitte</option>
            {usersOptions}
          </select> */}
          <label htmlFor="shopCategory">Shop Category*:</label>
          <select id="shopCategory" onChange={onCategoryChanged}>
            <option value="">wählen Sie bitte</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Supermarkt">Supermarkt</option>
            <option value="Parpershop">Parpershop</option>
          </select>
          <label htmlFor="shopSlogan">Slogan:</label>
          <textarea
            id="shopSlogan"
            name="shopSlogan"
            value={slogan}
            onChange={onSloganChanged}
          />
        </fieldset>
        <fieldset name="headerPic">
          <legend>Header</legend>
          <label htmlFor="shopPicTitle">Bild Title:</label>
          <input
            type="text"
            id="shopPicTitle"
            name="shopPicTitle"
            value={picTitle}
            onChange={onPicTitleChanged}
          />
          <label htmlFor="shopPicUrl">Bild url:</label>
          <input
            type="text"
            id="shopPicUrl"
            name="shopPicUrl"
            value={picUrl}
            onChange={onPicUrlChanged}
          />
          <label htmlFor="shopClaimTitle">Claim Überschrift:</label>
          <input
            type="text"
            id="shopClaimTitle"
            name="shopClaimTitle"
            value={claimTitle}
            onChange={onClaimTitleChanged}
          />
          <label htmlFor="shopClaimSubTitle">Claim Unterschrift:</label>
          <input
            type="text"
            id="shopClaimSubTitle"
            name="shopClaimSubTitle"
            value={claimSubTitle}
            onChange={onClaimSubTitleChanged}
          />
        </fieldset>

        <fieldset name="address">
          <legend>Adresse</legend>
          <label htmlFor="shopHousNo">Hausnummer:</label>
          <input
            type="text"
            id="shopHousNo"
            name="shopHousNo"
            value={housNo}
            onChange={onHousNoChanged}
          />
          <label htmlFor="shopStreet">Straße:</label>
          <input
            type="text"
            id="shopStreet"
            name="shopStreet"
            value={street}
            onChange={onStreetChanged}
          />
          <label htmlFor="shopCity">Stadt:</label>
          <input
            type="text"
            id="shopCity"
            name="shopCity"
            value={city}
            onChange={onCityChanged}
          />
          <label htmlFor="shopPostal">Postleitzahl:</label>
          <input
            type="text"
            id="shopPostal"
            name="shopPostal"
            value={postal}
            onChange={onPostalChanged}
          />
          <label htmlFor="shopLand">Land:</label>
          <input
            type="text"
            id="shopLand"
            name="shopLand"
            value={land}
            onChange={onLandChanged}
          />
          <label htmlFor="shopLat">Lat:</label>
          <input
            type="text"
            id="shopLat"
            name="shopLat"
            value={lat}
            onChange={onLatChanged}
          />
          <label htmlFor="shopLong">Long:</label>
          <input
            type="text"
            id="shopLong"
            name="shopLong"
            value={long}
            onChange={onLongChanged}
          />
        </fieldset>
        <div className="contactAboutBox">
          <fieldset name="contact">
            <legend>Kontaktdaten</legend>
            <label htmlFor="shopEmail">Email:</label>
            <input
              type="text"
              id="shopEmail"
              name="shopEmail"
              value={email}
              onChange={onEmailChanged}
            />
            <label htmlFor="shopPhone">Telefon:</label>
            <input
              type="text"
              id="shopPhone"
              name="shopPhone"
              value={phone}
              onChange={onPhoneChanged}
            />
          </fieldset>
          <fieldset name="aboutUs">
            <legend>Wir über uns</legend>
            <label htmlFor="shopAboutTitle">Title:</label>
            <input
              type="text"
              id="shopAboutTitle"
              name="shopAboutTitle"
              value={aboutTitle}
              onChange={onAboutTitleChanged}
            />
            <label htmlFor="shopAboutContent">Content:</label>
            <textarea
              id="shopAboutContent"
              rows={6}
              name="shopAboutContent"
              value={aboutContent}
              onChange={onAboutContentChanged}
            />
          </fieldset>
        </div>
        {productsList.length > 0 ? (
          <div className="productsBox">
            <div className="fullWidth" name="Products">
              <hr />
              <h4>Produkte</h4>
              {productsList}
              <button className="btn" onClick={addNewProduct}>
                Produkt Hinzufügen
              </button>
            </div>
          </div>
        ) : (
          <div className="productsBox">
            <div className="fullWidth" name="Products">
              <hr />
              <h4>Produkte</h4>
              <p>Es gibt keine Produkte zurzeit</p>
              <button className="btn" onClick={addNewProduct}>
                Produkt Hinzufügen
              </button>
            </div>
          </div>
        )}

        <button type="button" onClick={onSaveShopClicked} disabled={!canSave}>
          Save Shop
        </button>
      </form>
    </section>
  );
};

export default AddShopForm;
