import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Container, Paper, Typography, Box } from "@mui/material";

interface Employee {
  employee_id: string;
  salary: number;
}

const employees: Employee[] = [
  { employee_id: "66f8140f13df5cf7b34bf558", salary: 1000000 },
  { employee_id: "66f8140f13df5cf7b34bf559", salary: 4000000 },
  { employee_id: "66f8140f13df5cf7b34bf560", salary: 6000000 },
  { employee_id: "66f8140f13df5cf7b34bf561", salary: 15000000 },
  { employee_id: "66f8140f13df5cf7b34bf562", salary: 25000000 },
];

const BasicPie: React.FC = () => {
  // Đếm số lượng nhân viên theo các mức lương
  const salaryCounts = {
    "3tr": 0,
    "5tr": 0,
    "10tr": 0,
    "20tr": 0,
  };

  employees.forEach((employee) => {
    if (employee.salary > 10000000) {
      salaryCounts["10tr"] += 1;
    }
    if (employee.salary > 5000000) {
      salaryCounts["5tr"] += 1;
    }
    if (employee.salary > 3000000) {
      salaryCounts["3tr"] += 1;
    }
  });

  const pieData = [
    { id: " > 3tr", value: salaryCounts["3tr"], color: "#ff6384" },
    { id: "> 5tr", value: salaryCounts["5tr"], color: "#36a2eb" },
    { id: "> 10tr", value: salaryCounts["10tr"], color: "#ffce56" },
  
  ];

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "16px", margin: "20px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Employees Salary Chart (Currency unit VND)
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <PieChart series={[{ data: pieData }]} width={400} height={200} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="left">
          <Box mt={2} display="flex" justifyContent="left">
            <Typography variant="h6" component="h2" gutterBottom>
              Color annotation
            </Typography>
            <Box display="flex" flexDirection="row" ml={1}>
              {pieData.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  alignItems="center"
                  mb={1}
                  mr={3}
                  mx={1}
                >
                  <Box
                    bgcolor={item.color}
                    width={20}
                    height={20}
                    borderRadius="50%"
                    mr={1}
                  />
                  <Typography variant="body1">{item.id}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BasicPie;
