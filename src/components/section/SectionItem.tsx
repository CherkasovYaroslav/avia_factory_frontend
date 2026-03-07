import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Section } from "../../types/Section";
import "./SectionItem.css";

type Props = {
  section: Section;
};

export const SectionItem: React.FC<Props> = ({ section }) => {
  const navigate = useNavigate();

  const { id, name } = section;

  return (
    <tr
      className="section-row"
      onClick={() => navigate(`/sections/${id}`)}
    >
      <td>{id}</td>
      <td>{name}</td>
    </tr>
  );
};
