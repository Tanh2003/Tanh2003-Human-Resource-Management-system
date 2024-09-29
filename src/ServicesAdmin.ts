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

const handleUserEmployees = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-user-employee?id=${inputId}`);
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






// api Position
const handleListPosition = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-Position?id=${inputId}`);
};



const handleListDepartmentOfPosition = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-Department-Of-Position?id=${inputId}`);
};

const handleAddPosition = (data: IPosition): Promise<any> => {
  return axios.post("/api/create-Position", data);
};
const handleUpdatePosition = (data: any): Promise<any> => {
  return axios.put("/api/update-Position", data);
};

const handleDeletePosition = (PositionId: any): Promise<any> => {
  return axios.delete("/api/delete-Position", {
    data: {
      id: PositionId,
    },
  });
};

// api Department
const handleListDepartment = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-Department?id=${inputId}`);
};

const handleAddDepartment = (data: IDepartment): Promise<any> => {
  return axios.post("/api/create-Department", data);
};
const handleUpdateDepartment = (data: any): Promise<any> => {
  return axios.put("/api/update-Department", data);
};

const handleDeleteDepartment = (DepartmentId: any): Promise<any> => {
  return axios.delete("/api/delete-Department", {
    data: {
      id: DepartmentId,
    },
  });
};


// api Payroll
const handleListPayroll = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-Payroll?id=${inputId}`);
};

const handleAddPayroll = (data: IPayroll): Promise<any> => {
  return axios.post("/api/create-Payroll", data);
};
const handleUpdatePayroll = (data: any): Promise<any> => {
  return axios.put("/api/update-Payroll", data);
};

const handleDeletePayroll = (PayrollId: any): Promise<any> => {
  return axios.delete("/api/delete-Payroll", {
    data: {
      id: PayrollId,
    },
  });
};

// api LeaveRequest
const handleListLeaveRequest = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-LeaveRequest?id=${inputId}`);
};

const handleListIDLeaveRequest = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-id-LeaveRequest?id=${inputId}`);
};

const handleAddLeaveRequest = (data: ILeaveRequest): Promise<any> => {
  return axios.post("/api/create-LeaveRequest", data);
};
const handleUpdateLeaveRequest = (data: any): Promise<any> => {
  return axios.put("/api/update-LeaveRequest", data);
};

const handleDeleteLeaveRequest = (LeaveRequestId: any): Promise<any> => {
  return axios.delete("/api/delete-LeaveRequest", {
    data: {
      id: LeaveRequestId,
    },
  });
};


// api Attendance
const handleListAttendance = (inputId: string | number): Promise<any> => {
  return axios.get(`/api/get-all-Attendance?id=${inputId}`);
};

const handleAddAttendance = (data: IAttendance): Promise<any> => {
  return axios.post("/api/create-Attendance", data);
};
const handleUpdateAttendance = (data: any): Promise<any> => {
  return axios.put("/api/update-Attendance", data);
};

const handleDeleteAttendance = (AttendanceId: any): Promise<any> => {
  return axios.delete("/api/delete-Attendance", {
    data: {
      id: AttendanceId,
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
    handleUserEmployees,
    handleAddEmployees,
    handleUpdateEmployees,
    handleDeleteEmployees,
   //api Position
    handleListPosition,
    handleListDepartmentOfPosition,
    handleAddPosition,
    handleUpdatePosition,
    handleDeletePosition,
    //api Department
    handleListDepartment,
    handleAddDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
    //api Payroll
    handleListPayroll,
    handleAddPayroll,
    handleUpdatePayroll,
    handleDeletePayroll,
    //api LeaveRequest
    handleListLeaveRequest,
    handleListIDLeaveRequest,
    handleAddLeaveRequest,
    handleUpdateLeaveRequest,
    handleDeleteLeaveRequest,
    //api Attendance
    handleListAttendance,
    handleAddAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,

    handleSignIn
};
