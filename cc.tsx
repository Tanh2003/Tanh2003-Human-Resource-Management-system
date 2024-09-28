const [employeeOptions, setEmployeeOptions] = React.useState([]);

employee_id:Attendance.employee_id,

const formattedDate = new Date(Attendance.date).toISOString().split("T")[0];
employee_id: Attendance.employee_id._id,
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

 employee_id:"",

  employee_id: data.employee_id,



  { field: "employee_id", headerName: "Employee ID", width: 200 },


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

              employee_id: Payroll.employee_id.employeesId,