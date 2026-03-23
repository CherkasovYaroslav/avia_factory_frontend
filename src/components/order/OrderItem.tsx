import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types/Order";
import "./OrderItem.css";

type Props = {
  order: Order;
};

export const OrderItem: React.FC<Props> = ({ order }) => {
  const navigate = useNavigate();

  const {
    id,
    total_price,
    date,
    status,
    client_name: name,
    
  } = order;

  return (
    <tr
      className="order-row"
      onClick={() => navigate(`/orders/${id}`)}
    >
      <td>{id}</td>

      <td>
        {name || "-"} 
      </td>

      <td>{date.slice(0, 10)}</td>

      <td>{status}</td>

      <td>{total_price}</td>
    </tr>
  );
};
