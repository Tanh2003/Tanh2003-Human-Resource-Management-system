interface IUser {

  email: string;
  password: string;
  repassword?: string;
  role: string;
}

interface IEmployee {
  employeesId:string;
  userId:string;
  fullName: string;
  age: string;
  gender: string;
  birthday: string;
  phonenumber: string;
  department: string;
  position: string;
  salary: string;
  hireDate: string;
  leaveBalance: string;
}


interface IPosition {
  name: string;

}

interface IDepartment {
  name: string;
}

interface IPayroll {
  salary: string;
  bonus: string;
  deductions: string;
  pay_date: string;
}

interface ILeaveRequest {
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
}


interface IAttendance {
  date: string;
  check_in: string;
  check_out: string;
}
