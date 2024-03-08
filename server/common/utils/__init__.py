from os import environ
from django.core.exceptions import ImproperlyConfigured

# Gets a value from the .env file
# From Auth0 tutorial / quickstart guide; consider moving into tr_common
def get_env_var(key):
    try:
        return environ[key]
    except KeyError:
        raise ImproperlyConfigured(f"Missing {key} environment variable.")