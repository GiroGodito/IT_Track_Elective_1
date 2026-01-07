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
// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import {
//   ShoppingCartIcon,
//   ArrowRightEndOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
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

// // interface JWTPayload {
// //   sub?: string;
// //   unique_name?: string;
// //   role?: string;
// // }

// // interface Cart {
// //   cartID: number;
// //   sellerID: number;
// //   storeName: string;
// //   createdAt: string;
// //   status: string;
// // }

// // interface CartItem {
// //   cartItemID: number;
// //   cartID: number;
// //   productID: number;
// //   productBrand: string;
// //   productName: string;
// //   quantity: number;
// //   totalPrice: string;
// // }

// interface WhoAmIResponse
// {
//   username: string,
//   roles: string[]
// }

// interface CartResponse
// {
//   success: boolean,
//   message: string,
//   data: number
// }

// interface CartItemResponse{
//   success: boolean,
//   message: string,
//   data: number
// }

// interface CartItem{
//   cartItemID: number;
//   cartID: number;
//   productID: number;
//   quantity: number;
// }



// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<WhoAmIResponse | null>(null);
//   const [cartSellerArray, setCartSellerArray] = useState<number[]>([]);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const [cartItemID, setCartItemID] = useState<number>(0);
//   const [cartID, setCartID] = useState<number>(0);
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);

// const fetchUser = async () => {
//   try { 
//     const res = await api.get<WhoAmIResponse>("/Auth/whoAmI");
//     setUser(res.data); 
//   } 
//   catch { 
//     setUser(null);
//    } 
//   };
  
//   useEffect(() => { 
//     fetchUser(); 
//   }, []);

//   useEffect(() => {
//     api.get("CartItem/cartItems/userID").then((response) => response.data)
//   },[quantities]);

//   const navigate = useNavigate();

//   // Fetch products
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

//   // useEffect(() => {
//   //  const sum = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//   //   setTotalQuantity(sum);
//   // }, [quantities]);

// const isLoggedIn = !!user;

//   // // Decode JWT for username
//   // useEffect(() => {
//   //   if (token) {
//   //     const decoded = jwtDecode<JWTPayload>(token);
//   //     setUsername(decoded.unique_name ?? "Guest");
//   //   }
//   // }, [token]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   const handleQuantityChange = (productID: number, value: number) =>
//      {
//        setQuantities((prev) => (
//         { ...prev, [productID]: value }
//       ));
//   };

//   // const AddCartItem = async (cartID: number | null, productID: number) => {
//   //   await api.post("/CartItem/cartItem", {
//   //     cartID: cartID,
//   //     productID: productID,
//   //     quantity: 1
//   //   })
//   //   .then((cartItemResponse) => {
//   //     const apiResponse: CartItemResponse = cartItemResponse.data;
//   //     alert(`Successfully added to cart item with id of ${apiResponse.data}`);
//   //   })
//   //   .catch((error) => console.error("Error adding cart item:", error));
//   // };

//   const AddToCart = async (sellerID: number, productID: number, quantity: number) =>{
//     if(!isLoggedIn)
//     {
//       navigate("/login");
//     }
//     else
//     {
//       if(cartSellerArray.includes(sellerID))
//       {
//         alert(`Cart with sellerID ${sellerID} already exists in cartSellerArray.`);
//         await api.put(`/CartItem/cartItem/cartItemID/${cartItemID}`,{
//           cartItemID: cartItemID,
//           cartID: cartID,
//           productID: productID,
//           quantity: quantity
//         }).then((cartItemResponse) => {
//           const apiResponse: CartItemResponse = cartItemResponse.data;
//           setTotalQuantity(quantity);
//           alert(`Successfully updated cart item with id of ${apiResponse.data}`);
//         }).catch((error) => console.error("Error updating cart item:", error));
//       }
//       else{
//         await api.post("/Cart/cart", {sellerID})
//         .then((cartResponse) => {
//           const apiResponse: CartResponse = cartResponse.data;
//           setCartSellerArray((prev) => [...prev, sellerID]);
//           setCartID(apiResponse.data);
//           setTotalQuantity(quantity);
//           alert(`Successfully created cart with id of ${apiResponse.data}`);

//           api.post("CartItem/cartItem",{
//             cartID: apiResponse.data,
//             productID: productID,
//             quantity: quantity
//           })
//           .then((cartItemResponse) => {
//             const apiResponse: CartItemResponse = cartItemResponse.data;
//             alert(`Successfully added to cart item with id of ${apiResponse.data}`);
//             setCartItemID(apiResponse.data);
//           })
//         }).catch((error) => console.error("Error adding to cart:", error));
//       }

