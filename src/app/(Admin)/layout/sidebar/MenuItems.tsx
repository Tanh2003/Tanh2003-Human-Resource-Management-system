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
  IconPodium,
  IconPoint,
  IconTypography,
  IconUser,
  IconUserOff,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

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
    href: "/dashboard",
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
    href: "/department",
  },
  {
    id: uniqueId(),
    title: "Position",
    icon: PersonPinIcon,
    href: "/position",
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
    navlabel: true,
    subheader: "Leave",
  },
  {
    id: uniqueId(),
    title: "leave Request ",
    icon: IconUserOff,
    href: "/leave-request",
  },
  {
    navlabel: true,
    subheader: "Payroll",
  },
  {
    id: uniqueId(),
    title: "Payroll",
    icon: AccountBalanceWalletIcon,
    href: "/payroll",
  },
  {
    navlabel: true,
    subheader: "Attendance",
  },
  {
    id: uniqueId(),
    title: "Attendance",
    icon: PublishedWithChangesIcon,
    href: "/attendance",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Logout",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },

];

export default Menuitems;
