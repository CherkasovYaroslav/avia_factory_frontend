import { useEffect, useState } from "react";
import { Supplier } from "./Supplier";
import "./SupplierInfo.css" 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type Supplier = {
  Id: number;
  name: string;
  phone_number: string;
  email: string;
  details: string;
  address: string;
};

type Props = {
  selected: Supplier;
  onBack?: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export const SupplierInfo : React.FC = (
  
)  => {
   const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  const supplierId = Number(id);

  
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/suppliers/${supplierId}`
        );

        if (!response.ok) {
          throw new Error("Supplier not found");
        }

        console.log(response);
        const data = await response.json();
        console.log(data);
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
    const confirmDelete = window.confirm(
      "Ви впевнені, що хочете видалити постачальника?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5173/suppliers/${supplierId}`, {
        method: "DELETE",
      });

      navigate("/suppliers");
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  const handleBack = () => {
    navigate("/suppliers");
  };

  const handleEdit = () => {
    navigate(`/suppliers/edit/${supplierId}`);
  };

  if (loading) return <p>Завантаження...</p>;
  if (!supplier) return <p>Постачальника не знайдено</p>;


   

    return (supplier &&  
    <div className="supplier-container">
      <h2>Інформація про постачальника</h2>

      <div className="supplier-info">
        <p><strong>ID:</strong> {supplier.Id}</p>
        <p><strong>Назва:</strong> {supplier.name}</p>
        <p><strong>Телефон:</strong> {supplier.phone_number}</p>
        <p><strong>Email:</strong> {supplier.email}</p>
        <p><strong>Деталі:</strong> {supplier.details}</p>
        <p><strong>Адрес:</strong> {supplier.address}</p>
      </div>

      <div className="supplier-buttons">
        <button className="btn back-btn" onClick={handleBack}>
          Вернутись до списку
        </button>

        <button
          className="btn edit-btn"
          onClick={() => handleEdit()}
        >
          Редагувати
        </button>

        <button
          className="btn delete-btn"
          onClick={handleDelete}
        >
          Видалити
        </button>
      </div>
    </div>
  );

}; 