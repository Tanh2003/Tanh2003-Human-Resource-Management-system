"use client";
import React, { useEffect } from "react";
import EmployeeDetails from "../../components/EmployeeDetails";
import { Container } from "@mui/material";
import { handleListEmployees } from "@/ServicesAdmin";


const Home = ({ params }: { params: { informationid: string } }) => {
  const [employee, setEmployee] = React.useState<any>(null); // Sử dụng null ban đầu khi chưa có dữ liệu

  useEffect(() => {
    getEmployeesIdData(params.informationid);
  }, []);

  const getEmployeesIdData = async (userId: any) => {
    try {
      const response = await handleListEmployees(userId);
      if (response.errCode === 0) {
        console.log("Lấy dữ liệu 1 người dùng thành công");
        setEmployee(response.allEmployees); // Gán dữ liệu từ API vào state
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  if (!employee) return <div>Loading...</div>; // Hiển thị khi chưa có dữ liệu
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
  return (
    <Container>
      
      <EmployeeDetails employee={employee} />{" "}
      {/* Truyền dữ liệu từ API vào component */}
    </Container>
  );
};

export default Home;
