import React, { useState } from "react";
import type { Section } from "../../types/Section";
import "./SectionForm.css";

type SectionFormProps = {
  initialData?: Section;
  onSave: (section: Omit<Section, "id">) => void;
  onCancel: () => void;
};

export const SectionForm: React.FC<SectionFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [section, setSection] = useState<Omit<Section, "id">>({
    name: initialData?.name || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSection((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(section);
  };

  return (
    <div className="section-form-overlay">
      <form className="section-form" onSubmit={handleSubmit}>
        <h3>
          {initialData ? "Редактировать цех" : "Добавить цех"}
        </h3>

        <input
          name="name"
          placeholder="Название цеха"
          value={section.name}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Сохранить
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
