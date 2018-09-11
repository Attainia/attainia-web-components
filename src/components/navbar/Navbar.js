import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

class Navbar extends PureComponent {
    render() {
        const {
            items
        } = this.props

        return (
            <ul className="menu">
                {typeof items === 'function' ? items() : items}
            </ul>
        )
    }
}

Navbar.propTypes = {
    items: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
}

Navbar.defaultProps = {
    items: () => {}
}

export default Navbar
