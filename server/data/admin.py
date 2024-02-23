from django.contrib import admin
from django.apps import apps

models_data = apps.get_app_config('data').get_models()

for model_data in models_data:
    admin.site.register(model_data)

