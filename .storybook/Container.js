import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import './_container.scss'

export default class Container extends PureComponent {
    static propTypes = {
        story: PropTypes.func.isRequired
    }
    render() {
        const {story} = this.props

        return (
            <React.StrictMode>
                <div
                    data-floating-menu-container
                    role="main"
                    style={{
                        padding: '3em',
                        alignItems: 'center'
                    }}
                >
                    {story()}
                </div>
                <input aria-label="input-text-offleft" type="text" className="bx--visually-hidden" />
            </React.StrictMode>
        )
    }
}
