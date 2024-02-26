from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler
from tr_common.auth0_helper import Auth0Helper

from .serializers import *
from .models import *


class MessageApiView(RetrieveAPIView):
    serializer_class = MessageSerializer
    text = None

    def get_object(self):
        return Message(text=self.text)


class PublicMessageApiView(MessageApiView):
    text = "This is a public message (FROM DAYBREAKR!!!)."


class ProtectedMessageApiView(MessageApiView):
    text = "This is a protected message (FROM DAYBREAKR!!!)."
    permission_classes = [IsAuthenticated]


class AdminMessageApiView(MessageApiView):
    text = "This is an admin message (from the new data api)."
    permission_classes = [IsAuthenticated]

class LazyAlarmView(APIView):

    def __init__(self):
        super().__init__()
        self.auth0_helper = Auth0Helper()
        self.permission_classes = [IsAuthenticated]


    def get(self, request, *args, **kwargs):
        user_id = self.auth0_helper._get_user_id_from_request(request)
        lazyAlarm = LazyAlarm.objects.filter(user_id=user_id)
        LazyAlarm.objects.filter(user_id=user_id)
        serializer = LazyAlarmSerializer(lazyAlarm, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        user_id = self.auth0_helper._get_user_id_from_request(request)
        data = {
            'alarms_json': request.data.get('alarms_json'),
            'user_id': user_id
        }
        try:
            lazy_alarm = LazyAlarm.objects.get(user_id=user_id)
        except: 
            lazy_alarm = None
        serializer = LazyAlarmSerializer(lazy_alarm, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def api_exception_handler(exc, context=None):
#     print('in api exception handler now')
#     response = exception_handler(exc, context=context)
#     if response and isinstance(response.data, dict):
#         response.data = {'message': response.data.get('detail', 'API Error')}
#     else:
#         response.data = {'message': 'API Error'}
#     return response


