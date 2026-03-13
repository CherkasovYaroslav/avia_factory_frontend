import { useEffect, useState } from "react";
import axios from "axios";
import "./PlaneList.css";
import { PlaneForm } from "./PlaneForm";
import { PlaneItem } from "./PlaneItem";
import type { Plane } from "../../types/Plane";

export const PlanesList = () => {
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await axios.get("http://localhost:3001/planes");
        setPlanes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlanes();
  }, []);

  const handleAddPlane = async (newPlane: Plane) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/planes",
        newPlane
      );

      setPlanes((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const sections = [...new Set(planes.map((p) => p.section_name))];

  const filteredPlanes = planes.filter((p) => {
    const matchSearch = p.model
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchSection = sectionFilter
      ? p.section_name === sectionFilter
      : true;

    return matchSearch && matchSection;
  });

  return (
    <section className="planes-page">

      {/* HEADER */}

      <div className="planes-header">
        <h2>Aircraft models</h2>

        <button
          className="planes-btn"
          onClick={() => setShowForm(true)}
        >
          ➕ Add aircraft
        </button>
      </div>

      {/* FORM */}

      {showForm ? (
        <PlaneForm
          onSave={handleAddPlane}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          {/* FILTERS */}

          <div className="planes-filters">

            <input
              type="text"
              placeholder="Search by model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option value="">All sections</option>
              {sections.map((section) => (
                <option key={section}>{section}</option>
              ))}
            </select>

          </div>

          {/* TABLE */}

          <div className="planes-table-wrapper">
            <table className="planes-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Section</th>
                </tr>
              </thead>

              <tbody>
                {filteredPlanes.map((plane) => (
                  <PlaneItem key={plane.id} plane={plane} />
                ))}
              </tbody>

            </table>
          </div>
        </>
      )}
    </section>
  );
};
