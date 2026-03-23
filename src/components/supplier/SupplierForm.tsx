import React, { useState } from "react";
import type { Supplier } from "../../types/Supplier";
import "./SupplierForm.css";

type SupplierFormProps = {
  initialData?: Supplier;
  onSave: (supplier: Omit<Supplier, "id">) => void;
  onCancel: () => void;
};

export const SupplierForm: React.FC<SupplierFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {

  const [supplier, setSupplier] = useState<Omit<Supplier,"id">>({
    name: initialData?.name || "",
    phone_number: initialData?.phone_number || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    details: initialData?.details || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(supplier);
  };

  return (
    <div className="supplier-form-overlay">
      <form className="supplier-form" onSubmit={handleSubmit}>
        <h3>{initialData ? "Edit Supplier" : "Add Supplier"}</h3>

        <input
          name="name"
          placeholder="Name"
          value={supplier.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone_number"
          placeholder="Phone number"
          value={supplier.phone_number}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={supplier.address}
          onChange={handleChange}
        />

        <textarea
          name="details"
          placeholder="Details"
          value={supplier.details}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button className="submit-btn">Submit</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
