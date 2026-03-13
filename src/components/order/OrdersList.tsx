import { useEffect, useState } from "react";
import axios from "axios";
import { OrderForm } from "./OrderForm";
import "./OrdersList.css";
import type { Order } from "../../types/Order";
import { OrderItem } from "./OrderItem";

export const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleAddOrder = async (newOrder: Order) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/orders",
        newOrder
      );

      setOrders((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const statuses = [...new Set(orders.map((o) => o.status))];

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.client_name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter ? o.status === statusFilter : true;

    return matchSearch && matchStatus;
  });

  return (
    <section className="orders-page">

      {/* HEADER */}

      <div className="orders-header">
        <h2>Order</h2>

        <button
          className="orders-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Add order
        </button>
      </div>

      {/* FORM */}

      {showForm ? (
        <OrderForm
          onSave={handleAddOrder}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <div className="orders-filters">

            <input
              type="text"
              placeholder="Search by client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All statuses</option>

              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}

            </select>

          </div>

          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total price</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </tbody>

            </table>

          </div>
        </>
      )}

    </section>
  );
};
