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
    subheader: "Attention",
  },
  {
    id: uniqueId(),
    title: "Attention",
    icon: PublishedWithChangesIcon,
    href: "/attention",
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
