"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListDepartment,
  handleAddDepartment,
  handleDeleteDepartment,
  handleUpdateDepartment,
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
  name: yup.string().required("Name number is required"),
});

const Department = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [DepartmentId, setDepartmentId] = React.useState("");

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getDepartmentData();
  }, []);

  const getDepartmentData = async () => {
    try {
      const response = await handleListDepartment("ALL");
      if (response.errCode === 0) {
        const Department = response.allDepartment.map(
          (Department: any, index: number) => ({
            id: index + 1,
            _id: Department._id,
            name: Department.name,
          })
        );
        setRows(Department);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentIdData = async (DepartmentId: any) => {
    try {
      const response = await handleListDepartment(DepartmentId);
      if (response.errCode === 0) {
        const Department = response.allDepartment;
        formik.setValues({
          name: Department.name,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postDepartmentData = async (data: any) => {
    try {
      const response = await handleAddDepartment(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putDepartmentData = async (data: any) => {
    try {
      const response = await handleUpdateDepartment(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteDepartmentData = async (DepartmentId: any) => {
    try {
      const response = await handleDeleteDepartment(DepartmentId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getDepartmentData();
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
      { field: "name", headerName: "Name", width: 200 },
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
      name: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async (data: any) => {
    await postDepartmentData({
      name: data.name,
    });
    await getDepartmentData();
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const DepartmentId = row._id;
    await getDepartmentIdData(DepartmentId);
    setDepartmentId(DepartmentId);
  };

  const handleUpdate = async (data: any) => {
    await putDepartmentData({
      DepartmentId: DepartmentId,
      name: data.name,
    });
    await getDepartmentData();
  };

  const handleDelete = async (row: any) => {
    const DepartmentId = row._id;
    await deleteDepartmentData(DepartmentId);
    await getDepartmentData();
  };

  const formik: FormikProps<IDepartment> = useFormik<IDepartment>(
    update === false
      ? {
          initialValues: {
            name: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            getDepartmentData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
            name: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            getDepartmentData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Department List" description="Department List">
      <DashboardCard title="Department List">
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
          {update === true ? "Update Department" : "Add Department"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
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

export default Department;
