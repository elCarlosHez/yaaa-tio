import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { pb } from "../lib";
import { useNavigate } from "react-router-dom";

export const MenuBar = () => {
  const navigate = useNavigate();
  const user = pb.authStore.model;
  const [userImage, setUserImage] = useState<string>(
    pb.getFileUrl(user!, user?.avatar!)
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const suscribe = pb.authStore.onChange((_, model) => {
      setUserImage(pb.getFileUrl(model!, model?.avatar!))
    });
    return () => suscribe();
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOnLogo = () => {
    navigate("/home");
    handleCloseUserMenu();
  };

  const handleOnLogout = () => {
    pb.authStore.clear();
    navigate("/");
  };

  const handleOnProfile = () => {
    navigate("/profile");
    handleCloseUserMenu();
  };

  return (
    <AppBar>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Button sx={{ display: 'flex' }} variant="text" onClick={handleOnLogo}>
              <Typography
                color="white"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Yaaa tio
              </Typography>
            </Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <Avatar alt="User avatar" src={userImage} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOnProfile}>Profile</MenuItem>
              <MenuItem onClick={handleOnLogout}>Sign out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </AppBar>
  );
};
