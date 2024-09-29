"use client";
import { Grid, Box, Container } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import StatsCard from "./components/dashboard/DepartmentCard";
import EmployeeSalaryChart from "./components/dashboard/EmployeeSalaryChart";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import Bonus from "./components/dashboard/EmployeeBonusChart";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Container maxWidth="lg">
              <StatsCard />
            </Container>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <EmployeeSalaryChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <Bonus/>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={12}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
