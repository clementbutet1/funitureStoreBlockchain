// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FurnitureStore {
    struct Item {
        uint256 id;
        string name;
        uint256 price;
        address payable seller;
        address payable buyer;
        bool exists;
    }

    mapping(uint256 => Item) public items;
    uint256 public itemCount;
    
    
    constructor() {
        itemCount = 0;
    }
    
    event ItemCreated(uint256 id, string name, uint256 price, address seller);
    event ItemSold(uint256 id, string name, uint256 price, address seller, address buyer);
    event ItemModified(uint256 id, string name, uint256 price, address seller);

    function createItem(string memory _name, uint256 _price) public {
        itemCount++;
        items[itemCount] = Item(itemCount, _name, _price, payable(msg.sender), payable(address(0)), true);
        emit ItemCreated(itemCount, _name, _price, msg.sender);
    }

    function getAllItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](itemCount);
        uint256 validItemCount = 0;
        for (uint256 i = 1; i <= itemCount; i++) {
            if (items[i].exists) {
                allItems[validItemCount] = items[i];
                validItemCount++;
            }
        }
        assembly {
            mstore(allItems, validItemCount)
        }
        return allItems;
    }

    function buyItem(uint256 _id) public payable {
        require(items[_id].id != 0, "Item does not exist");
        require(items[_id].buyer == address(0), "Item has already been sold");
        require(msg.sender.balance >= items[_id].price, "Insufficient balance");

        items[_id].buyer = payable(msg.sender);
        items[_id].seller.transfer(items[_id].price);

        emit ItemSold(_id, items[_id].name, items[_id].price, items[_id].seller, msg.sender);

        delete items[_id];
    }


    modifier onlySeller(uint256 _id) {
        Item storage item = items[_id];
        require(item.exists, "Item does not exist");
        require(item.seller == msg.sender, "Only the seller can modify this item");
        _;
    }

    function modifyItem(uint256 _id, uint256 _price) public onlySeller(_id) {
        Item storage item = items[_id];
        require(item.exists, "Item does not exist");        
        item.price = _price;

        emit ItemModified(_id, item.name, _price, item.seller);
    }
}
