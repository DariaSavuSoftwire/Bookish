import {Label, Input, Button, ButtonsWrapper, Title, Error, ModalBox} from "./AddUserModalComponents";
import Modal from '@mui/material/Modal';

import {useEffect, useState} from "react";
import CreatableSelect from "react-select/creatable";
import {ROLE_OPTIONS} from "../Constants";

const AddUserModal = ({isOpen, onClose, onConfirm, error}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [role, setRole] = useState({label: '', value: ''});
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    const handleConfirmClick = () => {
        onConfirm(name, username, role.value, password);
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
        >
            <ModalBox>
                <Title>Create a user</Title>
                <div>
                    <Label>Name:</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Book author(s)</Label>
                    <CreatableSelect
                        onChange={(selectedRole) => setRole(selectedRole)}
                        options={ROLE_OPTIONS}
                    />
                </div>
                <ButtonsWrapper>
                    <Button onClick={handleConfirmClick}>Confirm</Button>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </ButtonsWrapper>
                {errorMessage &&
                    <Error>{errorMessage}</Error>}
            </ModalBox>
        </Modal>
    )
}

export default AddUserModal;