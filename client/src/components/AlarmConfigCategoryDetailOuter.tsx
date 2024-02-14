import { Box, Typography } from '@mui/material'
import React from 'react'
import { HexColorPicker } from 'react-colorful'
import IAlarmConfigCategoryDetailStateControl, { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBody from './AlarmConfigCategoryDetailBody'
import AlarmConfigCategoryDetailBodyLightColor from './AlarmConfigCategoryDetailBodyLightColor'

interface ConfigCategoryDetailOuterProps {
    detailMetadata: IAlarmConfigCategoryDetailMetadata,
    stateControl: IAlarmConfigCategoryDetailStateControl
}

const AlarmConfigCategoryDetailOuter: React.FC<AlarmConfigSunriseProps> = ({ detailMetadata, stateControl }) => {


    

    const containerStyling = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.00rem'
    }

    const props = {
        containerStyling: containerStyling
    }

    const bodyWithProps = React.cloneElement(detailMetadata.body, props)

    

    return (



        <Box className='alarm-config-category-detail-outer'
            sx={{
                padding: '1rem'
            }}
        >
            <Box className='alarm-config-field'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '1.5rem'
                }}
            >

                {/* If required, render detail Header component (serves as a label to the config input; some config inputs are intuitive enough that the header can be omitted for design / ui/ux purposes, hence the showHeader flag) */}
                { detailMetadata.showHeader ? (
                    <AlarmConfigCategoryDetailHeader label={detailMetadata.label} stateControl={stateControl} />
                ) : (<></>)}

                {/* Render the detail Body component (contains the input field that the user will interact with */}
                {/* {detailMetadata.body} */}
                {bodyWithProps}
                
            </Box>
        </Box>


    )


}

export default AlarmConfigCategoryDetailOuter