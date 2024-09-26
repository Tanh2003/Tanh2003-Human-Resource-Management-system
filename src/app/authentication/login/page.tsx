"use client";
import { Grid, Box, Card, Stack, Typography, Alert } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { handleSignIn } from "@/ServicesAdmin";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login2 = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null); // State quản lý thông báo
  const [error, setError] = useState<boolean>(false); // State quản lý thông báo lỗi hay thành công
  
  const postUserData = async (email: string, password: string) => {
    try {
      const response = await handleSignIn(email, password);

      if (response.errCode === 0) {
        setMessage("Sign In successfully!"); // Thông báo thành công
        toast.success(response.errMessage);
        router.push("/");

        setError(false); // Không phải là lỗi
        // Xử lý điều hướng hoặc các bước tiếp theo nếu cần
      } else {
        toast.error(response.errMessage);
        console.log();
        setMessage(response.errMessage); // Hiển thị thông báo lỗi từ server
        setError(true); // Đây là thông báo lỗi
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại."); // Thông báo lỗi nếu có ngoại lệ
      setError(true);
      console.error("Error fetching data", error);
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {/* Hiển thị thông báo lỗi hoặc thành công */}
              {message && (
                <Alert
                  severity={error ? "error" : "success"}
                  sx={{ mb: 2, fontStyle: 20 }}
                >
                  {message}
                </Alert>
              )}

              <AuthLogin
                onSubmit={postUserData} // Truyền hàm postUserData vào AuthLogin
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Chào mừng bạn đến với manager HR
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      Desgin by Nguyễn Tuấn Anh
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
