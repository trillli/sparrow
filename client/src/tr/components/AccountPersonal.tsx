import { useAuth0 } from "@auth0/auth0-react";
import LockIcon from '@mui/icons-material/Lock';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Box, Button, Card } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import DetailTextComponent from "src/DetailTextComponent";
import IAuth0ApiUser, { fnAuth0CreatedAtTimeToLocal, IAuth0ApiNormalizedUser } from "../types/IAuth0ApiUser";
import ITrillliConfig from "../types/ITrillliConfig";
import { trFetch, TrFetchConfig, TrFetchResult } from "./TrApiClient";
import TrillliPageBuilder from "./TrillliPageBuilder";
import TrillliPageHeader from "./TrillliPageHeader";
import TrBasicNote from "./TrPageNote";


interface AccountPersonalProps {
  appConfig: ITrillliConfig
}

const AccountPersonal: React.FC<AccountPersonalProps> = ({ appConfig }) => {

  const userProfileInitializer: IAuth0ApiNormalizedUser = {
    identities: undefined,
    name: '',
    nickname: '',
    picture: '',
    user_id: ''
  }

  //sv
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userProfile, setUserProfile] = React.useState<IAuth0ApiUser>(userProfileInitializer);
  const [userProfileLoaded, setUserProfileLoaded] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<IAuth0ApiUser>(userProfileInitializer)
  const [formDataRef, setFormDataRef] = React.useState<IAuth0ApiUser>(userProfileInitializer)
  const [formDataDifferences, setFormDataDifferences] = React.useState<{ [key: string]: boolean }>({});
  const [formDataUpdated, setFormDataUpdated] = React.useState<boolean>(false)
  const editedFieldName = React.useRef<string | undefined>()
  const [profilePatching, setProfilePatching] = React.useState<boolean>(false)


  //ef
  React.useEffect(() => {

    if (profilePatching) {
      return;
    }

    let isMounted = true;

    const getuserProfile = async () => {
      const accessToken = await getAccessTokenSilently();
      const requestConfig: TrFetchConfig = {
        accessToken: accessToken,
        method: 'GET',
        path: "/tr/admin/profile"
      }
      const result: TrFetchResult = await trFetch(requestConfig);

      //Don't proceed if natvigated away from this page before the request came back
      if (!isMounted) {
        return;
      }

      if (result.ok) {
        const _userProfile: IAuth0ApiUser = result.ok.data as IAuth0ApiUser
        setUserProfileLoaded(true)
        setUserProfile(_userProfile)
        setFormData(_userProfile)
        setFormDataRef(_userProfile)
        setProfilePatching(false)
      } else {
        console.error(result)
      }

    };

    getuserProfile();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, profilePatching]);


  React.useEffect(() => {

    const field: keyof IAuth0ApiUser = editedFieldName.current as keyof IAuth0ApiUser


    if (field as keyof IAuth0ApiUser) {

      let changeDetected: boolean

      //Special handling for the case where the field starts out empty. It is represented as undefined in the initial field object, but '' in the form
      let changeFlags: {
        fieldEmpty: boolean,
        fieldPopulated: boolean
      }

      changeFlags = {
        fieldEmpty: formData[field] == '' && !(formDataRef[field] == undefined || formDataRef[field] == ''),
        fieldPopulated: formData[field] != formDataRef[field]
      }

      const fieldIsEmpty: boolean = formData[field] == ''

      changeDetected = fieldIsEmpty ? changeFlags.fieldEmpty : changeFlags.fieldPopulated


      setFormDataDifferences(formDataDifferences => ({
        ...formDataDifferences,
        [field]: changeDetected
      }))

    }

  }, [formData])

  React.useEffect(() => {

    const formDataDifferencesKeys: string[] = Object.keys(formDataDifferences)

    let foundDifference: boolean = false

    formDataDifferencesKeys.forEach((key) => {
      if (formDataDifferences[key]) {
        foundDifference = true
      }
    })

    if (foundDifference) {
      setFormDataUpdated(true)
    } else {
      setFormDataUpdated(false)
    }


  }, [formDataDifferences])

  //ha
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editedFieldName.current = event.target.name
    const value = event.target.value
    setFormData(formData => ({
      ...formData,
      [editedFieldName.current as string]: value
    }))
  }

  const handlePasswordChangeClick = async () => {
    const accessToken = await getAccessTokenSilently();
    console.log('sending password reset request')

    const requestConfig: TrFetchConfig = {
      accessToken: accessToken,
      method: 'GET',
      path: "/tr/admin/profile-password",
    }
    const result: TrFetchResult = await trFetch(requestConfig);
    alert('A password reset link has been sent to your email. If you do not see it within several minutes, please check your spam folder or try again.')
  }

  //other
  let isSocialLogin: boolean
  if (user && user.sub) {
    isSocialLogin = (user.sub.substring(0, 6) === 'auth0|') ? false : true
  }
  let localCreatedAt: string
  if (userProfileLoaded) {
    localCreatedAt = fnAuth0CreatedAtTimeToLocal(userProfile['created_at'] as string)
  }
  const title: string = 'Account Management'
  const subtitles: string[] = [
    'Review and manage your account details',
  ]

  let profileImageUrl: string
  if (userProfile['user_metadata'] && userProfile['user_metadata']['picture_custom']) {
    profileImageUrl = userProfile['user_metadata']['picture_custom']
  } else {
    profileImageUrl = userProfile['picture']
  }

  //Change password button (or placeholder skeleton)
  let componentBtnPassword =
    <Button
      variant='contained'
      color='primary'
      size='large'
      disabled={isSocialLogin}
      startIcon={<LockIcon />}
      onClick={handlePasswordChangeClick}
      sx={{
        width: '100%',
        border: `1px solid ${appConfig.theme.palette.neutral.dark[2]}`,
        boxShadow: appConfig.theme.shadows[0],
        padding: '.75rem 1.5rem',
        '&:disabled': {
          border: 'none'
        }
      }}>
      Change Password
    </Button>

  let componentBtnPasswordSkeleton =
    <Skeleton variant='rounded' width={'100%'} height={45} sx={{ paddingTop: '0px' }}></Skeleton>



  let componentInputEmail = (
    <DetailTextComponent label={'Email'} value={formData.email || ''} name='email' onChange={handleChange} readOnly skeleton={!userProfileLoaded || profilePatching}
    />
  )

  let componentCreatedAt = (
    <DetailTextComponent label={'Account Created'} value={formData.created_at || ''} name='created_at' onChange={handleChange} readOnly skeleton={!userProfileLoaded || profilePatching} />
  )

  let componentGivenName = (
    <DetailTextComponent label={'Given / First Name'} value={formData.given_name || ''} name='given_name' onChange={handleChange} readOnly={isSocialLogin} skeleton={!userProfileLoaded || profilePatching} />
  )

  let componentFamilyName = (
    <DetailTextComponent label={'Family / Last Name'} value={formData.family_name || ''} name='family_name' onChange={handleChange} readOnly={isSocialLogin} skeleton={!userProfileLoaded || profilePatching} />
  )

  const updateUserProfile = async () => {
    const accessToken = await getAccessTokenSilently();
    const requestConfig: TrFetchConfig = {
      accessToken: accessToken,
      method: 'PATCH',
      path: "/tr/admin/profile",
      payload: JSON.stringify(formData)
    }
    setProfilePatching(true)
    const result: TrFetchResult = await trFetch(requestConfig);
    setProfilePatching(false)
  }

  const stylingDefault: { [key: string]: any } = {
    mainContents: {
      background: `linear-gradient(180deg, ${appConfig.theme.palette.neutral.dark[6]}, ${appConfig.theme.palette.neutral.dark[2]})`,
    }
  }

  return (
    <TrillliPageBuilder navSide={false} navTop appConfig={appConfig} styling={stylingDefault} >
      <Box
        sx={{
          maxWidth: '650px',
          background: appConfig.theme.palette.primary.dark[0],
          borderRadius: '4px',
          overflow: 'hidden',
          padding: '3rem 6%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <TrillliPageHeader title={title} subtitles={subtitles} appConfig={appConfig} />
        {isSocialLogin ? (
          <TrBasicNote appConfig={appConfig} text={'It looks like you\'re using a Social login. You can modify the fields below by updating them directly through that account provider.'} />)
          : (<></>)}
        <Card elevation={0} className='user-details-container'
          sx={{
            background: appConfig.theme.palette.primary.dark[0],
            display: 'flex',
            flexDirection: 'column',
            rowGap: '2.5rem',
            padding: '0rem 0rem',
            marginTop: '1.5rem',
            color: appConfig.theme.palette.primary.dark[1],
          }}
        >

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            rowGap: '35px',
            color: appConfig.theme.palette.neutral.dark[3]
          }}>
            {userProfileLoaded ? (
              componentBtnPassword
            ) : (
              componentBtnPasswordSkeleton
            )}


          </Box>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '2.5rem',
            flexDirection: 'column'
          }}>

            {componentInputEmail}
            {componentCreatedAt}
            {componentGivenName}
            {componentFamilyName}

          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button
              variant="contained"
              onClick={updateUserProfile}
              disabled={!formDataUpdated}
              startIcon={<NewReleasesIcon />}
              sx={{
                width: '100%',
                padding: '.75rem 1.5rem',
                border: `1px solid ${appConfig.theme.palette.neutral.dark[2]}`,
                boxShadow: appConfig.theme.shadows[0],
                '&:disabled': {
                  border: 'none'
                }
              }}
            >
              Save Updates
            </Button>
          </Box>
        </Card>
      </Box>
    </TrillliPageBuilder>
  );
};

export default AccountPersonal
