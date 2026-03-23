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
        <div
  style={{
    background: "linear-gradient(180deg,#0b1229,#0e162f)",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "16px",
    overflowX: "auto",
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        {["ID", "Name", "Phone number", "Email", "Address", "Details"].map(
          (title) => (
            <th
              key={title}
              style={{
                textAlign: "left",
                padding: "12px",
                fontSize: "13px",
                color: "#94a3b8",
                borderBottom: "1px solid #1f2937",
              }}
            >
              {title}
            </th>
          )
        )}
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
