import React from 'react'
import { shallow} from 'enzyme'
import Navbar from '../Navbar'

describe('Navbar', () => {
    it('should render', () => {
        const navbar = shallow(<Navbar />)
        expect(navbar).toBeDefined()
    })
})