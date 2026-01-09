//LAST WORKING CODE IMPLEMENTATION TYPE A SHI
//import { useEffect, useState } from "react";
//import api from "../API/axios"; 
//import { TrashIcon } from "@heroicons/react/24/outline";
//import { useNavigate } from "react-router-dom";

//// DTOs
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

//interface ViewCartProps {
//     onCartChanged?: () => void;
//} // optional callback to notify parent }

//// interface ApiResponseUserCart {
////   success: boolean;
////   message: string;
////   data: CartDTO[];
//// }

//interface ApiResponseUserCart { 
//    success: boolean;
//    message: string;
//    data: 
//    {
//        cartList: CartDTO[]; 
//        totalCount: number; 
//    }; 
//}

//// Component
//export function ViewCart({onCartChanged}:ViewCartProps) {
//  const [carts, setCarts] = useState<CartDTO[]>([]);
//  const [error, setError] = useState<string | null>(null);
//  const [totalCount, setTotalCount] = useState<number>(0);
//  const [currentPage, setCurrentPage] = useState<number>(1);
//  const [pageSize] = useState<number>(2); // show 2 carts per page
//  const navigate = useNavigate();

//  useEffect(() => {
//    api.get<ApiResponseUserCart>(`/Cart/ViewCart?currentPage=${currentPage}&pageSize=${pageSize}`)
//      .then((res) => {
//        setCarts(res.data.data.cartList);
//        setTotalCount(res.data.data.totalCount);
//        //console.log(res.data.data);
//      })
//      .catch((err) => {
//        console.error("Error fetching user carts:", err);
//        setError("Failed to load carts");
//      });
//  }, [currentPage]);

//const totalPages = Math.ceil(totalCount / pageSize);

//// 👉 Refresh helper to always sync with backend truth
//const refreshCarts = async () => {
//  try {
//    const res = await api.get<ApiResponseUserCart>(
//      `/Cart/ViewCart?currentPage=${currentPage}&pageSize=${pageSize}`
//    );
//    setCarts(res.data.data.cartList);
//    setTotalCount(res.data.data.totalCount);

//    // 👉 If current page is now empty but not the first page, move back one page
//    if (res.data.data.cartList.length === 0 && currentPage > 1) {
//      setCurrentPage(prev => prev - 1);
//    }
//  } catch (err) {
//    console.error("Error refreshing carts:", err);
//    setError("Failed to refresh carts");
//  }
//};

//// 👉 Delete a cart item
//const handleDeleteItem = async (cartItemID: number, cartID: number) => {
//  try {
//    //await api.delete(`/Cart/DeleteCartItem?cartItemID=${cartItemID}`);
//    await api.delete(`/CartItem/cartItem/cartItemID/${cartItemID}`);

//    // After deleting the item, check if the cart is now empty
//    const targetCart = carts.find(c => c.cartID === cartID);
//    if (targetCart && targetCart.items.length === 1) {
//      // 👉 Condition: if cart had only 1 item, deleting it empties the cart
//      await handleDeleteCart(cartID);
//    } else {
//      // Otherwise just refresh carts to reflect updated items
//      await refreshCarts();
//      if (onCartChanged) { onCartChanged();} 
//    }
//  } catch (err) {
//    console.error("Error deleting cart item:", err);
//    setError("Failed to delete item");
//  }
//};

//// 👉 Delete a cart
//const handleDeleteCart = async (cartID: number) => {
//  try {
//    await api.delete(`/Cart/cart/cartID/${cartID}`);
//    await refreshCarts(); // always sync after cart deletion
//    if (onCartChanged) {
//        onCartChanged(); 
//    }
//  } catch (err) {
//    console.error("Error deleting cart:", err);
//    setError("Failed to delete cart");
//  }
//};

//  if (error) return <p className="text-red-600 font-medium">{error}</p>;

