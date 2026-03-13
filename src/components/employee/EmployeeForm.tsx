import { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeForm.css";
import type { Employee } from "../../types/Employee";
import type { Role } from "../../types/Role";
import type { Section } from "../../types/Section";

type Props = {
  initialData?: Employee;
  onSave: (employee: Omit<Employee, "id">) => void;
  onCancel: () => void;
};

export const EmployeeForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [employee, setEmployee] = useState<Omit<Employee, "id">>({
    name: initialData?.name || "",
    surname: initialData?.surname || "",
    phone_number: initialData?.phone_number || "",
    email: initialData?.email || "",
    birth_date: initialData?.birth_date || "",
    hire_date: initialData?.hire_date || "",
    salary: initialData?.salary || 0,
    role_id: initialData?.role_id ?? null,
    section_id: initialData?.section_id ?? null,
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await axios.get("http://localhost:3001/roles");
        const sectionsRes = await axios.get("http://localhost:3001/sections");

        setRoles(rolesRes.data);
        setSections(sectionsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" || name.includes("_id") ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee);
  };

  return (
    <div className="employee-form-overlay">
      <form className="employee-form" onSubmit={handleSubmit}>
        <h3>{initialData ? "Edit employee" : "New employee"}</h3>

        <div className="form-group">
  <label htmlFor="name">Name</label>
  <input
    id="name"
    name="name"
    placeholder="Enter name"
    value={employee.name}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="surname">Surname</label>
  <input
    id="surname"
    name="surname"
    placeholder="Enter surname"
    value={employee.surname}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="phone_number">Phone number</label>
  <input
    id="phone_number"
    name="phone_number"
    placeholder="Enter a phone number"
    value={employee.phone_number}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    name="email"
    placeholder="Enter email"
    value={employee.email}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="birth_date">Birth date</label>
  <input
    id="birth_date"
    type="date"
    name="birth_date"
    value={employee.birth_date}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="hire_date">Hire date</label>
  <input
    id="hire_date"
    type="date"
    name="hire_date"
    value={employee.hire_date}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="salary">Salary</label>
  <input
    id="salary"
    type="number"
    name="salary"
    placeholder="Enter a salary"
    value={employee.salary}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label htmlFor="role_id">Role</label>
  <select
    id="role_id"
    name="role_id"
    value={employee.role_id ?? ""}
    onChange={handleChange}
  >
    <option value="">Choose a role</option>
    {roles.map((role) => (
      <option key={role.id} value={role.id}>
        {role.name}
      </option>
    ))}
  </select>
</div>


<div className="form-group">
  <label htmlFor="section_id">Department</label>
  <select
    id="section_id"
    name="section_id"
    value={employee.section_id ?? ""}
    onChange={handleChange}
  >
    <option value="">Choose a department</option>
    {sections.map((section) => (
      <option key={section.id} value={section.id}>
        {section.name}
      </option>
    ))}
  </select>
</div>

        <div className="form-buttons">
          <button className="submit-btn">Submit</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};