import { useEffect, useState } from "react";
import { SupplierItem } from "./SupplierItem";
import { SupplierForm } from "./SupplierForm";
import axios from "axios";
import "./SuppliersList.css";
import type { Supplier } from "../../types/Supplier";

export const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get("http://localhost:3001/suppliers");
        setSuppliers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSupplier();
  }, []);

  const handleAddSupplier = async (newSupplier: Supplier) => {
    try {
      const response = await axios.post("http://localhost:3001/suppliers", newSupplier);
      setSuppliers((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="suppliers-page">
      <div className="suppliers-header">
        <h2>Suppliers</h2>
        <button className="suppliers-btn" onClick={() => setShowForm(true)}>
          ➕ Add supplier
        </button>
      </div>

      {showForm ? (
        <SupplierForm
          onSave={handleAddSupplier}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="suppliers-table-wrapper">
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <SupplierItem key={supplier.id} supplier={supplier} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
