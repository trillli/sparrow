import secrets
from os import environ
from django.core.exceptions import ImproperlyConfigured
from django.apps import apps
from django.conf import settings
from ._factory_ import InstanceFactory


#From auth0 django tutorial
def get_env_var(key):
    try:
        return environ[key]
    except KeyError:
        raise ImproperlyConfigured(f"Missing {key} environment variable.")


def number_is_in_range(val, min, max, inclusive = True):
    if inclusive:
        return min <= val <= max
    else:
        return min < val < max

def get_project_apps():
    return apps.get_app_configs()

def get_project_app_labels():
    app_labels = [app.label for app in get_project_apps()]
    return app_labels

#If by_app_label = True, return is a dictionary with app label as key and array of that apps models as val
#If by_app_label = False, return is an array of all models
#If label_only = True, return has only names of models; otherwise return has model class
def get_project_models(by_app_label = False, model_name_only = False):
        
    if by_app_label:
        collection = {}
    else:
        collection = []
    
    for app in get_project_apps():
        app_models = app.get_models()
        if model_name_only:
            val = [model.__name__ for model in app_models]
        else:
            val = app_models

        if by_app_label:
            collection[app.label] = val
        else:
            collection.append(val)

    return collection
  
#options: optional with keys:
    #lenth [int; default = max = 36, min = 1]; specifies length in bytes in the generated id
    #   note: 2 bytes = 1 hexadecimal character
    #prepend [string]; if provided, forces 'int' to False and prepends this string
    #append [string]; if provdied, forces 'int' to False and appends this string
@staticmethod
def generate_unique_id(options = {}):

    #Generate key
    bytes = options.get('bytes', 8)
    key = secrets.token_bytes(bytes).hex()

    #Prepend string to key
    prepend = options.get('prepend', '')
    key = prepend + key

    #Append string to key
    append = options.get('append', '')
    key += append

    return key
        








    #Set unique id length
    length = options.get('length', 16)
        