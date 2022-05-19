import Modal from "react-modal";
import React, { Fragment, useEffect } from "react";

import "./PinModal.css";
interface Props {
    isOpen: boolean;
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export const PinModal: React.FC<Props> = ({ children, isOpen }) => {
    const [modalIsOpen, setIsOpen] = React.useState(isOpen);

    useEffect(() => {
        setIsOpen(isOpen);
        return () => {
            setIsOpen(false);
        };
    }, [isOpen]);

    // function openModal() {
    //     setIsOpen(true);
    // }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <Fragment>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="Overlay"
                className="Modal"
            >
                <div className="bpl-relative bpl-w-full">
                    <button
                        onClick={closeModal}
                        className="bpl-p-2.5 bpl-absolute -bpl-top-8 -bpl-right-8 bpl-text-white bpl-transition-colors bpl-duration-300 hover:bpl-bg-red-600 bpl-bg-red-500 bpl-rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="bpl-fill-current" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="bpl-fill-current" width="32" height="32" viewBox="0 0 24 24">
                            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5 15.538l-3.592-3.548 3.546-3.587-1.416-1.403-3.545 3.589-3.588-3.543-1.405 1.405 3.593 3.552-3.547 3.592 1.405 1.405 3.555-3.596 3.591 3.55 1.403-1.416z" />
                        </svg> */}
                    </button>
                    {children}
                </div>
            </Modal>
        </Fragment>
    );
};
