import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Employee } from "../../types/Employee";
import "./EmployeeItem.css";

type Props = {
  employee: Employee;
};

export const EmployeeItem: React.FC<Props> = ({ employee }) => {
  const navigate = useNavigate();

  const {
    id,
    name,
    surname,
    phone_number,
    email,
    role_name,
    section_name,
    salary
  } = employee;

  return (
    <tr
      className="employee-row"
      onClick={() => navigate(`/employees/${id}`)}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{phone_number}</td>
      <td>{email}</td>
      <td>{role_name || "-"}</td>
      <td>{section_name || "-"}</td>
      <td>{salary}</td>
    </tr>
  );
};
