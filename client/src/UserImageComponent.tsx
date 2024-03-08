import { useAuth0 } from '@auth0/auth0-react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Box, Button, Modal, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { TrFetchConfig, TrFetchResult, trFetch } from 'src/tr/components/TrApiClient';

interface UserImageComponentProps {
  editOnProvider?: boolean,
  url: string,
  setProfilePatching,
  skeleton: boolean
}

const UserImageComponent: React.FC<UserImageComponentProps> = ({ editOnProvider = false, url, setProfilePatching, skeleton }) => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [imgToUpload, setImgToUpload] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false);
  const imgOpen = () => setOpen(true);
  const imgClose = () => setOpen(false);

  React.useEffect(() => {

    if (imgToUpload == null) {
      return
    }

    let formData = new FormData();
    formData.append('file', imgToUpload)
    formData.append('myKey', 'myVal')


    const submitImage = async () => {
      const accessToken = await getAccessTokenSilently();
      const requestConfig: TrFetchConfig = {
        accessToken: accessToken,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        method: 'PATCH',
        omitDefaultHeaders: true,
        path: "/tr/api/profile-image",
        payload: formData
      }
      setProfilePatching(true)

      const result: TrFetchResult = await trFetch(requestConfig);
      if (result.ok) {
        setProfilePatching(false)
      }
    }

    submitImage()



  }, [imgToUpload])

  const style = {
    display: 'flex',
    transition: '2s',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    '&:focus-visible': { outline: 'none' }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const handleImgClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
  }

  const handleImgSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    setImgToUpload(file)
  }

  let component: React.ReactNode
  component = (<>
    <Box className='detailContainer detailImageContainer' sx={{
      position: 'relative', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', width: { xs: '100%', md: 'fit-content' },
    }}>
      {skeleton ? (
        <Skeleton variant='rounded' width={90} height={90} />
      ) : (
        <img src={url}
          onClick={handleImgClick}
          style={{
            borderRadius: '5px',
            height: '90px',
            width: '90px',
            objectFit: 'cover'
          }} />
      )}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '90px',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
        {skeleton ? <Skeleton variant='rounded' width={115} height={40} /> : <Button
          variant="outlined"
          onClick={imgOpen}
          size='medium'
          startIcon={<FullscreenIcon />}>
          View
        </Button>}
        {skeleton ? <Skeleton variant='rounded' width={115} height={40} /> :
          <Button component='label' variant='outlined' size='medium' startIcon={<SwapHorizIcon />}>
            Change
            <VisuallyHiddenInput type="file" onChange={handleImgSelection} />
          </Button>

        }
      </Box>
    </Box>
    <div>
      <Modal
        open={open}
        onClose={imgClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={url}
            style={{
              borderRadius: '5px',
              maxWidth: 'min(650px, 90vw)',
              height: 'auto',
            }} />
        </Box>
      </Modal>
    </div>
  </>
  )



  return (
    component
  )
}

export default UserImageComponent