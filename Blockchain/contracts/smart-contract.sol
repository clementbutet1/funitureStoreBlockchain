// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FurnitureStore {
    struct Item {
        uint256 id;
        string name;
        uint256 price;
        address payable seller;
        address payable buyer;
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
        items[itemCount] = Item(itemCount, _name, _price, payable(msg.sender), payable(address(0)));
        emit ItemCreated(itemCount, _name, _price, msg.sender);
    }

    function getAllItems() public view returns (Item[] memory) {
        Item[] memory allItems = new Item[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            allItems[i-1] = items[i];
        }
        return allItems;
    }

    function buyItem(uint256 _id) public payable {
        Item storage item = items[_id];

        require(item.id != 0, "Item does not exist");
        require(item.buyer == address(0), "Item already sold");
        require(msg.value >= item.price, "Insufficient funds");

        // Transfer the price of the item from the buyer to the seller
        item.seller.transfer(item.price);

        // Transfer any excess funds back to the buyer
        if (msg.value > item.price) {
            payable(msg.sender).transfer(msg.value - item.price);
        }

        // Update the item with the buyer's address
        item.buyer = payable(msg.sender);

        // Emit an event to notify the parties of the transaction
        emit ItemSold(_id, item.name, item.price, item.seller, msg.sender);
    }


    modifier onlySeller(uint256 _id) {
        require(items[_id].seller == msg.sender, "Only the seller can modify this item");
        _;
    }

    function modifyItem(uint256 _id, uint256 price) public onlySeller(_id) {
        require(items[_id].id != 0, "Item does not exist");        
        items[_id].price = price;

        emit ItemModified(_id, items[_id].name, price, items[_id].seller);
    }
}
