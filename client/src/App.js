import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ProductTable from "./ProductTable";
import Cart from "./Cart";
import AdminPage from "./AdminPage";
import AdminLogin from "./AdminLogin";
import axios from "axios";
const App = () => {
  const [page, setPage] = useState("products");
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  useEffect(() => {
    // Fetch the products from an API or a database
    const fetchProducts = async () => {
      const response = await axios("http://localhost:8080");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setPage("cart");
    setProducts([...products, product]);
  };

  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact>
          {page === "products" && (
            <ProductTable
              products={products}
              setProducts={setProducts}
              onAddToCart={handleAddToCart}
              admin={admin}
            />
          )}
        </Route>
        <Route path="/cart" exact>
          <Cart products={products} setProducts={setProducts} />
        </Route>
        {/* <Route path="/admin" exact>
          <AdminPage products={products} />
        </Route> */}
        <Route path="/admin" exact>
          <AdminLogin
            products={products}
            setAdmin={setAdmin}
            admin={admin}
            setProducts={setProducts}
          />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
