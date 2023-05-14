import { Autocomplete, Button, TextField } from "@mui/material";
import React from "react";
import MainButtom from "./buttom";
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

            <MainButtom name={'search'}/>
        </>
    )
}

