import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Plane } from "../../types/Plane";
import "./PlaneItem.css";

type Props = {
  plane: Plane;
};

export const PlaneItem: React.FC<Props> = ({ plane }) => {
  const navigate = useNavigate();

  const {
    id,
    model,
    type,
    price,
    section_name
  } = plane;

  return (
    <tr
      className="plane-row"
      onClick={() => navigate(`/planes/${id}`)}
    >
      <td>{id}</td>
      <td>{model}</td>
      <td>{type || "-"}</td>
      <td>{price}</td>
      <td>{section_name || "-"}</td>
    </tr>
  );
};
