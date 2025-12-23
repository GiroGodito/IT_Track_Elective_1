// src/Pages/ProductPage.tsx
import { useEffect, useState } from "react";
import api from "../API/axios"; // adjust path to where you saved the axios instance

interface Product {
  productID: number;
  sellerID: number;
  categoryID: number;
  name: string;
  price: number;
  isActive: boolean;
  brand: string;
  description: string;
  imageUrl: string;
  weight: number;
  width: number;
  height: number;
  length: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Product[]>("/Product") // baseURL + "/products" → https://localhost:7275/api/products
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.productID}
          className="card shadow-lg border rounded-lg bg-base-200"
        >
          <figure>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p className="text-gray-600">{product.brand}</p>
            <p className="text-success font-semibold">
              ₱{product.price.toLocaleString()}
            </p>
            <p className="text-sm">{product.description}</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