//       // await api.post("/Cart/cart", { sellerID, productID })
//       // .then((cartResponse) => {
//       //   const apiResponse: CartResponse = cartResponse.data;
//       //   if(!cart.includes(apiResponse.data))
//       //   {
//       //     setCart((prev) => [...prev, apiResponse.data]);
//       //     alert(`Successfully created cart with id of ${apiResponse.data}`);
//       //     api.post("CartItem/cartItem",{
//       //       cartID: apiResponse.data,
//       //       productID: productID,
//       //       quantity: 1
//       //     })
//       //     .then((cartItemResponse) => {
//       //       const apiResponse: CartItemResponse = cartItemResponse.data;
//       //       alert(apiResponse.data);
//       //     })
//       //   }
//       //   else{
//       //     alert("testing");
//       //     console.log('testing');
//       //   }
//       // })
//       // .catch((error) => console.error("Error adding to cart:", error));
      
//     }
//   };


// const LogOut = async () => {
//   try
//   {
//     await api.post("/Auth/logout");
//     setUser(null);
//   }
//   catch(err)
//   {
//     console.error("Logout failed", err);
//   }
// };



//   const ViewCart = () => {
    
//   };

//   const ViewOrders = () => {
   
//   };

//   return (
//     <>
//       {/* Top bar */}
//       <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
//         <div className="flex justify-between m-5">
//           <p>
//             <strong>{user ? user.username : "Guest"}</strong>
//           </p>
//           <div className="flex gap-5">
//             {isLoggedIn && (
//               <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={ViewOrders} />
//             )}
//             <div className="relative">
//               {isLoggedIn && (
//                 <ShoppingCartIcon
//                   className="h-10 w-10 text-white cursor-pointer"
//                   onClick={ViewCart}
//                 />
//               )}
//               {isLoggedIn && (
//                 <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </div>
//             {isLoggedIn && (
//               <ArrowRightEndOnRectangleIcon
//                 className="h-10 w-10 ml-3 cursor-pointer"
//                 onClick={LogOut}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className="flex justify-center p-6 mt-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//           {products.map((product) => (
//             <div
//               key={product.productID}
//               className="card shadow-lg border rounded-lg bg-base-200"
//             >
//               <figure>
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="card-body items-center text-center">
//                 <h2 className="card-title">{product.name}</h2>
//                 <p>Seller {product.sellerID}</p>
//                 <p className="text-gray-600">{product.brand}</p>
//                 <p className="text-success font-semibold">
//                   ₱{product.price.toLocaleString()}
//                 </p>
//                 <p className="text-sm">{product.description}</p>
//                 <div className="card-actions flex mt-4 gap-2">
//                   <button
//                     className="btn bg-primary!"
//                     onClick={() => isLoggedIn ? AddToCart(product.sellerID,product.productID,quantities[product.productID] || 1) : navigate("/login")}
//                   >
//                   Add To Cart
//                   </button>
//                   <input type="number" min="1" className="input input-bordered w-20" value={quantities[product.productID] || 1} onChange={(e) => handleQuantityChange(product.productID, parseInt(e.target.value))}/>
//                   </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import {
//   ShoppingCartIcon,
//   ArrowRightEndOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
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

// interface CartItemCount
// {
//   username: string,
//   totalCountProducts: number
// }

// interface CartItem
// {
//   cartItemID: number,
//   cartID: number,
//   sellerID: number,
//   productID: number,
//   quantity: number
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<WhoAmIResponse | null>(null);
//   const [cartSellerArray, setCartSellerArray] = useState<number[]>([]);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const [cartItemsMap, setCartItemsMap] = useState<{ [productID: number]: number }>({});
//   const [cartID, setCartID] = useState<number>(0);
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);
//   const [addedProducts, setAddedProducts] = useState<{ [productID: number]: boolean }>({});
//   const [cartIDsBySeller, setCartIDsBySeller] = useState<{ [sellerID: number]: number }>({});

//   const navigate = useNavigate();
//   const isLoggedIn = !!user;

//   const fetchUser = async () => {
//     try {
//       const res = await api.get<WhoAmIResponse>("/Auth/whoAmI");
//       setUser(res.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // Fetch products
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

//   useEffect(() => {
//   const fetchCartItems = async () => {
//     if (!isLoggedIn) return;
//     try {
//       const res = await api.get<CartItem[]>("/CartItems"); 
//       // adjust endpoint to whatever returns all cart items for the user
//       const items = res.data; // assume array of { cartItemID, cartID, productID, quantity, sellerID }

//       const newCartItemsMap: { [productID: number]: number } = {};
//       const newQuantities: { [productID: number]: number } = {};
//       const newAddedProducts: { [productID: number]: boolean } = {};
//       const newCartIDsBySeller: { [sellerID: number]: number } = {};

