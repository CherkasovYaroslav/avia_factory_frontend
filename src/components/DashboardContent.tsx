import React from "react";
import "./DashboardContent.css";

export const DashboardContent: React.FC = () => {
  return (
    <section className="content">
      <div className="grid cards">
        <div className="card">
          <h3>Активні користувачі</h3>
          <div className="value"><span></span></div>
          <div className="hint">Оновлено: сьогодні</div>
        </div>
        <div className="card">
          <h3>Онлайн пристрої</h3>
          <div className="value"><span></span></div>
        </div>
        <div className="card">
          <h3>Сеансів за добу</h3>
          <div className="value"><span></span></div>
        </div>
        <div className="card">
          <h3>Подій безпеки</h3>
          <div className="value">5</div>
          <span className="badge warn">увага</span>
        </div>
      </div>

      <div className="footer">Статичний прототип інтерфейсу без JavaScript</div>
    </section>
  );
};
