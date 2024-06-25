import React from 'react'
import { IModalProps } from '../interfaces/interfaces'

const ModalComponent = (props: IModalProps) => {
    const closeModal = () => {
        props.setModalText(undefined);
        props.setIsModalOpen(false);
    }

    return (
        <>
            <div className='grid place-items-center z-10 absolute left-0 right-0 m-auto mt-10 w-[320px] h-[120px] rounded-3xl bg-slate-800'>
                <div className='flex flex-col'>
                    <p className='text-white text-center my-2'>{props.modalText}</p>
                    <div className='flex justify-center'>
                        <button onClick={() => closeModal()} className='text-black w-32 bg-white px-2 rounded-2xl text-center'>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent
