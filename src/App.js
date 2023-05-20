import Layout from "./components/Layout";
import AddShopForm from "./features/shops/AddShopForm";
import ShopsList from "./features/shops/ShopsList";
import UsersList from "./features/users/UsersList";
import SingleUserPage from "./features/users/SingleUserPage";
import SingelShopPage from "./features/shops/SingleShopPage";
import EditShopForm from "./features/shops/EditShopForm";
import { Routes, Route } from "react-router-dom";
import NotFound404 from "./components/pages/NotFound404";

import Login from "./features/auth/Login";
import Cms from "./features/auth/Cms";
import RequireAuth from "./features/auth/RequireAuth";
import Logout from "./features/auth/Logout";

function App() {
  return (
    <div className="pageWrapp">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ShopsList />} />
          <Route path="login" element={<Login />} />
          <Route path="logaut" element={<Logout />} />
          <Route path="shop">
            <Route path=":shopId" element={<SingelShopPage />} />
          </Route>

          {/* Portacted Routes */}
          <Route element={<RequireAuth />}>
            <Route path="cms" element={<Cms />} />
            <Route path="shop">
              <Route index element={<AddShopForm />} />
              {/* <Route path=":shopId" element={<SingelShopPage />} /> */}
              <Route path="edit/:shopId" element={<EditShopForm />} />
            </Route>
            <Route path="user">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<SingleUserPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
