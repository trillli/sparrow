import { Box, Slider, SliderProps, useTheme } from '@mui/material'
import React from 'react'

const TrSlider: React.FC<SliderProps> = (props) => {

    // State Variables & Related ------------------------------------------------------------------ //

    // Effects & Related -------------------------------------------------------------------------- //

    // Event Handlers & Related ------------------------------------------------------------------- //

    // Other vars, util functions, etc ------------------------------------------------------------ //

    const theme = useTheme()

    let hasMarkLabels: boolean = false
    type Mark = {
        value: number
        label?: string
    }

    const marks: Mark[] | boolean | undefined = props.marks
    if (marks && Array.isArray(marks)) {
        marks.forEach((mark) => {
            if (mark.hasOwnProperty('label')) {
                hasMarkLabels = true
            }
        })
    }

    return (
        <Box
            sx={{
                paddingTop: hasMarkLabels ? '1rem' : '0px',
                paddingBottom: '0px'
            }}
        >
            <Slider
                {...props}
                sx={{
                    ...(props.sx || {}),
                    padding: '0px',
                    marginLeft: '.25rem',
                    marginRight: '.25rem',
                    width: 'calc(100% - .25rem - .25rem)',
                    transform: hasMarkLabels ? 'none' : 'translate(0px, -7px)',
                    '& .MuiSlider-markLabel': {
                        position: 'initial',
                        transform: 'none',
                        translate: 'none',
                        display: 'inline-block',
                        textAlign: 'center',
                        width: '100%',
                        marginTop: '1rem',
                        fontSize: '1.125rem',
                        color: theme.palette.primary.dark
                    },
                    '@media (pointer: coarse)': {
                        padding: '0px'
                    }
                }}
            />
        </Box>
    )

}

export default TrSlider