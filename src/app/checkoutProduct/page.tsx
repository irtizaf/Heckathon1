"use client";
import { loadStripe } from "@stripe/stripe-js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchCheckoutData } from "@/app/counter/checkoutSlice"
import { fetchCartData } from "@/app/counter/counterSlice"
import { useAuth } from "@clerk/nextjs";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { increaseQuantity, decreaseQuantity } from "@/app/counter/checkoutSlice";

const Product = () => {
  const [item, setItem] = useState({
    name: "Apple AirPods",
    description: "Latest Apple AirPods.",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 0,
    price: 999,
  });
  const { userId } = useAuth();
  setCookie("useriid", userId, { maxAge: 3600 });
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.checkout);
  const { loading } = useSelector((state: RootState) => state.checkout);

  const changeQuantity = (value: number) => {
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const onQuantityPlus = (productId: number) => {
    dispatch(increaseQuantity({ productId }));
    increaseQuantity(item)
    changeQuantity(item.quantity + 1);
  };
  const onQuantityMinus = (productId: number) => {
    dispatch(decreaseQuantity({ productId }));
    changeQuantity(item.quantity - 1);
  };
  const onInputChange = (e: { target: { value: string } }) => {
    changeQuantity(parseInt(e.target.value));
  };

  const publishableKey = process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await fetch(
      "api/create-stripe-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );

    console.log("Result------------- in prod page==========", checkoutSession);

    const sessionID = await checkoutSession.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: sessionID,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };


  const deleteCartItem = async (productId: any) => {
    console.log("method triggered with productID", productId);
    const response = await fetch(`api/cart?productId=${productId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("product is deleted and the response you got is ", response);
    dispatch(fetchCheckoutData());
    dispatch(fetchCartData());
    return response.json();
  }

  const totalPrice: number = data.map((product) => product.price).reduce((acc, price) => acc + price, 0);
  console.log(totalPrice);

  // Calculate the total quantity of all products
  const getTotalQuantity = (): number => {
    const totalQuantity = data.reduce((total, item) => total + item.quantity, 0);
    return totalQuantity;
  };

  // Calculate the price of an individual product based on its quantity
  const getProductPrice = (productId: number): number => {
    const product = data.find((item) => item.id === productId);
    if (product) {
      return product.price * product.quantity;
    }
    return 0;
  };

  // Calculate the sum of prices of all products
  const getTotalPrice = (): number => {
    const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice;
  };

  useEffect(() => {
    dispatch(fetchCheckoutData());
  }, [dispatch]);

  return (
    <div >
      <h1 className='text-3xl text-black font-bold  lg:[mx-40]'>Shopping Cart</h1>
      {
        (data) ? (
          <div className="tablet:flex justify-between mt-20">
            <div className=' w-auto mx-auto'>
              {
                data.map((value: any, id: any) => {
                  return <div key={id}>
                    <div className='tablet:flex hover:shadow-lg  gap-5 mt-5 '>
                        <Image className='w-[250px]' width={500} height={400} src={value.image} alt={"image"} />

                      <div className='space-y-2'>
                        <h1 className='text-xl '>{value.title}</h1>
                        <p className='text-gray-400 text-xl'>Sweater</p>
                        <h2 className='text-lg text-gray-500  '>XS Size</h2>
                        <h1 className='font-bold'>Delivery Estimation</h1>


                        <h1 className='text-yellow-500 font-bold mt-2'>5 Working Days</h1>
                        <h1 className='font-bold text-xl mt-3'>${getProductPrice(value.id)}</h1>
                      </div>
                      <div className="flex items-center justify-between px-3">
                         <RiDeleteBin6Line className="text-2xl " onClick={() => deleteCartItem(value.id)} />
                        <div className='flex lg:[space-x-1]  tablet:mt-32'>
                          <button
                            onClick={() => { onQuantityMinus(value.id) }} className='text-2xl  rounded-full w-10 h-10 shadow-lg'
                          > - </button>
                          <input type="number" className="text-xl mt-2 text-center mobile:w-20" onChange={onInputChange} value={value.quantity} />
                          <button onClick={() => { onQuantityPlus(value.id) }}
                            className='text-2xl  rounded-full  h-10 w-10 shadow-lg'> + </button>
                        </div>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
            <div className=' mobile:w-[230px]'>
              <h1 className='text-2xl font-bold'>Order Summary</h1>

              <div className='flex justify-between mt-5' >
                <p>Quantity</p>
                <p>{getTotalQuantity()} Product/s</p>
              </div>
              <div className='flex justify-between mt-3'  >
                <p>Price</p>
                <p>${getTotalPrice()}</p>
              </div>
              <button
                disabled={data.length === 0}
                onClick={createCheckOutSession}
                className="bg-black text-white w-[200px] text-center py-2 font-semibold mt-5 disabled:cursor-not-allowed disabled:bg-blue-100"
              >
                {loading ? 'Processing...' : 'checkout to proceed'}
              </button>
            </div>
          </div>
        ) : (
          <div>{loading}</div>
        )
      }
    </div>

  )
}

export default Product;
