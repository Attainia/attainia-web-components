import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {withKnobs, boolean, text} from '@storybook/addon-knobs'
import ModalWrapper from './ModalWrapper'

const props = () => ({
    className: 'some-class',
    disabled: boolean('Disable the launcher button (disabled)', false),
    passiveModal: boolean('Without footer (passiveModal)', false),
    buttonTriggerText: text('The text in the trigger button (buttonTriggerText)', 'Launch Modal'),
    modalLabel: text('The modal label (optional) (modalLabel)', 'Label'),
    modalHeading: text('The modal heading (modalHeading)', 'Modal'),
    primaryButtonText: text('The text in the primary button (primaryButtonText)', 'Save'),
    secondaryButtonText: text('The text in the secondary button (secondaryButtonText)', 'Cancel'),
    shouldCloseAfterSubmit: boolean('Close after submit (shouldCloseAfterSubmit)', true),
    onBlur: action('onBlur'),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onMouseDown: action('onMouseDown'),
    onMouseEnter: action('onMouseEnter'),
    onMouseLeave: action('onMouseLeave'),
    onMouseUp: action('onMouseUp')
})

storiesOf('ModalWrapper', module)
    .addDecorator(withKnobs)
    .add(
        'transactional/passive modal',
        withInfo({
            text: `
        Transactional modals are used to validate user decisions or to gain secondary confirmation from the user.
        Passive modal notifications should only appear if there is an action the user needs to address immediately.
        Passive modal notifications are persistent on screen.
      `
        })(() => (
            <ModalWrapper
                id="transactional-passive-modal"
                handleSubmit={() => {
                    action('onSubmit')()
                    return true
                }}
                {...props()}
            >
                <p className="bx--modal-content__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus fermentum risus, sit
                    amet fringilla nunc pellentesque quis. Duis quis odio ultrices, cursus lacus ac, posuere felis.
                    Donec dignissim libero in augue mattis, a molestie metus vestibulum. Aliquam placerat felis ultrices
                    lorem condimentum, nec ullamcorper felis porttitor. Nunc at maximus purus. Curabitur sodales eros
                    sit amet dolor bibendum gravida. Sed efficitur, arcu imperdiet vestibulum ultrices, risus diam
                    ullamcorper arcu, sit amet gravida metus ligula quis metus.
                </p>
                <p className="bx--modal-content__text">
                    Donec id sapien ex. Duis aliquam tortor nec mollis pulvinar. Fusce sit amet libero blandit,
                    sollicitudin est in, tempor lectus. Donec convallis condimentum mi eu ultrices. Sed risus ipsum,
                    fermentum ut fringilla sed, rutrum eget purus. Morbi molestie dui nisi, consectetur posuere ante
                    viverra non. Integer cursus quis risus ut cursus. Aenean ut dictum nibh. Cras at leo interdum,
                    ornare elit non, posuere enim. Mauris hendrerit nunc eget malesuada congue. Nam velit leo, convallis
                    et lobortis ac, semper ut urna. Etiam nec neque urna. Donec sagittis eros urna, at aliquet erat
                    consectetur ac. Proin faucibus sed erat tempus accumsan. Nam pretium malesuada commodo. Mauris
                    mollis elementum neque, sed ornare urna vestibulum non. Curabitur elementum in ex in commodo. Donec
                    laoreet consequat sapien. Sed eget tortor aliquam, facilisis est vitae, commodo magna. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Mauris a lobortis ex. Nulla mollis tincidunt sodales.
                </p>
            </ModalWrapper>
        ))
    )
