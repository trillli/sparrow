from rest_framework_simplejwt.tokens import AccessToken

# From Auth0 Tutorial / Quickstart
# See settings.py SIMPLE_JWT
class Auth0Token(AccessToken):
    def verify(self):
        """
        Validate only the expiration date as the signature and all
        the other claims are validated on token initializer
        """
        self.check_exp()
