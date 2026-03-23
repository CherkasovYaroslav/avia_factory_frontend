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
  onClick={() => navigate(`/suppliers/${id}`)}
  style={{
    cursor: "pointer",
    transition: "background 0.2s ease",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
>
  <td
    style={{
      padding: "12px",
      borderBottom: "1px solid #1f2937",
      color: "#e5e7eb",
    }}
  >
    {id}
  </td>
  <td style={{ padding: "12px", borderBottom: "1px solid #1f2937", color: "#e5e7eb" }}>
    {name}
  </td>
  <td style={{ padding: "12px", borderBottom: "1px solid #1f2937", color: "#e5e7eb" }}>
    {phone_number}
  </td>
  <td style={{ padding: "12px", borderBottom: "1px solid #1f2937", color: "#e5e7eb" }}>
    {email}
  </td>
  <td style={{ padding: "12px", borderBottom: "1px solid #1f2937", color: "#e5e7eb" }}>
    {address}
  </td>
  <td style={{ padding: "12px", borderBottom: "1px solid #1f2937", color: "#e5e7eb" }}>
    {details}
  </td>
</tr>

  );
};
