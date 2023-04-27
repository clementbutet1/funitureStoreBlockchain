import React, { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext({});
import ABI from "../../Blockchain/artifacts/contracts/smart-contract.sol/FurnitureStore.json";
const ethers = require("ethers");

export const AuthWrapper = ({ children }) => {
  const provider = new ethers.providers.getDefaultProvider(
    "sepolia",
    process.env.NEXT_PUBLIC_API_KEY
  );
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const abi = ABI.abi;
  const contractAddress = "0xf04f6ee00a4D24952A6be6C023513344892a2536";
  const myNftContract = new ethers.Contract(contractAddress, abi, signer);

  const getAllItem = async () => {
    let res = await myNftContract.getAllItems();
    return res;
  };

  const createItems = async (name, price) => {
    let res = await myNftContract.createItem(name, price);
    return res;
  };

  const modifyItem = async (id) => {
    let res = await myNftContract.modifyItem(id, price);
    return res;
  };

  const buyItem = async (id) => {
    let res = await myNftContract.buyItem(id, price);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        buyItem,
        modifyItem,
        createItems,
        getAllItem,
        buyItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
export function useAuth() {
  return useContext(AuthContext);
}
