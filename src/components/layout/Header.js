import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'
import {LogoutContainer} from '../auth'
import Progress from '../common/Progress'

const ListHeader = styled.header`
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    background: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};

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
        display: block;
        color: ${getThemeProp(['colors', 'misc', 'gray', 'spanishGray'], 'mediumgray')};
        text-decoration: none;
    }

    @supports (display: grid) {
        display: grid;
        grid-area: pageheader;
        align-items: center;
        align-content: start;
        grid-row-gap: 0;
        grid-template-rows: 48px 2px;
        grid-template-columns: 50px 140px 1fr 25px 10em;
        grid-template-areas:
            ". headerlogo . notificationicon logoutlink"
            "pbar pbar pbar pbar pbar";
    }
`
const Header = ({className, continuous, progress, logoutCaption, ...restOfProps}) =>
    <ListHeader className={className}>
        <SimpleSvgIcon
          icon="primary"
          width="112"
          height="36"
          className="headerLogo"
        />
        <SimpleSvgIcon
          className="notificationIcon"
          icon="notification"
          width="17"
          height="20"
          fill={getThemeProp(['colors', 'misc', 'gray', 'spanishGray'], 'mediumgray')(restOfProps)}
        />
        <LogoutContainer className="logoutLink" asLink>{logoutCaption}</LogoutContainer>
        <Progress continuous={continuous} progress={progress} styles={{backgroundColor: 'white', height: '2px'}} />
    </ListHeader>

Header.propTypes = {
    className: PropTypes.string.isRequired,
    continuous: PropTypes.bool,
    logoutCaption: PropTypes.string.isRequired,
    progress: PropTypes.number
}

Header.defaultProps = {
    className: 'list-header',
    logoutCaption: 'Logout'
}

export default withTheme(Header)
