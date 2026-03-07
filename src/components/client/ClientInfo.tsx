import { useEffect, useState } from "react";
import "./ClientInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Client } from "../../types/Client";
import { ClientForm } from "./ClientForm";

export const ClientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const clientId = Number(id);

  useEffect(() => {
    if (isNaN(clientId)) return;

    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/clients/${clientId}`
        );

        if (!response.ok) {
          throw new Error("Client not found");
        }

        const data: Client = await response.json();
        setClient(data);
      } catch (error) {
        console.error(error);
        setClient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить клиента?")) return;

    try {
      await fetch(`http://localhost:3001/clients/${clientId}`, {
        method: "DELETE",
      });
      navigate("/clients");
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleSave = async (updatedClient: Omit<Client, "id">) => {
    try {
      await fetch(`http://localhost:3001/clients/${clientId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      });

      setClient({ id: clientId, ...updatedClient });
      setIsEdit(false);

    } catch (error) {
      console.error("Ошибка обновления:", error);
    }
  };

  const handleBack = () => navigate("/clients");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Загрузка...</p>;
  if (!client) return <p>Клиент не найден</p>;

  if (isEdit) {
    return (
      <ClientForm
        initialData={client}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="client-container">
      <div className="client-card">
        <h2>Информация о клиенте</h2>

        <div className="client-info">
          <p><strong>ID:</strong> {client.id}</p>
          <p><strong>Название:</strong> {client.name}</p>
          <p><strong>Телефон:</strong> {client.phone_number}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Адрес:</strong> {client.address}</p>
        </div>

        <div className="client-buttons">
          <button className="btn back-btn" onClick={handleBack}>
            Вернуться к списку
          </button>

          <button className="btn edit-btn" onClick={handleEdit}>
            Редактировать
          </button>

          <button className="btn delete-btn" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
