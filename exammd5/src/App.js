import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductList from "./componnets/Product/Product-List/ProductList";
import OrderList from "./componnets/Order/Order-List/OrderList";
import ProductAdd from "./componnets/Product/Product-Add/ProductAdd";
import ProductEdit from "./componnets/Product/Product-Edit/ProductEdit";
import OrderAdd from "./componnets/Order/Order-Add/OrderAdd";
import OrderEdit from "./componnets/Order/Order-Edit/OrderEdit";
import NotFound from "./componnets/404/404";
import Home from "./componnets/Home/Home";  // Import the Home component

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Home route */}
                <Route path="/product" element={<ProductList />} />
                <Route path="/product-add" element={<ProductAdd />} />
                <Route path="/product-edit/:id" element={<ProductEdit />} />
                <Route path="/order" element={<OrderList />} />
                <Route path="/order-add" element={<OrderAdd />} />
                <Route path="/order-edit/:id" element={<OrderEdit />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
            </Routes>
        </>
    );
}

export default App;
