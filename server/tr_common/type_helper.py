import datetime
from decimal import Decimal

class TypeHelper:

    def is_type(self, val, types):
        
        if self.is_string(types):
            types = [types]

        if any(type in types for type in ['string', 'str']):
            return self.is_string(val)

        if any(type in types for type in ['integer', 'int']):
            return self.is_integer(val)

        if 'float' in types:
            return self.is_float(val)

        if 'decimal' in types:
            return self.is_decimal(val)

        if 'list' in types:
            return self.is_list(val)

        if any(type in types for type in ['dictionary', 'dict', 'map']):
            return self.is_dict(val)

        if any(type in types for type in ['boolean', 'bool']):
            return self.is_boolean(val)

        if 'tuple' in types:
            return self.is_tuple(val)

        if 'set' in types:
            return self.is_set(val)

        if 'none' in types:
            return self.is_none(val)

        if 'datetime' in types:
            return self.is_datetime(val)

        if 'iterable' in types:
            return self.is_iterable(val)

        if 'callable' in types:
            return self.is_callable(val)

        return False

    
    def is_string(self, val):
        return isinstance(val, str)

    
    def is_integer(self, val):
        return isinstance(val, int)
    
    
    def is_float(self, val):
        return isinstance(val, float)

    
    def is_decimal(self, val):
        return isinstance(val, (float, Decimal))

    
    def is_list(val):
        return isinstance(val, list)

    
    def is_dict(self, val):
        return isinstance(val, dict)
 
    
    def is_boolean(self, val):
        return isinstance(val, bool)
 
    
    def is_tuple(self, val):
        return isinstance(val, tuple)

    
    def is_set(self, val):
        return isinstance(val, set)
 
    
    def is_none(self, val):
        return val is None

    
    def is_datetime(self, val):
        return isinstance(val, datetime.datetime)

    
    def is_iterable(self, val):
        try:
            #TODO: performance concerns: what if val is a very large iterable
            iter(val)
            return True
        except TypeError:
            return False

    
    def is_callable(self, val):
        return callable(val)

