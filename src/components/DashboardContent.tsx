import React from "react";
import "./DashboardContent.css";

export const DashboardContent: React.FC = () => {
  return (
    <section className="content">
      <div className="grid cards">
        <div className="card">
          <h3>Active users</h3>
          <div className="value"><span></span></div>
          <div className="hint">Updated: today</div>
        </div>
        <div className="card">
          <h3>Online devices</h3>
          <div className="value"><span></span></div>
        </div>
        <div className="card">
          <h3>Daily sessions</h3>
          <div className="value"><span></span></div>
        </div>
        <div className="card">
          <h3>Security events</h3>
          <div className="value">5</div>
          <span className="badge warn">Warning</span>
        </div>
      </div>

      <div className="footer">Static prototype of the interface without JavaScript</div>
    </section>
  );
};
