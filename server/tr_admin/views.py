import os
from typing import Any
from django.conf import settings
from django.contrib.auth.models import Group, User
from django.urls import resolve
import json
from jwt import algorithms
from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
from tr_common.auth0_helper import Auth0Helper
from tr_common.exception_helper import ExceptionHelper
import traceback

class ProfileView(APIView):

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()


    def get(self, request, *args, **kwargs):

        try:
            result = self.auth0_helper.management_api_user_get(request)

            return Response(result.json())

        except Exception as e:
            print('in exception!')
            self.ex_helper.throw(e)

    '''
    At this time:
    Only permitting changes of the 'given_name' and 'family_name' fields
    '''
    def patch(self, request, *args, **kwargs):

        allowed_update_fields = [
            'given_name',
            'family_name'
        ]

        print('MADE IT INTO THE PATCH METHOD')

        try:
            print('getting data:')
            data = request.data
            # print(dataSerialized)
            # print(dataSerialized['created_at'])
            # data = dataSerialized.json()
            print('data is:')
            print(data)
            print(data['created_at'])
            print(data.get('created_at'))
            fieldname = 'created_at'
            print(data[fieldname])
            print(data.get(fieldname))

            # payloadTest = {
            #     'given_name': 'this is the given name'
            # }

            # profile_updates = {
            #     'user_metadata': payloadTest
            # }

            # profile_updates = payloadTest

            payload = {}
            print ('going to loop now')
            for field in allowed_update_fields:
                print('current field:')
                print(field)
                # print(data)
                if (data[field] is not None):
                    print('was not none!')
                    payload[field] = data[field]
                else:
                    print('in the else')
                
                print('bottom of loop')

            print('serializing payload')
            payload = json.dumps(payload)
            print('serialized payload is:')
            print(payload)

            result = self.auth0_helper.management_api_user_patch(request, payload)

        except Exception as e:
            print('in exception!')
            api_exception_handler(Exception('401; Bad authorization token.'))

        return Response({"message": "Trying to PATCH user profile"})
    

class ProfileImageView(APIView):
        
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()

    def patch(self, request, *args, **kwargs):

        response = {'placeholder: tbd'}

        try:
            profileSerialized = self.auth0_helper.management_api_user_get(request)
            profile = profileSerialized.json()
            id = profile['user_id'].split("|")[1]
            if (request.FILES.get('file')):
                profile_image = request.FILES['file']
                new_img_url = os.path.join(settings.MEDIA_URL, 'profiles', id, 'profile-image', profile_image.name)
                path = os.path.join(settings.MEDIA_ROOT, 'profiles', id, 'profile-image')
                if not os.path.exists(path):
                    os.makedirs(path)

                with open(os.path.join(path, profile_image.name), 'wb') as destination:
                    for chunk in profile_image.chunks():
                        destination.write(chunk)

            user_metadata = {
                'picture_custom': new_img_url
            }

            profile_updates = {
                'user_metadata': user_metadata
            }
            payload = json.dumps(profile_updates)

            response = self.auth0_helper.management_api_user_patch(request, payload)  

        except Exception as e:
            print('in exception; need to handle')
            traceback.print_exc()

        return Response(response)
    


class ProfilePasswordView(APIView):
        
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.auth0_helper = Auth0Helper()
        self.ex_helper = ExceptionHelper()

    def get(self, request, *args, **kwargs):

        print('in password patch endpoint')

        response = self.auth0_helper.management_api_password_change(request)

        return Response({'msg': 'returned'})

def api_exception_handler(exc, context=None):
    response = exception_handler(exc, context=context)
    return response



    


