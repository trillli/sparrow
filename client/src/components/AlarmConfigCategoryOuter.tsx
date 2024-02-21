import React from 'react'
import { Accordion, AccordionSummary, Box, Typography, Switch, AccordionDetails, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import VibrationIcon from '@mui/icons-material/Vibration';
import { HexColorPicker } from 'react-colorful'
import AlarmConfigCategoryHeader from './AlarmConfigCategoryHeader';
import AlarmConfigCategoryBody from './AlarmConfigCategoryBody';
// import { AlarmConfigSunriseProps } from './types/IAlarmConfigCategoryDetailStateControl';
// import alarmConfigCategoryKeysOrdered from './types/IAlarmConfigCategoryDetailStateControl'
import { IAlarmConfigCategoryMetadata, IAlarmCategoryGroupName, alarmConfigCategoryKeysOrdered } from './types/AlarmConfigComponentSkeletons';

interface AlarmConfigCategoryOuterProps {
    alarmConfigCategoryMetadata: IAlarmConfigCategoryMetadata
}

const AlarmConfigCategoryOuter: React.FC<AlarmConfigCategoryOuterProps> = ({alarmConfigCategoryMetadata}) => {

    type AlarmCategoryGroupName = 'sound' | 'light' |'vibration'

    return (

        <>

            {alarmConfigCategoryKeysOrdered.map((key: AlarmCategoryGroupName, index: number) => (
                <Accordion 
                    key={index} 
                    id={`alarm_config_group_${alarmConfigCategoryMetadata.groups[key].id}`}
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
                        groupLabel={alarmConfigCategoryMetadata.groups[key].label} 
                        icon={alarmConfigCategoryMetadata.groups[key].icon}
                        stateControl={alarmConfigCategoryMetadata.stateControl[key]} 
                    />
                    <AlarmConfigCategoryBody 
                        appConfig={alarmConfigCategoryMetadata.appConfig}
                        groupMetadata={alarmConfigCategoryMetadata.groups[key]} 
                        stateControl={alarmConfigCategoryMetadata.stateControl[key]} />
                </Accordion>
            ))}

        </>

    )

}

export default AlarmConfigCategoryOuter