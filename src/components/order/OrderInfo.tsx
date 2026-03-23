import { useEffect, useState } from "react";
import "./OrderInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../../types/Order";
import { OrderForm } from "./OrderForm";

export const OrderInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const orderId = Number(id);

  useEffect(() => {
    if (isNaN(orderId)) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/orders/${orderId}`
        );

        if (!response.ok) {
          throw new Error("Order not found");
        }

        const data: Order = await response.json();
        setOrder(data);

      } catch (error) {
        console.error(error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "DELETE",
      });

      navigate("/orders");

    } catch (error) {
      console.error("Deletion Error!", error);
    }
  };

  const handleSave = async (updatedOrder: Omit<Order, "id">) => {
    try {
      await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      setOrder({ id: orderId, ...updatedOrder });
      setIsEdit(false);

    } catch (error) {
      console.error("Update Error!", error);
    }
  };

  const handleBack = () => navigate("/orders");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;

  if (isEdit) {
    return (
      <OrderForm
        initialData={order}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="order-container">
      <div className="order-card">

        <h2>Order information</h2>

        <div className="order-info">
          <p><strong>ID</strong> {order.id}</p>

          <p>
            <strong>Client</strong> 
            {order.client_name || "-"} 
          </p>

          <p><strong>Date</strong> {order.date.slice(0, 10)}</p>

          <p><strong>Status</strong> {order.status}</p>

          <p><strong>Total price</strong> {order.total_price}</p>
        </div>

        <div className="order-buttons">

          <button className="btn back-btn" onClick={handleBack}>
            Back
          </button>

          <button className="btn edit-btn" onClick={handleEdit}>
            Edit
          </button>

          <button className="btn delete-btn" onClick={handleDelete}>
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
