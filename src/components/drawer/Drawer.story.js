import React from 'react'
import {storiesOf} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import {withKnobs} from '@storybook/addon-knobs'
import Drawer from './Drawer'

storiesOf('Drawer', module)
    .addDecorator(withKnobs)
    .add(
        'Default',
        withInfo({
            text: `
        The drawer allows you to hide/show content on click
      `
        })(() => (
            <Drawer label={<span>This is the drawer label</span>}>
                <span>There should be some simple content here</span>
            </Drawer>
        ))
    )
    .add(
        'Closed by default',
        withInfo({
            text: `
        The drawer allows you to hide/show content on click - this one should be closed by default
      `
        })(() => (
            <Drawer expanded={false} label={<span>This is the drawer label</span>}>
                <span>There should be some simple content here</span>
            </Drawer>
        ))
    )
