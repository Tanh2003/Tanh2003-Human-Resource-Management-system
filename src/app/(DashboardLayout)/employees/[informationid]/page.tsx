// pages/index.tsx
import React from "react";
import EmployeeDetails from "../../components/EmployeeDetails";
import { Container } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const Home = ({params}:{ params: { informationid:string } }) => {
  // const params = useParams(); // Lấy dynamic route params
 
  const employee = {
    fullName: "Jane Doe",
    age: 28,
    gender: "Female",
    birthday: "1996-07-15",
    phonenumber: "987-654-3210",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 75000,
    hireDate: "2019-08-10",
    leaveBalance: 12,
    userId: 102,
  };

  return (
    <Container>
      <h1>Employee ID: {params.informationid}</h1> {/* Hiển thị _id từ route */}
      <EmployeeDetails employee={employee} />
    </Container>
  );
};

export default Home;
