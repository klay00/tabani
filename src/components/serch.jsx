import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../tools/theem";
import { options, Location } from "./pagelist";


export default function Search() {

    return (
        <> 
         <div className="input-search">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Pet" />}
            />
            <Autocomplete
                disablePortal
                id="combo-box-dem"
                options={Location}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Location" />}
            />
         </div>                 

            <ThemeProvider theme={theme}>
                <Button variant="contained"  color="primary" size="large">
                    Search
                </Button>
            </ThemeProvider>




        </>
    )
}

