import React from 'react'
import {mount, shallow} from 'enzyme'
import Button from '../Button'

describe('Button', () => {
    it('should render', () => {
        const button = shallow(<Button />)
        expect(button).toBeDefined()
    })

    it('should be clickable', () => {
        const clickFn = jest.fn()
        const buttonWrapper = mount(<Button onClick={clickFn} />)
        buttonWrapper.simulate('click')
        expect(clickFn.mock.calls.length).toBeGreaterThan(0)
        buttonWrapper.unmount()
    })
})