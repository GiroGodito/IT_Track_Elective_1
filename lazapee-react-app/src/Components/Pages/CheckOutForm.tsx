//LAST WORKING CODE IMPLEMENTRATION STARTS HERE

//import { useEffect, useState } from "react";
//import api from "../API/axios";
//import { useParams } from "react-router-dom";
//import refreshCarts  from "../../App";

//interface CartItemDTO {
//  cartItemID: number;
//  productID: number;
//  name: string;
//  price: number;
//  quantity: number;
//  imageUrl: string;
//}

//interface CartDTO {
//  cartID: number;
//  sellerID: number;
//  storeName: string;
//  items: CartItemDTO[];
//}

//interface ApiResponseCart {
//  success: boolean;
//  message: string;
//  data: CartDTO;
//}

//interface ShippingAddress {
//  firstName: string;
//  lastName: string;
//  middleName?: string;
//  suffix?: string;
//  street: string;
//  city: string;
//  postalCode: string;
//  country: string;
//}

//interface CheckOutFormProps {
//  refreshCarts: () => Promise<void>;
//}

//export default function CheckOutForm({ refreshCarts }: CheckOutFormProps) {
//  const { cartID } = useParams<{ cartID: string }>();
//  const numericCartID = Number(cartID);

//  const [cart, setCart] = useState<CartDTO | null>(null);
//  const [error, setError] = useState<string | null>(null);
//  const [success, setSuccess] = useState<string | null>(null);
//  const [loading, setLoading] = useState<boolean>(true);

//  const [address, setAddress] = useState<ShippingAddress>({
//    firstName: "",
//    lastName: "",
//    middleName: "",
//    suffix: "",
//    street: "",
//    city: "",
//    postalCode: "",
//    country: "PH",
//  });

//  useEffect(() => {
//    if (!numericCartID || isNaN(numericCartID)) {
//      setError("Invalid cart ID");
//      setLoading(false);
//      return;
//    }

//    api
//      .get<ApiResponseCart>(`/Cart/CartByCartIDLoggedinUser/${numericCartID}`)
//      .then((res) => {
//        setCart(res.data.data);
//        setSuccess("✅ Order has been placed successfully!");
//        setLoading(false);
//      })
//      .catch((err) => {
//        console.error("Error fetching cart:", err);
//        setError("Failed to load cart");
//      });
//  }, [numericCartID]);

//  if (loading) return <p className="text-center">Loading cart...</p>;
//  if (error) return <p className="text-red-600 font-medium">{error}</p>;
//  if (!cart) return <p className="text-center">No cart found</p>;

//  const cartTotal = cart.items.reduce(
//    (sum, item) => sum + item.price * item.quantity,
//    0
//  );

//  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    const { name, value } = e.target;
//    setAddress((prev) => ({ ...prev, [name]: value }));
//  };

////   const handleSubmit = (e: React.FormEvent) => {
////     e.preventDefault();
////     console.log("Submitting order with address:", address);
////     // TODO: send to backend
////   };

//const handleSubmit = async (e: React.FormEvent) => {
//  e.preventDefault();

//  try {
//    // 1. Place the order
//    const orderPayload = {
//      shippingAddress: address,
//      cartID: numericCartID,
//    };

//    const res = await api.post("/Order/OrderCart", orderPayload);
//    console.log("Order placed:", res.data.message);

//    // 2. Refresh carts after successful order
//    const data = await refreshCarts();
//    console.log("Cart refreshed:", data);

//  } catch (err) {
//    console.error("Error placing order:", err);
//    setError("Failed to place order");
//  }
//};


//  return (
//    <>
//    <div className="w-full bg-gray-900 text-gray-100 flex flex-col border border-white! rounded">
//      {/* Fixed header */}
//      <div className="w-full h-20 bg-primary! flex items-center px-6 shadow-md">
//        <h1 className="text-white text-md font-bold cursor-pointer"
//        onClick={() => window.history.back()}>←</h1>
//      </div>