//  // 👉 Grand total across all carts
//  const grandTotal = carts.reduce((sum, cart) => {
//    const cartTotal = cart.items.reduce(
//      (cartSum, item) => cartSum + item.price * item.quantity,
//      0
//    );
//    return sum + cartTotal;
//  }, 0);

//  return (
//    <>
//    <div className="p-6 space-y-8">
//      {carts.map((cart) => {
//        // 👉 Per-cart total
//        const cartTotal = cart.items.reduce(
//          (sum, item) => sum + item.price * item.quantity,
//          0
//        );

//        return (
//          <div
//            key={cart.cartID}
//            className="border rounded-lg p-6 shadow-md bg-gray-800 text-gray-100 border-white!"
//          >
//            <h3 className="text-xl font-semibold mb-4">
//              <span className="text-accent!">{cart.storeName} Store</span>
//            </h3>

//            {/* Table */}
//            <div className="overflow-x-auto">
//              <table className="min-w-full border border-gray-700 rounded-lg">
//                <thead className="bg-gray-700 text-gray-200">
//                  <tr>
//                    <th className="px-4 py-2 text-center">Image</th>
//                    <th className="px-4 py-2 text-center">Name</th>
//                    <th className="px-4 py-2 text-center">Quantity</th>
//                    <th className="px-4 py-2 text-center">Unit Price</th>
//                    <th className="px-4 py-2 text-center">Line Total</th>
//                    <th className="px-4 py-2 text-center">Actions</th>
//                  </tr>
//                </thead>
//                <tbody>
//                  {cart.items.map((item) => (
//                    <tr
//                      key={item.cartItemID}
//                      className="border-t border-gray-700 transition"
//                    >
//                        <td className="px-4 py-2 text-center">
//                          <img src={item.imageUrl} className="w-16 h-16 object-cover mx-auto" />
//                        </td>
//                      <td className="px-4 py-2">{item.name}</td>
//                      <td className="px-4 py-2 text-center">{item.quantity}</td>
//                      <td className="px-4 py-2 text-center">₱{item.price}</td>
//                      <td className="px-4 py-2 text-center font-medium">
//                        ₱{item.price * item.quantity}
//                      </td>
//                      <td className="px-4 py-2 text-center">
//                        <button 
//                            className="bg-secondary! hover:bg-red-700 text-white py-1 px-3 rounded transition"
//                            onClick={() => handleDeleteItem(item.cartItemID, cart.cartID)}>
//                          <TrashIcon className="h-5 w-5" />
//                        </button>
//                      </td>
//                    </tr>
//                  ))}
//                </tbody>
//              </table>
//            </div>

//            {/* 👉 Checkout button shows per-cart total */}
//            <button onClick={() => navigate(`/checkout/${cart.cartID}`)}className="w-full mt-6 bg-primary! text-white py-2 px-4 rounded transition d-flex space-around">
//              Proceed to Checkout{" "}
//              <span className="p-1 bg-primary-content text-primary! rounded">
//                <strong>₱{cartTotal}</strong>
//              </span>
//            </button>
//          </div>
//        );
//      })}
//    </div>
//    {carts.length > 0 ? (<div className="flex justify-center mt-6 gap-2"> 
//        <button className="btn" disabled={currentPage === 1}
//         onClick={() => setCurrentPage(prev => prev - 1)} > 
//         Prev 
//         </button> 
//         <span className="px-4 py-2">
//          Page {currentPage} of {totalPages}
//          </span>
//          <button className="btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} > Next </button>
//      </div>) : (<p className="text-center">Your cart is currently empty</p>)} 
//      </>
//  );
//}

//export default ViewCart;
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import { cartService } from "../../Services/CartService";
import { cartItemService } from "../../Services/CartItemService";

// DTOs
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

interface ViewCartProps {
    onCartChanged?: () => void;
}

