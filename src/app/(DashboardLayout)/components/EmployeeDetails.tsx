// components/EmployeeDetails.tsx
import React from "react";
import {
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Divider,
  Paper,
  Icon,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaidIcon from "@mui/icons-material/Paid";


interface Employee {
  fullName: string;
  age: number;
  gender: string;
  birthday: string;
  phonenumber: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  leaveBalance: number;
  userId: number;
}

type EmployeeDetailsProps = {
  employee: Employee;
};

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "2500px", // Tăng chiều rộng tối đa
        margin: "auto",
        mt: 4,
        p: 4, // Tăng padding
        boxSizing: "border-box",
      }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar sx={{ bgcolor: blue[500], width: 80, height: 80 }}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
        <Box ml={3}>
          <Typography variant="h3" color="primary">
            {" "}
            {/* Tăng kích thước */}
            {employee.fullName}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {" "}
            {/* Tăng kích thước */}
            {employee.position} - {employee.department}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <CardContent>
        <Grid container spacing={3}>
          {" "}
          {/* Tăng khoảng cách giữa các item */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <CalendarTodayIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Birthday:</strong> {employee.birthday}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <PhoneIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Phone:</strong> {employee.phonenumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <WorkIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Department:</strong> {employee.department}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <PaidIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Salary:</strong> ${employee.salary}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <CalendarTodayIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Hire Date:</strong> {employee.hireDate}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Icon color="primary" sx={{ mr: 1 }}>
                <WorkIcon />
              </Icon>
              <Typography variant="h6">
                {" "}
                {/* Tăng kích thước */}
                <strong>Leave Balance:</strong> {employee.leaveBalance} days
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Box mt={4} textAlign="right">
        {" "}
        {/* Tăng khoảng cách phía trên */}
        <Typography variant="h6" color="textSecondary">
          {" "}
          {/* Tăng kích thước */}
          <strong>ID:</strong> {employee.userId}
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmployeeDetails;
