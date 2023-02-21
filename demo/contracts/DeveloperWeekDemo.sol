// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract DeveloperWeekDemo {
    address payable public owner;
    uint256 public unlockTime;

    event Withdrawal(uint256 amount, uint256 timestamp);
    event Registration(string name, uint256 numberOfPets, uint256 timestamp);

    struct WorkshopAttendee {
        string name;
        uint256 numberOfPets;
        bool attended;
    }

    mapping(address => WorkshopAttendee) public workshopAttendees;

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        owner = payable(msg.sender);
        unlockTime = _unlockTime;
    }

    function withdrawHalf() public {
        require(
            block.timestamp >= unlockTime,
            "Unlock time is still in the future, cannot withdraw just yet"
        );
        require(msg.sender == owner, "You are not the owner of this contract");

        emit Withdrawal(address(this).balance / 2, block.timestamp);
        owner.transfer(address(this).balance / 2);
    }

    function markAttendance(string memory name, uint256 numberOfPets) public {
        workshopAttendees[msg.sender] = WorkshopAttendee(
            name,
            numberOfPets,
            true
        );
        emit Registration(name, numberOfPets, block.timestamp);
    }
}
