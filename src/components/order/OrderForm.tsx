import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderForm.css";
import type { Order } from "../../types/Order";
import type { Client } from "../../types/Client";

type Props = {
  initialData?: Order;
  onSave: (order: Omit<Order, "id">) => void;
  onCancel: () => void;
};

export const OrderForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
}) => {

  const [order, setOrder] = useState<Omit<Order, "id">>({
    total_price: initialData?.total_price || 0,
    date: initialData?.date || "",
    status: initialData?.status || "",
    client_id: initialData?.client_id ?? null,
  });

  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:3001/clients");
        setClients(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    setOrder((prev) => ({
      ...prev,
      [name]:
        name === "total_price" || name === "client_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(order);
  };

  return (
    <div className="order-form-overlay">

      <form className="order-form" onSubmit={handleSubmit}>

        <h3>{initialData ? "Edit Order" : "New Order"}</h3>

        <div className="form-group">
          <label htmlFor="total_price">Total price</label>
          <input
            id="total_price"
            type="number"
            name="total_price"
            placeholder="Enter total price"
            value={order.total_price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={order.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            id="status"
            name="status"
            placeholder="Enter status"
            value={order.status}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="client_id">Client</label>
          <select
            id="client_id"
            name="client_id"
            value={order.client_id ?? ""}
            onChange={handleChange}
          >
            <option value="">Choose a client</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} 
              </option>
            ))}

          </select>
        </div>

        <div className="form-buttons">

          <button className="submit-btn">
            Submit
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};
