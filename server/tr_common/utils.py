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

def get_model_by_name(model_name):
    # return apps.get_model(app_label='core_' + settings.PROJECT_NAME, model_name=name)
    print(model_name)
    app_labels = get_app_labels_by_model_name(model_name, True)
    if len(app_labels) == 1:
        app_label = app_labels[0]
        model = apps.get_model(app_label=app_label, model_name=model_name)
    else:
        model = None

    return model

#Will return an array of all apps containing a model of model_name
#If unique = True, then will raise an exception if multiple apps have model with same name
#   Note: Django already enforce unique model names within a single app, even if those models are
#       in separate packages, so do not need to manually check for that
def get_app_labels_by_model_name(model_name, unique = False):
    apps_with_model = []
    for app in get_project_apps():
        app_models = app.get_models()
        app_model_names = [model.__name__.lower() for model in app_models]
        log_helper = InstanceFactory.get_log_helper()
        logger = log_helper.get_logger('util')
        logger.info('This is a test log')
        logger.info(app_model_names)
        print(app_model_names)
        if model_name.lower() in app_model_names:
            logger.info('FOUND A MATCH! -------------------- ')
            logger.info('MODEL NAME: ' + model_name)
            logger.info('APP LABEL: ' + app.label)
            apps_with_model.append(app.label)

    if unique and len(apps_with_model) > 1:
        # ex_helper = ExceptionHelper()
        msg = 'Model name ' + model_name + ' not unique in project.'
        # ex_helper.throw(msg)
        raise Exception(msg)

    return apps_with_model

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




    for app in project_apps:
        app_models

def url_params_validation(url) -> str:
    print('url is: ')
    model_name = url.setdefault('type', None)
    if not model_name:
        raise KeyError('exception in util method')
    return model_name

    
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
        