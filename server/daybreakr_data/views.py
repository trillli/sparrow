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
    auth0_helper = Auth0Helper()
    permission_classes = [IsAuthenticated]
    # user = 
    def get(self, request, *args, **kwargs):
        lazyAlarm = LazyAlarm.objects.all()
        serializer = LazyAlarmSerializer(lazyAlarm, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        print('in post endpoint')
        data = {
            'serialization': request.data.get('serialization')
        }
        print('about to set serialize')
        serializer = LazyAlarmSerializer(data=data)
        print('about to call isValid on serailizer')
        if serializer.is_valid():
            print('is Valid!')
            serializer.save()
            print('saved. returning response now')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def api_exception_handler(exc, context=None):
    print('in api exception handler now')
    response = exception_handler(exc, context=context)
    if response and isinstance(response.data, dict):
        response.data = {'message': response.data.get('detail', 'API Error')}
    else:
        response.data = {'message': 'API Error'}
    return response


