import PropTypes from 'prop-types'
import React from 'react'
import Modal from '../modal'
import Button from '../button'

export default class ModalWrapper extends React.Component {
    static propTypes = {
        status: PropTypes.string,
        handleOpen: PropTypes.func,
        children: PropTypes.node,
        id: PropTypes.string,
        buttonTriggerText: PropTypes.node,
        buttonTriggerClassName: PropTypes.string,
        modalLabel: PropTypes.string,
        modalHeading: PropTypes.string,
        modalText: PropTypes.string,
        passiveModal: PropTypes.bool,
        withHeader: PropTypes.bool,
        modalBeforeContent: PropTypes.bool,
        primaryButtonText: PropTypes.string,
        secondaryButtonText: PropTypes.string,
        handleSubmit: PropTypes.func,
        onKeyDown: PropTypes.func,
        disabled: PropTypes.bool,
        triggerButtonKind: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'danger--primary', 'tertiary']),
        shouldCloseAfterSubmit: PropTypes.bool
    }

    static defaultProps = {
        primaryButtonText: 'Save',
        secondaryButtonText: 'Cancel',
        triggerButtonKind: 'primary',
        disabled: false,
        onKeyDown: () => {}
    }

    state = {
        isOpen: false
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    }

    handleOnRequestSubmit = () => {
        const {handleSubmit, shouldCloseAfterSubmit} = this.props

        if (handleSubmit()) {
            if (shouldCloseAfterSubmit) {
                this.handleClose()
            }
        }
    }

    render() {
        const {
            children,
            onKeyDown,
            buttonTriggerText,
            buttonTriggerClassName,
            triggerButtonKind,
            disabled,
            handleSubmit, // eslint-disable-line no-unused-vars
            shouldCloseAfterSubmit, // eslint-disable-line no-unused-vars
            ...other
        } = this.props

        const props = {
            ...other,
            open: this.state.isOpen,
            onRequestClose: this.handleClose,
            onRequestSubmit: this.handleOnRequestSubmit
        }

        return (
            <div
                role="presentation"
                onKeyDown={evt => {
                    if (evt.which === 27) {
                        this.handleClose()
                        onKeyDown(evt)
                    }
                }}
            >
                <Button
                    className={buttonTriggerClassName}
                    disabled={disabled}
                    kind={triggerButtonKind}
                    onClick={this.handleOpen}
                >
                    {buttonTriggerText}
                </Button>
                <Modal {...props}>{children}</Modal>
            </div>
        )
    }
}