"use client";
import { Grid, Box, Card, Stack, Typography, Alert } from "@mui/material";
import PageContainer from "@/app/(Admin)/components/container/PageContainer";
import Logo from "@/app/(Admin)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { handleSignIn } from "@/ServicesAdmin";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const Login2 = () => {
  const { user } = useUser(); 
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const { setUser } = useUser();

  const postUserData = async (email: string, password: string) => {
    try {
      const response = await handleSignIn(email, password);

      if (response.errCode === 0) {
        setMessage("Sign In successfully!");
        toast.success(response.errMessage);

        // Lưu thông tin người dùng vào context (chỉ lưu các trường cần thiết)
        const userData = {
          _id: response.user._id,
          email: response.user.email,
          role: response.user.role,
          isActive: response.user.isActive,
        };

        setUser(userData); // Lưu thông tin người dùng vào context
         if (userData.role === "admin") {
           router.push("/dashboard");
         } else if (userData.role === "user") {
           router.push("/user-dashboard");
         }
        

        setError(false);
      } else {
        toast.error(response.errMessage);
        setMessage(response.errMessage);
        setError(true);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
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
              {message && (
                <Alert
                  severity={error ? "error" : "success"}
                  sx={{ mb: 2, fontStyle: 20 }}
                >
                  {message}
                </Alert>
              )}

              <AuthLogin
                onSubmit={postUserData}
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
                      Design by Nguyễn Tuấn Anh
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
