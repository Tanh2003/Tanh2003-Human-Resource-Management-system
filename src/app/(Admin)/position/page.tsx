"use client";
import PageContainer from "@/app/(Admin)/components/container/PageContainer";
import DashboardCard from "@/app/(Admin)/components/shared/DashboardCard";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  handleListPosition,
  handleAddPosition,
  handleDeletePosition,
  handleUpdatePosition,
  handleListDepartment,
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

// Validation schema sử dụng yup
const validationSchema = yup.object({
  name: yup.string().required("Name number is required"),
});

const Position = () => {
  // Khởi tạo state để lưu dữ liệu từ API
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [PositionId, setPositionId] = React.useState("");
  const [departmentOptions, setDepartmentOptions] = React.useState([]);

  // Gọi API khi component được render lần đầu tiên
  React.useEffect(() => {
    getPositionData();
    getDepartmentData();
  }, []);

  const getPositionData = async () => {
    try {
      const response = await handleListPosition("ALL");
      if (response.errCode === 0) {
        // Xử lý dữ liệu để phù hợp với DataGrid
        const Position = response.allPosition.map(
          (Position: any, index: number) => ({
            id: index + 1,
            _id: Position._id,
            name: Position.name,
            department_id: Position.department_id.name,
          })
        );
        setRows(Position);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionIdData = async (PositionId: any) => {
    try {
      const response = await handleListPosition(PositionId);
      if (response.errCode === 0) {
        const Position = response.allPosition;
        formik.setValues({
          name: Position.name,
          department_id: Position.department_id._id,
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const getDepartmentData = async () => {
    try {
      const response = await handleListDepartment("ALL");
      if (response.errCode === 0) {
        const department = response.allDepartment.map((department: any) => ({
          _id: department._id,
          name: department.name,
        }));
        setDepartmentOptions(department);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const postPositionData = async (data: any) => {
    try {
      const response = await handleAddPosition(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const putPositionData = async (data: any) => {
    try {
      const response = await handleUpdatePosition(data);

      if (response.errCode === 0) {
        toast.success(response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };
  const deletePositionData = async (PositionId: any) => {
    try {
      const response = await handleDeletePosition(PositionId);

      if (response.errCode === 0) {
        console.log(response);
        toast.success(response.errMessage);

        getPositionData();
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
      { field: "name", headerName: "Name Position", width: 200 },
      { field: "department_id", headerName: "Name Department", width: 200 },
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
      department_id: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async (data: any) => {
    await postPositionData({
      name: data.name,
      department_id: data.department_id,
    });
    await getPositionData();
  };

  const handleEdit = async (row: any) => {
    setOpen(true);
    setUpdate(true);
    const PositionId = row._id;
    await getPositionIdData(PositionId);
    setPositionId(PositionId);
  };

  const handleUpdate = async (data: any) => {
    await putPositionData({
      PositionId: PositionId,
      name: data.name,
      department_id: data.department_id,
    });
    await getPositionData();
  };

  const handleDelete = async (row: any) => {
    const PositionId = row._id;
    await deletePositionData(PositionId);
    await getPositionData();
  };

  const formik: FormikProps<IPosition> = useFormik<IPosition>(
    update === false
      ? {
          initialValues: {
            name: "",
            department_id: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleAdd(values); // Truyền đối tượng values trực tiếp
            getPositionData();
            handleClose();
            resetForm();
          },
        }
      : {
          initialValues: {
            name: "",
            department_id: "",
          },
          validationSchema: validationSchema,
          onSubmit: (values, { resetForm }) => {
            handleUpdate(values);
            getPositionData();
            handleClose();
            resetForm();
          },
        }
  );

  return (
    <PageContainer title="Position List" description="Position List">
      <DashboardCard title="Position List">
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
          {update === true ? "Update Position" : "Add Position"}
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
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="department_id-label">Department</InputLabel>
                  <Select
                    labelId="department_id"
                    id="department_id"
                    name="department_id"
                    label="Department"
                    value={formik.values.department_id}
                    onChange={formik.handleChange}
                  >
                    {/* Hiển thị danh sách người dùng từ userOptions */}
                    {departmentOptions.map((department: any) => (
                      <MenuItem key={department._id} value={department._id}>
                        {department.name}
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

export default Position;
