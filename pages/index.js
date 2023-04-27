import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import { useAuth } from "../src/context/AuthContext";
import Router from "next/router";

const Home = () => {
  const { getAllItem, buyItem, data, loading, setLoading } = useAuth();

  const getAllItemOnBlockchain = async () => {
    let res = await getAllItem();
  };

  const BuyItemFunct = async (id) => {
    let res = await buyItem(id + 1);
    setLoading(true);
    getAllItemOnBlockchain();
  };

  useEffect(() => {
    getAllItemOnBlockchain();
  }, []);

  if (loading === false) {
    return (
      <Layout title="Home">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">Welcome to FURNITURE STORE !</h1>

            <p className="mt-3 text-xl">
              Here are some of our popular furniture orders :
            </p>

            <div className="flex flex-wrap items-center justify-center  mt-6 sm:w-full">
              {data?.length > 0 ? (
                data?.map((order, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#00561B] dark:border-white dark:border-2 p-6 rounded-lg shadow-lg m-4 w-80"
                  >
                    <h3 className="font-bold text-xl mb-2">{order.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base">
                      {parseInt(order?.price?._hex, 16)}
                    </p>
                    <button
                      onClick={() =>    Router.push({
                        pathname: "/modify-article",
                        query: {
                          name: order?.name,
                          originPrice: parseInt(order?.price?._hex, 16),
                          index: index,
                        },
                      })}
                      className="hover:text-black hover:bg-white bg-[#00561B] dark:bg-white text-white dark:text-black dark:hover:bg-[#00561B] dark:hover:text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => BuyItemFunct(index)}
                      className="hover:text-black hover:bg-white bg-[#00561B] dark:bg-white text-white dark:text-black dark:hover:bg-[#00561B] dark:hover:text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      BUY this article on BlockChain
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-4xl">
                  No article found on blockchain
                </p>
              )}
            </div>
          </main>
        </div>
      </Layout>
    );
  } else {
    return (
      <p className="flex items-center justify-center content-center text-gray-700 text-4xl">
        Loading article on blockchain
      </p>
    );
  }
};

export default Home;
