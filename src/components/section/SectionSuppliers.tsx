import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SectionSuppliers.css";

type SupplierItem = {
  supplier_id: number;
  supplier_name: string;
  phone_number: string;
  email: string;
  details: string;
};

export const SectionSuppliers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionId = Number(id);

  useEffect(() => {
    if (isNaN(sectionId)) return;

    const fetchSuppliers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/sections/${sectionId}/suppliers`
        );

        if (!response.ok) {
          throw new Error("Ошибка загрузки поставщиков");
        }

        const data: SupplierItem[] = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [sectionId]);

  const handleBack = () => {
    navigate(`/sections/${sectionId}`);
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="section-suppliers-container">
      <div className="section-suppliers-header">
        <h2>Поставщики цеха</h2>
        <button className="back-btn" onClick={handleBack}>Назад к цеху</button>
      </div>

      {suppliers.length === 0 ? (
        <p>У этого цеха нет поставщиков</p>
      ) : (
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Телефон</th>
              <th>Email</th>
              <th>Детали</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplier_id}>
                <td>{supplier.supplier_id}</td>
                <td>{supplier.supplier_name}</td>
                <td>{supplier.phone_number}</td>
                <td>{supplier.email}</td>
                <td>{supplier.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
