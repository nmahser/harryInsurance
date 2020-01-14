pragma solidity 0.5.12;

contract autoCar{

    struct Car {
        string name;
        uint speed;
        uint accelerometer;
        uint gyroscope;
        uint brakePressure;
        uint distanceFromVehicle;
        string streetName;
        uint areaCode;
        string timeOfDay;
        string weather;
        uint crashed;
    }

    Car[] cars;


    function addCar(string memory _name, uint _speed, uint _accelerometer, uint _gyroscope, uint _brakePressure, uint _distanceFromVehicle, string memory _streetName,uint _areaCode,string memory _timeOfDay,string memory _weather, uint _crashed) public returns (uint) {
        return cars.push(Car(_name,_speed, _accelerometer,_gyroscope,_brakePressure,_distanceFromVehicle,_streetName,_areaCode,_timeOfDay,_weather,_crashed)) -1;
    }

    function getCarName(uint _id) public view returns (string memory) {
        return cars[_id].name;
    }

    function getCarSpeed(uint _id) public view returns (uint) {
        return cars[_id].speed;
    }

    function getCarAccelerometer(uint _id) public view returns (uint) {
        return cars[_id].accelerometer;
    }

    function getCarGyroscope(uint _id) public view returns (uint) {
        return cars[_id].gyroscope;
    }

    function getCarBrakePressure(uint _id) public view returns (uint) {
        return cars[_id].brakePressure;
    }

    function getCarDistanceFromVehicle(uint _id) public view returns (uint) {
        return cars[_id].distanceFromVehicle;
    }

   
    
    function getCarStreetName(uint _id) public view returns (string memory) {
        return cars[_id].streetName;
    }
    
     function getCarAreaCode(uint _id) public view returns (uint) {
        return cars[_id].areaCode;
    }
    
    function getCarTimeOfDay(uint _id) public view returns (string memory) {
        return cars[_id].timeOfDay;
    }
    
    function getCarWeather(uint _id) public view returns (string memory) {
        return cars[_id].weather;
        
    }
    
    
     function getCarCrashed(uint _id) public view returns (uint) {
        return cars[_id].crashed;
        
    }
    
    

}
    
