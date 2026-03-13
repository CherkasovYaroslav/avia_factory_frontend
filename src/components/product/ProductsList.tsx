import { useEffect, useState } from "react";
import axios from "axios";
import { ProductForm } from "./ProductForm";
import "./ProductsList.css";
import type { Product } from "../../types/Product";
import { ProductItem } from "./ProductItem";

export const ProductsList = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [planeFilter, setPlaneFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Product) => {
    try {

      const res = await axios.post(
        "http://localhost:3001/products",
        newProduct
      );

      setProducts((prev) => [...prev, res.data]);
      setShowForm(false);

    } catch (err) {
      console.error(err);
    }
  };

  const planes = [...new Set(products.map((p) => p.plane_name))];
  const orders = [...new Set(products.map((p) => p.order_id))];

  const filteredProducts = products.filter((p) => {

    const matchSearch =
      p.unique_code.toLowerCase().includes(search.toLowerCase());

    const matchPlane =
      planeFilter ? p.plane_name === planeFilter : true;

    const matchOrder =
      orderFilter ? String(p.order_id) === orderFilter : true;

    return matchSearch && matchPlane && matchOrder;
  });

  return (
    <section className="products-page">

      <div className="products-header">

        <h2>Products</h2>

        <button
          className="products-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Add product
        </button>

      </div>

      {showForm ? (

        <ProductForm
          onSave={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />

      ) : (

        <>

          <div className="products-filters">

            <input
              type="text"
              placeholder="Search by code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={planeFilter}
              onChange={(e) => setPlaneFilter(e.target.value)}
            >

              <option value="">All aircrafts</option>

              {planes.map((plane) => (
                <option key={plane}>{plane}</option>
              ))}

            </select>

            <select
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
            >

              <option value="">All orders</option>

              {orders.map((order) => (
                <option key={order}>{order}</option>
              ))}

            </select>

          </div>

          <div className="products-table-wrapper">

            <table className="products-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Production date</th>
                  <th>Status</th>
                  <th>Aircraft</th>
                  <th>Order</th>
                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                  />
                ))}

              </tbody>

            </table>

          </div>

        </>
      )}

    </section>
  );
};
