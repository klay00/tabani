import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import theme from '../tools/theem';
import { ThemeProvider } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlartMessageLogin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='adoubt-input'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adobt naw
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please login or create an account"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Sorry, it looks like you are not registered. Please login or create an account to complete the adoption
          </DialogContentText>
        </DialogContent>
        <ThemeProvider theme={theme}>
        <DialogActions>
          <Stack spacing={4} direction={'row'}>
            <Button variant='outlined' onClick={handleClose} sx={{borderRadius:10,pl:5,pr:5}}>Close</Button>
            <Link to={'/login'}>
              <Button variant='contained' sx={{borderRadius:10,pl:5,pr:5}}>Login</Button>
            </Link>
          </Stack>
        </DialogActions>
        </ThemeProvider>
      </Dialog>
    </div>
  );
}