//       items.forEach((item: any) => {
//         newCartItemsMap[item.productID] = item.cartItemID;
//         newQuantities[item.productID] = item.quantity;
//         newAddedProducts[item.productID] = true;
//         newCartIDsBySeller[item.sellerID] = item.cartID;
//       });

//       setCartItemsMap(newCartItemsMap);
//       setQuantities(newQuantities);
//       setAddedProducts(newAddedProducts);
//       setCartIDsBySeller(newCartIDsBySeller);
//     } catch (err) {
//       console.error("Error fetching cart items:", err);
//     }
//   };

//   fetchCartItems();
// }, [isLoggedIn]);

// const fetchTotalQuantity = async () => {
//   await api.get<CartItemCount>("CartItem/cartItems/userID")
//   .then((response) => {
//     const totalCount = response.data.totalCountProducts ?? 0;
//     setTotalQuantity(totalCount);
//   })
//   .catch((err) => console.error(err));
// };

// useEffect(() => {
//   if (isLoggedIn) {
//     fetchTotalQuantity();
//   }
// }, [isLoggedIn]);

//   const handleQuantityChange = async (sellerID: number, productID: number, value: number) => {
//   setQuantities((prev) => ({ ...prev, [productID]: value }));

//   // If this product already exists in cartItemsMap, auto-update backend
//   if (cartItemsMap[productID]) {
//     try {
//       const cartIDForSeller = cartIDsBySeller[sellerID];
//       await api.put(`/CartItem/cartItem/cartItemID/${cartItemsMap[productID]}`, {
//         cartItemID: cartItemsMap[productID],
//         cartID: cartIDForSeller,
//         productID,
//         quantity: value,
//       });
//       console.log(`Auto-updated cart item ${cartItemsMap[productID]} with quantity ${value}`);
//       await fetchTotalQuantity();
//     } catch (err) {
//       console.error("Error auto-updating cart item:", err);
//     }
//   }
// };

//   const AddToCart = async (sellerID: number, productID: number, quantity: number) => {
//   if (!isLoggedIn) {
//     navigate("/login");
//     return;
//   }

//   try {
//     const existingCartID = cartIDsBySeller[sellerID];

//     if (existingCartID) {
//       // Cart exists for this seller
//       if (cartItemsMap[productID]) {
//         // Product already in cart → update
//         await api.put(`/CartItem/cartItem/cartItemID/${cartItemsMap[productID]}`, {
//           cartItemID: cartItemsMap[productID],
//           cartID: existingCartID,
//           productID,
//           quantity,
//         });
//         setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//         setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//         alert(`Updated cart item for product ${productID}`);
//       } else {
//         // Product not in cart → add new cart item
//         const res = await api.post("CartItem/cartItem", {
//           cartID: existingCartID,
//           productID,
//           quantity,
//         });
//         const apiResponse: CartItemResponse = res.data;
//         setCartItemsMap((prev) => ({ ...prev, [productID]: apiResponse.data }));
//         setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//         setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//         alert(`Added new cart item with id ${apiResponse.data}`);
//       }
//     } else {
//       // Create new cart for this seller
//       const cartRes = await api.post("/Cart/cart", { sellerID });
//       const cartResponse: CartResponse = cartRes.data;

//       setCartIDsBySeller((prev) => ({ ...prev, [sellerID]: cartResponse.data }));

//       // Add first cart item
//       const itemRes = await api.post("CartItem/cartItem", {
//         cartID: cartResponse.data,
//         productID,
//         quantity,
//       });
//       const itemResponse: CartItemResponse = itemRes.data;

//       setCartItemsMap((prev) => ({ ...prev, [productID]: itemResponse.data }));
//       setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//       setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//       alert(`Created cart for seller ${sellerID} and added item ${itemResponse.data}`);
//       await fetchTotalQuantity();
//     }
//   } catch (err) {
//     console.error("Error in AddToCart:", err);
//   }
// };


