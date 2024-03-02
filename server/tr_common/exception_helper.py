from rest_framework.views import exception_handler

class ExceptionHelper:

    def throw(self, ex):
        print('in throw')
        # self.logger.debug('Logging exception: ')
        # self.logger.debug(ex)
        raise Exception(ex)
    

    def api_exception_handler(exc, context=None):
        response = exception_handler(exc, context=context)
        # if response and isinstance(response.data, dict):
        #     response.data = {'message': response.data.get('detail', 'API Error')}
        # else:
        #     response.data = {'message': 'Error encountered in request.'}
        return response