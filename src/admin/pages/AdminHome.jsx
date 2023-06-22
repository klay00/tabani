import { Stack } from "@mui/joy";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CharCircle from "../components/CharCircle";
import OrderLine from "../components/OrderLine";
export const Orders = [];
export const Pets = [];
export const Users = [];
export default function AdminHome() {
    const [pet, setPet] = useState([]);
    const [user, setUser] = useState([]);
    const [order, setOrder] = useState([]);


    useEffect(() => {

        fetchPetData();
        fetchUserData();
        fetchOrderData();

    }, []);

    const fetchPetData = async () => {
        const petQuerySnapshot = await getDocs(collection(db, 'pets'));
        const petData = petQuerySnapshot.docs.filter(doc => doc.data())
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setPet(petData);
        Pets.push(petData)
    };
    const fetchUserData = async () => {
        const petQuerySnapshot = await getDocs(collection(db, 'users'));
        const userdata = petQuerySnapshot.docs.filter(doc => doc.data())
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setUser(userdata);
        Users.push(userdata);

    };
    const fetchOrderData = async () => {
        const petQuerySnapshot = await getDocs(collection(db, 'order'));
        const orderdata = petQuerySnapshot.docs.filter(doc => doc.data())
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        setOrder(orderdata);
        Orders.push(orderdata)
    };

    return (
        <>
            <SideBar />
            <Box
                sx={{
                    marginLeft: 10,
                    marginTop: 5,
                    marginRight: 3,
                }}
            >

                <Stack direction={'row'} sx={{ flexWrap: 'wrap', gap: 2, marginBottom: 2 }}>
                    <Box
                        sx={{
                            background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                            width: 250,
                            height: 200,
                            borderRadius: 3,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h2 style={{ margin: 0, fontSize: '24px', color: '#FFF' }}>Users :{user.length}</h2>
                    </Box>
                    <Box
                        sx={{
                            background: 'linear-gradient(45deg, #8D6BF5, #BF9BFF)',
                            width: 250,
                            height: 200,
                            borderRadius: 3,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h2 style={{ margin: 0, fontSize: '24px', color: '#FFF' }}>Pets :{pet.length}</h2>

                    </Box>
                    <Box
                        sx={{
                            background: 'linear-gradient(45deg, #6BD8FF, #53CFFF)',
                            width: 250,
                            height: 200,
                            borderRadius: 3,
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h2 style={{ margin: 0, fontSize: '24px', color: '#FFF' }}>Orders : {order.length}</h2>
                    </Box>

                </Stack>

                <Stack direction={'row'} sx={{ flexWrap: 'wrap', gap: 2 }}>
                    
                         <OrderLine/> 
                    
                    <div>
                        <CharCircle pet={pet.length} user={user.length} order={order.length} />
                    </div>


                </Stack>
            </Box>
        </>
    )
}
