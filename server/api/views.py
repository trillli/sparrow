from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
import base64


# Create your views here.

class SoundSearchView(APIView):

    # def get(self, request, *args, **kwargs):
    #     requestData = request.data
    #     queryString = requestData.query
    #     data = {
    #         'queryString': queryString
    #     }
    #     # queryType = requestData.queryType
    #     # data = {
    #     #     'message': 'will this work'
    #     # }
    #     return Response(data)
    
    def post(self, request, *args, **kwargs):
        requestData = request.data
        queryString = requestData['queryString']
        queryType = requestData['queryTypes']
        print('here in the endpoint')
        if (queryType is not None):
            print('have a query type')
            print(len(queryType))
            print(queryType)
        else:
            print('do not have a querytype')

        print('going to get spotify access token')
        url = 'https://accounts.spotify.com/api/token'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.b64encode()
        }

        data = {
            'queryString': queryString,
            'queryType': queryType
        }
        return Response(data)
        


# def sound_search(request):
#     data = {
#         'message': 'here is the return'
#     }
#     return JsonResponse(data)