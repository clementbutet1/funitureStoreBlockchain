import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import Router from "next/router";
import { useAuth } from "../src/context/AuthContext";
import { useRouter } from "next/router";

const modifyArticle = () => {
  const router = useRouter();
  const {
    query: { name, originPrice, index },
  } = router;
  const [price, setPrice] = useState((originPrice));
  const [errorPrice, setErrorPrice] = useState(false);
  const { modifyItem } = useAuth();

  const ModifyAnArticle = async () => {
    if (price <= 0) {
      setErrorPrice(true);
      return;
    }
    let res = await modifyItem(index + 1, parseInt(price));
    Router.push("/");
  };

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    if (price != 0 && price > 0) {
      setErrorPrice(false);
      return;
    }
  }, [price]);

  return (
    <Layout title="Create Furniture">
      <div className="mx-auto w-full h-screen max-w-[550px] pt-10">
        <h2 className="text-gray-600 font-semibold pb-10 px-5 dark:text-white text-4xl">
          Sell your article
        </h2>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="mb-5">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                  Name : 
                </label>
                <p className="font-bold text-xl">{name}</p>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errorPrice && (
              <div className="flex item-start pl-5 text-red-600">
                <p className="text-red pt-1 text-center">
                  The price must be more than 0
                </p>
              </div>
            )}
          </div>
          <div className="bg-red-600 flex justify-center align-center">
            <button
              onClick={ModifyAnArticle}
              className="hover:shadow-form rounded-md w-full dark:border-white border bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Modify this article price
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default modifyArticle;
