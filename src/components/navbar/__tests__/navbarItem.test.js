import React from 'react'
import {mount} from 'enzyme'
import fakeConsole from '../../../__mocks__/fakeConsole'
import NavbarItem from '../NavbarItem'

const defaultProps = {
    url: '#',
    text: 'someText',
    onClick: () => {}
}
const consoleSpy = fakeConsole()
describe('NavbarItem', () => {
    it('should render', () => {
        const wrapper = mount(
            <NavbarItem
                {...defaultProps}
            />
        )
        expect(wrapper).toBeDefined()
        consoleSpy.shouldHaveNoErrors()
    })

    it('should be clickable', () => {
        const clickFn = jest.fn()
        const event = {
            preventDefault() {}
        }
        const navbarItemWrapper = mount(<NavbarItem {...defaultProps} onClick={clickFn} />)
        navbarItemWrapper.simulate('click')
        navbarItemWrapper.find('NavbarItem').instance().onClickHandler(event)

        expect(clickFn.mock.calls.length).toBeGreaterThan(0)
        navbarItemWrapper.unmount()
    })
})