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
  const contractAddress = "0x81FE885952fc8e6389Ff982E803e8007F027E080";
  const myNftContract = new ethers.Contract(contractAddress, abi, signer);
  const filterItem = myNftContract.filters[("ItemCreated", "ItemModified")]();
  const filterSold = myNftContract.filters["ItemSold"]();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const eventFunct = () => {
    myNftContract.on(filterItem, (id, name, price, seller, buyer) => {
      console.log(
        `L'objet ${name} avec l'id ${id} a été a creer ou a change de prix pour ${price}`
      );
    });
    setLoading(true);
    getAllItem();
    setLoading(false);
  };

  const eventFunctSell = () => {
    myNftContract.on(filterSold, (id, name, price, seller, buyer) => {
      console.log(
        `L'objet ${name} avec l'id ${id} a été vendu pour ${price} par ${seller} à ${buyer}.`
      );
    });
    setLoading(true);
    getAllItem();
    setLoading(false);
  };

  useEffect(() => {
    eventFunct();
    eventFunctSell();
  }, []);

  const getAllItem = async () => {
    let res = await myNftContract.getAllItems();
    setData(res);
    return res;
  };

  const createItems = async (name, price) => {
    let res = await myNftContract.createItem(name, price);
    return res;
  };

  const modifyItem = async (id, price) => {
    let res = await myNftContract.modifyItem(id, price);
    if (res?.err) console.log(JSON.stringify(res));
    return res;
  };

  const buyItem = async (id) => {
    let res = await myNftContract.buyItem(id);
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
        loading,
        data,
        setLoading,
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
