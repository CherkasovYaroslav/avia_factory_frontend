import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SupplierSections.css";

type SectionItem = {
  section_id: number;
  section_name: string;
  details: string;
};

export const SupplierSections: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const supplierId = Number(id);

  useEffect(() => {
    if (isNaN(supplierId)) return;

    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/suppliers/${supplierId}/sections`
        );

        if (!response.ok) {
          throw new Error("Error loading sections");
        }

        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [supplierId]);

  const handleBack = () => {
    navigate(`/suppliers/${supplierId}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="sections-container">

  <div className="sections-header">
    <h2>Supplier Sections</h2>

    <button className="back-btn" onClick={handleBack}>
      Back
    </button>
  </div>

  {sections.length === 0 ? (
    <p>Supplier does not supply any sections</p>
  ) : (
    <table className="sections-table">
      <thead>
        <tr>
          <th>Section ID</th>
          <th>Section Name</th>
          <th>Details</th>
        </tr>
      </thead>

      <tbody>
        {sections.map((section) => (
          <tr key={section.section_id}>
            <td>{section.section_id}</td>
            <td>{section.section_name}</td>
            <td>{section.details}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
  );
};
