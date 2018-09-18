import PropTypes from 'prop-types'
import React, {Component} from 'react'

export default class Drawer extends Component {
    static propTypes = {
        children: PropTypes.node,
        label: PropTypes.node,
        expanded: PropTypes.bool
    }

    static defaultProps = {
        expanded: true
    }

    state = {
        isOpen: this.props.expanded
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const {
            label,
            children
        } = this.props

        const expansionState = this.state.isOpen ? 'open' : 'close'

        return (
            <div className="bx--drawer">
                <div
                    className="bx--drawer__header"
                    onClick={this.toggleOpen}
                    role="presentation"
                >
                    <div className={`bx--drawer__header--icon bx--drawer__header--icon__${expansionState}`} />
                    <div className="bx--drawer__header--label">
                        {label}
                    </div>
                </div>
                <div className={`bx--drawer__content bx--drawer__content__${expansionState}`}>
                    {children}
                </div>
            </div>
        )
    }
}
