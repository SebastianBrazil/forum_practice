export interface FormData {
    firstN: string;
    lastN: string;
    email: string;
    dob: string;
    address: string;
    phoneN: string;
    password: string;
    conPassword: string;
}

export interface IModalProps {
    modalText: string,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalText: React.Dispatch<React.SetStateAction<string | undefined>>
}