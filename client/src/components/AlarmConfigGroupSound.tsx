import React from 'react'
import { IAlarmMetadata } from './types/IAlarmMetadata'
import ITrillliConfig from 'trillli/src/types/ITrillliConfig'
import { Accordion, AccordionDetails, Box } from '@mui/material'
import AlarmConfigCategoryBody from './AlarmConfigCategoryBody'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader'
import AlarmConfigCategoryDetailOuter from './AlarmConfigCategoryDetailOuter'
import AlarmConfigCategoryDetailHeader from './AlarmConfigCategoryDetailHeader'
import AlarmConfigCategoryDetailBodySoundSearch from './AlarmConfigCategoryDetailBodySoundSearch'

interface AlarmConfigGroupSoundProps {
    alarm: IAlarmMetadata
    appConfig: ITrillliConfig
    handlers: { [key: string]: Function }
    setters: { [key: string]: Function }
}

const AlarmConfigGroupSound: React.FC<AlarmConfigGroupSoundProps> = ({alarm, appConfig, handlers, setters}) => {

    const fieldNamesOrdered = ['search', 'volume']

    const [groupEnabled, setGroupEnabled] = React.useState<boolean>(true)

    const handleGroupEnableToggle = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        const checked: boolean = event.target.checked
        setGroupEnabled(checked)
    }

    return (
        <Accordion 
        key={alarm.id} 
        id={`alarm_config_group_sound_${alarm.id}`}
        className='alarm-config-category-container'
        elevation={0}
        square={true}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0px',
            background: 'none',
            '& .MuiAccordionSummary-content': {
                margin: '0px'
            },
            '&::before': {
                display: 'none'
            }
        }}
    >
        <AlarmConfigCategoryHeader 
            groupLabel='Music'
            icon='music_note'
            groupEnabled={groupEnabled}
            toggleHandler={handleGroupEnableToggle}
        />
        {/* <AlarmConfigCategoryBody 
            appConfig={alarmConfigCategoryMetadata.appConfig}
            groupMetadata={alarmConfigCategoryMetadata.groups[key]} 
            stateControl={alarmConfigCategoryMetadata.stateControl[key]} /> */}
                <AccordionDetails className='alarm-config-container'
            sx={{
                background: '#FFFFFF57',
                padding: '1.25rem 1rem',
            }}
        >    
            <Box className='configuration-details-container'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '2rem'
                }}
            >
                {/* <AlarmConfigCategoryDetailHeader label={detailMetadata.label} stateControl={stateControl} /> */}
                <AlarmConfigCategoryDetailBodySoundSearch alarm={alarm} appConfig={appConfig} />

            </Box>
        </AccordionDetails>
        
    </Accordion>
    )

}

export default AlarmConfigGroupSound