export function ViewCart({ onCartChanged }: ViewCartProps) {
    const [carts, setCarts] = useState<CartDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(2); // show 2 carts per page
    const navigate = useNavigate();

    // ✅ Fetch carts using cartService
    useEffect(() => {
        cartService
            .viewCart({ currentPage, pageSize })
            .then((data) => {
                setCarts(data.cartList);
                setTotalCount(data.totalCount);
            })
            .catch((err) => {
                console.error("Error fetching user carts:", err);
                setError("Failed to load carts");
            });
    }, [currentPage, pageSize]);

    const totalPages = Math.ceil(totalCount / pageSize);

    // ✅ Refresh helper to always sync with backend truth
    const refreshCarts = async () => {
        try {
            const data = await cartService.viewCart({ currentPage, pageSize });
            setCarts(data.cartList);
            setTotalCount(data.totalCount);

            // 👉 If current page is now empty but not the first page, move back one page
            if (data.cartList.length === 0 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
            }
        } catch (err) {
            console.error("Error refreshing carts:", err);
            setError("Failed to refresh carts");
        }
    };

    // ✅ Delete a cart item
    const handleDeleteItem = async (cartItemID: number, cartID: number) => {
        try {
            await cartItemService.deleteCartItem(cartItemID);

            // After deleting the item, check if the cart is now empty
            const targetCart = carts.find((c) => c.cartID === cartID);
            if (targetCart && targetCart.items.length === 1) {
                await handleDeleteCart(cartID);
            } else {
                await refreshCarts();
                if (onCartChanged) onCartChanged();
            }
        } catch (err) {
            console.error("Error deleting cart item:", err);
            setError("Failed to delete item");
        }
    };

    // ✅ Delete a cart
    const handleDeleteCart = async (cartID: number) => {
        try {
            await cartService.deleteCart(cartID);
            await refreshCarts(); // always sync after cart deletion
            if (onCartChanged) onCartChanged();
        } catch (err) {
            console.error("Error deleting cart:", err);
            setError("Failed to delete cart");
        }
    };

    if (error) return <p className="text-red-600 font-medium">{error}</p>;

    // 👉 Grand total across all carts
    const grandTotal = carts.reduce((sum, cart) => {
        const cartTotal = cart.items.reduce(
            (cartSum, item) => cartSum + item.price * item.quantity,
            0
        );
        return sum + cartTotal;
    }, 0);

    return (
        <>
            <div className="p-6 space-y-8">
                {carts.map((cart) => {
                    const cartTotal = cart.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    return (
                        <div
                            key={cart.cartID}
                            className="border rounded-lg p-6 shadow-md bg-gray-800 text-gray-100 border-white!"
                        >
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
                                            <th className="px-4 py-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map((item) => (
                                            <tr
                                                key={item.cartItemID}
                                                className="border-t border-gray-700 transition"
                                            >
                                                <td className="px-4 py-2 text-center">
                                                    <img
                                                        src={item.imageUrl}
                                                        className="w-16 h-16 object-cover mx-auto"
                                                    />
                                                </td>
                                                <td className="px-4 py-2">{item.name}</td>
                                                <td className="px-4 py-2 text-center">{item.quantity}</td>
                                                <td className="px-4 py-2 text-center">₱{item.price}</td>
                                                <td className="px-4 py-2 text-center font-medium">
                                                    ₱{item.price * item.quantity}
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <button
                                                        className="bg-secondary! hover:bg-red-700 text-white py-1 px-3 rounded transition"
                                                        onClick={() =>
                                                            handleDeleteItem(item.cartItemID, cart.cartID)
                                                        }
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* 👉 Checkout button shows per-cart total */}
                            <button
                                onClick={() => navigate(`/checkout/${cart.cartID}`)}
                                className="w-full mt-6 bg-primary! text-white py-2 px-4 rounded transition d-flex space-around"
                            >
                                Proceed to Checkout{" "}
                                <span className="p-1 bg-primary-content text-primary! rounded">
                                    <strong>₱{cartTotal}</strong>
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>

            {carts.length > 0 ? (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <p className="text-center">Your cart is currently empty</p>
            )}
        </>
    );
}

export default ViewCart;
