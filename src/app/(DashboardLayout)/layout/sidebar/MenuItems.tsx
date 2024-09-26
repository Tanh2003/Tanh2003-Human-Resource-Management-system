import {
  IconAperture,
  IconBuilding,
  IconCompass,
  IconCopy,
  IconLayoutDashboard,
  IconList,
  IconLogin,
  IconMoodHappy,
  IconPlaneDeparture,
  IconTypography,
  IconUser,
  IconUserOff,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Account",
  },
  {
    id: uniqueId(),
    title: "Account List ",
    icon: IconList,
    href: "/account",
  },
  {
    navlabel: true,
    subheader: "Organization",
  },
  {
    id: uniqueId(),
    title: "Department",
    icon: IconBuilding,
    href: "/utilities/typography",
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "Employees",
  },
  {
    id: uniqueId(),
    title: "Employees",
    icon: IconUsers,
    href: "/employees",
  },
  {
    id: uniqueId(),
    title: "Information Employee",
    icon: IconUsers,
    href: "/information-employees",
  },
  {
    navlabel: true,
    subheader: "Leave",
  },
  {
    id: uniqueId(),
    title: "Request leave",
    icon: IconUserOff,
    href: "/authentication/login",
  },
  {
    navlabel: true,
    subheader: "Payroll",
  },
  {
    id: uniqueId(),
    title: "Payroll List",
    icon: IconList,
    href: "/authentication/login",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Danh sách nhân viên",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;
