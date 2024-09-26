import axios from "./axios";
import  "./interFace/users"



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


export {
    handleListAccount,
    handleAddAccount,
    handleUpdateAccount,
    handleDeleteAccount
};
