import CartItem from '@/components/CartItem';
import Wrapper from '@/components/Wrapper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Cart = () => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        <div className="flex flex-col gap-12 py-10 lg:flex-row">
          <div className="flex-[2]">
            <div className="text-lg font-bold">Cart Item</div>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="flex-[1]">
            <div className="text-lg font-bold">Summary</div>
            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="font-medium text-black uppercase text-md md:text-lg">
                  Subtotal
                </div>
                <div>$ 600.00</div>
              </div>
              <div className="py-5 mt-5 text-sm border-t md:text-md">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full gap-2 py-4 mb-3 text-lg font-medium text-white transition-transform bg-black rounded-full active:scale-95 hover:opacity-75"
              // onClick={handlePayment}
            >
              Checkout
              {/* {loading && <img src="/spinner.svg" />} */}
            </button>
          </div>
        </div>

        {/**Empty Screen */}
        {/* <div className="flex-p[2] flex flex-col items-center ">
          <Image
            src="/empty-cart.jpg"
            alt="empty"
            width={300}
            height={300}
            className="w-[300px] md:w-[400px]"
          />
          <span className="text-xl font-bold">Your cart is empty</span>
          <span className="mt-4 text-center">
            Looks like you have not added anything in your cart
            <br />
            Go ahead and explore top categories
          </span>
          <Link
            href="/"
            className="px-8 py-4 mt-8 mb-3 text-lg font-medium text-white transition-transform bg-black rounded-full active:scale-95 hover:opacity-75"
          >
            Continue Shopping
          </Link>
        </div> */}
      </Wrapper>
    </div>
  );
};

export default Cart;
