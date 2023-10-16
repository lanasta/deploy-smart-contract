// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ATODemo {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint timestamp);
    event AttendeePaid(string name, uint amount, uint timestamp);

    struct ATOAttendee {
        string name;
        string hometown;
        bool firstTimeAttendee;
    }

    mapping(address => ATOAttendee) atoAttendees;

    constructor(uint _unlockTime) payable {
        require(block.timestamp < _unlockTime, "Unlock time must be in future");
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdrawHalf() public {
        require(
            block.timestamp >= unlockTime,
            "Unlock time has not been reached"
        );
        require(msg.sender == owner, "You are not the owner");

        emit Withdrawal(address(this).balance / 2, block.timestamp);
        owner.transfer(address(this).balance / 2);
    }

    function markAttendance(
        string memory name,
        string memory hometown,
        bool firstTimeAttendee
    ) public {
        atoAttendees[msg.sender] = ATOAttendee(
            name,
            hometown,
            firstTimeAttendee
        );
        emit AttendeePaid(name, address(this).balance / 5, block.timestamp);
        payable(msg.sender).transfer(address(this).balance / 5);
    }
}
