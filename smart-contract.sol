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
    
    
    constructor(uint256 _id, string memory _name, uint256 _price, address payable _seller) {
        itemCount++;
        items[itemCount] = Item({
            id: _id,
            name: _name,
            price: _price,
            seller: _seller,
            buyer: payable(address(0))
        });
        emit ItemCreated(itemCount, _name, _price, _seller);
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
        require(items[_id].id != 0, "Item does not exist");
        require(items[_id].buyer == address(0), "Item has already been sold");
        require(msg.value == items[_id].price, "Incorrect price");

        items[_id].buyer = payable(msg.sender);
        items[_id].seller.transfer(msg.value);

        emit ItemSold(_id, items[_id].name, items[_id].price, items[_id].seller, msg.sender);

        delete items[_id];
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
