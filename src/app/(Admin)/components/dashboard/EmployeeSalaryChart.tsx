import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Container, Paper, Typography, Box } from "@mui/material";
import { handleListPayroll } from "@/ServicesAdmin";




interface Payroll {
  employee_id: string;
  salary: number;
  bonus: number;
}

const BasicPie: React.FC = () => {
  const [payrollOptions, setPayrollOptions] = React.useState<Payroll[]>([]);

  React.useEffect(() => {
    PayrollData();
  }, []);

  const PayrollData = async () => {
    try {
      const response = await handleListPayroll("ALL");
      if (response.errCode === 0) {
        const payroll = response.allPayroll.map((payroll: any) => ({
          employee_id: payroll.employee_id._id,
          salary: payroll.salary,
          bonus: payroll.bonus,
        }));
        setPayrollOptions(payroll);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Đếm số lượng nhân viên theo các mức lương
  const salaryCounts = {
    "3tr": 0,
    "8tr": 0,
    "10tr": 0,
  };

  payrollOptions.forEach((payrollOption) => {
    if (payrollOption.salary > 10000000) {
      salaryCounts["10tr"] += 1;
    } else if (payrollOption.salary < 8000000) {
      salaryCounts["8tr"] += 1;
    } else if (payrollOption.salary > 3000000) {
      salaryCounts["3tr"] += 1;
    }
  });

  const pieData = [
    { id: "> 3tr", value: salaryCounts["3tr"], color: "#ff6384" },
    { id: "< 8tr", value: salaryCounts["8tr"], color: "#36a2eb" },
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
