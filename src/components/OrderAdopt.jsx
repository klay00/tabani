import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import theme from '../tools/theem';
import { Alert, AlertTitle, Button, CircularProgress, ThemeProvider } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import { db } from '../firebase/firebase';
import { collection, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import Lodaer from './loader';

const style = {
    width: '100%',
    maxWidth: 560,
    bgcolor: 'background.paper',
    borderRadius: '20px'
};

export default function OrderAdopt({ order }) {
    const [loding, setloding] = useState(false);
    const [loding2, setloding2] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    async function handelDeleteOrder() {
        setloding(true);
        try {
            await deleteDoc(doc(db, "order", order.id));
            setloding(false);
            setSuccessMessage('Order Delete successfully')
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000);
        } catch (e) {
            setloding(false);
            setErrorMessage('Error deleting order please try again later')
            setTimeout(() => {
                setErrorMessage('')
            }, 5000);
        }
    }
    async function handelupDataData() {
        setloding2(true);
        try {
            await updateDoc(doc(db, "order", order.id), {
                status: 'Adopt'
            });
            await updateDoc(doc(db, "pets", order.petId), {
                status: 'Adopt'
            });
            await addDoc(collection(db, "notif"), {
                userOrderId: order.orderUserId,
                petName: order.petName,
                status: true,
                petId: order.petId,
                onerPhone: order.onerPhone,
            })
            setloding2(false);
            setSuccessMessage('Pet successfully Adopted');
            setTimeout(() => {
                setSuccessMessage('')
                window.location.reload();
            }, 5000);

        } catch (e) {
            setloding2(false);
            setErrorMessage('Error Adopt pet please try again later')
            setTimeout(() => {
                setErrorMessage('')
                window.location.reload();
            }, 5000);
        }


    }

    return (
        <>
            {successMessage && (
                <Alert severity="success" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
                    <AlertTitle>Success</AlertTitle>
                        <div>{successMessage}</div>
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ position: 'fixed', top: 40, right: '50%', transform: "translatex(50% )", width: '300px', zIndex: 9999 }}>
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}
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
                        {
                            loding ? <Button variant='outlined' disabled sx={{ borderRadius: 20 }}><CircularProgress /></Button>
                                :
                                <Button variant='outlined' onClick={(() => handelDeleteOrder())} sx={{ borderRadius: 20 }}>Delete the Order</Button>
                        }
                        {
                            loding2 ? <Button variant='contained' disabled sx={{ borderRadius: 20 }}><Lodaer /></Button>
                                :
                                <Button variant='contained' onClick={(() => handelupDataData())} sx={{ borderRadius: 20 }}>Adoption confirmation</Button>
                        }
                    </Stack>

                </List>
            </ThemeProvider>
        </>
    )
}