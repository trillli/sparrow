"""
Django settings for sparrow project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from trillli.settings import ( LOGGING, MIDDLEWARE, TEMPLATES, AUTH_PASSWORD_VALIDATORS, LANGUAGE_CODE, TIME_ZONE, USE_I18N, USE_TZ, STATIC_URL, DEFAULT_AUTO_FIELD,)

# Build paths inside the project like this: # Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1pj!f^rhv#2_0b@onw#j9deg0dh0il7jy4y8(_807fzjyqlx#@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
'rest_framework',
'trillli',
'trillli_rest',
'sparrow_rest',
]

ROOT_URLCONF = 'sparrow.urls'

WSGI_APPLICATION = 'sparrow.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/


