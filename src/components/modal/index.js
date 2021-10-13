import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicTextFields from '../Input';
import BasicButtons from '../Button';
import { useState, useEffect } from 'react'
import { db, getDocs, collection, query, where, addDoc, doc, updateDoc } from '../../config/Firebase'
import { useParams } from 'react-router-dom';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const { uid } = useParams()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [usersInGroup, SetUsersInGroup] = useState([uid])
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState([]);


    const getAllUsers = async () => {
        const docRef = query(collection(db, "users"), where("uid", '!=', uid));
        const querySnapshot = await getDocs(docRef);
        let arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });
        setUsers(arr)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const addUserInGroup = ({ uid }) => {
        SetUsersInGroup([...usersInGroup, uid])
        console.log(usersInGroup)

    }

    const createGroup = async (user) => {

        let collectionRef = collection(db, 'GroupChat')

        await addDoc(collectionRef, { usersInGroup, groupName, admin: uid, timestamp: new Date() })
            .then((data) => {
                console.log(data.id)
                const washingtonRef = doc(db, "GroupChat", data.id);

                updateDoc(washingtonRef, {
                    groupId : data.id
                    }).then(()=> console.log('done updata') );
                console.log('done')
            })
    }

    return (
        <div>
            <Button onClick={handleOpen}>Create group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Group
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <BasicTextFields onChange={(e) => setGroupName(e.target.value)} name='groupName' type='text' label='Enter Group Name' />
                        <BasicButtons title='Create' onClick={createGroup} />
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select Members
                    </Typography>
                    <Box>
                        {
                            users.map((v, i) => {
                                return (
                                    <div onClick={() => addUserInGroup(users[i])} key={i} className="user_card">
                                        <div className="user_card_pic">
                                            <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt="" />
                                        </div>
                                        <div className="user_data">
                                            <h6>{v.fullName}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
