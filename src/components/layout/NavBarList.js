import uuid from 'uuid/v4'
import React from 'react'
import PropTypes from 'prop-types'
import {isStringieThingie, isImageUrl} from 'attasist'
import NavLink from 'react-router-dom/NavLink'
import styled, {withTheme} from 'styled-components'
import {always, cond, curry, is, pathOr, propEq, propIs, propSatisfies, T} from 'ramda'
import Drawer from './Drawer'
import {SimpleSvgIcon} from '../common'

const NavAction = styled.div`
    &:hover {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: grid;
    align-content: start;
    box-sizing: border-box;
`
const Li = styled.li`
    display: grid;
    align-items: center;
    transition: background 0.1s ease;
    color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    list-style: none;
    font-size: ${pathOr('15px', ['fontSize'])};
    cursor: pointer;

    & a, .nav-action, .nav-label {
        padding: ${pathOr('10px 0', ['padding'])};
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
        & svg, img {
            grid-area: nav-icon;
            justify-self: center;
        }
        & span {
            grid-area: nav-text;
            display: block;
            user-select: none;
        }
        @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
            ${props => props.isCollapsed && '& span {display: none;}'}
        }
        display: grid;
        grid-column-gap: 8px;
        text-decoration: none;
        grid-template-columns: 5px auto${props => !props.isCollapsed && ' 1fr'};
        grid-template-areas: ". nav-icon${props => !props.isCollapsed && ' nav-text'}";
        align-items: center;
    }

    & .nav-label, &.nav-action {
        grid-template-columns: 7px auto 1fr;
    }

    & a.active {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const SubLi = styled(Li)`
    & a, .nav-action, .nav-label {
        grid-template-columns: 20px auto 1fr;
    }
`
const NavUl = styled(Ul)`
    grid-area: sidebar;
    background-color: ${pathOr('black', ['theme', 'colors', 'grayscale', 'black'])};
    @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
        top: 0;
        position: sticky;
        height: calc(100vh - 0px);
    }
`
const ToggleArrow = styled.li`
    @media ${pathOr('screen and (max-width: 599px)', ['theme', 'breakpoints', 'phone'])} {
        display: none;
    }
    @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
        cursor: pointer;
        position: fixed;
        bottom: 15px;
        left: 10px;
        display: inline-block;
        list-style: none;
        font-size: 12px;
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
        &:before {
            content: '';
            display: inline-block;
            width: 0.6em;
            height: 0.6em;
            margin-right: 5px;
            border-style: solid;
            border-width: 0.18em 0.18em 0 0;
            transform: rotate(${props => (props.isCollapsed ? 45 : 225)}deg);
            transition: transform .05s ease;
        }
    }
