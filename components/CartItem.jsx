import { removeFromCart, updateCart } from '@/store/cartSlice';
import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const CartItem = ({ data }) => {
  const p = data.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === 'quantity' ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };
  return (
    <div className="flex gap-3 py-5 md:gap-5 boeder -b">
      <div className="shrink-0 aspect-square w-[50px] md:w  -[120px]">
        <Image
          src={p.thumbnail.data.attributes.url}
          alt={p.name}
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP: &#8377;{p.price}
          </div>
        </div>
        <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
          {p.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, 'selectedSize')}
              >
                {p.size.data.map((item, i) => (
                  <option
                    key={i}
                    value={item.size}
                    disabled={!item.enabled ? true : false}
                    selected={data.selectedSize === item.size}
                  >
                    {item.size}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1">
                <div className="font-semibold">Quantity:</div>
                <select
                  className="hover:text-black"
                  onChange={(e) => updateCartItem(e, 'quantity')}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => (
                    <option key={i} value={q} selected={data.quantity === q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={() => dispatch(removeFromCart({id: data.id}))}
            className="cursor-poiter text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