//   const LogOut = async () => {
//     try {
//       await api.post("/Auth/logout");
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const ViewCart = () => {
//     navigate("/cart");
//   };

//   const ViewOrders = () => {
//     navigate("/orders");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Top bar */}
//       <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
//         <div className="flex justify-between m-5">
//           <p>
//             <strong>{user ? user.username : "Guest"}</strong>
//           </p>
//           <div className="flex gap-5">
//             {isLoggedIn && (
//               <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={ViewOrders} />
//             )}
//             <div className="relative">
//               {isLoggedIn && (
//                 <ShoppingCartIcon
//                   className="h-10 w-10 text-white cursor-pointer"
//                   onClick={ViewCart}
//                 />
//               )}
//               {isLoggedIn && (
//                 <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </div>
//             {isLoggedIn && (
//               <ArrowRightEndOnRectangleIcon
//                 className="h-10 w-10 ml-3 cursor-pointer"
//                 onClick={LogOut}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className="flex justify-center p-6 mt-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//           {products.map((product) => (
//             <div
//               key={product.productID}
//               className="card shadow-lg border rounded-lg bg-base-200"
//             >
//               <figure>
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="card-body items-center text-center">
//                 <h2 className="card-title">{product.name}</h2>
//                 <p>Seller {product.sellerID}</p>
//                 <p className="text-gray-600">{product.brand}</p>
//                 <p className="text-success font-semibold">
//                   ₱{product.price.toLocaleString()}
//                 </p>
//                 <p className="text-sm">{product.description}</p>
//                 <div className="card-actions flex mt-4 gap-2">

//                   {!addedProducts[product.productID] ? (
//                   <button
//                     className="btn bg-primary!"
//                     onClick={() =>
//                       isLoggedIn
//                         ? AddToCart(
//                             product.sellerID,
//                             product.productID,
//                             quantities[product.productID] || 1
//                           )
//                         : navigate("/login")
//                     }
//                   >
//                     Add To Cart
//                   </button>) 
                  
//                   : 
                  
//                   (<input
//                     type="number"
//                     min="1"
//                     className="input input-bordered w-20"
//                     value={quantities[product.productID] || 1}
//                     onKeyDown={(e) => e.preventDefault()}
//                     onChange={(e) =>
//                       handleQuantityChange(product.sellerID,product.productID, parseInt(e.target.value))
//                     }
//                   />)

//                   }
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


//LATEST STARTS HERE GUBA
// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import {
//   ShoppingCartIcon,
//   ArrowRightEndOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
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
//   username: string;
//   totalCountProducts: number;
// }

// interface CartItem {
//   cartItemID: number;
//   cartID: number;
//   sellerID: number;
//   productID: number;
//   quantity: number;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<WhoAmIResponse | null>(null);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   const [cartItemsMap, setCartItemsMap] = useState<{ [productID: number]: number }>({});
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);
//   const [addedProducts, setAddedProducts] = useState<{ [productID: number]: boolean }>({});
//   const [cartIDsBySeller, setCartIDsBySeller] = useState<{ [sellerID: number]: number }>({});

//   const navigate = useNavigate();
//   const isLoggedIn = !!user;

//   // Fetch user
//   const fetchUser = async () => {
//     try {
//       const res = await api.get<WhoAmIResponse>("/Auth/whoAmI");
//       setUser(res.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // Fetch products
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

//   // Fetch cart items
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (!isLoggedIn) return;
//       try {
//         const res = await api.get<CartItem[]>("/CartItems");
//         const items = res.data;

//         const newCartItemsMap: { [productID: number]: number } = {};
//         const newQuantities: { [productID: number]: number } = {};
//         const newAddedProducts: { [productID: number]: boolean } = {};
//         const newCartIDsBySeller: { [sellerID: number]: number } = {};

//         items.forEach((item) => {
//           newCartItemsMap[item.productID] = item.cartItemID;
//           newQuantities[item.productID] = item.quantity;
//           newAddedProducts[item.productID] = true;
//           newCartIDsBySeller[item.sellerID] = item.cartID; // ✅ direct seller mapping
//         });

//         setCartItemsMap(newCartItemsMap);
//         setQuantities(newQuantities);
//         setAddedProducts(newAddedProducts);
//         setCartIDsBySeller(newCartIDsBySeller);
//       } catch (err) {
//         console.error("Error fetching cart items:", err);
//       }
//     };

//     fetchCartItems();
//   }, [isLoggedIn]);

//   // Fetch total quantity
//   const fetchTotalQuantity = async () => {
//     try {
//       const res = await api.get<CartItemCount>("/CartItem/cartItems/userID");
//       setTotalQuantity(res.data.totalCountProducts ?? 0);
//     } catch (err) {
//       console.error("Error fetching total quantity:", err);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchTotalQuantity();
//     }
//   }, [isLoggedIn]);

//   // Handle quantity change
//   const handleQuantityChange = async (sellerID: number, productID: number, value: number) => {
//     const safeValue = Number.isFinite(value) && value > 0 ? value : 1;
//     setQuantities((prev) => ({ ...prev, [productID]: safeValue }));

//     if (cartItemsMap[productID]) {
//       try {
//         const cartIDForSeller = cartIDsBySeller[sellerID];
//         if (!cartIDForSeller) {
//           console.error(`No cartID found for seller ${sellerID}`);
//           return;
//         }

