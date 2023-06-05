import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../tools/theem';
import { Button, ThemeProvider } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import { db } from '../firebase/firebase';
import { collection, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const style = {
    width: '100%',
    maxWidth: 560,
    bgcolor: 'background.paper',
    borderRadius: '20px'
};

export default function OrderAdopt({ order }) {

    async function handelDeleteOrder() {
        try {
            await deleteDoc(doc(db, "order", order.id));
            console.log('delete success');
        } catch (e) {
            console.log(e);
        }
    }
    async function handelupDataData() {
        console.log('updata data');
        try {
            await updateDoc(doc(db, "order", order.id), {
                status: 'Adopt'
            });
            await updateDoc(doc(db, "pets", order.petId), {
                status: 'Adopt'
            });
            console.log('updata data success done');

        } catch (e) {
            console.log(e);
        }


    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <List sx={style} component="nav" aria-label="mailbox folders">
                    <ListItem divider>
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <PersonIcon color='primary' />
                            <ListItemText primary={order.fullName} />
                        </Stack>
                    </ListItem>
                    <ListItem >
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <MailIcon color='primary' />
                            <ListItemText primary={order.email} />
                        </Stack>
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <PetsIcon color='primary' />
                            <ListItemText primary={order.petName} />
                        </Stack>
                    </ListItem>
                    <Divider light />
                    <ListItem divider>
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <PhoneIcon color='primary' />
                            <ListItemText primary={order.phoneNumber} />
                        </Stack>
                    </ListItem>
                    <ListItem divider>
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <HomeIcon color='primary' />
                            <ListItemText primary={order.placement} />
                        </Stack>
                    </ListItem>
                    <ListItem divider>
                        <Stack direction="row" spacing={3} alignItems={'center'}>
                            <InfoIcon color='primary' />
                            <ListItemText primary={order.care} />
                        </Stack>
                    </ListItem>

                    <Stack direction="row" spacing={3} alignItems={'center'} justifyContent="flex-end" sx={{ m: 1 }}>

                        <Button variant='outlined' onClick={(() => handelDeleteOrder())} sx={{ borderRadius: 20 }}>Refuse adoption</Button>
                        <Button variant='contained' onClick={(() => handelupDataData())} sx={{ borderRadius: 20 }}>Adoption confirmation</Button>
                    </Stack>

                </List>
            </ThemeProvider>
        </>
    )
}