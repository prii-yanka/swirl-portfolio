import React from 'react'

const Modal = ({ closeModal }) => {
    return (
        <div className='modalContainer'>
            <div>Modal</div>
            <button onClick={() => closeModal(false)}> X </button>
        </div>
    )
}

export default Modal