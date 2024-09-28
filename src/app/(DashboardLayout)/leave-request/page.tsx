"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListLeaveRequest,
  handleAddLeaveRequest,
  handleDeleteLeaveRequest,
  handleUpdateLeaveRequest,
  handleListAttendance,
  handleListEmployees,
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
import { toast } from "react-toastify";


const validationSchema = yup.object({
  start_date: yup.string().required("Start date  is required"),
  end_date: yup.string().required("End date  is required"),
  reason: yup.string().required("Reason  is required"),
});

const LeaveRequest = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [LeaveRequestId, setLeaveRequestId] = React.useState("");
  const [employeeOptions, setEmployeeOptions] = React.useState([]);

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getLeaveRequestData();
    getEmployeeData();
  }, []);

  const getLeaveRequestData = async () => {
    try {
      const response = await handleListLeaveRequest("ALL");
      if (response.errCode === 0) {
        const LeaveRequest = response.allLeaveRequest.map(
          (LeaveRequest: any, index: number) => ({
            id: index + 1,
            _id: LeaveRequest._id,
            employee_id: LeaveRequest.employee_id.employeesId,
            start_date: new Date(LeaveRequest.start_date).toLocaleDateString("en-GB"),
            end_date: new Date(LeaveRequest.end_date).toLocaleDateString("en-GB"),
            status: LeaveRequest.status,
            reason: LeaveRequest.reason,
          })
        );
        setRows(LeaveRequest);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getLeaveRequestIdData = async (LeaveRequestId: any) => {
    try {
      const response = await handleListLeaveRequest(LeaveRequestId);
      if (response.errCode === 0) {
        const LeaveRequest = response.allLeaveRequest;
        const formattedSDate = new Date(LeaveRequest.start_date)
          .toISOString()
          .split("T")[0];
        const formattedEDate = new Date(LeaveRequest.end_date)
          .toISOString()
          .split("T")[0];
       
        formik.setValues({
          employee_id: LeaveRequest.employee_id._id,
          start_date: formattedSDate,
          end_date: formattedEDate,
          status: LeaveRequest.status,
          reason: LeaveRequest.reason,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
   const getEmployeeData = async () => {
     try {
       const response = await handleListEmployees("ALL");
       if (response.errCode === 0) {
         const employees = response.allEmployees.map((employees: any) => ({
           _id: employees._id,
           employeesId: employees.employeesId,
           fullName: employees.fullName,
         }));
         setEmployeeOptions(employees);
       }
     } catch (error) {
       console.error("Error fetching data", error);
     } finally {
       setLoading(false);
     }
   };


  const postLeaveRequestData = async (data: any) => {
    try {
      const response = await handleAddLeaveRequest(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putLeaveRequestData = async (data: any) => {
    try {
      const response = await handleUpdateLeaveRequest(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteLeaveRequestData = async (LeaveRequestId: any) => {
    try {
      const response = await handleDeleteLeaveRequest(LeaveRequestId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getLeaveRequestData();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 20 },
      { field: "employee_id", headerName: "Employee ID", width: 100 },
      { field: "start_date", headerName: "Start Date", width: 100 },
      { field: "end_date", headerName: "End Date", width: 100 },
      { field: "status", headerName: "Status", width: 100 },
      { field: "reason", headerName: "Reason", width: 200 },
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

  const handleClickOpen = () => {
    setUpdate(false);
    setOpen(true);
    console.log("them" + update);
    formik.setValues({
      employee_id: "",
      start_date: "",
      end_date: "",
      status: "",
      reason: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (data: any) => {
    await postLeaveRequestData({
      employee_id: data.employee_id,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      reason: data.reason,
    });
    await getLeaveRequestData();
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const LeaveRequestId = row._id;
    await getLeaveRequestIdData(LeaveRequestId);
    setLeaveRequestId(LeaveRequestId);
  };

  const handleUpdate = async (data: any) => {
    await putLeaveRequestData({
      LeaveRequestId: LeaveRequestId,
      employee_id: data.employee_id,
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      reason: data.reason,
    });
    await getLeaveRequestData();
  };

  const handleDelete = async (row: any) => {
    const LeaveRequestId = row._id;
    await deleteLeaveRequestData(LeaveRequestId);
    await getLeaveRequestData();
  };

  const formik: FormikProps<ILeaveRequest> = useFormik<ILeaveRequest>(
    update === false
      ? {
          initialValues: {
            employee_id: "",
            start_date: "",
            end_date: "",
            status: "",
            reason: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            getLeaveRequestData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
            employee_id: "",
            start_date: "",
            end_date: "",
            status: "",
            reason: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            getLeaveRequestData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Leave Request List" description="Leave Request List">
      <DashboardCard title="Leave Request List">
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
          {update === true ? "Update LeaveRequest" : "Add LeaveRequest"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="start_date"
                  name="start_date"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.start_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.start_date &&
                    Boolean(formik.errors.start_date)
                  }
                  helperText={
                    formik.touched.start_date && formik.errors.start_date
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="end_date"
                  name="end_date"
                  label="End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.end_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.end_date && Boolean(formik.errors.end_date)
                  }
                  helperText={formik.touched.end_date && formik.errors.end_date}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="status"
                  name="status"
                  label="Status"
                  type="text"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="reason"
                  name="reason"
                  label="Reason"
                  type="text"
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                  helperText={formik.touched.reason && formik.errors.reason}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="employee_id-label">Employees</InputLabel>
                  <Select
                    labelId="employee_id"
                    id="employee_id"
                    name="employee_id"
                    label="Employees"
                    value={formik.values.employee_id}
                    onChange={formik.handleChange}
                  >
                    {/* Hiển thị danh sách người dùng từ userOptions */}
                    {employeeOptions.map((employees: any) => (
                      <MenuItem key={employees._id} value={employees._id}>
                        {employees.employeesId}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
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
            {update ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default LeaveRequest;
