import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Button, Form, SimpleSvgIcon, ReduxFormField} from '../common'
import {getThemeProp} from '../common/helpers'

const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    & .instructions {
        text-align: center;
    }

    @supports not (display: grid) {
        .registrationButton,
        .attainiaLogo,
        .instructions,
        .password,
        .confirm,
        .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 768px)')} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 'header header' 'inst inst' 'pass pass' 'confirm confirm' 'save save';

            & .attainiaLogo {
                grid-area: header;
            }

            & .instructions {
                grid-area: inst;
            }

            & .password {
                grid-area: pass;
            }

            & .confirm {
                grid-area: confirm;
            }

            & .registrationButton {
                grid-area: save;
            }

            & .cancelButton {
                grid-area: cancel;
            }
        }
    }
`
const RegistrationConfirmation = ({handleSubmit, tryConfirmRegistration, formCaption, registerLabel}) =>
    <StyledForm onSubmit={handleSubmit(tryConfirmRegistration)}>
        <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="primary" />
        <p className="instructions">{formCaption}</p>
        <ReduxFormField className="password" placeholder="password" type="password" name="password" />
        <ReduxFormField className="confirm" placeholder="confirm password" type="password" name="confirm" />
        <Button className="registrationButton" type="submit">{registerLabel}</Button>
    </StyledForm>

RegistrationConfirmation.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryConfirmRegistration: PropTypes.func.isRequired,
    registerLabel: PropTypes.string.isRequired,
    formCaption: PropTypes.string
}

RegistrationConfirmation.defaultProps = {
    registerLabel: 'Register',
    formCaption: 'Registration Confirmation'
}

export default RegistrationConfirmation
