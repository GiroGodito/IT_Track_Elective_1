// src/Pages/ProductPage.tsx
import { useEffect, useState } from "react";
import api from "../API/axios";
import { ShoppingCartIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { PiPackage } from "react-icons/pi";

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

interface JWTPayload
{
  sub?: string;
  unique_name?:string;
  role?: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [userName, setUsername] = useState("Guest");

  useEffect(() => {
    api
      .get<Product[]>("/Product")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

    useEffect(() => {
    if(token)
    {
      const decoded = jwtDecode<JWTPayload>(token);
      setUsername(decoded.unique_name ?? "Guest");
    }
  },[token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  const AddToCart = () => 
    {
        if(token)
        {
           alert("I have a token");
        }
        else
        {
          navigate("/login");
        }
    };

  const LogOut = () => 
  {
    if (window.confirm("Log out now?")) 
    {
       localStorage.removeItem("jwt"); 
       setUsername("Guest");
    }
  }

  const ViewCart = () => 
  {
      if(token)
      {
        alert("I have a token");
      }
      else
      {
        navigate("/login")
      }
  }

  const ViewOrders = () => 
  {
      if(token)
      {
        alert("I have a token");
      }
      else
      {
        navigate("/login")
      }
  }

  return (
    <>
    <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 !bg-primary">
        <div className="flex justify-between m-5">
            <p><strong>{userName !== "Guest" ? `${userName}` : "Guest"}</strong></p>
            <div className="flex gap-5">
              {token && <PiPackage className="h-10 w-10 text-white" onClick={ViewOrders}/>}
              {token && <ShoppingCartIcon className="h-10 w-10 text-white" onClick={ViewCart}/>}
              {token && <ArrowRightEndOnRectangleIcon className="h-10 w-10 ml-3" onClick={LogOut}/>}
            </div>
        </div>
    </div>
    <div className="flex justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
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
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-gray-600">{product.brand}</p>
              <p className="text-success font-semibold">
                ₱{product.price.toLocaleString()}
              </p>
              <p className="text-sm">{product.description}</p>
              <div className="card-actions flex mt-4 gap-2">
                <button className="btn !bg-secondary">View Details</button>
                <button className="btn !bg-primary" onClick={AddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </div>
    </>
  );
}