`

const navItems = {
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    iconHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    iconWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

/**
 * Wraps a click handler with a simple check to see if it returned an object wth
 * a "type" value. If that is the case AND if a dispatch function is available
 * in the props, the dispatch() is invoked with the returned value from the
 * click handler (which in that case is just a Redux action creator function,
 * not a click handler per se).
 *
 * @func
 * @sig {k: v} -> {k: v} -> *
 * @param {Object} props A set of component props that contains an onClick and
 * (optionally) a dispatch function
 * @param {Object} event A click event
 * @returns {*} The result from the onClick function
 */
const handleClick = curry(
    ({onClick, dispatch, ...restOfProps}, event) => {
        if (is(Function, onClick)) {
            const result = onClick(event, restOfProps)
            if (is(Function, dispatch) && propSatisfies(isStringieThingie, 'type', result)) {
                dispatch(result)
            }
            return result
        }
        return event
    }
)

const Action = ({width, height, icon, label, ...restOfProps}) =>
    <NavAction className="nav-action" onClick={handleClick(restOfProps)}>
        {isImageUrl(icon) && <img alt={label} width={width || 10} height={height || 10} src={icon} />}
        {icon && !isImageUrl(icon) &&
            <SimpleSvgIcon
              width={width || 10}
              height={height || 10}
              icon={icon}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            />
        }
        {label && <span>{label}</span>}
    </NavAction>

Action.propTypes = {...navItems}

const Link = ({link, width, height, icon, label, ...restOfProps}) =>
    <NavLink to={link}>
        {isImageUrl(icon) && <img alt={label} width={width || 10} height={height || 10} src={icon} />}
        {icon && !isImageUrl(icon) &&
            <SimpleSvgIcon
              width={width || 10}
              height={height || 10}
              icon={icon}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            />
        }
        {label && <span>{label}</span>}
    </NavLink>

Link.propTypes = {...navItems}

const LabelAndIcon = ({width, height, icon, label, ...restOfProps}) =>
    <NavAction className="nav-label">
        {isImageUrl(icon) && <img alt={label} width={width || 10} height={height || 10} src={icon} />}
        {icon && !isImageUrl(icon) &&
            <SimpleSvgIcon
              width={width || 10}
              height={height || 10}
              icon={icon}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            />
        }
        {label && <span>{label}</span>}
    </NavAction>

LabelAndIcon.propTypes = {...navItems}

const IconOnly = ({width, height, icon, label, ...restOfProps}) =>
    <NavAction className="nav-label">
        {isImageUrl(icon) && <img alt={label} width={width || 10} height={height || 10} src={icon} />}
        {(isStringieThingie(icon) && !isImageUrl(icon)) ?
            <SimpleSvgIcon
              width={width || 10}
              height={height || 10}
              icon={icon}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            /> : icon
        }
    </NavAction>

IconOnly.propTypes = {...navItems}

const NavMap = cond([
    [propIs(Function, 'onClick'), Action],
    [propSatisfies(isStringieThingie, 'link'), Link],
    [propSatisfies(isStringieThingie, 'label'), LabelAndIcon],
    [propSatisfies(isStringieThingie, 'icon'), IconOnly],
    [T, always(null)]
])

NavMap.displayName = 'NavMap'
NavMap.propTypes = {...navItems}

const SubItem = cond([
    [propEq('isIndented', true), props => <SubLi fontSize="14px" {...props} />],
    [T, props => <Li {...props} />]
])

SubItem.displayName = 'SubItem'
SubItem.propTypes = {
    children: PropTypes.node,
    isIndented: PropTypes.bool
}

const NavBarList = ({className, items, toggleMenu, isCollapsed, ...restOfProps}) =>
    <NavUl className={className} isCollapsed={isCollapsed}>
        {items.map(({icon, link, label, iconWidth = 20, iconHeight = 20, items: subItems}) =>
            <Li key={uuid()} role="presentation" isCollapsed={isCollapsed}>
                {Array.isArray(subItems) && !isCollapsed ?
                    <Drawer
                      title={label}
                      icon={icon}
                      styles={{
                          fontSize: '15px',
                          fontWeight: 'normal',
                          padding: '10px 15px',
                          backgroundColor: 'transparent'
                      }}
                    >
                        <Ul>
                            {subItems.map(sm =>
                                <SubItem key={uuid()} {...sm}>
                                    <NavMap
                                      {...{
                                          ...restOfProps,
                                          ...sm,
                                          width: sm.iconWidth,
                                          height: sm.iconHeight
                                      }}
                                    />
                                </SubItem>
                            )}
                        </Ul>
                    </Drawer> :
                    <NavMap
                      {...{
                          ...restOfProps,
                          width: iconWidth,
                          height: iconHeight,
                          label: isCollapsed ? '' : label,
                          icon,
                          link
                      }}
                    />
                }
            </Li>
        )}
        <ToggleArrow onClick={toggleMenu} isCollapsed={isCollapsed}>
            {isCollapsed ? '' : 'Hide'}
        </ToggleArrow>
    </NavUl>

NavBarList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        ...navItems,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        items: PropTypes.arrayOf(PropTypes.shape(navItems))
    })),
    toggleMenu: PropTypes.func,
    isCollapsed: PropTypes.bool,
    className: PropTypes.string.isRequired
}

NavBarList.defaultProps = {
    className: 'sidebar',
    isCollapsed: false,
    items: []
}

export default withTheme(NavBarList)
