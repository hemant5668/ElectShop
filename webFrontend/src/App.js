import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter,Route ,Routes} from "react-router-dom";
import './App.css'
import HomeScreen from "./Pages/HomeScreen";
import ProductScreen from "./Pages/ProductScreen";
import CartScreen from "./Pages/CartScreen";
import LoginScreen from "./Pages/LoginScreen";
import RegisterScreen from "./Pages/RegisterScreen";
import ProfileScreen from "./Pages/ProfileScreen";
import ShippingScreen from "./Pages/ShippingScreen";
import PaymentScreen from "./Pages/PaymentScreen";
import PlaceOrderScreen from "./Pages/PlaceOrderScreen";
import OrderScreen1 from "./Pages/OrderScreen1";
import PaypalPayment from "./Pages/PaypalPayment";
import AdminScreen from "./Pages/AdminScreen";
import ProductListScreen from "./Pages/ProductListScreen";
import UserEditScreen from "./Pages/UserEditScreen";
import EditProductScreen from "./Pages/EditProductScreen";
import CreateNewProduct from "./Pages/CreateNewProduct";
import ListOrderScreen from "./Pages/ListOrderScreen"

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <main>
        <Container>
          <Routes>
          <Route path="/" element={<HomeScreen/>} exact/>
          <Route path="login/" element={<LoginScreen/>}/>
          <Route path="login/shipping" element={<ShippingScreen/>} />
          <Route path="/admin/userlist" element={<AdminScreen/>} />
          <Route path="/admin/productlist" element={<ProductListScreen/>} />
          <Route path="/admin/productlist/:id/edit" element={<EditProductScreen/>} />
          <Route path="/admin/productlist/createnew" element={<CreateNewProduct/>} />
          <Route path="/admin/user/:id/edit/" element={<UserEditScreen/>} />
          <Route path="/admin/orderslist" element={<ListOrderScreen/>} />

          <Route path="/payment" element={<PaymentScreen/>} />
          <Route path="/checkout" element={<PlaceOrderScreen/>} />
          <Route path="/order/:id" element={<OrderScreen1/>} />
          <Route path="/order/:id/pay/" element={<PaypalPayment/>} />
            
          <Route path="register/" element={<RegisterScreen/>} />
          <Route path="profile/" element={<ProfileScreen/>} />
          <Route path="/product/:Product_Id" element={<ProductScreen/>} exact/>
          <Route path="cart" element={<CartScreen/>}>
            <Route path=":Product_Id" element={<CartScreen/>}/>
          </Route>
          </Routes>
          {/* My App */}
        </Container>
      </main>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
