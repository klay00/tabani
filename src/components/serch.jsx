import { Autocomplete, Button, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import theme from "../tools/theem";
import { options, Location } from "./pagelist";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
    const [petValue, setPetValue] = useState('');
    const [locationValue, setLocationValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Pet:', petValue);
        console.log('Location:', locationValue);
    };

    return (
        <div style={{ width:'100%'}}>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit} >
                    <div className="input-search" >
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                fullWidth
                                value={petValue}
                                onChange={(event, newValue) => setPetValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Pet" />}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="combo-box-dem"
                                fullWidth
                                options={Location}
                                value={locationValue}
                                onChange={(event, newValue) => setLocationValue(newValue)}
                                renderInput={(params) => <TextField {...params} label="Location" />}
                            />
                        </Box>

                        <Button type="submit" variant="contained" sx={{ fontSize: 'md', pl: 5, pr: 5 }}>
                         <SearchIcon/>   Search
                        </Button>
                    </div>
                </form>
            </ThemeProvider>
        </div>
    );
}
