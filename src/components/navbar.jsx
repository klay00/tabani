import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { NavPages, settings } from './pagelist';
import '../App.css';
import theme from '../tools/theem';
import UserInfo from '../firebase/testingfirestoe';
import { Stack } from '@mui/material';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from "../firebase/firebase";
import Notfcation from './Notifcation';

export const userInfo = [];
export default function NavBar() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is logged in, fetch user information from Firestore
        fetchUserData(authUser.uid);
        fetchNotifData(authUser.uid)
      } else {
        // User is not logged in
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        setUser(userData);
        userInfo.push(userData);
      } else {
        // User document does not exist
        setUser(null);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };
  const [notifc, setNotifc] = useState([]);
  const fetchNotifData = async (userId) => {
    try {
      const q = await getDocs(collection(db, 'notif'));
      const notif = q.docs.filter((doc) => doc.data().userOrderId === userId && doc.data().status === true)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setNotifc(notif)
    } catch (e) {
      console.log(e);
    }
  }
  console.log(user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const token = localStorage.getItem('token');
  // console.log(token);
  function handelRemovToken(path) {
    if (path === '/login') {
      localStorage.removeItem('token');
      userInfo.push('');
      setUser(null)
      console.log('token deleted');
    }
  }



  return (


    <ThemeProvider theme={theme}>
      <AppBar position="static" color='secondary'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'inherit',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to={'/'}>tabani</Link>

            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {NavPages.map((pages) => (
                  <MenuItem key={pages.name} onClick={handleCloseNavMenu}>
                    <Link to={pages.path}>
                      <Typography textAlign="center">{pages.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                // fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link to={'/'}>tabani</Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {NavPages.map((pages) => (
                <Link to={pages.path}>
                  <Button
                    key={pages}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {pages.name}
                  </Button>
                </Link>
              ))}
            </Box>

            {
              token ? <Box sx={{ flexGrow: 0 }}>

                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <Notfcation data={notifc} />
                  <UserInfo name={"fullName"} />

                  <div>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {
                          user ? <Avatar src={user.profileImage} alt='profile image' /> : <Avatar alt='profile image' />

                        }
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {
                        settings.map((setting, i) => {
                          // Check if the setting requires and the user is not admin if he admin displays the path
                          if (setting.requiredRole && user?.status !== 'Admin') {
                            return null;
                          }
                        
                          return (
                            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                              <Link to={setting.path} onClick={() => handelRemovToken(setting.path)} state={user}>
                                <Typography textAlign="center">{setting.name}</Typography>
                              </Link>
                            </MenuItem>
                          );
                        })
                      }
                      
                    </Menu>
                  </div>
                </Stack>
              </Box> : <Link to={'/login'}><Button sx={{ color: 'white' }} variant="outlined">LogIn</Button></Link>
            }


          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>

  );
}
