import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Link,
} from "@mui/material";
import PropTypes from "prop-types";
import { usePathname, useRouter } from "next/navigation";
import Menuitems from "@/app/(User)/layout/sidebar/MenuItems";

// components
import Profile from "./Profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import { useUser } from "@/app/context/UserContext";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  // function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.");
  // }

  const pathname = usePathname();

  // Tìm menu item với href trùng với đường dẫn hiện tại
  const currentMenuItem = Menuitems.find((item: any) => item.href === pathname);
  // Lấy title từ menu item, nếu không tìm thấy thì để là "Breadcrumb"
  const title = currentMenuItem ? currentMenuItem.title : "Details";

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { user } = useUser(); // Lấy thông tin người dùng từ context
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/user-dashboard"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              // href={`/${title}`}
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {title}
            </Link>
          </Breadcrumbs>
        </div>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" style={{ marginRight: "8px" }}>
              Welcome,
            </Typography>
            {user ? (
              <Typography variant="body1">{user.email}</Typography>
            ) : (
              <Typography variant="body1">Loading....</Typography>
            )}
          </Box>

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
