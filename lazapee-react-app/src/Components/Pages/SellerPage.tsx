import { useState, useEffect } from "react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { authService } from "../../Services/AuthService";
import { productService} from "../../Services/ProductService";
import type {ProductPayload} from "../../Services/ProductService";
import { categoryService} from "../../Services/CategoryService";
import type {Category} from "../../Services/CategoryService";
import { useNavigate } from "react-router-dom";
import { sellerService } from "../../Services/SellerService";
import type { BasicSellerInfoResponse } from "../../Services/SellerService";


interface WhoAmIResponse {
  username: string;
  roles: string[];
}

export default function SellerPage() {
  const [storeInfo, setStoreInfo] = useState<BasicSellerInfoResponse | null>(null);
  const [user, setUser] = useState<WhoAmIResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductPayload>({
    sellerID: 0,
    categoryID: 0,
    name: "",
    price: 0,
    brand: "",
    description: "",
    imageUrl: "",
    weight: 0,
    width: 0,
    height: 0,
    length: 0,
    quantityAvailable: 0
  });

  const isLoggedIn = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .whoAmI()
      .then((res) => setUser(res))
      .catch(() => setUser(null));

    categoryService
      .getAllCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to fetch categories", err));

    sellerService
    .getBasicSellerInfo()
    .then((res) => {
        if (res.success) {
        setStoreInfo(res);
        setFormData((prev) => ({
            ...prev,
            sellerID: res.data.sellerID, // ✅ inject sellerID
        }));
        } else {
        console.error("Not a seller:", res.message);
        }
    })
    .catch((err) => console.error("Failed to fetch seller info", err));
  }, []);

  const LogOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "weight" ||
        name === "width" ||
        name === "height" ||
        name === "length" ||
        name === "categoryID" ||
        name === "sellerID"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.createProduct(formData);
      alert("Product created successfully!");
      setFormData(
        (prev) => 
        (
            {
                ...prev,
                sellerID: prev.sellerID,
                categoryID: 0,
                name: "",
                price: 0,
                brand: "",
                description: "",
                imageUrl: "",
                weight: 0,
                width: 0,
                height: 0,
                length: 0,
            }
        )
    );
    } catch (err) {
      console.error("Error creating product", err);
      alert("Failed to create product");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
        <div className="flex justify-between m-5">
          <p onClick={() => navigate("/login")}>
            <strong>Welcome, {user?.username}</strong>
          </p>
          {isLoggedIn && (
            <ArrowRightEndOnRectangleIcon
              className="h-10 w-10 ml-3 cursor-pointer"
              onClick={LogOut}
            />
          )}
        </div>
      </div>
      {/* Product Form */}
      <div className="mt-24 p-6 border border-white rounded-lg bg-gray-800 max-w-2xl mx-auto shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h4 className="text-lg font-semibold text-accent!">Add New Product</h4>

          <div className="grid grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            {/* Quantity Available */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Quantity Available
              </label>
              <input
                type="number"
                name="quantityAvailable"
                placeholder="Enter available quantity"
                value={formData.quantityAvailable}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            {/* Brand */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            {/* Image URL */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              />
            </div>

            <div className="mt-3 flex justify-center col-span-2"> 
                <div className="w-64 h-64 border rounded overflow-hidden flex items-center justify-center bg-gray-700"> {formData.imageUrl ? ( <img src={formData.imageUrl} alt="Product preview" className="w-full h-full object-cover" /> ) : ( <span className="text-gray-400 text-sm">No image selected</span> )}
                </div>
            </div>

            {/* Category Dropdown */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-1">
                Category
              </label>
              <select
                name="categoryID"
                value={formData.categoryID}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.categoryID} value={cat.categoryID}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Width (cm)
              </label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Length (cm)
              </label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="p-2 rounded border border-white bg-gray-700 text-white w-full"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-6 bg-primary! text-white py-2 px-4 rounded transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </>
  );
}