//         await api.put(`/CartItem/cartItem/cartItemID/${cartItemsMap[productID]}`, {
//           cartItemID: cartItemsMap[productID],
//           cartID: cartIDForSeller,
//           productID,
//           quantity: safeValue,
//         });

//         console.log(`Updated cart item ${cartItemsMap[productID]} with quantity ${safeValue}`);
//         await fetchTotalQuantity();
//       } catch (err) {
//         console.error("Error auto-updating cart item:", err);
//       }
//     }
//   };

//   // Add to cart
//   const AddToCart = async (sellerID: number, productID: number, quantity: number) => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const existingCartID = cartIDsBySeller[sellerID];

//       if (existingCartID) {
//         if (cartItemsMap[productID]) {
//           // Update existing item
//           await api.put(`/CartItem/cartItem/cartItemID/${cartItemsMap[productID]}`, {
//             cartItemID: cartItemsMap[productID],
//             cartID: existingCartID,
//             productID,
//             quantity,
//           });
//           setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//           setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//           alert(`Updated cart item for product ${productID}`);
//         } else {
//           // Add new item
//           const res = await api.post("CartItem/cartItem", {
//             cartID: existingCartID,
//             productID,
//             quantity,
//           });
//           const apiResponse: CartItemResponse = res.data;
//           setCartItemsMap((prev) => ({ ...prev, [productID]: apiResponse.data }));
//           setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//           setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//           alert(`Added new cart item with id ${apiResponse.data}`);
//         }
//       } else {
//         // Create new cart for seller
//         const cartRes = await api.post("/Cart/cart", { sellerID });
//         const cartResponse: CartResponse = cartRes.data;

//         setCartIDsBySeller((prev) => ({ ...prev, [sellerID]: cartResponse.data }));

//         const itemRes = await api.post("CartItem/cartItem", {
//           cartID: cartResponse.data,
//           productID,
//           quantity,
//         });
//         const itemResponse: CartItemResponse = itemRes.data;

//         setCartItemsMap((prev) => ({ ...prev, [productID]: itemResponse.data }));
//         setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//         setAddedProducts((prev) => ({ ...prev, [productID]: true }));
//         alert(`Created cart for seller ${sellerID} and added item ${itemResponse.data}`);
//       }

//       await fetchTotalQuantity();
//     } catch (err) {
//       console.error("Error in AddToCart:", err);
//     }
//   };

//   // Logout
//   const LogOut = async () => {
//     try {
//       await api.post("/Auth/logout");
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const ViewCart = () => navigate("/cart");
//   const ViewOrders = () => navigate("/orders");

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Top bar */}
//       <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
//         <div className="flex justify-between m-5">
//           <p>
//             <strong>{user ? user.username : "Guest"}</strong>
//           </p>
//           <div className="flex gap-5">
//             {isLoggedIn && (
//               <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={ViewOrders} />
//             )}
//             <div className="relative">
//                            {isLoggedIn && (
//                 <ShoppingCartIcon
//                   className="h-10 w-10 text-white cursor-pointer"
//                   onClick={ViewCart}
//                 />
//               )}
//               {isLoggedIn && (
//                 <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </div>
//             {isLoggedIn && (
//               <ArrowRightEndOnRectangleIcon
//                 className="h-10 w-10 ml-3 cursor-pointer"
//                 onClick={LogOut}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className="flex justify-center p-6 mt-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//           {products.map((product) => (
//             <div
//               key={product.productID}
//               className="card shadow-lg border rounded-lg bg-base-200"
//             >
//               <figure>
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="card-body items-center text-center">
//                 <h2 className="card-title">{product.name}</h2>
//                 <p>Seller {product.sellerID}</p>
//                 <p className="text-gray-600">{product.brand}</p>
//                 <p className="text-success font-semibold">
//                   ₱{product.price.toLocaleString()}
//                 </p>
//                 <p className="text-sm">{product.description}</p>
//                 <div className="card-actions flex mt-4 gap-2">
//                   {!addedProducts[product.productID] ? (
//                     <button
//                       className="btn bg-primary!"
//                       onClick={() =>
//                         isLoggedIn
//                           ? AddToCart(
//                               product.sellerID,
//                               product.productID,
//                               quantities[product.productID] || 1
//                             )
//                           : navigate("/login")
//                       }
//                     >
//                       Add To Cart
//                     </button>
//                   ) : (
//                     <input
//                       type="number"
//                       min="1"
//                       className="input input-bordered w-20"
//                       value={quantities[product.productID] || 1}
//                       onKeyDown={(e) => e.preventDefault()}
//                       onChange={(e) =>
//                         handleQuantityChange(
//                           product.sellerID,
//                           product.productID,
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

