import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import Router from "next/router";
import TextInput from "../src/components/TextInput";
import { useAuth } from "../src/context/AuthContext";

const CreateCoffee = () => {
  const {} = useAuth();
  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [price, setPrice] = useState(0);
  const [errorPrice, setErrorPrice] = useState(false);

  const SellAnArticle = async () => {
    if (!title) {
      setErrorTitle(true);
      return;
    }
    if (price <= 0) {
      setErrorPrice(true);
      return;
    }
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
    <Layout title="Create coffee">
      <div className="mx-auto w-full h-screen max-w-[550px] pt-10">
        <h2 className="text-gray-600 font-semibold pb-10 px-5 dark:text-white text-4xl">
          Sell your article
        </h2>
        <form onSubmit={handleSubmit} className="px-5">
          <div className="mb-5">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <label className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                  Name
                </label>
                <TextInput
                  value={title}
                  setValue={setTitle}
                  setError={setErrorTitle}
                  error={errorTitle}
                  placeHolder={"Name"}
                  type={"text"}
                />
                {errorTitle && (
                  <div className="flex item-start pl-5 text-red-600">
                    <p className="text-red pt-1 text-center">Field Missing</p>
                  </div>
                )}
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
              onClick={SellAnArticle}
              className="hover:shadow-form rounded-md w-full dark:border-white border bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Sell this article
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCoffee;
