import subprocess
import shlex
from enum import Enum
from .enums import InputValidityCheck
from .exception_helper import ExceptionHelper
from .type_helper import TypeHelper

class ConsoleHelper:

    def __init__(self):
        super().__init__()
        self.ex_helper = ExceptionHelper()
        self.type_helper = TypeHelper()

    def execute_command(self, cmd, options={}):

        result = subprocess.run(cmd, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        if result.returncode != 0:
            self.ex_helper.throw(result.stderr)
        else:
            self.logger.info('successfully executed console command')
        

    def request_input(self, prompt, options={}):
        
        #Prompt & wait for user input
        val = input(prompt)

        '''Check options variable for validation flags (valid input types or answers). Call validation methods if required'''

        #Validate type
        options['validty_check_type'] = InputValidityCheck.TYPE
        if 'types' in options:
            is_valid = self.is_valid_input(val, options)
            
        #Validate answer
        options['validty_check_type'] = InputValidityCheck.ANSWER
        if 'answers' in options:
            is_valid = self.is_valid_input(val, options)
        
        if not is_valid:
            options['retry'] = True
            val = self.handle_invalid_input(val, prompt, options)

        return val

    def is_valid_input(self, val, options):

        #Check for validation check goal & validate accordingly

        #First, ensure type matches an allowed type
        if (options['validty_check_type'] == InputValidityCheck.TYPE):
            if not self.type_helper.is_type(val, options['types']):
                return False

        #Next, ensure answer matches an allowed answer
        if (options['validty_check_type'] == InputValidityCheck.ANSWER):
            if self.type_helper.is_type(val, 'str'):
                val = val.lower()

            for answer in options['answers']:
                
                if self.type_helper.is_type(answer, 'str') and not options.get('case_sensitive', True):
                    answer = answer.lower()
                
                if val == answer:
                    return True

            
        return False


    #OPTIONS: may accept flags: msg, retry
    def handle_invalid_input(self, val, prompt, options):
        #TODO: make sure to clear invalid_cause from options if re-prompting!
        #if not reprompting, raise exception
        if 'retry' in options and options['retry'] == True:
            options['invalid_cause'] = None
            return self.request_input(prompt, options)
        else:
            raise('Invalid input')
    
    def response_affirmitive(self, val):
        if val.lower() in ['yes', 'y']:
            return True
        else:
            return False




