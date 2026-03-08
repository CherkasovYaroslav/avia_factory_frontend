import { useEffect, useState } from "react";
import "./EmployeeInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Employee } from "../../types/Employee";
import { EmployeeForm } from "./EmployeeForm";

export const EmployeeInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const employeeId = Number(id);

  useEffect(() => {
    if (isNaN(employeeId)) return;

    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/employees/${employeeId}`
        );

        if (!response.ok) {
          throw new Error("Employee not found");
        }

        const data: Employee = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error(error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить сотрудника?")) return;

    try {
      await fetch(`http://localhost:3001/employees/${employeeId}`, {
        method: "DELETE",
      });
      navigate("/employees");
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleSave = async (updatedEmployee: Omit<Employee, "id">) => {
    try {
      await fetch(`http://localhost:3001/employees/${employeeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      setEmployee({ id: employeeId, ...updatedEmployee });
      setIsEdit(false);

    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };

  const handleBack = () => navigate("/employees");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Загрузка...</p>;
  if (!employee) return <p>Сотрудник не найден</p>;

  if (isEdit) {
    return (
      <EmployeeForm
        initialData={employee}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="employee-container">
      <div className="employee-card">
        <h2>Информация о сотруднике</h2>

        <div className="employee-info">
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Имя:</strong> {employee.name}</p>
          <p><strong>Фамилия:</strong> {employee.surname}</p>
          <p><strong>Телефон:</strong> {employee.phone_number}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Дата рождения:</strong> {employee.birth_date}</p>
          <p><strong>Дата найма:</strong> {employee.hire_date}</p>
          <p><strong>Зарплата:</strong> {employee.salary}</p>
          <p><strong>Роль:</strong> {employee.role_name || "-"}</p>
          <p><strong>Отдел:</strong> {employee.section_name || "-"}</p>
        </div>

        <div className="employee-buttons">
          <button className="btn back-btn" onClick={handleBack}>
            Вернуться к списку
          </button>

          <button className="btn edit-btn" onClick={handleEdit}>
            Редактировать
          </button>

          <button className="btn delete-btn" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
