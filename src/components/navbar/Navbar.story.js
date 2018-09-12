import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Navbar from './Navbar'
import NavbarItem from './NavbarItem'

const navbarItems = [
    {
        text: 'Home',
        url: '#'
    },
    {
        text: 'Projects',
        url: '#'
    },
    {
        text: 'Catalog',
        url: '#',
        subNavbar: [
            {
                text: 'Products',
                url: '#'
            },
            {
                text: 'Categories',
                url: '#'
            },
            {
                text: 'Subcategories',
                url: '#'
            },
            {
                text: 'Suppliers',
                url: '#'
            },
            {
                text: 'Recomendations',
                url: '#'
            }
        ]
    },
    {
        text: 'Templates',
        url: '#'
    },
    {
        text: 'Admin',
        url: '#',
        subNavbar: [
            {
                text: 'Organizations',
                url: '#'
            },
            {
                text: 'Users',
                url: '#'
            }
        ]
    }
]

const createJSX = (items) =>
    <Fragment>
        {items.map((item) =>
            (<NavbarItem
                url={item.url}
                text={item.text}
            />)
        )}
    </Fragment>

const props = {
    regular: () => ({
        className: 'some-class',

        items: () => (
            <Fragment>
                {navbarItems.map((navbarItem) =>
                    ((navbarItem.subNavbar && <NavbarItem
                        url={navbarItem.url}
                        text={navbarItem.text}
                        subNavbar={createJSX(navbarItem.subNavbar)}
                    />) || <NavbarItem url={navbarItem.url} text={navbarItem.text} />)
                )}
            </Fragment>
        )
    }),
    set: () => ({
        className: 'some-class'
    })
}

storiesOf('Navbar', module).add(
    'Default',
    withInfo({
        text: `
        Horizontal Navigation bar with dropdowns
      `
    })(() => {
        const regularProps = props.regular()
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Navbar {...regularProps} className="some-class" />
                &nbsp;
            </div>
        )
    })
)
