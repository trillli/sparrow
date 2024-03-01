from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
import requests
from django.conf import settings
import base64


# Create your views here.

class SearchView(APIView):

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
        # authQueryRaw = settings.SPOTIFY_CLIENT_SECRET + ':' + settings.SPOTIFY_CLIENT_ID
        authQueryRaw = settings.SPOTIFY_CLIENT_ID + ':' + settings.SPOTIFY_CLIENT_SECRET
        authQueryUtf8 = authQueryRaw.encode('utf-8')
        authQueryBase64Bytes = base64.b64encode(authQueryUtf8)
        authQueryBase64String = authQueryBase64Bytes.decode('utf-8')
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + authQueryBase64String
        }
        payload = {
            'grant_type': 'client_credentials'
        }

        response = requests.post(url, data=payload, headers=headers)

        if response.status_code == 200:
            print('request to spotify for access token was good')
            print(response.text)

            spotifyAccessToken = response.json().get('access_token')
            print(spotifyAccessToken)

            url = 'https://api.spotify.com/v1/search'
            requestData = request.data
            # queryString = requestData['queryString']
            queryTypes = requestData['queryTypes']
            urlParamQueryString = requestData['queryString']
            requestTarget = url + '?q=' + urlParamQueryString
            if len(queryTypes) > 0:
                queryTypeFormatted = ','.join(queryTypes)
                requestTarget = requestTarget + '&type=' + queryTypeFormatted
            else:
                requestTarget = requestTarget + '&type=track,artist,album,playlist'
            requestTarget = requestTarget + '&limit=10'
            headers={
                'Authorization': 'Bearer ' + spotifyAccessToken
            }

            payload = {}

            # print(spotifyAccessToken)

            # requestTarget = 'https://api.spotify.com/v1/search?q=ultra+coding+marathon&type=playlist&market=US&limit=50'
            # requestTarget = 'https://api.spotify.com/v1/me'

            searchResponse = requests.request('GET', requestTarget, headers=headers, data=payload)

            print('requestTarget is: ')
            print(requestTarget)

            if searchResponse.status_code == 200:
                print('search request was good')
                return Response(searchResponse.json())
            else:
                print('search request was bad')
                print(searchResponse.text)


        else:
            print('request to spotify for access token was bad')
            print(response.text)

        data = {
            'queryString': queryString,
            'queryType': queryType
        }
        # return Response(data)
        


# def sound_search(request):
#     data = {
#         'message': 'here is the return'
#     }
#     return JsonResponse(data)