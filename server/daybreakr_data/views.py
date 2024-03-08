from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import exception_handler
from tr_common.auth0_helper import Auth0Helper

from .serializers import *
from .models import *

class LazyAlarmView(APIView):

    def __init__(self):
        super().__init__()
        self.auth0_helper = Auth0Helper()
        self.permission_classes = [IsAuthenticated]

    #Retrieve a user's alarm data
    def get(self, request, *args, **kwargs):

        #Get alarm data associated with this user; user can be retrieved from token in request
        user_id = self.auth0_helper._get_user_id_from_request(request)
        lazyAlarm = LazyAlarm.objects.filter(user_id=user_id)
        LazyAlarm.objects.filter(user_id=user_id)

        #Serialize and return user's alarm data
        serializer = LazyAlarmSerializer(lazyAlarm, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #Adds or updates a user's alarm data, persists to db
    def put(self, request, *args, **kwargs):

        #User can be retrieved from token in request
        user_id = self.auth0_helper._get_user_id_from_request(request)

        #Format data to persist
        data = {
            'alarms_json': request.data.get('alarms_json'),
            'user_id': user_id
        }

        #Query the database for alarm data for this user
        #If found, the record will be updated when serializer.save() is called
        #If not found (so, enter the except block), a new record will be created when seialzier.save() is called
        try:
            lazy_alarm = LazyAlarm.objects.get(user_id=user_id)
        except: 
            lazy_alarm = None

        #Serialize and save to db  
        serializer = LazyAlarmSerializer(lazy_alarm, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)