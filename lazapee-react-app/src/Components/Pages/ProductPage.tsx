// // src/Pages/ProductPage.tsx
// import { useEffect, useState, useContext } from "react";
// import api from "../API/axios";
// import { ShoppingCartIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
// import {useNavigate} from "react-router-dom";
// import {jwtDecode} from "jwt-decode";
// import { PiPackage } from "react-icons/pi";

// interface Product {
//   productID: number;
//   sellerID: number;
//   categoryID: number;
//   name: string;
//   price: number;
//   isActive: boolean;
//   brand: string;
//   description: string;
//   imageUrl: string;
//   weight: number;
//   width: number;
//   height: number;
//   length: number;
// }

// interface JWTPayload
// {
//   sub?: string;
//   unique_name?:string;
//   role?: string;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("jwt");
//   const [userName, setUsername] = useState("Guest");
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   useEffect(() => {
//     api
//       .get<Product[]>("/Product")
//       .then((response) => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       });
//   }, []);

//     useEffect(() => {
//     if(token)
//     {
//       const decoded = jwtDecode<JWTPayload>(token);
//       setUsername(decoded.unique_name ?? "Guest");
//     }
//   },[token]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   const AddToCart = (product: Product) => 
//     {
//         if(token)
//         {
//           setCartItems((prev) => [...prev, product]);
//         }
//         else
//         {
//           navigate("/login");
//         }
//     };

//   const LogOut = () => 
//   {
//     if (window.confirm("Log out now?")) 
//     {
//        localStorage.removeItem("jwt"); 
//        setUsername("Guest");
//     }
//   }

//   const ViewCart = () => 
//   {
//       if(token)
//       {
//         alert("I have a token");
//       }
//       else
//       {
//         navigate("/login")
//       }
//   }

//   const ViewOrders = () => 
//   {
//       if(token)
//       {
//         alert("I have a token");
//         navigate("/orderHistory");
//       }
//       else
//       {
//         navigate("/login")
//       }
//   }

//   return (
//     <>
//     <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 !bg-primary">
//         <div className="flex justify-between m-5">
//             <p><strong>{userName !== "Guest" ? `${userName}` : "Guest"}</strong></p>
//             <div className="flex gap-5">
//               {token && <PiPackage className="h-10 w-10 text-white" onClick={ViewOrders}/>}
//               <div className="relative">
//                  {token && <ShoppingCartIcon className="h-10 w-10 text-white" onClick={ViewCart}/>}<span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{cartItems.length}</span>
//               </div>
//               {token && <ArrowRightEndOnRectangleIcon className="h-10 w-10 ml-3" onClick={LogOut}/>}
//             </div>
//         </div>
//     </div>
//     <div className="flex justify-center p-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//         {products.map((product) => (
//           <div
//             key={product.productID}
//             className="card shadow-lg border rounded-lg bg-base-200"
//           >
//             <figure>
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//             </figure>
//             <div className="card-body items-center text-center">
//               <h2 className="card-title">{product.name}</h2>
//               <p>Seller {product.sellerID}</p>
//               <p className="text-gray-600">{product.brand}</p>
//               <p className="text-success font-semibold">
//                 ₱{product.price.toLocaleString()}
//               </p>
//               <p className="text-sm">{product.description}</p>
//               <div className="card-actions flex mt-4 gap-2">
//                 {/* <button className="btn !bg-secondary">View Details</button> */}
//                 <button className="btn !bg-primary" onClick={() => AddToCart(product)}>Add to Cart</button>
//               </div>
//             </div>
//           </div>
          
//         ))}
//       </div>
//     </div>
//     </>
//   );
// }
// src/Pages/ProductPage.tsx

//LAST WORKING MAYBE IDK
// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import { ShoppingCartIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
// import { PiPackage } from "react-icons/pi";

// interface Product {
//   productID: number;
//   sellerID: number;
//   categoryID: number;
//   name: string;
//   storeName: string;
//   price: number;
//   isActive: boolean;
//   brand: string;
//   description: string;
//   imageUrl: string;
//   weight: number;
//   width: number;
//   height: number;
//   length: number;
// }

// interface WhoAmIResponse {
//   username: string;
//   roles: string[];
// }

// interface CartResponse {
//   success: boolean;
//   message: string;
//   data: number; // cartID
// }

// interface CartItemResponse {
//   success: boolean;
//   message: string;
//   data: number; // cartItemID
// }

// interface CartItemCount {
//   userName: string;
//   totalCountProducts: number;
// }

// interface APIResponseDTO {
//   success: boolean;
//   message: string;
//   data: { productList: Product[] };
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<WhoAmIResponse | null>(null);
//   const [cartMap, setCartMap] = useState<Map<number, number>>(new Map()); // sellerID -> cartID
//   const [quantitiesMap, setQuantitiesMap] = useState<Map<number, number>>(new Map()); // productID -> quantity
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);

//   const navigate = useNavigate();
//   const isLoggedIn = !!user;

//   // Fetch logged-in user
//   const fetchUser = async () => {
//     try {
//       const response = await api.get<WhoAmIResponse>("/Auth/whoAmI");
//       setUser(response.data);
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//       setUser(null);
//     }
//   };

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const response = await api.get<APIResponseDTO>("/Product");
//       setProducts(response.data.data.productList);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch total cart item count
//   const fetchCartItemCount = async () => {
//     try {
//       if (!isLoggedIn) return;
//       const response = await api.get<CartItemCount>("/CartItem/cartItems/userID");
//       setTotalQuantity(response.data.totalCountProducts);
//     } catch (err) {
//       console.error("Error fetching cart item count:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     fetchCartItemCount();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   const handleQuantityChange = (productID: number, value: number) => {
//     setQuantitiesMap(prev => {
//       const newMap = new Map(prev);
//       newMap.set(productID, value);
//       return newMap;
//     });
//   };

//   const addToCart = async (product: Product) => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     const quantity = quantitiesMap.get(product.productID) || 1;
//     const sellerID = product.sellerID;

//     try {
//       // Check if cart already exists for this seller
//       let cartID = cartMap.get(sellerID);

//       if (cartID) {
//         // Cart exists → update/add CartItem
//         const cartItemResponse = await api.post<CartItemResponse>(`/CartItem/cartItem`, {
//           cartID,
//           productID: product.productID,
//           quantity,
//         });

//         setTotalQuantity(prev => prev + quantity);
//         alert(`Updated existing cart item (ID: ${cartItemResponse.data.data})`);
//       } else {
//         // Create new cart for seller
//         const cartResponse = await api.post<CartResponse>("/Cart/cart", { sellerID });
//         cartID = cartResponse.data.data;

//         // Update cartMap state
//         setCartMap(prev => {
//           const newMap = new Map(prev);
//           newMap.set(sellerID, cartID!);
//           return newMap;
//         });

//         // Add item to newly created cart
//         const cartItemResponse = await api.post<CartItemResponse>("/CartItem/cartItem", {
//           cartID,
//           productID: product.productID,
//           quantity,
//         });

//         setTotalQuantity(prev => prev + quantity);
//         alert(`Added product to new cart (CartItem ID: ${cartItemResponse.data.data})`);
//       }
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       alert("Failed to add to cart.");
//     }
//   };

//   const logOut = async () => {
//     try {
//       await api.post("/Auth/logout");
//       setUser(null);
//       setCartMap(new Map());
//       setTotalQuantity(0);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const viewCart = () => {
//     navigate("/cart"); // Replace with your cart page route
//   };

//   const viewOrders = () => {
//     navigate("/orders"); // Replace with your orders page route
//   };

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="fixed top-0 left-0 w-full h-20 bg-primary z-50 shadow-md">
//         <div className="flex justify-between items-center h-full px-6">
//           <div>
//             <strong className="text-white">{user ? user.username : "Guest"}</strong>
//           </div>
//           <div className="flex items-center gap-5">
//             {isLoggedIn && (
//               <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={viewOrders} />
//             )}
//             <div className="relative">
//               {isLoggedIn && (
//                 <ShoppingCartIcon
//                   className="h-10 w-10 text-white cursor-pointer"
//                   onClick={viewCart}
//                 />
//               )}
//               {isLoggedIn && totalQuantity > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </div>
//             {isLoggedIn && (
//               <ArrowRightEndOnRectangleIcon
//                 className="h-10 w-10 text-white cursor-pointer"
//                 onClick={logOut}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="mt-24 p-6 flex justify-center">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//           {products.map(product => (
//             <div key={product.productID} className="card bg-base-200 shadow-lg border rounded-lg overflow-hidden">
//               <figure>
//                 <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
//               </figure>
//               <div className="p-4 flex flex-col items-center text-center">
//                 <h2 className="card-title">{product.name}</h2>
//                 <p className="text-accent font-semibold">{product.storeName} Store</p>
//                 <p className="text-gray-600">{product.brand}</p>
//                 <p className="text-success font-bold mt-1">₱{product.price.toLocaleString()}</p>
//                 <p className="text-sm mt-1">{product.description}</p>
//                 <div className="flex mt-4 gap-2">
//                   <input
//                     type="number"
//                     min={1}
//                     className="input input-bordered w-20 text-center"
//                     value={quantitiesMap.get(product.productID) || 1}
//                     onChange={e => handleQuantityChange(product.productID, Number(e.target.value))}
//                   />
//                   <button
//                     className="btn bg-primary text-white hover:bg-primary-focus"
//                     onClick={() => addToCart(product)}
//                   >
//                     Add To Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

//LATEST WORKING PROTOTYPE
import { useEffect, useState } from "react";
import api from "../API/axios";
import { ShoppingCartIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { PiPackage } from "react-icons/pi";

interface Product {
  productID: number;
  sellerID: number;
  name: string;
  storeName: string;
  price: number;
  brand: string;
  description: string;
  imageUrl: string;
}

interface WhoAmIResponse {
  username: string;
  roles: string[];
}

interface CartResponse {
  success: boolean;
  message: string;
  data: number; // cartID
}

interface CartItemResponse {
  success: boolean;
  message: string;
  data: number; // cartItemID
}

interface APIResponseDTO {
  success: boolean;
  message: string;
  data: { productList: Product[] };
}

interface CartDTO {
  cartID: number;
  sellerID: number;
}

interface CartItemDTO {
  cartItemID: number;
  cartID: number;
  productID: number;
  quantity: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<WhoAmIResponse | null>(null);

  const [cartMap, setCartMap] = useState<Map<number, number>>(new Map()); // sellerID -> cartID
  const [cartItemsMap, setCartItemsMap] = useState<Map<number, CartItemDTO>>(new Map()); // productID -> cartItem
  const [quantitiesMap, setQuantitiesMap] = useState<Map<number, number>>(new Map()); // productID -> input quantity
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // --- Fetch logged-in user ---
  const fetchUser = async () => {
    try {
      const response = await api.get<WhoAmIResponse>("/Auth/whoAmI");
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setUser(null);
    }
  };

  // --- Fetch products ---
  const fetchProducts = async () => {
    try {
      const response = await api.get<APIResponseDTO>("/Product");
      setProducts(response.data.data.productList);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch carts & cart items for logged-in user ---
  const fetchUserCartsAndItems = async () => {
    if (!isLoggedIn) return;
    try {
      const cartsResponse = await api.get<{ success: boolean; message: string; data: CartDTO[] }>("/Cart/ViewCart");
      const carts = cartsResponse.data.data || [];

      const newCartMap = new Map<number, number>();
      const newCartItemsMap = new Map<number, CartItemDTO>();
      const newQuantitiesMap = new Map<number, number>();
      let totalCount = 0;

      for (const cart of carts) {
        newCartMap.set(cart.sellerID, cart.cartID);

        const cartItemsResponse = await api.get<{ success: boolean; message: string; data: CartItemDTO[] }>(
          `/Cart/cart/cartItems/cartID/${cart.cartID}`
        );
        const cartItems = cartItemsResponse.data.data || [];

        cartItems.forEach(item => {
          newCartItemsMap.set(item.productID, item);
          newQuantitiesMap.set(item.productID, item.quantity); // initialize quantity input
          totalCount += item.quantity;
        });
      }

      setCartMap(newCartMap);
      setCartItemsMap(newCartItemsMap);
      setQuantitiesMap(newQuantitiesMap);
      setTotalQuantity(totalCount);
    } catch (err) {
      console.error("Error fetching user carts/items:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) fetchUserCartsAndItems();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  // --- Handle quantity change ---
  const handleQuantityChange = (productID: number, value: number) => {
    setQuantitiesMap(prev => {
      const newMap = new Map(prev);
      newMap.set(productID, Math.max(1, value));
      return newMap;
    });
  };

  // --- Add item to cart ---
  const addToCart = async (product: Product) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const sellerID = product.sellerID;
    const newQuantity = quantitiesMap.get(product.productID) || 1;

    try {
      let cartID = cartMap.get(sellerID);
      if (!cartID) {
        const cartResponse = await api.post<CartResponse>("/Cart/cart", { sellerID });
        cartID = cartResponse.data.data;
        setCartMap(prev => new Map(prev).set(sellerID, cartID!));
      }

      const existingCartItem = cartItemsMap.get(product.productID);

      if (existingCartItem) {
        const quantityDiff = newQuantity - existingCartItem.quantity;

        await api.put(`/CartItem/cartItem/cartItemID/${existingCartItem.cartItemID}`, {
          cartItemID: existingCartItem.cartItemID,
          cartID: existingCartItem.cartID,
          productID: product.productID,
          quantity: newQuantity,
        });

        setCartItemsMap(prev => new Map(prev).set(product.productID, { ...existingCartItem, quantity: newQuantity }));
        setTotalQuantity(prev => prev + quantityDiff);
        alert(`Updated quantity of ${product.name} to ${newQuantity}`);
      } else {
        const cartItemResponse = await api.post<CartItemResponse>("/CartItem/cartItem", {
          cartID,
          productID: product.productID,
          quantity: newQuantity,
        });
        const cartItemID = cartItemResponse.data.data;
        setCartItemsMap(prev => new Map(prev).set(product.productID, { cartItemID, cartID, productID: product.productID, quantity: newQuantity }));
        setTotalQuantity(prev => prev + newQuantity);
        alert(`Added ${product.name} to cart`);
      }
    } catch (err: any) {
      console.error("Error adding/updating cart item:", err.response?.data || err.message || err);
      alert(`Failed to add to cart: ${err.response?.data?.message || err.message}`);
    }
  };

  const logOut = async () => {
    try {
      await api.post("/Auth/logout");
      setUser(null);
      setCartMap(new Map());
      setCartItemsMap(new Map());
      setQuantitiesMap(new Map());
      setTotalQuantity(0);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const viewCart = () => navigate("/cart");
  const viewOrders = () => navigate("/orders");

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full h-20 bg-primary z-50 shadow-md">
        <div className="flex justify-between items-center h-full px-6">
          <div>
            <strong className="text-white">{user ? user.username : "Guest"}</strong>
          </div>
          <div className="flex items-center gap-5">
            {isLoggedIn && <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={viewOrders} />}
            <div className="relative">
              {isLoggedIn && <ShoppingCartIcon className="h-10 w-10 text-white cursor-pointer" onClick={viewCart} />}
              {isLoggedIn && totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            {isLoggedIn && <ArrowRightEndOnRectangleIcon className="h-10 w-10 text-white cursor-pointer" onClick={logOut} />}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-24 p-6 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          {products.map(product => (
            <div key={product.productID} className="card bg-base-200 shadow-lg border rounded-lg overflow-hidden">
              <figure>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              </figure>
              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-accent font-semibold">{product.storeName} Store</p>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-success font-bold mt-1">₱{product.price.toLocaleString()}</p>
                <p className="text-sm mt-1">{product.description}</p>

                {/* Quantity + Add to Cart */}
                <div className="flex mt-4 gap-2">
                  <input
                    type="number"
                    min={1}
                    className="input input-bordered w-20 text-center"
                    value={quantitiesMap.get(product.productID) ?? 1}
                    onChange={e => handleQuantityChange(product.productID, Number(e.target.value))}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent page refresh
                        addToCart(product); // Optional: press Enter to add to cart
                      }
                    }}
                  />
                  <button className="btn bg-primary text-white hover:bg-primary-focus" onClick={() => addToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
