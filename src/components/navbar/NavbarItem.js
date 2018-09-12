import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

class NavbarItem extends PureComponent {
    onClickHandler = (event) => {
        this.props.onClick(event, this.props.url)
    }
    render() {
        const {
            text,
            subNavbar
        } = this.props

        return (
            <li>
                <button onClick={this.onClickHandler}>{text}</button>
                {subNavbar && <Navbar items={subNavbar} />}
            </li>
        )
    }
}

NavbarItem.propTypes = {
    url: PropTypes.string,
    text: PropTypes.string,
    subNavbar: PropTypes.element,
    onClick: PropTypes.func.isRequired
}

NavbarItem.defaultProps = {
    url: '',
    text: ''
}

export default NavbarItem