import React from 'react'

interface AlarmConfigGroupsProps {
    arg1?: any
    arg2?: any
    arg3?: any
}

const AlarmConfigGroups: React.FC<AlarmConfigGroupsProps> = () => {


    return (
        <>

            <AlarmConfigGroupSound />
            <AlarmConfigGroupLight />
            <AlarmConfigGroupVibration />

        </>

    )

}

export default AlarmConfigGroups