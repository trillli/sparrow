from django.http import JsonResponse


# Create your views here.

def sound_search(request):
    data = {
        'message': 'here is the return'
    }
    return JsonResponse(data)