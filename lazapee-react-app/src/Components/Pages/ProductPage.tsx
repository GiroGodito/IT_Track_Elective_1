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
import { useEffect, useState } from "react";
import api from "../API/axios";
import {
  ShoppingCartIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
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

// interface JWTPayload {
//   sub?: string;
//   unique_name?: string;
//   role?: string;
// }

// interface Cart {
//   cartID: number;
//   sellerID: number;
//   storeName: string;
//   createdAt: string;
//   status: string;
// }

// interface CartItem {
//   cartItemID: number;
//   cartID: number;
//   productID: number;
//   productBrand: string;
//   productName: string;
//   quantity: number;
//   totalPrice: string;
// }

interface WhoAmIResponse
{
  username: string,
  roles: string[]
}

interface CartResponse
{
  success: boolean,
  message: string,
  data: number
}

interface CartItemResponse{
  success: boolean,
  message: string,
  data: number
}

interface CartItem{
  cartItemID: number;
  cartID: number;
  productID: number;
  quantity: number;
}



export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<WhoAmIResponse | null>(null);
  const [cartSellerArray, setCartSellerArray] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cartItemID, setCartItemID] = useState<number>(0);
  const [cartID, setCartID] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

const fetchUser = async () => {
  try { 
    const res = await api.get<WhoAmIResponse>("/Auth/whoAmI");
    setUser(res.data); 
  } 
  catch { 
    setUser(null);
   } 
  };
  
  useEffect(() => { 
    fetchUser(); 
  }, []);

  const navigate = useNavigate();

  // Fetch products
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

  // useEffect(() => {
  //  const sum = Object.values(quantities).reduce((acc, qty) => acc + qty, 0);
  //   setTotalQuantity(sum);
  // }, [quantities]);

const isLoggedIn = !!user;

  // // Decode JWT for username
  // useEffect(() => {
  //   if (token) {
  //     const decoded = jwtDecode<JWTPayload>(token);
  //     setUsername(decoded.unique_name ?? "Guest");
  //   }
  // }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  const handleQuantityChange = (productID: number, value: number) =>
     {
       setQuantities((prev) => (
        { ...prev, [productID]: value }
      ));
  };

  // const AddCartItem = async (cartID: number | null, productID: number) => {
  //   await api.post("/CartItem/cartItem", {
  //     cartID: cartID,
  //     productID: productID,
  //     quantity: 1
  //   })
  //   .then((cartItemResponse) => {
  //     const apiResponse: CartItemResponse = cartItemResponse.data;
  //     alert(`Successfully added to cart item with id of ${apiResponse.data}`);
  //   })
  //   .catch((error) => console.error("Error adding cart item:", error));
  // };

  const AddToCart = async (sellerID: number, productID: number, quantity: number) =>{
    if(!isLoggedIn)
    {
      navigate("/login");
    }
    else
    {
      if(cartSellerArray.includes(sellerID))
      {
        alert(`Cart with sellerID ${sellerID} already exists in cartSellerArray.`);
        await api.put(`/CartItem/cartItem/cartItemID/${cartItemID}`,{
          cartItemID: cartItemID,
          cartID: cartID,
          productID: productID,
          quantity: quantity
        }).then((cartItemResponse) => {
          const apiResponse: CartItemResponse = cartItemResponse.data;
          setTotalQuantity(quantity);
          alert(`Successfully updated cart item with id of ${apiResponse.data}`);
        }).catch((error) => console.error("Error updating cart item:", error));
      }
      else{
        await api.post("/Cart/cart", {sellerID})
        .then((cartResponse) => {
          const apiResponse: CartResponse = cartResponse.data;
          setCartSellerArray((prev) => [...prev, sellerID]);
          setCartID(apiResponse.data);
          setTotalQuantity(quantity);
          alert(`Successfully created cart with id of ${apiResponse.data}`);

          api.post("CartItem/cartItem",{
            cartID: apiResponse.data,
            productID: productID,
            quantity: quantity
          })
          .then((cartItemResponse) => {
            const apiResponse: CartItemResponse = cartItemResponse.data;
            alert(`Successfully added to cart item with id of ${apiResponse.data}`);
            setCartItemID(apiResponse.data);
          })
        }).catch((error) => console.error("Error adding to cart:", error));
      }

      // await api.post("/Cart/cart", { sellerID, productID })
      // .then((cartResponse) => {
      //   const apiResponse: CartResponse = cartResponse.data;
      //   if(!cart.includes(apiResponse.data))
      //   {
      //     setCart((prev) => [...prev, apiResponse.data]);
      //     alert(`Successfully created cart with id of ${apiResponse.data}`);
      //     api.post("CartItem/cartItem",{
      //       cartID: apiResponse.data,
      //       productID: productID,
      //       quantity: 1
      //     })
      //     .then((cartItemResponse) => {
      //       const apiResponse: CartItemResponse = cartItemResponse.data;
      //       alert(apiResponse.data);
      //     })
      //   }
      //   else{
      //     alert("testing");
      //     console.log('testing');
      //   }
      // })
      // .catch((error) => console.error("Error adding to cart:", error));
      
    }
  };


const LogOut = async () => {
  try
  {
    await api.post("/Auth/logout");
    setUser(null);
  }
  catch(err)
  {
    console.error("Logout failed", err);
  }
};



  const ViewCart = () => {
    
  };

  const ViewOrders = () => {
   
  };

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
                  onClick={ViewCart}
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
                  <button
                    className="btn bg-primary!"
                    onClick={() => isLoggedIn ? AddToCart(product.sellerID,product.productID,quantities[product.productID] || 1) : navigate("/login")}
                  >
                  Add To Cart
                  </button>
                  <input type="number" min="1" className="input input-bordered w-20" value={quantities[product.productID] || 1} onChange={(e) => handleQuantityChange(product.productID, parseInt(e.target.value))}/>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
