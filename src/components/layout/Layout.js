import {is} from 'ramda'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Page from './Page'
import StickyMessages from './StickyMessages'

class Layout extends PureComponent {
    state = {
        isCollapsed: false
    }
    toggleNavList = () => this.setState({isCollapsed: !this.state.isCollapsed})
    render() {
        const {children, renderNavBar, ...restOfProps} = this.props
        const propsToggle = is(Function, this.props.toggleMenu)
        return (
            <Page isCollapsed={propsToggle ? this.props.isCollapsed : this.state.isCollapsed}>
                <Header {...restOfProps} />
                <div style={{ gridArea: 'sidebar' }}>
                    {renderNavBar(restOfProps)}
                </div>
                <Main {...restOfProps}>{children}</Main>
                <Footer />
                <StickyMessages {...restOfProps} />
            </Page>
        )
    }
}

Layout.propTypes = {
    isCollapsed: PropTypes.bool,
    toggleMenu: PropTypes.func,
    children: PropTypes.node,
    renderNavBar: PropTypes.func.isRequired
}

export const withLayout = (WrappedComponent) => {
    const WithLayout = ({renderNavBar, ...passThroughProps}) =>
        <Layout renderNavBar={renderNavBar} {...passThroughProps}>
            <WrappedComponent {...passThroughProps} />
        </Layout>

    WithLayout.propTypes = {
        renderNavBar: PropTypes.func
    }

    return WithLayout
}

export const withTheseNavItems = (renderNavBar, layoutProps = {}) => (WrappedComponent) => {
    const WithLayout = props =>
        <Layout renderNavBar={renderNavBar} {...props} {...layoutProps}>
            <WrappedComponent {...props} />
        </Layout>

    WithLayout.propTypes = {
        renderNavBar: PropTypes.func
    }

    return WithLayout
}

export default Layout
