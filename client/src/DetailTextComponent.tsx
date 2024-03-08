import { Box, FilledTextFieldProps, Icon, InputAdornment, Skeleton, TextField } from '@mui/material';
import React from 'react';


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface DetailTextCustomProps {
  editOnProvider?: boolean  //for social logins; fields that must be updated on the provider service, not in this app
  readOnly?: boolean
  skeleton?: boolean,
  watched?: boolean
  // filledTextFieldProps: FilledTextFieldProps,
  // variant: 'filled'
}

type DetailTextComponentProps = Omit<FilledTextFieldProps, 'variant'> & DetailTextCustomProps

// const handleFocus = () => {
//   console.log('focused!')
// } 

const DetailTextComponent: React.FC<DetailTextComponentProps> = ({
  editOnProvider = false,
  readOnly = false,
  skeleton = false,
  watched = false,
  ...filledTextFieldProps
}) => {


  // console.log('readonly and editoonprovider should both be false. however, they are:')
  // console.log([readOnly, editOnProvider])
  // console.log((readOnly || editOnProvider))
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
          }}><Icon sx={{
            // fontSize: '1.25rem'
          }}>edit</Icon></InputAdornment>,
        }}
        InputLabelProps={{
          sx: {
            // fontSize: '1.375rem',
            // color: 'red'
            // background: 'white'
          }
        }}
        sx={{
          // border: '1px solid red',
          width: '100%',
          // background: 'red'
        }}
        {...filledTextFieldProps}
      />
    )
  }




  return (
    <Box className='detailContainer detailTextContainer' sx={{
      // width: '45%'
      // minWidth: '50px',
      // width: {xs: '100%', lg: '45%'},
      width: '100%'
    }}>
      {contents}
    </Box>
  )

}

export default DetailTextComponent