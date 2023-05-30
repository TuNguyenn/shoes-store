import ProductDetailsCarousel from '@/components/ProductDetail';
import { IoMdHeartEmpty } from 'react-icons/io';
import Wrapper from '@/components/Wrapper';
import React, { useState } from 'react';
import RelatedProducts from '@/components/RelatedProducts';
import { fetchDataFromApi } from '@/utils/api';
import { getDiscountedPricePercentage } from '@/utils/helper';

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const p = product?.data?.[0]?.attributes;

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={p.image.data} />
          </div>
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold mb-2">{p.name}</div>
            <div className="mb-5 text-lg font-semibold">{p.subtitle}</div>
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">&#8377;{p.price}</p>
              {p?.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    &#8377;{p?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePercentage(p.original_price, p.price)}%
                    off
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="font-semibold text-md">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              <div id='sizeGrid' className="grid grid-cols-3 gap-2">
                {p.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`py-3 font-medium text-center border rounded-md ${
                      item.enabled
                        ? 'hover:border-black cursor-pointer'
                        : 'cursor-not-allowed bg-black/[0.1] opacity-50'
                    } ${
                      selectedSize === item.size
                        ? 'bg-black text-white cursor-pointer '
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {showError && (
                <div className="mt-1 text-red-600">
                  Size selection is required
                </div>
              )}
            </div>
            <button
              className="w-full py-4 mb-3 text-lg font-medium text-white transition-transform bg-black rounded-full active:scale-95 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById('sizeGrid').scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Add to Cart
            </button>
            <button className="flex items-center justify-center w-full gap-2 py-4 text-lg font-medium transition-transform border border-black rounded-full active:scale-95 hover:opacity-75">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>
            <div>
              <div className="text-lg font-bold md-5">Product Details</div>
            </div>
          </div>
        </div>
        {/* <RelatedProducts /> */}
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const products = await fetchDataFromApi('/api/products?populate=*');

  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`,
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`,
  );

  return { props: { product, products } };
};
