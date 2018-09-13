// Based on https://github.com/IBM/carbon-components-react/blob/master/src/components/Modal/Modal-test.js
import React from 'react'
import {shallow, mount} from 'enzyme'
import ModalWrapper from '../../modal-wrapper/ModalWrapper'
import Modal from '../Modal'

describe('Modal', () => {
    describe('Renders as expected', () => {
        const wrapper = shallow(<Modal modalHeading="My Heading" className="extra-class" />)
        const mounted = mount(<Modal modalHeading="My Heading" className="extra-class" />)

        it('has the expected classes', () => {
            expect(wrapper.hasClass('bx--modal')).toEqual(true)
        })

        it('should add extra classes that are passed via className', () => {
            expect(wrapper.hasClass('extra-class')).toEqual(true)
        })

        it('should not be a passive modal by default', () => {
            expect(wrapper.hasClass('bx--modal-tall')).toEqual(true)
        })

        it('should be a passive modal when passiveModal is passed', () => {
            wrapper.setProps({passiveModal: true})
            expect(wrapper.hasClass('bx--modal-tall')).toEqual(false)
        })

        it('should set id if one is passed via props', () => {
            const modal = shallow(<Modal id="modal-1" />)
            expect(modal.props().id).toEqual('modal-1')
        })

        it('has the expected default iconDescription', () => {
            expect(mounted.props().iconDescription).toEqual('close the modal')
        })

        it('adds new iconDescription when passed via props', () => {
            mounted.setProps({iconDescription: 'new description'})
            mounted.update()
            expect(mounted.props().iconDescription).toEqual('new description')
        })

        it('should have iconDescription match Icon component description prop', () => {
            const matches = mounted.props().iconDescription === mounted.find('Icon').props().description
            mounted.update()
            expect(matches).toEqual(true)
        })

        it('enables primary button by default', () => {
            const primaryButton = mounted.find('.bx--modal__buttons-container .bx--btn').at(0)
            expect(primaryButton.prop('disabled')).toEqual(false)
        })

        it('disables primary button when diablePrimaryButton prop is passed', () => {
            mounted.setProps({primaryButtonDisabled: true})
            const primaryButton = mounted.find('.bx--modal__buttons-container .bx--btn').at(1)
            expect(primaryButton.props().disabled).toEqual(true)
        })

        it('should hide header when modalHeading prop isnt specified', () => {
            mounted.setProps({modalHeading: undefined})
            mounted.update()
            const header = mounted.find('.bx--modal-header__heading')
            expect(header).toHaveLength(0)
        })
    })

    describe('Adds props as expected to the right children', () => {
        it('should set modal heading if one is passed via props', () => {
            const wrapper = shallow(<Modal modalHeading="modal-1" />)
            const heading = wrapper.find('.bx--modal-header__heading')
            expect(heading.props().children).toEqual('modal-1')
        })

        it('should set button text if one is passed via props', () => {
            const wrapper = shallow(<Modal primaryButtonText="Submit" secondaryButtonText="Cancel" />)
            const modalButtons = wrapper.find('.bx--modal__buttons-container').props().children
            expect(modalButtons[0].props.children).toEqual('Cancel')
            expect(modalButtons[1].props.children).toEqual('Submit')
        })
    })

    describe('events', () => {
        it('should set expected class when state is open', () => {
            const wrapper = mount(<ModalWrapper />)
            const modal = wrapper.find(Modal)
            const modalContainer = modal.find('.bx--modal')
            const openClass = 'is-visible'

            expect(modalContainer.hasClass(openClass)).not.toEqual(true)
            wrapper.setState({isOpen: true})
            expect(wrapper.find('.bx--modal').hasClass(openClass)).toEqual(true)
        })

        it('should set state to open when trigger button is clicked', () => {
            const wrapper = mount(<ModalWrapper />)
            const triggerBtn = wrapper.children().childAt(0)
            expect(wrapper.state('isOpen')).not.toEqual(true)
            triggerBtn.simulate('click')
            expect(wrapper.state('isOpen')).toEqual(true)
        })

        it('should set open state to false when close button is clicked', () => {
            const wrapper = mount(<ModalWrapper modalHeading="My Heading" />)
            const modal = wrapper.find(Modal)
            const closeBtn = modal.find('.bx--modal-close')
            wrapper.setState({isOpen: true})
            expect(wrapper.state('isOpen')).toEqual(true)
            closeBtn.simulate('click')
            expect(wrapper.state('isOpen')).not.toEqual(true)
        })

        it('should stay open when "inner modal" is clicked', () => {
            const wrapper = mount(<ModalWrapper />)
            const modal = wrapper.find(Modal)
            const div = modal.find('.bx--modal-container')
            wrapper.setState({isOpen: true})
            div.simulate('click')
            expect(wrapper.state('isOpen')).toEqual(true)
        })

        it('should close when "outer modal" is clicked...not "inner modal"', () => {
            const wrapper = mount(<ModalWrapper />)
            const modal = wrapper.find(Modal)
            const div = modal.find('.bx--modal')
            wrapper.setState({isOpen: true})
            div.simulate('click')
            expect(wrapper.state('isOpen')).toEqual(false)
        })

        it('should handle close keyDown events', () => {
            const onRequestClose = jest.fn()
            const wrapper = mount(<Modal onRequestClose={onRequestClose} />)
            wrapper.simulate('keyDown', {which: 26})
            expect(onRequestClose).not.toBeCalled()
            wrapper.simulate('keyDown', {which: 27})
            expect(onRequestClose).toBeCalled()
        })

        it('should handle submit keyDown events with shouldSubmitOnEnter enabled', () => {
            const onRequestSubmit = jest.fn()
            const wrapper = mount(<Modal onRequestSubmit={onRequestSubmit} shouldSubmitOnEnter />)
            wrapper.simulate('keyDown', {which: 14})
            expect(onRequestSubmit).not.toBeCalled()
            wrapper.simulate('keyDown', {which: 13})
            expect(onRequestSubmit).toBeCalled()
        })

        it('should not handle submit keyDown events with shouldSubmitOnEnter not enabled', () => {
            const onRequestSubmit = jest.fn()
            const wrapper = mount(<Modal onRequestSubmit={onRequestSubmit} />)
            wrapper.simulate('keyDown', {which: 14})
            expect(onRequestSubmit).not.toBeCalled()
            wrapper.simulate('keyDown', {which: 13})
            expect(onRequestSubmit).not.toBeCalled()
        })

        it('should close by default on secondary button click', () => {
            const onRequestClose = jest.fn()
            const modal = mount(<Modal onRequestClose={onRequestClose} />)
            const secondaryBtn = modal.find('.bx--btn--secondary')
            secondaryBtn.simulate('click')
            expect(onRequestClose).toBeCalled()
        })

        it('should handle custom secondary button events', () => {
            const onSecondarySubmit = jest.fn()
            const modal = mount(<Modal onSecondarySubmit={onSecondarySubmit} />)
            const secondaryBtn = modal.find('.bx--btn--secondary')
            secondaryBtn.simulate('click')
            expect(onSecondarySubmit).toBeCalled()
        })
        it('should handle onBlur events', () => {
            const modal = mount(<Modal open />)
            const fakeDiv = mount(<div />)
            const focusModalMock = jest.fn()
            modal.instance().focusModal = focusModalMock
            modal.instance().handleBlur({relatedTarget: fakeDiv.instance()})
            expect(focusModalMock).toHaveBeenCalled()
        })
        it('should call focusModal if innerModal is set', () => {
            const modal = mount(<Modal />)
            const focusMock = jest.fn()
            modal.instance().outerModal.focus = focusMock
            modal.instance().focusModal()
            expect(focusMock).toHaveBeenCalled()
        })
        it('elementOrParentisFloatingMenu should return boolean if closest isnt available', () => {
            const modal = mount(<Modal selectorsFloatingMenus={['.fake']} />)
            const fakeDiv = mount(<div />)
            const fakeDivInst = fakeDiv.instance()
            fakeDivInst.closest = null
            // eslint-disable-next-line
            Element = Object.create({prototype: {}})
            Element.prototype.matches = () => true
            fakeDivInst.matches = () => true
            const result = modal.instance().elementOrParentIsFloatingMenu(fakeDivInst)
            expect(result).toBeTruthy()
        })
    })
})
describe('Modal Wrapper', () => {
    describe('Renders as expected', () => {
        const wrapper = mount(<ModalWrapper />)

        it('should default to primary button', () => {
            expect(wrapper.find('.bx--btn--primary').length).toEqual(2)
        })

        it('should render ghost button when ghost is passed', () => {
            wrapper.setProps({triggerButtonKind: 'ghost'})
            expect(wrapper.find('.bx--btn--ghost').length).toEqual(1)
        })

        it('should render danger button when danger is passed', () => {
            wrapper.setProps({triggerButtonKind: 'danger'})
            expect(wrapper.find('.bx--btn--danger').length).toEqual(1)
        })

        it('should render secondary button when secondary is passed', () => {
            wrapper.setProps({triggerButtonKind: 'secondary'})
            expect(wrapper.find('.bx--btn--secondary').length).toEqual(2)
        })
        it('should handleClose on handleSubmit', () => {
            wrapper.setProps({shouldCloseAfterSubmit: true, handleSubmit: () => true})
            wrapper.setState({isOpen: true})
            wrapper.update()
            wrapper.instance().handleOnRequestSubmit()
            wrapper.update()
            expect(wrapper.state().isOpen).toBeFalsy()
        })
        it('should call prop onKeyDown with handleOnKeyDown when esc is called', () => {
            const onKeyDownFake = jest.fn()
            wrapper.setProps({onKeyDown: onKeyDownFake()})
            wrapper.find('[role="presentation"]').at(0).simulate('keydown', {which: 27})
            expect(onKeyDownFake).toHaveBeenCalled()
        })
    })
})
describe('Danger Modal', () => {
    describe('Renders as expected', () => {
        const wrapper = shallow(<Modal danger />)

        it('has the expected classes', () => {
            expect(wrapper.hasClass('bx--modal--danger')).toEqual(true)
        })

        it('has correct button combination', () => {
            const modalButtons = wrapper.find('.bx--modal__buttons-container').props().children
            expect(modalButtons[0].props.kind).toEqual('tertiary')
            expect(modalButtons[1].props.kind).toEqual('danger--primary')
        })
    })
})
