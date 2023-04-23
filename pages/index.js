import { useState, useEffect } from "react";
import Layout from "../src/components/Layout";
import { useAuth } from "../src/context/AuthContext";
import Router from "next/router";

const Home = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const coffeeOrders = [
    {
      name: "Table",
      description: "The beautiful table",
      image: "/assets/table.jpg",
    },
    {
      name: "Desk",
      description: "The big desk",
      image: "/assets/bureau.jpg",
    },
    {
      name: "Sofa",
      description: "The best sofa for party",
      image: "/assets/canape.jpg",
    },
    {
      name: "Bed",
      description: "The bed where you can sleep",
      image: "/assets/lit.jpg",
    },
    {
      name: "Chair",
      description: "Best chair for eat",
      image: "/assets/chaise.jpg",
    },
  ];

  const CommandCoffee = (title) => {
    if (isAuthenticated)
      Router.push({
        pathname: "/create-coffee",
        query: { titlecoffee: title },
      });
    else {
      Router.push("/login")
    };
  };

  return (
    <Layout title="Home">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Welcome to FURNITURE STORE !</h1>

          <p className="mt-3 text-xl">
            Here are some of our popular furniture orders :
          </p>

          <div className="flex flex-wrap items-center justify-center  mt-6 sm:w-full">
            {coffeeOrders.map((order) => (
              <div
                key={order.name}
                className="bg-white dark:bg-[#00561B] dark:border-white dark:border-2 p-6 rounded-lg shadow-lg m-4 w-80"
              >
                <img
                  src={order.image}
                  className="w-full max-h-32 object-fill"
                />
                <h3 className="font-bold text-xl mb-2">{order.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                  {order.description}
                </p>
                <button
                  onClick={() => CommandCoffee(order.name)}
                  className="hover:text-black hover:bg-white bg-[#00561B] dark:bg-white text-white dark:text-black dark:hover:bg-[#00561B] dark:hover:text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Register my article on the BlockChain
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