//LATEEST WORKING I GUESS
// import { useEffect, useState } from "react";
// import api from "../API/axios";
// import {
//   ShoppingCartIcon,
//   ArrowRightEndOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate } from "react-router-dom";
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

// interface CartItem {
//   cartItemID: number;
//   cartID: number;
//   productID: number;
//   quantity: number;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<WhoAmIResponse | null>(null);
//   const [cartSellerArray, setCartSellerArray] = useState<number[]>([]);
//   const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
//   //const [cartItemID, setCartItemID] = useState<number>(0);
//   const [cartItemIDs, setCartItemIDs] = useState<{ [productID: number]: number }>({});
//   const [cartID, setCartID] = useState<number>(0);
//   const [totalQuantity, setTotalQuantity] = useState<number>(0);

//   const navigate = useNavigate();
//   const isLoggedIn = !!user;

//   const fetchUser = async () => {
//     try {
//       const res = await api.get<WhoAmIResponse>("/Auth/whoAmI");
//       setUser(res.data);
//     } catch {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // Fetch products
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

//   // Recalculate total quantity whenever quantities change
//   useEffect(() => {
//     const sum = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
//     setTotalQuantity(sum);
//   }, [quantities]);

//   const handleQuantityChange = (productID: number, value: number) => {
//     setQuantities((prev) => ({ ...prev, [productID]: value }));
//   };

//   const AddToCart = async (sellerID: number, productID: number, quantity: number) => {
//   if (!isLoggedIn) {
//     navigate("/login");
//     return;
//   }

//   try {
//     if (cartSellerArray.includes(sellerID)) {
//       // Cart exists for this seller
//       const cartItemID = cartItemIDs[productID];

//       if (cartItemID) {
//         // Update existing cart item
//         await api.put(`/CartItem/cartItem/cartItemID/${cartItemID}`, {
//           cartItemID,
//           cartID,
//           productID,
//           quantity,
//         });
//         setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//       } else {
//         // Create new cart item for this product
//         const cartItemResponse = await api.post("CartItem/cartItem", {
//           cartID,
//           productID,
//           quantity,
//         });
//         const apiResponse: CartItemResponse = cartItemResponse.data;
//         setCartItemIDs((prev) => ({ ...prev, [productID]: apiResponse.data }));
//         setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//       }
//     } else {
//       // Create new cart for this seller
//       const cartResponse = await api.post("/Cart/cart", { sellerID });
//       const apiResponse: CartResponse = cartResponse.data;
//       setCartSellerArray((prev) => [...prev, sellerID]);
//       setCartID(apiResponse.data);

//       // Add first cart item
//       const cartItemResponse = await api.post("CartItem/cartItem", {
//         cartID: apiResponse.data,
//         productID,
//         quantity,
//       });
//       const itemResponse: CartItemResponse = cartItemResponse.data;
//       setCartItemIDs((prev) => ({ ...prev, [productID]: itemResponse.data }));
//       setQuantities((prev) => ({ ...prev, [productID]: quantity }));
//     }
//   } catch (err) {
//     console.error("Error in AddToCart:", err);
//   }
// };


