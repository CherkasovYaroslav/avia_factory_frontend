import React, { useState } from "react";
import "./ClientForm.css";
import type { Client } from "../../types/Client";

type ClientFormProps = {
  initialData?: Client;
  onSave: (client: Omit<Client, "id">) => void;
  onCancel: () => void;
};

export const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [client, setClient] = useState<Omit<Client, "id">>({
    name: initialData?.name || "",
    phone_number: initialData?.phone_number || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(client);
  };

  return (
    <div className="client-form-overlay">
      <form className="client-form" onSubmit={handleSubmit}>
        <h3>{initialData ? "Редактировать клиента" : "Добавить клиента"}</h3>

        <input
          name="name"
          placeholder="Название"
          value={client.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone_number"
          placeholder="Телефон"
          value={client.phone_number}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={client.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Адрес"
          value={client.address}
          onChange={handleChange}
        />

        <div className="form-buttons">
          <button className="submit-btn">Сохранить</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
