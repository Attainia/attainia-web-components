import {pathOr} from 'ramda'
import styled from 'styled-components'

export default styled.div`
    height: 100%;

    @supports not (display: grid) {
        .header,
        .main,
        .sidebar,
        .footer {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${pathOr('screen and (max-width: 599px)', ['theme', 'breakpoints', 'phone'])} {
            display: grid;
            grid-template-areas: 'pageheader' 'sidebar' 'main' 'footer';
        }

        @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
            display: grid;
            grid-template-areas:
                'pageheader'
                'sidebar'
                'main'
                'footer';
        }
    }
`
