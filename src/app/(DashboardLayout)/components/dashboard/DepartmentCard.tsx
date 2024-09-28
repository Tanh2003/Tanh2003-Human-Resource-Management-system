// components/StatsCard.js
import { Grid, Card, CardContent, Typography, Link } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import React from "react";
import { handleListAccount, handleListDepartment, handleListEmployees, handleListLeaveRequest, handleListPosition } from "@/ServicesAdmin";


// Các màu sắc khác nhau cho các thẻ
const cardStyles = [
  { backgroundColor: "#4CAF50", color: "#FFFFFF" }, // Xanh lá
  { backgroundColor: "#2196F3", color: "#FFFFFF" }, // Xanh dương
  { backgroundColor: "#FF9800", color: "#FFFFFF" }, // Cam
  { backgroundColor: "#F44336", color: "#FFFFFF" }, // Đỏ
  { backgroundColor: "#9C27B0", color: "#FFFFFF" }, // Tím
  { backgroundColor: "#FFC107", color: "#000000" }, // Vàng
  { backgroundColor: "#3F51B5", color: "#FFFFFF" }, // Xanh dương đậm
  { backgroundColor: "#009688", color: "#FFFFFF" }, // Xanh nước biển
];

const StatsCard = () => {
    const [employeeOptions, setEmployeeOptions] = React.useState([]);
    const [accountOptions, setAccountOptions] = React.useState([]);
    const [positionOptions, setPositionOptions] = React.useState([]);
    const [DepartmentOptions, setDepartmentOptions] = React.useState([]);
    const [LeavesRequestOptions, setLeavesRequestOptions] = React.useState([]);
    const [LeavesRequestCountOptions, setLeavesRequestCountOptions] =React.useState([]);
      React.useEffect(() => {
        getAccountData();
        getEmployeeData();
        getPositionData();
        getDepartmentData();
        getLeavesRequestData();
        getLeavesRequestCountData();
        

      }, []);

       const getAccountData = async () => {
         try {
           const response = await handleListAccount("ALL");
           if (response.errCode === 0) {
             const account = response.allUsers.map((account: any) => ({
               _id: account._id,
               employeesId: account.employeesId,
               fullName: account.fullName,
             }));
             setAccountOptions(account);
           }
         } catch (error) {
           console.error("Error fetching data", error);
         }
       };
      const getEmployeeData = async () => {
        try {
          const response = await handleListEmployees("ALL");
          if (response.errCode === 0) {
            const employees = response.allEmployees.map((employees: any) => ({
              _id: employees._id,
              employeesId: employees.employeesId,
              fullName: employees.fullName,
            }));
            setEmployeeOptions(employees);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      const getPositionData = async () => {
        try {
          const response = await handleListPosition("ALL");
          if (response.errCode === 0) {
            const Position = response.allPosition.map((Position: any) => ({
              _id: Position._id,
              employeesId: Position.employeesId,
              fullName: Position.fullName,
            }));
            setPositionOptions(Position);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      
const getDepartmentData = async () => {
  try {
    const response = await handleListDepartment("ALL");
    if (response.errCode === 0) {
      const Department = response.allDepartment.map((Department: any) => ({
        _id: Department._id,
        employeesId: Department.employeesId,
        fullName: Department.fullName,
      }));
      setDepartmentOptions(Department);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

const getLeavesRequestData = async () => {
  try {
    const response = await handleListLeaveRequest("ALL");
    if (response.errCode === 0) {
      const LeavesRequest = response.allLeaveRequest.map(
        (LeavesRequest: any) => ({
          _id: LeavesRequest._id,
          employeesId: LeavesRequest.employeesId,
          fullName: LeavesRequest.fullName,
        })
      );
      setLeavesRequestOptions(LeavesRequest);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};
const getLeavesRequestCountData = async () => {
  try {
    const response = await handleListLeaveRequest("COUNT");
    if (response.errCode === 0) {
      const LeavesRequest = response.allLeaveRequest;
      setLeavesRequestCountOptions(LeavesRequest);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {/* Cột cho số lượng nhân viên */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyles[6]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon
              sx={{ fontSize: 40, marginRight: 2, color: "#FFFFFF" }}
            />
            <div>
              <Typography variant="h5">
                {accountOptions.length} Account
              </Typography>
              <Typography variant="body2">
                <Link
                  href="/account"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* Cột cho số lượng nhân viên */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyles[0]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <PeopleIcon
              sx={{ fontSize: 40, marginRight: 2, color: "#FFFFFF" }}
            />
            <div>
              <Typography variant="h5">
                {employeeOptions.length} Employees
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link
                  href="/employees"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Cột cho số lượng đơn xin nghỉ */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyles[1]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentIcon
              sx={{ fontSize: 40, marginRight: 2, color: "#FFFFFF" }}
            />
            <div>
              <Typography variant="h5">
                {LeavesRequestOptions.length} Leave Request
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link
                  href="/leave-request"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      {/* Cột cho vị trí */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyles[3]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <WorkIcon sx={{ fontSize: 40, marginRight: 2, color: "#FFFFFF" }} />
            <div>
              <Typography variant="h5">
                {positionOptions.length} Position Number
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link
                  href="/position"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Cột cho số lượng dự án */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={cardStyles[2]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <ApartmentIcon
              sx={{ fontSize: 35, marginRight: 2, color: "#FFFFFF" }}
            />
            <div>
              <Typography variant="h5">
                {DepartmentOptions.length} Department Number
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link
                  href="/department"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Cột cho đơn xin nghỉ đang chờ */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={cardStyles[4]}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <PendingActionsIcon
              sx={{ fontSize: 40, marginRight: 2, color: "#FFFFFF" }}
            />
            <div>
              <Typography variant="h5">
                {LeavesRequestCountOptions} Pending Leave Application
              </Typography>
              <Typography variant="body2">
                {" "}
                <Link
                  href="/leave-request"
                  underline="none"
                  sx={{ color: "#FFFFFF" }}
                >
                  View Details
                </Link>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsCard;
