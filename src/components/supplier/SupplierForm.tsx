// SupplierForm.tsx
import React, { useState } from "react";
import type { Supplier } from '../../types/Supplier';
import './SupplierForm.css';

type SupplierFormProps = {
  onSave: (supplier: Omit<Supplier, "id">) => void;
  onCancel: () => void;
};

export const SupplierForm: React.FC<SupplierFormProps> = ({ onSave, onCancel }) => {
  const [supplier, setSupplier] = useState<Supplier>({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(supplier);
    setSupplier({ name: "", phone_number: "", email: "", address: "", details: "" });
  };

  return (
    <div className="supplier-form-overlay">
      <form className="supplier-form" onSubmit={handleSubmit}>
        <h3>Додати постачальника</h3>
        <input
          type="text"
          name="name"
          placeholder="Назва"
          value={supplier.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Телефон"
          value={supplier.phone_number}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Адреса"
          value={supplier.address}
          onChange={handleChange}
        />
        <textarea
          name="details"
          placeholder="Деталі"
          value={supplier.details}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Зберегти</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Відмінити</button>
        </div>
      </form>
    </div>
  );
};
