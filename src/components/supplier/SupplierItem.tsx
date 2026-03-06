import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Supplier } from "../../types/Supplier";
import "./SupplierItem.css";

type Props = {
  supplier: Supplier;
};

export const SupplierItem: React.FC<Props> = ({ supplier }) => {
  const navigate = useNavigate();

  const { id, name, phone_number, email, address, details } = supplier;

  return (
    <tr
      className="supplier-row"
      onClick={() => navigate(`/suppliers/${id}`)}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone_number}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{details}</td>
    </tr>
  );
};
