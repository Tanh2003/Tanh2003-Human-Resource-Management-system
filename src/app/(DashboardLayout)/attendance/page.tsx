"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListAttendance,
  handleAddAttendance,
  handleDeleteAttendance,
  handleUpdateAttendance,
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
  date: yup.string().required("Date is required"),
  check_in: yup.string().required("Check-in is required"),
  check_out: yup.string().required("Check-out is required"),
});

const Attendance = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [AttendanceId, setAttendanceId] = React.useState("");

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getAttendanceData();
  }, []);

  const getAttendanceData = async () => {
    try {
      const response = await handleListAttendance("ALL");
      if (response.errCode === 0) {
        const Attendance = response.allAttendance.map(
          (Attendance: any, index: number) => ({
            id: index + 1,
            _id: Attendance._id,
            date: Attendance.date,
            check_in: Attendance.check_in,
            check_out: Attendance.check_out,
          })
        );
        setRows(Attendance);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceIdData = async (AttendanceId: any) => {
    try {
      const response = await handleListAttendance(AttendanceId);
      if (response.errCode === 0) {
        const Attendance = response.allAttendance;
        formik.setValues({
          date: Attendance.date,
          check_in: Attendance.check_in,
          check_out: Attendance.check_out,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postAttendanceData = async (data: any) => {
    try {
      const response = await handleAddAttendance(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putAttendanceData = async (data: any) => {
    try {
      const response = await handleUpdateAttendance(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteAttendanceData = async (AttendanceId: any) => {
    try {
      const response = await handleDeleteAttendance(AttendanceId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getAttendanceData();
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 200 },
      { field: "check_in", headerName: "Check In", width: 200 },
      { field: "check_out", headerName: "Check Out", width: 200 },
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
      date: "",
      check_in: "",
      check_out: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (data: any) => {
    await postAttendanceData({
      date: data.date,
      check_in: data.check_in,
      check_out: data.check_out,
    });
    await getAttendanceData();
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const AttendanceId = row._id;
    await getAttendanceIdData(AttendanceId);
    setAttendanceId(AttendanceId);
  };

  const handleUpdate = async (data: any) => {
    await putAttendanceData({
      AttendanceId: AttendanceId,
      date: data.date,
      check_in: data.check_in,
      check_out: data.check_out,
    });
    await getAttendanceData();
  };

  const handleDelete = async (row: any) => {
    const AttendanceId = row._id;
    await deleteAttendanceData(AttendanceId);
    await getAttendanceData();
  };

  const formik: FormikProps<IAttendance> = useFormik<IAttendance>(
    update === false
      ? {
          initialValues: {
            date: "",
            check_in: "",
            check_out: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            getAttendanceData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
            date: "",
            check_in: "",
            check_out: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            getAttendanceData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Attendance List" description="Attendance List">
      <DashboardCard title="Attendance List">
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
          {update === true ? "Update Attendance" : "Add Attendance"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="date"
                  name="date"
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="check_in"
                  name="check_in"
                  label="Check In"
                  type="text"
                  value={formik.values.check_in}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.check_in && Boolean(formik.errors.check_in)
                  }
                  helperText={formik.touched.check_in && formik.errors.check_in}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="check_out"
                  name="check_out"
                  label="Check Out"
                  type="text"
                  value={formik.values.check_out}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.check_out && Boolean(formik.errors.check_out)
                  }
                  helperText={
                    formik.touched.check_out && formik.errors.check_out
                  }
                />
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

export default Attendance;
