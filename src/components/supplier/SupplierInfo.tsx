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
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await fetch(`http://localhost:3001/suppliers/${supplierId}`, {
        method: "DELETE",
      });
      navigate("/suppliers");
    } catch (error) {
      console.error("Deletion error:", error);
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
    console.error("Update error:", error);
  }
};

  const handleBack = () => navigate("/suppliers");
  const handleEdit = () => setIsEdit(true);

  const handleSections = () => {
    navigate(`/suppliers/${supplierId}/sections`);
  };

  if (loading) return <p>Loading...</p>;
  if (!supplier) return <p>Supplier not found</p>;
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
      <h2>Supplier Information</h2>

      <div className="supplier-info">
        <p><strong>ID</strong> {supplier.id}</p>
        <p><strong>Name</strong> {supplier.name}</p>
        <p><strong>Phone number</strong> {supplier.phone_number}</p>
        <p><strong>Email</strong> {supplier.email}</p>
        <p><strong>Details</strong> {supplier.details}</p>
        <p><strong>Address</strong> {supplier.address}</p>
      </div>

      <div className="supplier-buttons">
        <button className="btn back-btn" onClick={handleBack}>Back</button>
        <button className="btn edit-btn" onClick={handleEdit}>Edit</button>
          <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
          <button className="btn sections-btn" onClick={handleSections}>
            Sections
          </button>
      </div>
    </div>
  </div>
  );
};
