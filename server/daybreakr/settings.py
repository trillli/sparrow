import os

import dotenv
from pathlib import Path
from common.utils import get_env_var

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv.load_dotenv(BASE_DIR / '.env')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env_var('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = os.environ.get("DEBUG_ENABLED") == 'true'
DEBUG = 'true'

# ALLOWED_HOSTS = ['*']
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'tr_admin',
    'tr_common',
    'daybreakr_data'
]

MIDDLEWARE = [
    'daybreakr.middleware.Auth0Middleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'csp.middleware.CSPMiddleware',
]

ROOT_URLCONF = 'daybreakr.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'daybreakr.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': get_env_var('DB_ENGINE'), 
        'NAME': get_env_var('DB_NAME'),             
        'USER': get_env_var('DB_USER'),            
        'PASSWORD': get_env_var('DB_PASSWORD'),  
        'HOST': 'db',                
        'PORT': get_env_var('DB_PORT'),                 
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Security

CLIENT_ORIGIN_URL = get_env_var('CLIENT_ORIGIN_URL')

# CORS_ALLOWED_ORIGINS = ['http://localhost:4040', 'http://host.docker.internal:4040']
CORS_ALLOWED_ORIGINS = ['http://localhost:4040']
# CORS_ALLOWED_ORIGINS = ['*']

CORS_ALLOW_METHODS = [
    "GET",
    "PATCH",
    "PUT"
]

CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
]
CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
]

SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_SECONDS = 31536000

CSP_FRAME_ANCESTORS = "'none'"

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    # 'EXCEPTION_HANDLER': 'messages_api.views.api_exception_handler',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTTokenUserAuthentication',
    ],
}

# JWT

AUTH0_DOMAIN = get_env_var('AUTH0_DOMAIN')
AUTH0_AUDIENCE = get_env_var('AUTH0_AUDIENCE')
AUTH0_MANAGEMENT_API_CLIENT_ID = get_env_var('AUTH0_MANAGEMENT_API_CLIENT_ID')
AUTH0_MANAGEMENT_API_CLIENT_SECRET = get_env_var('AUTH0_MANAGEMENT_API_CLIENT_SECRET')

SIMPLE_JWT = {
    'ALGORITHM': 'RS256',
    'JWK_URL': f'https://{AUTH0_DOMAIN}/.well-known/jwks.json',
    'AUDIENCE': AUTH0_AUDIENCE,
    'ISSUER': f'https://{AUTH0_DOMAIN}/',
    'USER_ID_CLAIM': 'sub',
    'AUTH_TOKEN_CLASSES': ('authz.tokens.Auth0Token',),
}


SPOTIFY_CLIENT_SECRET = get_env_var('SPOTIFY_CLIENT_SECRET')
SPOTIFY_CLIENT_ID = get_env_var('SPOTIFY_CLIENT_ID')

