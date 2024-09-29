import {

  IconBuilding,

  IconLayoutDashboard,
  IconList,
  IconLogout2,

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
    href: "/user-dashboard",
  },
  {
    navlabel: true,
    subheader: "Account",
  },
  {
    id: uniqueId(),
    title: "Leave Request",
    icon: IconList,
    href: "/user-leave-request",
  },

  {
    navlabel: true,
    subheader: "Project",
  },
  {
    id: uniqueId(),
    title: " List Project",
    icon: IconList,
    href: "/project",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Log out",
  //   icon: IconLogout2,
  //   href: "/",
  // },
];

export default Menuitems;
