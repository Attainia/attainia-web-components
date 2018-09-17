import React from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
import styled, { withTheme } from 'styled-components'
import { SimpleSvgIcon } from '../common'
import { LogoutContainer } from '../auth'
import Progress from '../common/Progress'

const MessageWrapper = styled.div`
    grid-area: statusmessage;
    @media ${pathOr('screen and (max-width: 599px)', ['theme', 'breakpoints', 'phone'])} {
        display: none;
    }
    @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
        display: grid;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        overflow: hidden;
        color: ${pathOr('mediumgray', ['theme', 'colors', 'misc', 'gray', 'spanishGray'])};
        font-size: ${pathOr('12px', ['theme', 'fonts', 'fontSize'])};
        transition: transform 0.4s ease;
        transform: translate(0, ${props => ((props.hasMessage && !props.fadingOutMessage) ? '0' : '-50px')});
    }
`
const ListHeader = styled.header`
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    background: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};

    & svg {
        display: block;
    }
    .headerLogo {
        grid-area: headerlogo;
    }
    .notificationIcon {
        grid-area: notificationicon;
    }
    .logoutLink {
        grid-area: logoutlink;
        display: inline-block;
        color: ${pathOr('mediumgray', ['theme', 'colors', 'misc', 'gray', 'spanishGray'])};
        text-decoration: none;
    }

    @supports (display: grid) {
        display: grid;
        grid-area: pageheader;
        position: sticky;
        top: 0;
        z-index: 9999;
        align-items: center;
        align-content: start;
        justify-items: center;
        grid-row-gap: 0;
        grid-template-rows: 48px 2px;
        @media ${pathOr('screen and (max-width: 599px)', ['theme', 'breakpoints', 'phone'])} {
            grid-template-columns: 20px 112px 1fr 25px auto;
            grid-template-areas:
                ". headerlogo statusmessage notificationicon logoutlink"
                "pbar pbar pbar pbar pbar";
        }
        @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
            grid-template-columns: 50px 112px 1fr 25px auto;
            grid-template-areas:
                ". headerlogo statusmessage notificationicon logoutlink"
                "pbar pbar pbar pbar pbar";
        }
    }
`
const Header = ({
    className,
    continuous,
    progress,
    fadingOutMessage,
    statusMessage,
    logoutCaption,
    renderLogout,
    ...restOfProps
}) =>
    <ListHeader className={className}>
        <SimpleSvgIcon
          icon="primary"
          width="112"
          height="36"
          className="headerLogo"
        />
        <MessageWrapper fadingOutMessage={fadingOutMessage} hasMessage={!!statusMessage}>
            {statusMessage}
        </MessageWrapper>
        <SimpleSvgIcon
          className="notificationIcon"
          icon="notification"
          width="17"
          height="20"
          fill={pathOr('mediumgray', ['theme', 'colors', 'misc', 'gray', 'spanishGray'])(restOfProps)}
        />
        {renderLogout ?
            renderLogout() :
            <LogoutContainer className="logoutLink" asLink>{logoutCaption}</LogoutContainer>
        }
        <Progress continuous={continuous} progress={progress} styles={{ backgroundColor: 'white', height: '2px' }} />
    </ListHeader>

Header.propTypes = {
    renderLogout: PropTypes.func,
    className: PropTypes.string.isRequired,
    continuous: PropTypes.bool,
    fadingOutMessage: PropTypes.bool,
    logoutCaption: PropTypes.string.isRequired,
    statusMessage: PropTypes.string,
    progress: PropTypes.number
}

Header.defaultProps = {
    renderLogout: null,
    className: 'list-header',
    fadingOutMessage: false,
    logoutCaption: 'Logout'
}

export default withTheme(Header)
