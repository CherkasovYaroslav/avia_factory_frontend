import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import "./ProductItem.css";

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const {
    id,
    unique_code,
    production_date,
    status,
    plane_name,
    order_id,
  } = product;

  return (
    <tr
      className="product-row"
      onClick={() => id && navigate(`/products/${id}`)}
    >
      <td>{id || "-"}</td>
      <td>{unique_code}</td>
      <td>{production_date.slice(0, 10)}</td>
      <td>{status}</td>
      <td>{plane_name || "-"}</td>
      <td>{order_id}</td>
    </tr>
  );
};
