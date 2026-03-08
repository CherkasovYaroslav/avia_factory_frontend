import { useEffect, useState } from "react";
import { SectionItem } from "./SectionItem";
import { SectionForm } from "./SectionForm";
import axios from "axios";
import "./SectionsList.css";
import type { Section } from "../../types/Section";

export const SectionsList = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get("http://localhost:3001/sections");
        setSections(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSections();
  }, []);

  const handleAddSection = async (newSection: Omit<Section, "id">) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/sections",
        newSection
      );

      setSections((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="sections-page">
      <div className="sections-header">
        <h2>Sections</h2>

        <button
          className="sections-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Add section
        </button>
      </div>

      {showForm ? (
        <SectionForm
          onSave={handleAddSection}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="sections-table-wrapper">
          <table className="sections-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {sections.map((section) => (
                <SectionItem key={section.id} section={section} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
