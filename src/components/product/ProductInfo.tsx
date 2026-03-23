import { useEffect, useState } from "react";
import "./ProductInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../types/Product";
import { ProductForm } from "./ProductForm";

export const ProductInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const productId = Number(id);

  useEffect(() => {
    if (isNaN(productId)) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/products/${productId}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data: Product = await response.json();
        console.log("Fetched product:", data);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
      });
      navigate("/products");
    } catch (error) {
      console.error("Deletion Error!", error);
    }
  };

  const handleSave = async (updatedProduct: Omit<Product, "id">) => {
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      setProduct({ id: productId, ...updatedProduct });
      setIsEdit(false);
    } catch (error) {
      console.error("Update Error!", error);
    }
  };

  const handleBack = () => navigate("/products");
  const handleEdit = () => setIsEdit(true);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  if (isEdit) {
    return (
      <ProductForm
        initialData={product}
        onSave={handleSave}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <div className="product-container">
      <div className="product-card">
        <h2>Product information</h2>

        <div className="product-info">
          <p><strong>ID</strong> {product.id}</p>
          <p><strong>Model of plane</strong> {product.plane_name}</p>
          <p><strong>Unique code</strong> {product.unique_code}</p>
          <p><strong>Category</strong> {product.plane_type || "-"}</p>
          <p><strong>Price</strong> {product.plane_price}</p>
          <p><strong>Production date</strong> {product.production_date.slice(0, 10)}</p>
          <p><strong>Status</strong> {product.status}</p>
        </div>

        <div className="product-buttons">
          <button className="btn back-btn" onClick={handleBack}>
            Back
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
