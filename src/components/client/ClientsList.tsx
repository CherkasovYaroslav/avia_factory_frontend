import { useEffect, useState } from "react";
import { ClientItem } from "./ClientItem";
import { ClientForm } from "./ClientForm";
import axios from "axios";
import "./ClientsList.css";
import type { Client } from "../../types/Client";

export const ClientsList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/clients");
        setClients(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async (newClient: Client) => {
    try {
      const response = await axios.post("http://localhost:3001/clients", newClient);
      setClients((prev) => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="clients-page">
      <div className="clients-header">
        <h2>Клієнти</h2>
        <button className="clients-btn" onClick={() => setShowForm(true)}>
          ➕ Додати клієнта
        </button>
      </div>

      {showForm ? (
        <ClientForm
          onSave={handleAddClient}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="clients-table-wrapper">
          <table className="clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ім’я</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Адреса</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <ClientItem key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
