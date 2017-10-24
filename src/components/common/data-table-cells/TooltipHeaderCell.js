import React from 'react'

import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'

import SimpleSvgIcon from '../SimpleSvgIcon'


export class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {data, sortData, sortCallback, ...props} = this.props

        const handleClick = () => {
            sortCallback(data.key)
        }

        const FlexDiv = styled.div`
            display: flex;
        `

        const LeftFlexSpan = styled.span`
            align-items: center;
            display: flex;
            flex-grow: 3;
            order: 1;
        `

        const RightFlexSpan = styled.span`
            display: flex;
            order: 2;
            margin-left: 5px;
            width: 12px;
        `

        const HeaderLink = styled.a`
            text-decoration: underline;
            width: 100%;
            :hover {
                cursor: pointer;
            }
        `

        const SortIcon = styled(SimpleSvgIcon)`
        `
        let sortIcon = ''

        if (sortData.columnKey === data.key) {
            sortIcon = (sortData.sortDirection === 'desc') ? 'sort_desc' : 'sort_asc'
        }

        return (
            <Cell {...props} data-tip={data.toolTip} data-for={'header-tooltip'}>
                <FlexDiv>
                    <LeftFlexSpan>
                        <HeaderLink onClick={handleClick}>{data.name}</HeaderLink>
                    </LeftFlexSpan>
                    <RightFlexSpan>
                        <SortIcon icon={sortIcon} />
                    </RightFlexSpan>
                </FlexDiv>
            </Cell>
        )
    }
}

TooltipHeaderCell.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            toolTip: PropTypes.string,
            key: PropTypes.string,
            width: PropTypes.number,
            fixed: PropTypes.bool,
            columnType: PropTypes.symbol
        }),
    ).isRequired,
    sortData: PropTypes.shape({
        columnKey: PropTypes.string,
        sortDirection: PropTypes.string
    }),
    sortCallback: PropTypes.func
}

export default TooltipHeaderCell
