import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import '../App.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../tools/theem';
import CompInput from './comp_input';
import InputAddPet from './input_add_pet';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPet() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
   return  setOpen(true);
  };

  const handleClose = () => {
    return  setOpen(false);
  };

  return (
    
    <div className='adoubt-input'>
      <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen}>
      Add New Pet
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Pet
            </Typography>          
          </Toolbar>
        </AppBar>

        {/* start inputes formik */}
           
          <InputAddPet/>
      </Dialog>
      </ThemeProvider>
      
    </div>
  );
}