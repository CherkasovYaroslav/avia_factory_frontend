import { useEffect, useState } from "react";
import axios from "axios";
import "./PlaneForm.css";
import type { Plane } from "../../types/Plane";
import type { Section } from "../../types/Section";

type Props = {
  initialData?: Plane;
  onSave: (plane: Omit<Plane, "id">) => void;
  onCancel: () => void;
};

export const PlaneForm: React.FC<Props> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [plane, setPlane] = useState<Omit<Plane, "id">>({
    model: initialData?.model || "",
    type: initialData?.type || "",
    price: initialData?.price || 0,
    section_id: initialData?.section_id ?? undefined,
  });

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("http://localhost:3001/sections");
        setSections(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPlane((prev) => ({
      ...prev,
      [name]: name === "price" || name.includes("_id")
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(plane);
  };

  return (
    <div className="plane-form-overlay">
      <form className="plane-form" onSubmit={handleSubmit}>

        <h3>
          {initialData ? "Edit aircraft" : "New aircraft"}
        </h3>

        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input
            id="model"
            name="model"
            placeholder="Choose model"
            value={plane.model}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            id="type"
            name="type"
            placeholder="Enter aircraft type"
            value={plane.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="Enter price"
            value={plane.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="section_id">Section</label>
          <select
            id="section_id"
            name="section_id"
            value={plane.section_id ?? ""}
            onChange={handleChange}
          >
            <option value="">Choose section</option>

            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}

          </select>
        </div>

        <div className="form-buttons">
          <button className="submit-btn">
            Submit
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};
