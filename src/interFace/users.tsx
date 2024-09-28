interface IUser {

  email: string;
  password: string;
  repassword?: string;
  role: string;
}

interface IEmployee {
  employeesId: string;
  userId: string;
  fullName: string;
  age: string;
  gender: string;
  birthday: string;
  phonenumber: string;
  department: string;
  departmentvip:string
  position: string;
  salary: string;
  hireDate: string;
  leaveBalance: string;
}


interface IPosition {
  name: string;
  department_id:string;
}

interface IDepartment {
  name: string;
}

interface IPayroll {
  employee_id: string;
  salary: string;
  bonus: string;
  deductions: string;
  pay_date: string;
}

interface ILeaveRequest {
  employee_id: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
}


interface IAttendance {
  employee_id:string;
  date: string;
  check_in: string;
  check_out: string;
}