//      {/* Main content */}
//      <div className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
//        <div className="w-[1000px] border rounded-lg p-6 shadow-md bg-gray-800">
//          <h3 className="text-xl font-semibold mb-4">
//            <span className="text-accent!">{cart.storeName} Store</span>
//          </h3>

//          {/* Table */}
//          <div className="overflow-x-auto">
//            <table className="min-w-full border border-gray-700 rounded-lg">
//              <thead className="bg-gray-700 text-gray-200">
//                <tr>
//                  <th className="px-4 py-2 text-center">Image</th>
//                  <th className="px-4 py-2 text-center">Name</th>
//                  <th className="px-4 py-2 text-center">Quantity</th>
//                  <th className="px-4 py-2 text-center">Unit Price</th>
//                  <th className="px-4 py-2 text-center">Line Total</th>
//                </tr>
//              </thead>
//              <tbody>
//                {cart.items.map((item) => (
//                  <tr key={item.cartItemID} className="border-t border-gray-700">
//                    <td className="px-4 py-2 text-center">
//                      <img
//                        src={item.imageUrl}
//                        alt={item.name}
//                        className="w-16 h-16 object-cover mx-auto"
//                      />
//                    </td>
//                    <td className="px-4 py-2">{item.name}</td>
//                    <td className="px-4 py-2 text-center">{item.quantity}</td>
//                    <td className="px-4 py-2 text-center">₱{item.price}</td>
//                    <td className="px-4 py-2 text-center font-medium">
//                      ₱{item.price * item.quantity}
//                    </td>
//                  </tr>
//                ))}
//              </tbody>
//            </table>
//          </div>

//          {/* Checkout summary */}
//          <div className="mt-6 flex justify-between items-center">
//            <span className="text-lg font-semibold">Total:</span>
//            <span className="text-xl font-bold">₱{cartTotal}</span>
//          </div>

//          {/* Shipping Address Form */}
//          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//            <h4 className="text-lg font-semibold">Shipping Address</h4>
//            <div className="grid grid-cols-2 gap-4">
//              <input
//                type="text"
//                name="firstName"
//                placeholder="First Name *"
//                value={address.firstName}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//                required
//              />
//              <input
//                type="text"
//                name="lastName"
//                placeholder="Last Name *"
//                value={address.lastName}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//                required
//              />
//              <input
//                type="text"
//                name="middleName"
//                placeholder="Middle Name (optional)"
//                value={address.middleName}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//              />
//              <input
//                type="text"
//                name="suffix"
//                placeholder="Suffix (optional)"
//                value={address.suffix}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//              />
//              <input
//                type="text"
//                name="street"
//                placeholder="Street *"
//                value={address.street}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white col-span-2"
//                required
//              />
//              <input
//                type="text"
//                name="city"
//                placeholder="City *"
//                value={address.city}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//                required
//              />
//              <input
//                type="text"
//                name="postalCode"
//                placeholder="Postal Code *"
//                value={address.postalCode}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//                required
//              />
//              <input
//                type="text"
//                name="country"
//                placeholder="Country (2-letter code, e.g. PH) *"
//                value={address.country}
//                onChange={handleChange}
//                className="p-2 rounded bg-gray-700 text-white"
//                required
//              />
//            </div>

//            {/* Place order button */}
//            <button
//              type="submit"
//              className="w-full mt-6 bg-primary! text-white py-2 px-4 rounded transition"
//            >
//              {success ? success : "Place Order"}
//            </button>
//          </form>
//        </div>
//      </div>
//    </div>
//      </>
//  )
//}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartService } from "../../Services/CartService";
import { orderService } from "../../Services/OrderService";
import {useNavigate} from "react-router-dom"

