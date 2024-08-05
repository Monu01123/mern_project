import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart"; // Import useCart hook
import toast from "react-hot-toast"; // Import toast for notifications
import "../styles/CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart(); // Add cart state

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          {/* <div className="col-md-9 offset-1"> */}
          <div className="product-grid1">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <button
                  style={{ border: "none" }}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </button>
                <div
                  className="add-to-cart"
                >
                  <button
                    className="addtocart_btn"
                    onClick={() => addToCart(p)}
                  >
                    +
                  </button>
                </div>
                <div className="card-lower">
                  <h5>{p.name}</h5>
                  <h5>
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
