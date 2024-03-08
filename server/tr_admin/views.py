import os
from typing import Any
from django.conf import settings
from django.contrib.auth.models import Group, User
from django.urls import resolve
import json
from jwt import algorithms
from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
from rest_framework import status
from tr_common.auth0_helper import Auth0Helper
from tr_common.exception_helper import ExceptionHelper
import traceback

class ProfileView(APIView):

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()

    #Retrieve the current user's (ie, the logged in user that made the request) profile data from auth0
    def get(self, request, *args, **kwargs):
        try:
            result = self.auth0_helper.management_api_user_get(request)
            return Response(result.json())

        except Exception as e:
            return Response('Serverside error; Unable to retrieve user profile data', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #Currently only permitting changes of the 'given_name' and 'family_name' fields
    #Will remain this way until further research on managing/modifying auth0 user data
    #
    #Handle a user's update profile data request
    def patch(self, request, *args, **kwargs):

        #TODO: could consider extracting to config file or settings.py in the auth0 section
        allowed_update_fields = [
            'given_name',
            'family_name'
        ]

        try:

            #Get user data from request; add each corresponding 'allowed' field to the payload that
            #we will send off to the auth0 management api
            data = request.data
            payload = {}
            for field in allowed_update_fields:
                if (data[field] is not None):
                    payload[field] = data[field]

            payload = json.dumps(payload)

            response = self.auth0_helper.management_api_user_patch(request, payload)

            if response.status_code == 200:
                return Response('Updated user profile information.')
            else:
                return Response('Serverside error; Unable to update user profile', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response('Serverside error; Unable to update user profile', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Handle a user's update profile picture request
class ProfileImageView(APIView):
        
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()

    def patch(self, request, *args, **kwargs):

        try:

            #Get user info from request
            profileSerialized = self.auth0_helper.management_api_user_get(request)
            profile = profileSerialized.json()
            id = profile['user_id'].split("|")[1]

            #Grab file from request and write to disk
            if (request.FILES.get('file')):
                profile_image = request.FILES['file']
                new_img_url = os.path.join(settings.MEDIA_URL, 'profiles', id, 'profile-image', profile_image.name)
                path = os.path.join(settings.MEDIA_ROOT, 'profiles', id, 'profile-image')
                if not os.path.exists(path):
                    os.makedirs(path)

                with open(os.path.join(path, profile_image.name), 'wb') as destination:
                    for chunk in profile_image.chunks():
                        destination.write(chunk)

            #Create an update to the 'user_medata' field of the normalized auth0 user profile with
            #a new field pointing to the newly uploaded image's url
            #Use this auth0 management api to perform this update
            user_metadata = {
                'picture_custom': new_img_url
            }
            profile_updates = {
                'user_metadata': user_metadata
            }
            payload = json.dumps(profile_updates)

            response = self.auth0_helper.management_api_user_patch(request, payload)  

            if response.status_code == 200:
                return Response('Updated user picture.')
            else:
                return Response('Serverside error; Unable to update user picture', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response('Serverside error; Unable to update user picture', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#Handle a user's password change request
#Utilizes helper class to handle the password update flow
class ProfilePasswordView(APIView):
        
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()

    def get(self, request, *args, **kwargs):
        
        response = self.auth0_helper.management_api_password_change(request)
        
        if response.status_code == 200:
            return Response('Initiated user password change flow')
        else:
            return Response('Serverside error; Unable to initiate user password change flow', status=status.HTTP_500_INTERNAL_SERVER_ERROR)







    


