"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListPayroll,
  handleAddPayroll,
  handleDeletePayroll,
  handleUpdatePayroll,
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
  salary: yup.string().required("Salary number is required"),
  bonus: yup.string().required("Bonus number is required"),
  deductions: yup.string().required("Deductions number is required"),
  pay_date: yup.string().required("Pay_date number is required"),
 
});

const Payroll = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [PayrollId, setPayrollId] = React.useState("");

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getPayrollData();
  }, []);

  const getPayrollData = async () => {
    try {
      const response = await handleListPayroll("ALL");
      if (response.errCode === 0) {
        const Payroll = response.allPayroll.map(
          (Payroll: any, index: number) => ({
            id: index + 1,
            _id: Payroll._id,
            salary: Payroll.salary,
            bonus: Payroll.bonus,
            deductions: Payroll.deductions,
            pay_date: Payroll.pay_date,
          })
        );
        setRows(Payroll);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getPayrollIdData = async (PayrollId: any) => {
    try {
      const response = await handleListPayroll(PayrollId);
      if (response.errCode === 0) {
        const Payroll = response.allPayroll;
        formik.setValues({
          salary: Payroll.salary,
          bonus: Payroll.bonus,
          deductions: Payroll.deductions,
          pay_date: Payroll.pay_date,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postPayrollData = async (data: any) => {
    try {
      const response = await handleAddPayroll(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putPayrollData = async (data: any) => {
    try {
      const response = await handleUpdatePayroll(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const deletePayrollData = async (PayrollId: any) => {
    try {
      const response = await handleDeletePayroll(PayrollId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getPayrollData();
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
      { field: "salary", headerName: "Salary", width: 200 },
      { field: "bonus", headerName: "Bonus", width: 200 },
      { field: "deductions", headerName: "Deductions", width: 200 },
      { field: "pay_date", headerName: "Pay_date", width: 200 },
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
      salary: "",
      bonus: "",
      deductions: "",
      pay_date: ""
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (data: any) => {
    await postPayrollData({
      salary: data.salary,
      bonus: data.bonus,
      deductions: data.deductions,
      pay_date: data.pay_date,
    });
    await getPayrollData();
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const PayrollId = row._id;
    await getPayrollIdData(PayrollId);
    setPayrollId(PayrollId);
  };
   
  const handleUpdate = async (data: any) => {
    await putPayrollData({
      PayrollId: PayrollId,
      salary: data.salary,
      bonus: data.bonus,
      deductions: data.deductions,
      pay_date: data.pay_date,
    });
    await getPayrollData();
  };

  const handleDelete = async (row: any) => {
    const PayrollId = row._id;
    await deletePayrollData(PayrollId);
    await getPayrollData();
  };

  const formik: FormikProps<IPayroll> = useFormik<IPayroll>(
    update === false
      ? {
          initialValues: {
            salary: "",
            bonus: "",
            deductions: "",
            pay_date: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            getPayrollData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
              salary: "",
            bonus: "",
            deductions: "",
            pay_date: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            getPayrollData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Payroll List" description="Payroll List">
      <DashboardCard title="Payroll List">
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
          {update === true ? "Update Payroll" : "Add Payroll"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="salary"
                  name="salary"
                  label="Salary"
                  type="number"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  error={formik.touched.salary && Boolean(formik.errors.salary)}
                  helperText={formik.touched.salary && formik.errors.salary}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="bonus"
                  name="bonus"
                  label="Bonus"
                  type="number"
                  value={formik.values.bonus}
                  onChange={formik.handleChange}
                  error={formik.touched.bonus && Boolean(formik.errors.bonus)}
                  helperText={formik.touched.bonus && formik.errors.bonus}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="deductions"
                  name="deductions"
                  label="Deductions"
                  type="number"
                  value={formik.values.deductions}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.deductions &&
                    Boolean(formik.errors.deductions)
                  }
                  helperText={
                    formik.touched.deductions && formik.errors.deductions
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="pay_date"
                  name="pay_date"
                  label="Pay Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.pay_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pay_date && Boolean(formik.errors.pay_date)
                  }
                  helperText={formik.touched.pay_date && formik.errors.pay_date}
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

export default Payroll;
