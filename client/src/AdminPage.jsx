import React, { useState } from "react";
import axios from "axios";
import "./admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const AdminPage = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [unitKind, setUnitKind] = useState("");
  const [updatePrice, setUpdatePrice] = useState(false);
  const [updateName, setUpdateName] = useState(false);

  const [rowId, setRowId] = useState("");
  const history = useHistory();
  // const [product, setProduct] =
  const handleAddProduct = async () => {
    // Send a POST request to the server to add a new product
    await axios.post(`http://localhost:8080/`, {
      name: name,
      price: price,
      imageUrl: imageUrl,
      unitKind: unitKind,
    });
  };

  const handleDeleteProduct = async (product) => {
    console.log(product);
    // Send a DELETE request to the server to delete the product with the given id
    await axios
      .delete(`http://localhost:8080/${product._id}`)
      .then(async () => {
        const res = await axios.get(`http://localhost:8080`);
        setProducts(res.data);
      });
  };

  const handleUpdateProductPrice = async (product) => {
    console.log(price);
    if (!price) return;
    // Send a PATCH request to the server to update the product
    await axios
      .patch(`http://localhost:8080/${product._id}`, {
        price: price,
      })
      .then(async () => {
        const res = await axios.get(`http://localhost:8080`);
        setProducts(res.data);
      });
  };
  const handleUpdateProduct = async (product) => {
    console.log(name);
    if (!name) return;
    // Send a PATCH request to the server to update the product
    await axios
      .patch(`http://localhost:8080/${product._id}`, {
        name: name,
      })
      .then(async () => {
        const res = await axios.get(`http://localhost:8080`);
        setProducts(res.data);
      });
  };

  const homePage = () => {
    history.push("/");
  };
  return (
    <div className="Admin">
      <div
        onClick={homePage}
        style={{ paddingRight: "40px", marginTop: "15px" }}
      >
        <div
          style={{
            width: "fit-content",
            borderBottom: "2px solid black",
            cursor: "pointer",
          }}
        >
          ???? ????????
        </div>
      </div>
      <div className="addProduct">
        <h1>???????? ????????????</h1>
        <form onSubmit={handleAddProduct}>
          <div className="nameAndInput">
            <div className="label">????:</div>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <br />
          <div className="nameAndInput">
            <div className="label">????????:</div>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <br />
          <div className="nameAndInput">
            <div className="label"> ?????? ??????????:</div>

            <input
              type="text"
              placeholder='??"??, ????????, ????'
              value={unitKind}
              onChange={(event) => setUnitKind(event.target.value)}
            />
          </div>
          <br />
          <div className="nameAndInput">
            ??????????:
            <input
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>
          <br />
          <button type="submit" style={{ width: "100%" }}>
            ???????? ????????
          </button>
        </form>
      </div>
      <hr />
      <div>
        <h2 style={{ textAlign: "center" }}>????????????</h2>
      </div>
      {products.map((product) => (
        <div key={product._id} className="adminProducts">
          <div className="adminProductsTable">
            <img
              src={product.imageUrl}
              alt={product.name}
              width="100px"
              height="100px"
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="detailsNotImg">
            {/* <div className="adminProductsTable"> */}
            {/* {product.name}
              <FontAwesomeIcon
                style={{ marginRight: "10px" }}
                icon={faPenToSquare}
                onClick={() => {
                  setUpdateName(true);
                  setRowId(product._id);
                }}
              /> */}
            {updateName && product._id === rowId ? (
              <div className="adminProductsTable2elements">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  style={{ height: "20px", maxWidth: "100%" }}
                />
                <div className="adminProductsTable2Belements">
                  <button
                    style={{ height: "20px", marginLeft: "10px" }}
                    onClick={() => {
                      handleUpdateProduct(product);
                      setUpdateName(false);
                    }}
                  >
                    ??????????
                  </button>
                  <button
                    onClick={() => {
                      setUpdateName(false);
                    }}
                  >
                    ??????????
                  </button>
                </div>
              </div>
            ) : (
              <div className="adminProductsTable">
                {product.name}
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faPenToSquare}
                  onClick={() => {
                    setUpdateName(true);
                    setUpdatePrice(false);
                    setRowId(product._id);
                  }}
                />
              </div>
            )}
            {/* </div> */}
            {updatePrice && product._id === rowId ? (
              <div className="adminProductsTable2elements">
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ height: "20px", maxWidth: "100%" }}
                />
                <div className="adminProductsTable2Belements">
                  <button
                    style={{ height: "20px", marginLeft: "10px" }}
                    onClick={() => {
                      handleUpdateProductPrice(product);
                      setUpdatePrice(false);
                    }}
                  >
                    ??????????
                  </button>
                  <button
                    onClick={() => {
                      setUpdatePrice(false);
                    }}
                  >
                    ??????????
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="adminProductsTable">
                  {product.price} ??"??{" "}
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faPenToSquare}
                    onClick={() => {
                      setUpdatePrice(true);
                      setUpdateName(false);
                      setRowId(product._id);
                    }}
                  />
                </div>
              </>
            )}
            {/* <div className="adminProductsTable">
              {!updatePrice ? (
                <button
                  onClick={() => {
                    setUpdatePrice(true);
                    setRowId(product._id);
                  }}
                >
                  ??????????
                </button>
              ) : null}
            </div> */}
            <div className="adminProductsTable">
              <button onClick={() => handleDeleteProduct(product)}>
                ??????????
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
