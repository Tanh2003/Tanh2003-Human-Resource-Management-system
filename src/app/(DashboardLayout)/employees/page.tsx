"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import {
  handleListEmployees,
  handleAddEmployees,
  handleDeleteEmployees,
  handleUpdateEmployees,
} from "../../../ServicesAdmin";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  TextField,
  Container,
  Grid,
  Box,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Validation schema sử dụng yup cho các trường mới
const validationSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .min(18, "Age must be at least 18"),
  gender: yup.string().required("Gender is required"),
  birthday: yup.date().required("Birthday is required"),
  phonenumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10,11}$/, "Phone number must be 10-11 digits"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  salary: yup
    .number()
    .required("Salary is required")
    .min(0, "Salary must be a positive number"),
  hireDate: yup.date().required("Hire Date is required"),
  leaveBalance: yup
    .number()
    .required("Leave Balance is required")
    .min(0, "Leave Balance must be a positive number"),
});

// Hàm Employees chính
const Employees = () => {
  const router = useRouter();
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [EmployeesId, setEmployeesId] = React.useState("");

  React.useEffect(() => {
    getEmployeesData();
  }, []);

  const getEmployeesData = async () => {
    try {
      const response = await handleListEmployees("ALL");
      if (response.errCode === 0) {
        const Employeess = response.allEmployees.map(
          (Employees: any, index: number) => ({
            id: index + 1,
            _id: Employees._id,
            fullName: Employees.fullName,
            age: Employees.age,
            gender: Employees.gender,
            birthday: new Date(Employees.birthday).toLocaleDateString(),
            department: Employees.department,
            position: Employees.position,
            salary: Employees.salary,
            hireDate: new Date(Employees.hireDate).toLocaleDateString(),
            leaveBalance: Employees.leaveBalance,
          })
        );
        setRows(Employeess);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postEmployeesData = async (data: any) => {
    try {
      const response = await handleAddEmployees(data);
      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putEmployeesData = async (data: any) => {
    try {
      const response = await handleUpdateEmployees(data);
      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployeesData = async (EmployeesId: any) => {
    try {
      const response = await handleDeleteEmployees(EmployeesId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getEmployeesData();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: any) => {
    await postEmployeesData(data);
    await getEmployeesData();
  };

  const handleUpdate = async (data: any) => {
    await putEmployeesData({
      EmployeesId: EmployeesId,
      ...data,
    });
    await getEmployeesData();
  };
  // Hàm xử lý Delete
  const handleDelete = async (row: any) => {
    const EmployeesId = row._id; // Lấy _id từ row
    console.log("delete Employees with _id: ", EmployeesId);
    await deleteEmployeesData(EmployeesId);
    await getEmployeesData();
    // Thực hiện xử lý Delete
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const EmployeesId = row._id;
    setEmployeesId(EmployeesId);
    formik.setValues(row);
  };
const handleRowClick = (params: GridRowParams) => {
  console.log("Row _id:", params.row._id);
  // Xử lý thêm logic khi cần thiết, ví dụ như điều hướng đến trang chi tiết
  router.push(`/employees/${params.row._id}`);


};

  const formik: FormikProps<IEmployee> = useFormik({
    initialValues: {
      fullName: "",
      age: "",
      gender: "",
      birthday: "",
      phonenumber: "",
      department: "",
      position: "",
      salary: "",
      hireDate: "",
      leaveBalance: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      update ? handleUpdate(values) : handleAdd(values);
      getEmployeesData();
      handleClose();
      resetForm();
    },
  });

  const handleClickOpen = () => {
    setUpdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "fullName", headerName: "Full Name", width: 200 },
      { field: "age", headerName: "Age", width: 100 },
      { field: "gender", headerName: "Gender", width: 100 },
      { field: "birthday", headerName: "Birthday", width: 150 },
      { field: "department", headerName: "Department", width: 150 },
      { field: "position", headerName: "Position", width: 150 },
      { field: "salary", headerName: "Salary", width: 150 },
      { field: "hireDate", headerName: "Hire Date", width: 150 },
      { field: "leaveBalance", headerName: "Leave Balance", width: 150 },
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
              onClick={() => handleEdit(params.row)}
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

  return (
    <PageContainer title="Employees List" description="Employees List">
      <DashboardCard title="Employees List">
        <Box sx={{ height: 500, width: 1 }}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={handleClickOpen}
            style={{ marginBottom: 4 }}
          >
            Create
          </Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              onRowClick={handleRowClick}
            />
          )}
        </Box>
      </DashboardCard>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{update ? "Update Employee" : "Add Employee"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="age"
                  name="age"
                  label="Age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.birthday && Boolean(formik.errors.birthday)
                  }
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phonenumber"
                  name="phonenumber"
                  label="Phone Number"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phonenumber &&
                    Boolean(formik.errors.phonenumber)
                  }
                  helperText={
                    formik.touched.phonenumber && formik.errors.phonenumber
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="department"
                  name="department"
                  label="Department"
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.department &&
                    Boolean(formik.errors.department)
                  }
                  helperText={
                    formik.touched.department && formik.errors.department
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="position"
                  name="position"
                  label="Position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.position && Boolean(formik.errors.position)
                  }
                  helperText={formik.touched.position && formik.errors.position}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="salary"
                  name="salary"
                  label="Salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  helperText={formik.touched.salary && formik.errors.salary}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="hireDate"
                  name="hireDate"
                  label="Hire Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.hireDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hireDate && Boolean(formik.errors.hireDate)
                  }
                  helperText={formik.touched.hireDate && formik.errors.hireDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="leaveBalance"
                  name="leaveBalance"
                  label="Leave Balance"
                  value={formik.values.leaveBalance}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.leaveBalance &&
                    Boolean(formik.errors.leaveBalance)
                  }
                  helperText={
                    formik.touched.leaveBalance && formik.errors.leaveBalance
                  }
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {update ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Employees;
