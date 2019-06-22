pragma solidity 0.5.4;

contract Coursetro {
    string fName;
    uint age;
    function setInstructor (string memory _fname, uint _age) public {
        fName = _fname;
        age = _age;
    }
    
    function getInstructor() public returns (string memory, uint) {
        return (fName, age);
    }
    
}