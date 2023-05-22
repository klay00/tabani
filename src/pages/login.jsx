import React from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

export default function LogIn() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <div className="main-log">
                <div className="platform">
                    <div className="info">
                        <h1>tabani</h1>
                        <h4><span>Welcome</span> Log in to your account</h4>
                    </div>
                    <form action="">


                        <div className="inputs">
                            <div className="email">
                                <TextField id="outlined-basic" label="Email" variant="outlined" />
                            </div>


                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </div>
                        <div className="btns">
                            <Button variant="contained">login</Button>
                            <Button variant="outlined">rigster</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}