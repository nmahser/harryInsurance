pragma solidity 0.5.1;

contract autoCar{

    struct Car {
        string name;
        uint speed;
        uint right;
        uint left;
        uint front;
        uint back;
        string crashed;

    }

    Car[] cars;


    function addCar(string memory _name, uint _speed, uint _right, uint _left, uint _front, uint _back,string memory _crashed) public returns (uint) {
        return cars.push(Car(_name,_speed, _right,_left,_front,_back,_crashed)) -1;
    }

    function getCarName(uint _id) public view returns (string memory) {
        return cars[_id].name;
    }

    function getCarSpeed(uint _id) public view returns (uint) {
        return cars[_id].speed;
    }

    function getCarCrashed(uint _id) public view returns (string memory) {
        return cars[_id].crashed;
    }

    function getCarRight(uint _id) public view returns (uint) {
        return cars[_id].right;
    }

    function getCarLeft(uint _id) public view returns (uint) {
        return cars[_id].left;
    }

    function getCarFront(uint _id) public view returns (uint) {
        return cars[_id].front;
    }

    function getCarBack(uint _id) public view returns (uint) {
        return cars[_id].back;
    }

}
    
