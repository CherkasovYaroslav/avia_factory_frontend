import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Client } from "../../types/Client";
import "./ClientItem.css";

type Props = {
  client: Client;
};

export const ClientItem: React.FC<Props> = ({ client }) => {
  const navigate = useNavigate();

  const { id, name, phone_number, email, address } = client;

  return (
    <tr
      className="client-row"
      onClick={() => navigate(`/clients/${id}`)}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone_number}</td>
      <td>{email}</td>
      <td>{address}</td>
    </tr>
  );
};
