import * as React from 'react';
import { Container } from '@mui/material';
import AlarmsList from 'src/components/full/elements/AlarmsList';
import ConfigCategoryLabel from 'src/components/full/elements/ConfigCategoryLabel';
import DeviceConfig from 'src/components/full/elements/DeviceConfig';
import BtnLogIn from 'trillli/src/components/BtnLogIn'
import BtnLogOut from 'trillli/src/components/BtnLogOut'
import BtnSignUp from 'trillli/src/components/BtnSignUp'

const AlarmsHome = () => {

    console.log('here in alarms home')

    return (
        <div>
            <h2>Your alarms</h2>
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