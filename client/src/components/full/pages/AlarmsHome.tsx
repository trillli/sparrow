import * as React from 'react';
import { Box, Button, Link, Container, Typography } from '@mui/material';
import AlarmsList from 'src/components/full/elements/AlarmsList';
import ConfigCategoryLabel from 'src/components/full/elements/ConfigCategoryLabel';
import DeviceConfig from 'src/components/full/elements/DeviceConfig';
import BtnLogIn from 'trillli_client/src/components/BtnLogIn'
import BtnLogOut from 'trillli_client/src/components/BtnLogOut'
import BtnSignUp from 'trillli_client/src/components/BtnSignUp'

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
            <BtnLogIn />
            <BtnLogOut />
            <BtnSignUp />
        </div>
    )




}

export default AlarmsHome