//   const LogOut = async () => {
//     try {
//       await api.post("/Auth/logout");
//       setUser(null);
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const ViewCart = () => {
//     navigate("/cart");
//   };

//   const ViewOrders = () => {
//     navigate("/orders");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading products...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Top bar */}
//       <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
//         <div className="flex justify-between m-5">
//           <p>
//             <strong>{user ? user.username : "Guest"}</strong>
//           </p>
//           <div className="flex gap-5">
//             {isLoggedIn && (
//               <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={ViewOrders} />
//             )}
//             <div className="relative">
//               {isLoggedIn && (
//                 <ShoppingCartIcon
//                   className="h-10 w-10 text-white cursor-pointer"
//                   onClick={ViewCart}
//                 />
//               )}
//               {isLoggedIn && (
//                 <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//                   {totalQuantity}
//                 </span>
//               )}
//             </div>
//             {isLoggedIn && (
//               <ArrowRightEndOnRectangleIcon
//                 className="h-10 w-10 ml-3 cursor-pointer"
//                 onClick={LogOut}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Product grid */}
//       <div className="flex justify-center p-6 mt-20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
//           {products.map((product) => (
//             <div
//               key={product.productID}
//               className="card shadow-lg border rounded-lg bg-base-200"
//             >
//               <figure>
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-48 object-cover"
//                 />
//               </figure>
//               <div className="card-body items-center text-center">
//                 <h2 className="card-title">{product.name}</h2>
//                 <p>Seller {product.sellerID}</p>
//                 <p className="text-gray-600">{product.brand}</p>
//                 <p className="text-success font-semibold">
//                   ₱{product.price.toLocaleString()}
//                 </p>
//                 <p className="text-sm">{product.description}</p>
//                 <div className="card-actions flex mt-4 gap-2">
//                   <button
//                     className="btn bg-primary!"
//                     onClick={() =>
//                       isLoggedIn
//                         ? AddToCart(
//                             product.sellerID,
//                             product.productID,
//                             quantities[product.productID] || 1
//                           )
//                         : navigate("/login")
//                     }
//                   >
//                     Add To Cart
//                   </button>
//                   <input
//                     type="number"
//                     min="1"
//                     className="input input-bordered w-20"
//                     value={quantities[product.productID] || 1}
//                     onChange={(e) =>
//                       handleQuantityChange(product.productID, parseInt(e.target.value))
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import api from "../API/axios";
import {
  ShoppingCartIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { PiPackage } from "react-icons/pi";
import ViewCart from "../Template/ViewCart"

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

interface PaginatedProductResponse{
  success: boolean;
  message: string;
  data: PaginatedProduct
}

interface PaginatedProduct
{
  productList: Product[],
  totalCount: number
}

//apiresponsedto contains a data which has cartdto array with has cartitemdto array 
interface CartItemDTO {
  cartItemID: number;
  productID: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartDTO {
  cartID: number;
  sellerID: number;
  storeName: string;
  items: CartItemDTO[];
}

interface ApiResponseUserCart { 
    success: boolean;
    message: string;
    data: 
    {
        cartList: CartDTO[]; 
        totalCount: number; 
    }; 
}


export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<WhoAmIResponse | null>(null);
  const [showCart, setShowCart] = useState(false);

  //PAGINATION PURPOSES
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 
  const [totalCount, setTotalCount] = useState(0); //count of all products list
  

  // ✅ cartIDs per seller
  const [cartIDs, setCartIDs] = useState<{ [sellerID: number]: number }>(() => {
    const stored = localStorage.getItem("cartIDs");
    return stored ? JSON.parse(stored) : {};
  });

  // ✅ cartItemIDs per product
  const [cartItemIDs, setCartItemIDs] = useState<{ [productID: number]: number }>(() => {
    const stored = localStorage.getItem("cartItemIDs");
    return stored ? JSON.parse(stored) : {};
  });

  // ✅ quantities per product
  const [quantities, setQuantities] = useState<{ [productID: number]: number }>(() => {
    const stored = localStorage.getItem("quantities");
    return stored ? JSON.parse(stored) : {};
  });

  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const navigate = useNavigate();
  const isLoggedIn = !!user;

  // Hydrate cart state from backend on login basin
  useEffect(() => {
  if (isLoggedIn) {
    api.get<ApiResponseUserCart>(`/Cart/ViewCart?currentPage=1&pageSize=1000`) // fetch all carts
    hydrateCartState();
  }
}, [isLoggedIn]);

const hydrateCartState = async () => {
  try {
    const res = await api.get<ApiResponseUserCart>(`/Cart/ViewCart?currentPage=1&pageSize=1000`);
    const carts = res.data.data.cartList;

    const newCartIDs: { [sellerID: number]: number } = {};
    const newCartItemIDs: { [productID: number]: number } = {};
    const newQuantities: { [productID: number]: number } = {};

    carts.forEach(cart => {
      newCartIDs[cart.sellerID] = cart.cartID;
      cart.items.forEach(item => {
        newCartItemIDs[item.productID] = item.cartItemID;
        newQuantities[item.productID] = item.quantity;
      });
    });

    setCartIDs(newCartIDs);
    setCartItemIDs(newCartItemIDs);
    setQuantities(newQuantities);
  } catch (err) {
    console.error("Error hydrating cart state:", err);
  }
};

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cartIDs", JSON.stringify(cartIDs));
    localStorage.setItem("cartItemIDs", JSON.stringify(cartItemIDs));
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [cartIDs, cartItemIDs, quantities]);

  // Fetch user
  useEffect(() => {
    api.get<WhoAmIResponse>("/Auth/whoAmI")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Fetch products
  useEffect(() => {
    api.get<PaginatedProductResponse>(`/Product?currentPage=${currentPage}&pageSize=${productsPerPage}`)
      .then((res) => {
        setProducts(res.data.data.productList);
        setTotalCount(res.data.data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / productsPerPage);

  // Recalculate badge
  useEffect(() => {
    const sum = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
    setTotalQuantity(sum);
  }, [quantities]);

  // const handleQuantityChange = (productID: number, value: number) => {
  //   setQuantities((prev) => ({ ...prev, [productID]: value }));
  // };

  const handleQuantityChange = async (productID: number, value: number) => {
  setQuantities((prev) => ({ ...prev, [productID]: value }));

  const cartItemID = cartItemIDs[productID];
  const sellerID = products.find(p => p.productID === productID)?.sellerID;
  const cartID = sellerID ? cartIDs[sellerID] : undefined;

  if (cartItemID && cartID) {
    try {
      await api.put(`/CartItem/cartItem/cartItemID/${cartItemID}`, {
        cartItemID,
        cartID,
        productID,
        quantity: value,
      });
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  }
};


  const AddToCart = async (sellerID: number, productID: number, quantity: number) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      let cartID = cartIDs[sellerID];

      if (!cartID) {
        // Create new cart for this seller
        const cartResponse = await api.post("/Cart/cart", { sellerID });
        const apiResponse: CartResponse = cartResponse.data;
        cartID = apiResponse.data;
        setCartIDs((prev) => ({ ...prev, [sellerID]: cartID }));
      }

      const cartItemID = cartItemIDs[productID];

      if (cartItemID) {
        // Update existing cart item
        await api.put(`/CartItem/cartItem/cartItemID/${cartItemID}`, {
          cartItemID,
          cartID,
          productID,
          quantity,
        });
      } else {
        // Create new cart item
        const cartItemResponse = await api.post("CartItem/cartItem", {
          cartID,
          productID,
          quantity,
        });
        const apiResponse: CartItemResponse = cartItemResponse.data;
        setCartItemIDs((prev) => ({ ...prev, [productID]: apiResponse.data }));
      }

      setQuantities((prev) => ({ ...prev, [productID]: quantity }));
    } catch (err) {
      console.error("Error in AddToCart:", err);
    }
  };

  const LogOut = async () => {
    try {
      await api.post("/Auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const ViewOrders = () => navigate("/orders");

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-screen h-20 m-0 z-50 bg-primary!">
        <div className="flex justify-between m-5">
          <p>
            <strong>{user ? user.username : "Guest"}</strong>
          </p>
          <div className="flex gap-5">
            {isLoggedIn && (
              <PiPackage className="h-10 w-10 text-white cursor-pointer" onClick={ViewOrders} />
            )}
            <div className="relative">
              {isLoggedIn && (
                <ShoppingCartIcon
                  className="h-10 w-10 text-white cursor-pointer"
                  onClick={() => setShowCart(true)}
                />
              )}
              {isLoggedIn && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>
            {isLoggedIn && (
              <ArrowRightEndOnRectangleIcon
                className="h-10 w-10 ml-3 cursor-pointer"
                onClick={LogOut}
              />
            )}
          </div>
          {/* <div>
            <button className="btn bg-error! text-white" 
            onClick={() => { 
              localStorage.clear();
              setCartIDs({}); 
              setCartItemIDs({});
              setQuantities({});
              setTotalQuantity(0);
             }}
            
            >
              Clear
            </button>
          </div> */}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex justify-center p-6 mt-20">
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
                <p>Seller {product.sellerID}</p>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-success font-semibold">
                  ₱{product.price.toLocaleString()}
                </p>
                <p className="text-sm">{product.description}</p>
                <div className="card-actions flex mt-4 gap-2">
                  {!isLoggedIn ? (
                    <button 
                    className="btn bg-primary!"
                    onClick={() => navigate("/login")}>
                      Add To Cart
                    </button>
                  ) :
                  !cartItemIDs[product.productID] ? (
                  <button
                    className="btn bg-primary!"
                    onClick={() =>
                      isLoggedIn
                        ? AddToCart(
                            product.sellerID,
                            product.productID,
                            quantities[product.productID] || 1
                          )
                        : navigate("/login")
                    }
                  >
                    Add To Cart
                  </button>)
                  :
                  (<input
                    type="number"
                    min="1"
                    className="input input-bordered w-20"
                    value={quantities[product.productID] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.productID, parseInt(e.target.value))
                    }
                  />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 gap-2"> 
        <button className="btn" disabled={currentPage === 1}
         onClick={() => setCurrentPage(prev => prev - 1)} > 
         Prev 
         </button> 
         <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
          </span>
          <button className="btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} > Next </button>
      </div>
      {/* ✅ Cart Dialog */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-300 border border-white rounded-lg shadow-lg w-[1000px] max-h-[80vh] p-6 relative overflow-y-auto">
          <button
            className="absolute top-2 right-2 bg-secondary! hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow"
            onClick={() => setShowCart(false)}
          >
            x
          </button>
          <ViewCart onCartChanged={hydrateCartState}/>
        </div>
        </div>
      )}
    </>
  );
}