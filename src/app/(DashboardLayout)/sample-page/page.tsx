"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListAccount,
  handleAddAccount,
  handleDeleteAccount,
  handleUpdateAccount,
} from "../../../ServicesAdmin";
import "../../../interFace/users";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FabProps,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";

// Validation schema sử dụng yup
const validationSchema = yup.object({
  password: yup.string().required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match") // So sánh với trường password
    .required("Please confirm your password"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  role: yup.string().required("Role number is required"),
});

const SamplePage = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [checkedVip, setCheckedVip] = React.useState(true);
  

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await handleListAccount("ALL");
      if (response.errCode === 0) {
        // Xử lý dữ liệu để phù hợp với DataGrid
        const users = response.allUsers.map((user: any, index: number) => ({
          id: index + 1,
          _id: user._id,
          email: user.email,
          role: user.role,
          isActive: user.isActive ? "Active" : "Inactive",
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        }));
        setRows(users);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserIdData = async (userId: any) => {
    try {
      const response = await handleListAccount(userId);
      if (response.errCode === 0) {
        // Xử lý dữ liệu để phù hợp với DataGrid
        console.log("lay du lieu 1 ng dung thanh cong");
        const users = response.allUsers;
        formik.setValues({
          email: users.email,
          password: "", // Nếu bạn không muốn hiển thị mật khẩu, để trống
          role: users.role,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postUserData = async (data: IUser) => {
    try {
      const response = await handleAddAccount(data);

      if (response.errCode === 0) {
        console.log("Add success");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

    const putUserData = async (data: any) => {
      try {
        const response = await handleUpdateAccount(data);

        if (response.errCode === 0) {
          console.log("update success");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  const deleteUserData = async (userId: any) => {
    try {
      const response = await handleDeleteAccount(userId);

      if (response.errCode === 0) {
        console.log(response);
        console.log("Delete success");

        getUserData();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Cột hiển thị, có thể giữ nguyên từ fakeData
  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 150 },
      {
        field: "isActive",
        headerName: "Active Status",
        width: 150,
        renderCell: (params: any) => (
          <FormControlLabel
            control={
              <Switch
                checked={params.row.isActive === "Active"} // Chuyển đổi trạng thái giữa Active và Inactive
                onChange={(event) =>
                  handleSwitchChange(params.row, event.target.checked)
                }
              />
            }
            label={params.row.isActive === "Active" ? "Active" : "Inactive"}
          />
        ),
      },
      { field: "createdAt", headerName: "Created At", width: 200 },
      {
        field: "Action",
        headerName: "Action",
        width: 200,
        renderCell: (params: any) => (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                handleEdit(params.row);
             
              }}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(params.row)}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );
  const handleSwitchChange = async(row: any, checked: boolean) => {
    console.log(`Switch changed for ${row.email}, new status ga: ${checked}`);
    // Gửi yêu cầu API để cập nhật trạng thái isActive nếu cần
     console.log(`Switch changed for ${row.email}, new status: ${checkedVip}`);
  const userId = row._id; // Lấy _id từ row
  console.log("Edit user with _id: ", userId);
  // Thực hiện các thao tác tiếp theo với _id
  setUserId(userId);
    
    setCheckedVip(checked);
          await putUserData({
            UserId: userId,
            isActive: checked,
            // Include repassword here if needed
          });
    await getUserData();
    // Cập nhật lại danh sách người dùng hoặc gửi yêu cầu tới server để cập nhật trạng thái
  };

  const handleClickOpen = () => {
    setUpdate(false);
    setOpen(true);
    console.log("them" + update);
    formik.setValues({
      email: "",
      password: "", // Nếu bạn không muốn hiển thị mật khẩu, để trống
      role: "",
    });
  };

  // Đóng Modal
  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (data: IUser) => {
    // Include repassword in the logged data

    postUserData({
     
      email: data.email,
      password: data.password,
      role: data.role,
      // Include repassword here if needed
    });
  };

  // Hàm xử lý Edit
  const handleEdit = (row: any) => {
    setOpen(true);
    setUpdate(true);

    const userId = row._id; // Lấy _id từ row
    console.log("Edit user with _id: ", userId);
    // Thực hiện các thao tác tiếp theo với _id
    getUserIdData(userId);
    setUserId(userId);
    
  };
  const handleUpdate=(data:IUser)=>{
    putUserData({
      UserId: userId,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive:false,
      // Include repassword here if needed
    });

  }

  // Hàm xử lý Delete
  const handleDelete = (row: any) => {
    const userId = row._id; // Lấy _id từ row
    console.log("delete user with _id: ", userId);
    deleteUserData(userId);
    // Thực hiện xử lý Delete
  };

  const formik: FormikProps<IUser> = useFormik<IUser>(
    update === false
      ? {
          initialValues: {
            email: "",
            password: "",
            repassword: "",
            role: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            alert("Dữ liệu đã được gửi!");
            getUserData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
            email: "",
            password: "",
            repassword: "",
            role: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            alert("Dữ liệu đã được gửi!");
            getUserData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Account List" description="Account List">
      <DashboardCard title="Account List">
        <Box sx={{ height: 500, width: 1 }}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={() => handleClickOpen()}
            style={{ marginBottom: 4 }}
          >
            Create
          </Button>
          {loading ? (
            <CircularProgress /> // Hiển thị vòng xoay trong khi chờ dữ liệu
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterValues: [""],
                  },
                },
              }}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          )}
        </Box>
      </DashboardCard>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {update === true ? "Update Account" : "Add Account"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="repassword"
                  name="repassword"
                  label="Re-enter password"
                  type="password"
                  value={formik.values.repassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.repassword &&
                    Boolean(formik.errors.repassword)
                  }
                  helperText={
                    formik.touched.repassword && formik.errors.repassword
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl
                  fullWidth
                  error={formik.touched.role && Boolean(formik.errors.role)}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    label="Role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Optional: handle onBlur for touched state
                  >
                    {/* Các tùy chọn (menu items) */}
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                    {/* Thêm các tùy chọn khác nếu cần */}
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <div style={{ color: "red" }}>{formik.errors.role}</div>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.isActive}
                      onChange={formik.handleChange}
                      name="isActive"
                      color="primary" // Có thể thay đổi màu sắc nếu cần
                    />
                  }
                  label="Active"
                />
              </Grid> */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={formik.submitForm}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default SamplePage;
