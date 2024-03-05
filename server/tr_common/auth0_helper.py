from django.conf import settings
from tr_common.exception_helper import ExceptionHelper
import json
import jwt
from jwt import algorithms
import requests
import traceback

class Auth0Helper:

    def __init__(self):
        super().__init__()
        self.ex_helper = ExceptionHelper()

    def _configure_management_api_request(self, request):

        try:

            #todo: look into get id from request
            user_id_with_sub = self._get_sub_claim_from_request(request)
            management_api_access_token = self._get_management_api_access_token()
            auth0_domain = settings.AUTH0_DOMAIN

            # print('auth0_domain:')
            # print(auth0_domain)

            api_request_setup = {
                'domain': auth0_domain,
                'access_token': management_api_access_token,
                'user_id': user_id_with_sub
            }

            return api_request_setup

        except Exception as e:
            print('in exception; need to handle')
            traceback.print_exc()

        

        

    '''
    - Returns a serialized representation of the normalized user profile
    - Deserialize to python dict with user.json()
    '''
    def management_api_user_get(self, request):
        
        #Pass request object to management api request config helper method
        api_request_setup = self._configure_management_api_request(request)

        #Execute request to management api to retrieve normalized user profile
        # url = f'https://{api_request_setup['domain']}/api/v2/users/{api_request_setup['user_id']}'
        url = 'https://' + api_request_setup['domain'] + '/api/v2/users/' + api_request_setup['user_id']
        headers = {
                'Authorization': 'Bearer ' + api_request_setup['access_token']
            }
        user = requests.get(url, headers=headers)
        
        return user
    
    def management_api_user_patch(self, request, payload):

        #Pass request object to management api request config helper method
        api_request_setup = self._configure_management_api_request(request)

        #Execute request to management api to retrieve normalized user profile
        # url = f'https://{api_request_setup['domain']}/api/v2/users/{api_request_setup['user_id']}'
        url = 'https://' + api_request_setup['domain'] + '/api/v2/users/' + api_request_setup['user_id']
        headers = {
                'Authorization': 'Bearer ' + api_request_setup['access_token'],
                'content-type': 'application/json'
            }
        # user = requests.get(url, headers=headers)
        # user = requests.patch(url, headers=headers, data=payload)
        response = requests.request("PATCH", url, headers=headers, data=payload)

        return response
    
    def management_api_password_change(self, request):
        print('test')
        user = self.management_api_user_get(request)
        email = user.json()['email']
        print('email is:')
        print(email)

        url = 'https://dev-m0zbh7x7q4v4tlo6.us.auth0.com/dbconnections/change_password'
        headers = headers = { 'content-type': "application/json" }
        payload = "{\"client_id\": \"vYABLvf58qGhCj2kARAv3HnFsJ4vpeep\",\"email\": \"" + email + "\",\"connection\": \"Username-Password-Authentication\"}"

        print(payload)

        response = requests.post(url, headers=headers, data=payload)
        print('made it past the change password api call response:')
        print(response)
        print(response.json)

        return response
    

    '''
        https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens
    '''
    def _get_management_api_access_token(self):
        url = "https://dev-m0zbh7x7q4v4tlo6.us.auth0.com/oauth/token"
        payload = {
            "client_id": settings.AUTH0_MANAGEMENT_API_CLIENT_ID,
            "client_secret": settings.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
            "audience": "https://dev-m0zbh7x7q4v4tlo6.us.auth0.com/api/v2/",
            "grant_type": "client_credentials"
        }

        headers = {'content-type': "application/json"}

        response = requests.post(url, json=payload, headers=headers)

        if response.status_code == 200:
            management_api_response = response.json()
        else:
            print('in response status code indicates error; need to handle')
            # traceback.print_exc()

        return management_api_response.get('access_token')


   
    #Note: request must include authorization header:
    #Authorization: Bearer <access token jwt>
    #this returns the full 'sub' field of the decoded token, of the format:
    # <identity provider>|userId
    # ie: google|123456789
    def _get_sub_claim_from_request(self, request):

        token = self._get_bearer_token_from_request(request)
        decoded_token = self._decode_jwt_bearer_token(token)
        # print('before decodedtoken.get')
        sub = decoded_token.get('sub')  # Extract user ID from the token
        # print('after decodedtoken.get')

        return sub
    
    #Note: request must include authorization header:
    #Authorization: Bearer <access token jwt>
    #this returns only the user id part of the 'sub' field of the decoded token
    def _get_user_id_from_request(self, request):

        token = self._get_bearer_token_from_request(request)
        decoded_token = self._decode_jwt_bearer_token(token)
        # print('before decodedtoken.get')
        sub = decoded_token.get('sub')  # Extract user ID from the token
        user_id = self._parse_id_from_sub_claim(sub)
        # print('after decodedtoken.get')

        return user_id
    
    def _parse_id_from_sub_claim(self, sub):
        print('going to split:')
        print(sub)
        subSplit = sub.split('|')
        return subSplit[1]
    
    '''
    - Returns the client's auth0 'Access Token'
    -   Token parsed from an http request's header

    Access Token documentation:
    https://auth0.com/docs/secure/tokens/access-tokens

    In this case, we're provided with a full http request object, including its headers, which should include the Access Token information

    Note: The request object must have the header: 
    'authorization': 'Bearer <client's auth0 access token>'

    Typical flow:
    The client retrieves the Access Token (for example, in React, via the useAuth0 hook -> getAccessTokenSilently()). The client then makes an http request to our api. We pass the request to this method, pass the header object (a dict) to the _get_bearer_token_from_dict method, and return the result (which, in the case of a successful parsing, will be the token)
    '''
    def _get_bearer_token_from_request(self, request):
        
        '''Get headers; pass to '''
        request_headers = request.headers
        token = self._get_bearer_token_from_dict(request_headers)
        
        return token
    

    '''
    - Returns the client's auth0 'Access Token'
    -   Token parsed from a dict, which will typically be a request's header field
    
    Access Token documentation:
    https://auth0.com/docs/secure/tokens/access-tokens
    '''
    def _get_bearer_token_from_dict(self, dict):

        # print('here in get bearer token from dict. dict is:')
        # print(dict)
        # print('just printed dict')
        
        authorization_header = dict.get('Authorization')
        # print (authorization_header)
        token = authorization_header.split(' ')[1]

        return token
    
    '''
    - Decodes a JWT bearer token, such as the auth0 Access Token

    '''
    def _decode_jwt_bearer_token(self, token):

        #Use jwt library & config to get values needed for jwt.decode
        header = jwt.get_unverified_header(token)
        jwk_url = settings.SIMPLE_JWT['JWK_URL']
        jwks = requests.get(jwk_url).json()
        public_key = None
        for jwk in jwks['keys']:
            if jwk['kid'] == header['kid']:
                public_key = algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

        if public_key is None:
            raise Exception('401; Bat authorization token.')

        #Use jwt library & above values to decode the token into a pyton dict
        decoded_token = jwt.decode(token, public_key, algorithms=['RS256'], audience=settings.SIMPLE_JWT['AUDIENCE'])

        return decoded_token

