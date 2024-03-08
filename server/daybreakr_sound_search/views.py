from rest_framework.views import APIView, exception_handler
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
import base64

class SearchView(APIView):

    #Post endpoint, but not actually persisting any data
    #To align with RESTful convention should consider changing this to a get request and passing in the
    #query arguments as url params
    #
    #Accepts spotify web api search parameters as the incoming request body; query the spotify search
    #api; returns results back to the calling client 
    def post(self, request, *args, **kwargs):
        
        #First we need to query to the spotify account management service to retrieve an api token
        #This requres a base64 encoded combination of our client id and client secret
        #https://developer.spotify.com/documentation/web-api
        url = 'https://accounts.spotify.com/api/token'
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
            
            #If our token request was good, grab the token from the response and prepare another
            #request, this time to the spotify search api
            spotifyAccessToken = response.json().get('access_token')
            url = 'https://api.spotify.com/v1/search'

            #Parse the search string and type from the incoming request
            requestData = request.data
            queryTypes = requestData['queryTypes']
            queryString = requestData['queryString']
            requestTarget = url + '?q=' + queryString

            #DayBreakr user does not have to provide a query type, but we still want to provide the 
            #type argument to the spotify web api. If not provided by the DayBreakr user, we'll perform
            #a search restricted to all the types relevant to daybreakr: track, artist, album, playlist
            if len(queryTypes) > 0:
                queryTypeFormatted = ','.join(queryTypes)
                requestTarget = requestTarget + '&type=' + queryTypeFormatted
            else:
                requestTarget = requestTarget + '&type=track,artist,album,playlist'
            
            #Final modifacation to the request is to limit the results (for each type) to 10
            requestTarget = requestTarget + '&limit=10'
            
            #Add auth header
            headers={
                'Authorization': 'Bearer ' + spotifyAccessToken
            }

            #TODO: double check this - should likely remove payload on get request
            #Execute request; return results to client if successful
            payload = {}
            searchResponse = requests.request('GET', requestTarget, headers=headers, data=payload)

            if searchResponse.status_code == 200:
                return Response(searchResponse.json())
            else:
                return Response('Failed to query the Spotify search API. Perhaps a bad search query: ' + requestTarget, status=searchResponse.status_code)

        else:
            return Response('Serverside error; Unable to access Spotify search API', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
