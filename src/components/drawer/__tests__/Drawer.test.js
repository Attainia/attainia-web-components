import React from 'react'
import {shallow} from 'enzyme'
import Drawer from '../Drawer'

describe('Modal', () => {
    describe('Renders as expected', () => {
        const drawer = shallow(
            <Drawer label={<span>This is the drawer label</span>}>
                <span>There should be some simple content here</span>
            </Drawer>
        )

        it('should render', () => {
            expect(drawer).toBeDefined()
        })
    })
})