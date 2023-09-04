'use client'

import { css } from 'styled-components'

export const DefaultPageLayout = css`
    padding: 12px 24px;
    min-height: 100vh;
    background-color: var(--bg-primary);

    @media (min-width: ${props => props.theme.desktopBreakpoint}) {
        padding: 34px 160px;
    }
`
