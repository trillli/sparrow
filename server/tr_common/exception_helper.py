from rest_framework.views import exception_handler

class ExceptionHelper:

    #TODO: yet to be implemented; intent is for this to serve as a flexible exception handling abstraction
    def throw(self, ex):
        raise Exception(ex)