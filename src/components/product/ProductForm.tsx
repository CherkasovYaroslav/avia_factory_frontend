import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductForm.css";
import type { Product } from "../../types/Product";
import type { Plane } from "../../types/Plane";
import type { Order } from "../../types/Order";

type Props = {
  initialData?: Product;
  onSave: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
};

export const ProductForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [product, setProduct] = useState<Omit<Product, "id">>({
    unique_code: initialData?.unique_code || "",
    production_date: initialData?.production_date || "",
    status: initialData?.status || "",
    plane_id: initialData?.plane_id ?? null,
    order_id: initialData?.order_id ?? null,
    name: initialData?.name || undefined,
    category_name: initialData?.category_name || "",
    price: initialData?.price || 0,
    stock_quantity: initialData?.stock_quantity || 0
  });

  const [planes, setPlanes] = useState<Plane[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planesRes = await axios.get("http://localhost:3001/planes");
        const ordersRes = await axios.get("http://localhost:3001/orders");

        setPlanes(planesRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name.includes("_id") ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <div className="product-form-overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>{initialData ? "Edit product" : "New product"}</h3>

        <div className="form-group">
          <label htmlFor="unique_code">Unique code</label>
          <input
            id="unique_code"
            name="unique_code"
            placeholder="Enter unique code"
            value={product.unique_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="production_date">Production date</label>
          <input
            id="production_date"
            type="date"
            name="production_date"
            value={product.production_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            name="status"
            placeholder="Enter status"
            value={product.status}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="plane_id">Aircraft</label>
          <select
            id="plane_id"
            name="plane_id"
            value={product.plane_id ?? ""}
            onChange={handleChange}
          >
            <option value="">Choose aircraft</option>
            {planes.map((plane) => (
              <option key={plane.id} value={plane.id}>
                {plane.model}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="order_id">Order</label>
          <select
            id="order_id"
            name="order_id"
            value={product.order_id ?? ""}
            onChange={handleChange}
          >
            <option value="">Choose order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.status} — {order.total_price} USD
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
