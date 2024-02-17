import * as React from 'react';
import MuiModal from '@mui/material/Modal';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './modal.scss';

type Props = {
    title: string,
    isOpen: boolean,
    className?: string,
    rootClass?: string,
    toggleModal: (isOpen: boolean) => void,
    children: React.ReactNode,
}
const Modal: React.FC<Props> = ({
    title,
    isOpen,
    toggleModal,
    className,
    rootClass,
    children,
}) => (
    <MuiModal
        open={isOpen}
        onClose={() => toggleModal(false)}
    >
        <div className={`modal ${rootClass}`} data-testid="modal">
            <div className="modal--header">
                <h2 className="modal--header_title">
                    {title}
                </h2>
                <Button
                    variant="text"
                    className="modal--header_close"
                    onClick={() => toggleModal(false)}
                    data-testid="modal-close-button"
                >
                    <CloseIcon />
                </Button>
            </div>
            <div className={`modal--content ${className}`} data-testid="modal--content">
                {children}
            </div>
        </div>
    </MuiModal>
);

export default Modal;
