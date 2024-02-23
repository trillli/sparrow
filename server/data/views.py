from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
# from base.core import Auth0Helper

from .models import *
from .serializers import *

class LazyAlarmsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    # user = 
    def get(self, request, *args, **kwargs):
        print('here i am')
        lazyAlarms = LazyAlarms.objects.all()
        serializer = LazyAlarmsSerializer(lazyAlarms, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'serialization': request.data.get('serialization')
        }
        serializer = LazyAlarmsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
