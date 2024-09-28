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



//api Attendance
    handleListAttendance,
    handleAddAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,

interface IAttendance {
  name: string;

}

