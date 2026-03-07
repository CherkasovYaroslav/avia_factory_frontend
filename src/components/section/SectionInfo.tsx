import { useEffect, useState } from "react";
import "./SectionInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Section } from "../../types/Section";
import { SectionForm } from "./SectionForm";

export const SectionInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const sectionId = Number(id);

  useEffect(() => {
    if (isNaN(sectionId)) return;

    const fetchSection = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/sections/${sectionId}`
        );

        if (!response.ok) {
          throw new Error("Section not found");
        }
        
        const data: Section = await response.json();
        setSection(data);
      } catch (error) {
        console.error(error);
        setSection(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [sectionId]);

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить раздел?")) return;

    try {
      await fetch(`http://localhost:3001/sections/${sectionId}`, {
        method: "DELETE",
      });
      navigate("/sections");
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleSave = async (updatedSection: Omit<Section, "id">) => {
    try {
      await fetch(`http://localhost:3001/sections/${sectionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSection),
      });

      setSection({ id: sectionId, ...updatedSection });
      setIsEdit(false);

    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };

  const handleBack = () => navigate("/sections");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Загрузка...</p>;
  if (!section) return <p>Раздел не найден</p>;

  if (isEdit) {
    return (
      <SectionForm
        initialData={section}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="section-container">
      <div className="section-card">
        <h2>Информация о разделе</h2>

        <div className="section-info">
          <p><strong>ID:</strong> {section.id}</p>
          <p><strong>Название:</strong> {section.name}</p>
        </div>

        <div className="section-buttons">
          <button className="btn back-btn" onClick={handleBack}>Вернуться к списку</button>
          <button className="btn edit-btn" onClick={handleEdit}>Редактировать</button>
          <button className="btn delete-btn" onClick={handleDelete}>Удалить</button>
        </div>
      </div>
    </div>
  );
};
