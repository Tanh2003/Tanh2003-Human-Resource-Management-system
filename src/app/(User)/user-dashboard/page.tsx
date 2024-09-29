"use client"; // Ensure client-side rendering

import { Grid, Box, Container, Typography } from "@mui/material";
import PageContainer from "@/app/(User)/components/container/PageContainer";
import EmployeeDetails from "../components/EmployeeDetails";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Container maxWidth="lg">
              <Box>
                <EmployeeDetails /> {/* Use Box instead of Typography */}
              </Box>
            </Container>
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          {/* <Grid item xs={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography>Hello đây là trang user</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Hello đây là trang user</Typography>
              </Grid>
            </Grid>
          </Grid> */}
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