interface CartItemDTO {
    cartItemID: number;
    productID: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface CartDTO {
    cartID: number;
    sellerID: number;
    storeName: string;
    items: CartItemDTO[];
}

interface ShippingAddress {
    firstName: string;
    lastName: string;
    middleName?: string;
    suffix?: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

interface CheckOutFormProps {
    refreshCarts: () => Promise<void>;
}

export default function CheckOutForm({ refreshCarts }: CheckOutFormProps) {
    const navigate = useNavigate();
    const { cartID } = useParams<{ cartID: string }>();
    const numericCartID = Number(cartID);

    const [cart, setCart] = useState<CartDTO | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [address, setAddress] = useState<ShippingAddress>({
        firstName: "",
        lastName: "",
        middleName: "",
        suffix: "",
        street: "",
        city: "",
        postalCode: "",
        country: "PH",
    });

    // ✅ Fetch cart details using cartService
    useEffect(() => {
        if (!numericCartID || isNaN(numericCartID)) {
            setError("Invalid cart ID");
            setLoading(false);
            return;
        }

        cartService
            .getCartByCartID(numericCartID)
            .then((data) => {
                setCart(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cart:", err);
                setError("Failed to load cart");
                setLoading(false);
            });
    }, [numericCartID]);

    if (loading) return <p className="text-center">Loading cart...</p>;
    // if (error) return <p className="text-red-600 font-medium">{error}</p>;
    
    if (error) {
    return (
        <div className="text-center">
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
            onClick={() => navigate("/productPage")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Back to Product Page
        </button>
        </div>
    );
    }


    if (!cart) return <p className="text-center">No cart found</p>;

    const cartTotal = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Place order using orderService
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await orderService.placeOrder({
                shippingAddress: address,
                cartID: numericCartID,
            });

            setSuccess("✅ Order has been placed successfully!");

            // Refresh carts after successful order
            await refreshCarts();
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place order");
        }
    };

    return (
        <div className="w-full bg-gray-900 text-gray-100 flex flex-col border border-white! rounded">
            {/* Fixed header */}
            <div className="w-full h-20 bg-primary! flex items-center px-6 shadow-md">
                <h1
                    className="text-white text-md font-bold cursor-pointer"
                    onClick={() => window.history.back()}
                >
                    ←
                </h1>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-start p-8 overflow-y-auto">
                <div className="w-[1000px] border rounded-lg p-6 shadow-md bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4">
                        <span className="text-accent!">{cart.storeName} Store</span>
                    </h3>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-700 rounded-lg">
                            <thead className="bg-gray-700 text-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-center">Image</th>
                                    <th className="px-4 py-2 text-center">Name</th>
                                    <th className="px-4 py-2 text-center">Quantity</th>
                                    <th className="px-4 py-2 text-center">Unit Price</th>
                                    <th className="px-4 py-2 text-center">Line Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map((item) => (
                                    <tr key={item.cartItemID} className="border-t border-gray-700">
                                        <td className="px-4 py-2 text-center">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                                        <td className="px-4 py-2 text-center">₱{item.price}</td>
                                        <td className="px-4 py-2 text-center font-medium">
                                            ₱{item.price * item.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Checkout summary */}
                    <div className="mt-6 flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold">₱{cartTotal}</span>
                    </div>

                    {/* Shipping Address Form */}
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <h4 className="text-lg font-semibold">Shipping Address</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Inputs same as before */}
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name *"
                                value={address.firstName}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name *"
                                value={address.lastName}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                                required
                            />
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name (optional)"
                                value={address.middleName}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                            />
                            <input
                                type="text"
                                name="suffix"
                                placeholder="Suffix (optional)"
                                value={address.suffix}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Street *"
                                value={address.street}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white col-span-2"
                                required
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City *"
                                value={address.city}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                                required
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code *"
                                value={address.postalCode}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country (2-letter code, e.g. PH) *"
                                value={address.country}
                                onChange={handleChange}
                                className="p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>

                        {/* Place order button */}
                        <button
                            type="submit"
                            className="w-full mt-6 bg-primary! text-white py-2 px-4 rounded transition"
                        >
                            {success ? success : "Place Order"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


