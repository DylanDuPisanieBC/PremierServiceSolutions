import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

class EmployeeService {
    getEmployees(){
        return axios.get(API_BASE_URL + "/employees");
    }
}

export default new EmployeeService();