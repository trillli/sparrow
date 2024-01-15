import * as React from 'react';
import { Box, Button, Link, Container, Typography } from '@mui/material';
import AlarmsList from './AlarmsList';
import ConfigCategoryLabel from './ConfigCategoryLabel';
import DeviceConfig from './DeviceConfig';

const AlarmsHome = () => {


    return (
        <div>
            <Typography>Your alarms</Typography>
            <AlarmsList />
            <Container>
                <ConfigCategoryLabel />
                <ConfigCategoryLabel />
                <ConfigCategoryLabel />
                <ConfigCategoryLabel />
            </Container>
            <DeviceConfig />
        </div>
    )




}

export default AlarmsHome