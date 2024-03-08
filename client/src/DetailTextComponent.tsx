import { Box, FilledTextFieldProps, Icon, InputAdornment, Skeleton, TextField } from '@mui/material';
import React from 'react';


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface DetailTextCustomProps {
  editOnProvider?: boolean  //for social logins; fields that must be updated on the provider service, not in this app
  readOnly?: boolean
  skeleton?: boolean,
  watched?: boolean
}

type DetailTextComponentProps = Omit<FilledTextFieldProps, 'variant'> & DetailTextCustomProps

const DetailTextComponent: React.FC<DetailTextComponentProps> = ({
  editOnProvider = false,
  readOnly = false,
  skeleton = false,
  watched = false,
  ...filledTextFieldProps
}) => {

  let contents: React.ReactNode
  if (skeleton) {
    contents = <Skeleton variant='rounded' width={'100%'} height={60} sx={{ paddingTop: '0px' }}></Skeleton>
  } else {
    contents = (
      <TextField
        variant='outlined'
        className={(readOnly || editOnProvider) ? '' : 'profile-input-watched'}
        InputProps={{
          readOnly: readOnly || editOnProvider,
          endAdornment: (readOnly || editOnProvider) ? <></> : <InputAdornment position='end' sx={{
            pointerEvents: 'none',
          }}><Icon>edit</Icon></InputAdornment>,
        }}
        InputLabelProps={{
        }}
        sx={{
          width: '100%',
        }}
        {...filledTextFieldProps}
      />
    )
  }




  return (
    <Box className='detailContainer detailTextContainer' sx={{
      width: '100%'
    }}>
      {contents}
    </Box>
  )

}

export default DetailTextComponent