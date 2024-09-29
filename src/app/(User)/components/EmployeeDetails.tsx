"use client"; // Add this to ensure client-side rendering

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { useEffect, useState } from "react";
import { handleUserEmployees } from "@/ServicesAdmin"; // Ensure this is client-safe
import { useUser } from "@/app/context/UserContext";

import Barcode from "./Barcode";


const EmployeeDetails: React.FC = () => {
  const { user } = useUser(); // Fetch user info from context
  const [employee, setEmployee] = useState<any>(null); // Set initial state to null
  

  useEffect(() => {
    if (user) {
      getEmployeesIdData(user._id); // Fetch employee data based on user ID
    }
  }, [user]);

  const getEmployeesIdData = async (userId: string) => {
    try {
      const response = await handleUserEmployees(userId);
      if (response.errCode === 0) {
        console.log("Successfully fetched employee data");
        setEmployee(response.allEmployees);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: { xs: "15px", sm: "30px" },
          borderRadius: "16px",
          backgroundColor: "#ffffff",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Avatar and Name Section */}
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: "40px",
                margin: "0 auto",
                backgroundColor: "#3f51b5",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {employee.fullName?.charAt(0)}
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "#2c3e50",
                textTransform: "capitalize",
              }}
            >
              {employee.fullName}
            </Typography>
            <Typography variant="body1" sx={{ color: "#7f8c8d" }}>
              {employee.position}
            </Typography>
          </Grid>

          {/* Employee Details Section */}
          <Grid item xs={12} sm={8}>
            <Card
              sx={{
                borderRadius: "16px",
                marginBottom: "20px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f7f9fc",
              }}
            >
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <WorkIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Age: {employee.age || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <WorkIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Gender: {employee.gender || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <EventIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Birthday:{" "}
                      {employee.birthday
                        ? new Date(employee.birthday).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <PhoneIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Phone: {employee.phonenumber || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <WorkIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Department: {employee.department || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <MonetizationOnIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Salary:
                      {employee.salary
                        ? employee.salary.toLocaleString()
                        : "N/A"} 
                      VNĐ
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <EventIcon
                        sx={{ verticalAlign: "middle", color: "#3498db" }}
                      />{" "}
                      Hire Date:{" "}
                      {employee.hireDate
                        ? new Date(employee.hireDate).toLocaleDateString()
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      Leave Balance: {employee.leaveBalance || 0} days
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography>
                    <strong>Employee ID:</strong> {employee.employeesId || 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Barcode value={employee.employeesId || "0"} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmployeeDetails;
