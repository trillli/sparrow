from django.db import models

# class Message:
#     def __init__(self, text=""):
#         self.metadata = Metadata()
#         self.text = text


# class Metadata:
#     def __init__(self):
#         self.api = "api_django_python_hello-world"
#         self.branch = "basic-authorization"

class LazyAlarm(models.Model):
    user_id = models.CharField(max_length=512, primary_key=True)
    alarms_json = models.TextField()

