import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeForm } from "./EmployeeForm";
import "./EmployeesList.css";
import type { Employee } from "../../types/Employee";
import { EmployeeItem } from "./EmployeeItem";

export const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  

  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3001/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchEmployees();
}, []);

  const handleAddEmployee = async (newEmployee: Employee) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/employees",
        newEmployee
      );

      setEmployees((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const roles = [...new Set(employees.map((e) => e.role_name))];
  const sections = [...new Set(employees.map((e) => e.section_name))];

  const filteredEmployees = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.surname.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter ? e.role_name === roleFilter : true;
    const matchSection = sectionFilter
      ? e.section_name === sectionFilter
      : true;

    return matchSearch && matchRole && matchSection;
  });

  return (
    <section className="employees-page">

      {/* HEADER */}

      <div className="employees-header">
        <h2>Працівники</h2>

        <button
          className="employees-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Додати працівника
        </button>
      </div>

      {/* FORM */}

      {showForm ? (
        <EmployeeForm
          onSave={handleAddEmployee}
          onCancel={() => setShowForm(false)}
        />
      ) : (

    <>
      <div className="employees-filters">

        <input
          type="text"
          placeholder="Пошук по імені..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Усі ролі</option>
          {roles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>

        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
        >
          <option value="">Усі відділи</option>
          {sections.map((section) => (
            <option key={section}>{section}</option>
          ))}
        </select>

      </div>

      <div className="employees-table-wrapper">
        <table className="employees-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Section</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
  </div>
    </>)
}
    </section>
  );
};
