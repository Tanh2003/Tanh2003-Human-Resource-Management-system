import axios from "./axios";






const handleSignIn = (email: string, password: string): Promise<any> => {
    return axios.post('/api/login-user', {
        email: email,
        password: password
    });
};

// api users
const handleListAccount = (inputId: string | number): Promise<any> => {
   
    return axios.get(`/api/get-all-user?id=${inputId}`);
};

const handleAddAccount = (data: IUser): Promise<any> => {
  return axios.post('/api/create-user', data);
};
const handleUpdateAccount = (data: any): Promise<any> => {
  return axios.put('/api/update-user', data);
};

const handleDeleteAccount = (userId: any): Promise<any> => {
    //return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

//api employees

const handleListEmployees = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-employee?id=${inputId}`);
};

const handleAddEmployees = (data: any): Promise<any> => {
  return axios.post("/api/create-employee", data);
};
const handleUpdateEmployees = (data: any): Promise<any> => {
  return axios.put("/api/update-employee", data);
};

const handleDeleteEmployees = (employeeId: any): Promise<any> => {
  //return axios.delete('/api/delete-employee',{id:employeeId})
  return axios.delete("/api/delete-employee", {
    data: {
      id: employeeId,
    },
  });
};



export {
    //api account
    handleListAccount,
    handleAddAccount,
    handleUpdateAccount,
    handleDeleteAccount,
    // api employees
    handleListEmployees,
    handleAddEmployees,
    handleUpdateEmployees,
    handleDeleteEmployees,

    handleSignIn
};
