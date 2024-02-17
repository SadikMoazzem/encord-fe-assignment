import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import Modal from 'src/components/Modal/Modal';

describe('Modal', () => {
    it('should render the modal with the provided title', () => {
        const title = 'Test Modal';
        const { getByText } = render(
            <Modal
                title={title}
                isOpen
                toggleModal={() => console.log('test toggle')}
                className=""
                rootClass=""
            >
                <p>Modal content</p>
            </Modal>,
        );

        expect(getByText(title)).toBeInTheDocument();
    });

    it('should call toggleModal function with false when modal is closed', () => {
        const toggleModalMock = jest.fn();
        const { getByTestId } = render(
            <Modal
                title="Test Modal"
                isOpen
                toggleModal={toggleModalMock}
                className=""
                rootClass=""
            >
                <p>Modal content</p>
            </Modal>,
        );

        fireEvent.click(getByTestId('modal-close-button'));

        expect(toggleModalMock).toHaveBeenCalledWith(false);
    });

    it('should render the modal with the provided className and rootClass', () => {
        const className = 'custom-modal-content';
        const rootClass = 'custom-modal';
        const { getByTestId } = render(
            <Modal
                title="Test Modal"
                isOpen
                toggleModal={() => console.log('test toggle')}
                className={className}
                rootClass={rootClass}
            >
                <p>Modal content</p>
            </Modal>,
        );

        const modalContent = getByTestId('modal--content');
        const modalRoot = getByTestId('modal');

        expect(modalContent).toHaveClass(className);
        expect(modalRoot).toHaveClass(rootClass);
    });
});
