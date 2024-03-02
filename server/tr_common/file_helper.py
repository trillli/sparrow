import os
import yaml
from .exception_helper import ExceptionHelper

class FileHelper:

    def __init__(self):
        super().__init__()
        self.ex_helper = ExceptionHelper()



    #Writes the provided content to a file at the provided path
    #If overwrite=False, will abort if file specified by path already exists
    def file_write(self, path, content, overwrite=False):

        if not overwrite:
            if os.path.exists(path):
                msg = 'File already exists; set overwrite argument to True to overwrite.'
                self.ex_helper.throw(msg)

        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as file:
            print("opened file")
            file.write(content)


    #Extracts and returns the contents of a file at the specified path
    #If file does not exist, exception is thrown
    def file_get_contents(self, path):

        try:
            with open(path, 'r') as file:
                contents = file.read()
        except:
            msg = 'exception encountered - no file at path'
            self.ex_helper.throw(msg)

        return contents
    
    #Like file_get_contents, but tailored to yml files and returns a file contents in a dict
    def yml_get_contents(self, path):

        try:
            with open(path, 'r') as file:
                contents = yaml.safe_load(file)
        except:
            msg = 'exception encountered - no file at path'
            self.ex_helper.throw(msg)
        
        return contents

    #Retrieves a specific field from yml file
    #field_names argument may be a string or an array
    #   Use an array to retreive nested fields
    #       ex: [state, city, street] will retrieve state.city.street
    def yml_get_property(self, path, fieldNames):

        if isinstance(fieldNames, str):
            fieldNames = [fieldNames]

        if not isinstance(fieldNames, list):
            #TODO: Exception handling for invalid fieldnames arg type
            print("arg2 needs to be a string or array of strings")

        val = self.yml_get_contents(path)

        #TODO: handle invalid field name
        for fieldName in fieldNames:
            if not isinstance(fieldName, str):
                #TODO: Exception handling for invalid fieldnames arg type
                print("arg2 needs to be a string or array of strings")
            val = val.get(fieldName, {})

        return val