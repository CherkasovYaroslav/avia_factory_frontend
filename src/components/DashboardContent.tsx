import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardContent.css";

export const DashboardContent: React.FC = () => {
  const [counts, setCounts] = useState({
    employees: 0,
    sections: 0,
    orders: 0,
    planes: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [employeesRes, sectionsRes, ordersRes, planesRes] = await Promise.all([
          axios.get("http://localhost:3001/employees"),
          axios.get("http://localhost:3001/sections"),
          axios.get("http://localhost:3001/orders"),
          axios.get("http://localhost:3001/planes"),
        ]);

        setCounts({
          employees: employeesRes.data.length,
          sections: sectionsRes.data.length,
          orders: ordersRes.data.length,
          planes: planesRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="content">
      <div className="grid cards">
        <div className="card">
          <h3>Employees</h3>
          <div className="value"><span>{counts.employees}</span></div>
          <div className="hint">Updated: today</div>
        </div>

        <div className="card">
          <h3>Sections</h3>
          <div className="value"><span>{counts.sections}</span></div>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <div className="value"><span>{counts.orders}</span></div>
        </div>

        <div className="card">
          <h3>Aircraft models</h3>
          <div className="value"><span>{counts.planes}</span></div>
        </div>
      </div>

      <div className="footer">Static prototype of the interface</div>
    </section>
  );
};
