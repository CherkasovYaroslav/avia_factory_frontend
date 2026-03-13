import { useEffect, useState } from "react";
import "./SupplierInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Supplier } from "../../types/Supplier";
import { SupplierForm } from "./SupplierForm";

type SupplierItem = {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  details: string;
  address: string;
};

export const SupplierInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState<SupplierItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const supplierId = Number(id);

  useEffect(() => {
    if (isNaN(supplierId)) return;

    const fetchSupplier = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/suppliers/${supplierId}`
        );

        if (!response.ok) {
          throw new Error("Supplier not found");
        }
        
        const data: SupplierItem = await response.json();
        setSupplier(data);
      } catch (error) {
        console.error(error);
        setSupplier(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить поставщика?")) return;

    try {
      await fetch(`http://localhost:3001/suppliers/${supplierId}`, {
        method: "DELETE",
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleSave = async (updatedSupplier: Omit<Supplier, "id">) => {
  try {
    await fetch(`http://localhost:3001/suppliers/${supplierId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSupplier),
    });

    setSupplier({ id: supplierId, ...updatedSupplier });
    setIsEdit(false);

  } catch (error) {
    console.error("Ошибка обновления:", error);
  }
};

  const handleBack = () => navigate("/suppliers");
  const handleEdit = () => setIsEdit(true);

  const handleSections = () => {
    navigate(`/suppliers/${supplierId}/sections`);
  };

  if (loading) return <p>Загрузка...</p>;
  if (!supplier) return <p>Поставщик не найден</p>;
  console.log(supplier);
  
  if (isEdit) {
  return (
    <SupplierForm
      initialData={supplier}
      onSave={handleSave}
      onCancel={() => setIsEdit(false)}
    />
  );
}

  return (
    <div className="supplier-container">
    <div className="supplier-card">
      <h2>Информация о поставщике</h2>

      <div className="supplier-info">
        <p><strong>ID:</strong> {supplier.id}</p>
        <p><strong>Название:</strong> {supplier.name}</p>
        <p><strong>Телефон:</strong> {supplier.phone_number}</p>
        <p><strong>Email:</strong> {supplier.email}</p>
        <p><strong>Детали:</strong> {supplier.details}</p>
        <p><strong>Адрес:</strong> {supplier.address}</p>
      </div>

      <div className="supplier-buttons">
        <button className="btn back-btn" onClick={handleBack}>Вернуться к списку</button>
        <button className="btn edit-btn" onClick={handleEdit}>Редактировать</button>
          <button className="btn delete-btn" onClick={handleDelete}>Удалить</button>
          <button className="btn sections-btn" onClick={handleSections}>
            Цехи
          </button>
      </div>
    </div>
  </div>
  );
};
