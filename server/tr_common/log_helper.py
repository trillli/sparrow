import sys
import logging
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings
from .utils import generate_unique_id

class LogHelper():

    def get_logger(self, name = ''):

        #for running the maker script
        try:
            file_name = settings.LOGGING['file_name_server']
        except ImproperlyConfigured:
            file_name = 'trillli_setup.log'

        if name == '':
            name = generate_unique_id({'bytes': 4, 'prepend': 'anon_'})
        
        logger = logging.getLogger(name)
        logger.setLevel(logging.DEBUG)

        # Create a FileHandler and set its level
        file_handler = logging.FileHandler(file_name)
        file_handler.setLevel(logging.DEBUG)

        # Create a formatter and set it for the handler
        formatter = logging.Formatter('%(asctime)s %(levelname)s:  %(message)s')
        file_handler.setFormatter(formatter)

        # Add the FileHandler to the logger
        logger.addHandler(file_handler)

        return logger
