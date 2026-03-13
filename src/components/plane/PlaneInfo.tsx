import { useEffect, useState } from "react";
import "./PlaneInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Plane } from "../../types/Plane";
import { PlaneForm } from "./PlaneForm";

export const PlaneInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [plane, setPlane] = useState<Plane | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const planeId = Number(id);

  useEffect(() => {
    if (isNaN(planeId)) return;

    const fetchPlane = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/planes/${planeId}`
        );

        if (!response.ok) {
          throw new Error("Plane not found");
        }

        const data: Plane = await response.json();
        setPlane(data);
      } catch (error) {
        console.error(error);
        setPlane(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlane();
  }, [planeId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this aircraft ?")) return;

    try {
      await fetch(`http://localhost:3001/planes/${planeId}`, {
        method: "DELETE",
      });

      navigate("/planes");
    } catch (error) {
      console.error("Deletion Error!", error);
    }
  };

  const handleSave = async (updatedPlane: Omit<Plane, "id">) => {
    try {
      await fetch(`http://localhost:3001/planes/${planeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlane),
      });

      setPlane({ id: planeId, ...updatedPlane });
      setIsEdit(false);

    } catch (error) {
      console.error("Update Error!", error);
    }
  };

  const handleBack = () => navigate("/planes");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Loading...</p>;
  if (!plane) return <p>Aircraft not found</p>;

  if (isEdit) {
    return (
      <PlaneForm
        initialData={plane}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="plane-container">
      <div className="plane-card">

        <h2>Aircraft information</h2>

        <div className="plane-info">

          <p><strong>ID</strong> {plane.id}</p>

          <p><strong>Model</strong> {plane.model}</p>

          <p><strong>Type</strong> {plane.type || "-"}</p>

          <p><strong>Price</strong> {plane.price}</p>

          <p><strong>Section</strong> {plane.section_name || "-"}</p>

        </div>

        <div className="plane-buttons">

          <button className="btn back-btn" onClick={handleBack}>
            Back to the list
          </button>

          <button className="btn edit-btn" onClick={handleEdit}>
            Edit
          </button>

          <button className="btn delete-btn" onClick={handleDelete}>
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};
