export const fnAuth0CreatedAtTimeToLocal = (timeString: string): string => {
    const utcCreatedAt: Date = new Date(timeString)
    const offset:number = utcCreatedAt.getTimezoneOffset()
    const localCreatedAtRaw:Date = new Date(utcCreatedAt.getTime() - offset * 60000)
    const localCreatedAt:string = localCreatedAtRaw.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
    return localCreatedAt
}

export interface IAuth0ApiNormalizedUserIdentity {
    access_token?: string
    access_token_secret?: string
    connection: string
    isSocial: boolean
    profileData?: {
        email?: string
        email_verified?: string
        family_name?: string
        given_name?: string
        name?: string
        phone_number?: string
        phone_verified?: string
        username?: string
    }
    refresh_token?: string
    provider: string
    user_id: string
}


//As per the Auth0 docs as of 2-2-2024:
//https://auth0.com/docs/manage-users/user-accounts/user-profiles/normalized-user-profile-schema
export interface IAuth0ApiNormalizedUser {
    email?: string
    email_verified?: boolean
    family_name?: string
    given_name?: string
    identities: IAuth0ApiNormalizedUserIdentity[]
    name: string
    nickname: string
    picture: string
    user_id: string
}

export default interface IAuth0ApiUser extends IAuth0ApiNormalizedUser {
    app_metadata?: object
    blocked?: boolean
    created_at?: string
    last_ip?: string
    last_login?: string | object
    logins_count?: number
    multifactor?: string[]
    phone_number?: string
    phone_verified?: boolean
    updated_at?: string
    user_metadata?: {[key: string]: any}
    username?: string
}