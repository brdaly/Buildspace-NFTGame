// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

import "./libraries/Base64.sol";

import "hardhat/console.sol";

contract TestCard is ERC721, ERC721Enumerable, Ownable, ERC721Burnable, ERC721Pausable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    struct CardAttributes {
        string name;
        string imageURI;
    }

    Counters.Counter private _tokenIds;

    uint256 public constant MAX_ELEMENTS = 2500;
    uint256 public constant PRICE = 75 * 10**15;
    uint256 public constant MAX_BY_MINT = 1;
    address public constant creatorAddress = 0x1a80F29E0dEadCAfE8Af963993c070E0B483e69a;
    address public constant devAddress = 0x90378bA937f7cDf977Fe7F489045cf67831B4Da2;
    string public baseTokenURI;

    CardAttributes[] defaultCard;

    mapping(uint256 => CardAttributes) public nftHolderAttributes;
    mapping(address => uint256) public cardHolders;

    event CardCreated(uint256 newItemId);

    constructor(
        string[] memory cardName
    )
        ERC721("Test Card", "TEST")
    {
        // Loop through all characters, and save their values in the contract
        // We can use them later when we mint our NFTs
        for (uint i = 0; i < cardName.length; i += 1) {
            defaultCard.push(CardAttributes({
                name: "Test Card",
                imageURI: "https://gateway.ipfs.io/ipfs/PRIVATE_HASH"
            }));

            CardAttributes memory c = defaultCard[i];
            console.log("Done initializing %s", c.name, c.imageURI);
        }
        // Increase tokenIds here so that first NFT has an ID of 1
        _tokenIds.increment();
        pause(true);
    }

    modifier saleIsOpen {
        require(_totalSupply() <= MAX_ELEMENTS, "Sale over");
        if (_msgSender() != owner()) {
            require(!paused(), "Pausable: paused");
        }
        _;
    }

    function _totalSupply() internal view returns (uint) {
        return _tokenIds.current();
    }

    function totalMint() public view returns (uint256) {
        return _totalSupply();
    }

    function mint(uint256 _count) public payable saleIsOpen {
        uint256 total = _totalSupply();
        require(total + _count <= MAX_ELEMENTS, "Max limit");
        require(total <= MAX_ELEMENTS, "Sale over");
        require(_count <= MAX_BY_MINT, "Exceeds alotted amount");
        require(msg.value >= price(_count), "Value below price");
        require(cardHolders[msg.sender] < 2,"Allocation limit reached");
        // Get current tokenId
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        // Map tokenId => thier character attriburtes
        nftHolderAttributes[newItemId] = CardAttributes({
            name: "Test Card",
            imageURI: "https://gateway.ipfs.io/ipfs/PRIVATE_HASH"
        });

        console.log("Minted Card w/ Id %s", newItemId);

        cardHolders[msg.sender] = newItemId;

        emit CardCreated(newItemId);

        _tokenIds.increment();
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        CardAttributes memory testCardAttributes = nftHolderAttributes[_tokenId];

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        testCardAttributes.name,
                        ' -- NFT #:  ',
                        Strings.toString(_tokenId),
                        '", "description": "This is the Test Card.", "image": "',
                        testCardAttributes.imageURI,
                        '", "attributes": [ { "trait_type": "Card", "value": "Test"} ]}'
                    )
                )
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function price(uint256 _count) public pure returns (uint256) {
        return PRICE.mul(_count);
    }

    function pause(bool val) public onlyOwner {
        if (val == true) {
            _pause();
            return;
        }
        _unpause();
    }

    function withdrawAll() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);
        _withdraw(devAddress, balance.mul(35).div(100));
        _withdraw(creatorAddress, address(this).balance);
    }

    function _withdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
