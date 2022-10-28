// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
pragma abicoder v2;

import "./interface/NFTinterface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./ERC721.sol";
import "./Utils.sol";

contract FanNFT is ERC721, NFTinterface {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.UintSet;

    event PlaceOrder(uint256 indexed tokenId, address seller, uint256 price);
    event CancelOrder(uint256 indexed tokenId, address seller);

    event UpdatePrice(
        uint256 indexed tokenId,
        address seller,
        uint256 newPrice
    );

    event Gift(address _address, uint256 idNinja);
    event FillOrder(uint256 indexed tokenId, address seller);
    event CreatePlayer(uint256 indexed tokenId, address buyer);

    uint256 public latestTokenId;
    mapping(uint256 => bool) public isEvolved;

    mapping(uint256 => Player) internal players;
    mapping(uint256 => ItemSale) internal markets;

    IERC20 public tokenERC20;


    constructor(
        string memory _name,
        string memory _symbol,
        address _manager,
        address _tokenErc20
    ) ERC721(_name, _symbol, _manager) {
        tokenERC20 = IERC20(_tokenErc20);
    }

    modifier onlyPromise() {
        require(
            ownerContract == _msgSender() ||
                manager.checkManager(msg.sender)
        );
        _;
    }

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        _incrementTokenId();
    }

    function _createPlayer(address receiver, Player memory player) internal {
        uint256 nextTokenId = _getNextTokenId();
        _mint(receiver, nextTokenId);
        players[nextTokenId] = player;
        player.id=nextTokenId;
        emit CreatePlayer (nextTokenId, receiver);
    }

    function getPlayersOf(address _addrees)
        public
        view
        returns (Player[] memory)
    {
        uint256[] memory ids = getTokensOf(_addrees);
        Player[] memory arr = new Player[](ids.length);
        for (uint256 index = 0; index < ids.length; index++) {
            arr[index] = players[ids[index]];
        }
        return arr;
    }

    function getPlayer(uint256 id) public view returns (Player memory) {
        Player memory pl = players[id];
        return pl;
    }
    
    /**
     * @dev calculates the next token ID based on value of latestTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return latestTokenId.add(1);
    }

    /**
     * @dev increments the value of latestTokenId
     */
    function _incrementTokenId() private {
        latestTokenId++;
    }

    function createPlayer(address _address, Player memory pl)
        external
        override
        onlyPromise
    {
        _createPlayer(_address, pl);
    }

    function mintNFTrandom() public {
        Player[] memory data= manager.getDataMintPlayer();
        require(data.length>0);
        uint256 ran = random(0, data.length);
        _createPlayer(msg.sender, data[ran]);
    }

    function burnChar(uint256 id) external override onlyPromise {
        _burn(id);
    }

    function getPlayerByID(uint256 id)
        external
        view
        override
        returns (Player memory)
    {
        Player memory obj = getPlayer(id);
        return obj;
    }

    function checkOwnerOf(address _address, uint256 _id)
        external
        view
        override
        returns (bool)
    {
        return ownerOf(_id) == _address;
    }

    function gift(address _address, uint256 _id) public {
        require(ownerOf(_id) == msg.sender);
        transferFrom(msg.sender, _address, _id);
    }

    function random(uint256 from, uint256 to) private view returns (uint256) {
        uint256 nonce = 0;
        uint256 randomnumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))
        ) % to;
        randomnumber = randomnumber + from;
        nonce++;
        return randomnumber;
    }
}
