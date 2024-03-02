
class InstanceFactory():

    @staticmethod
    def get_console_helper():
        from .console_helper import ConsoleHelper
        return ConsoleHelper()

    @staticmethod
    def get_exception_helper():
        from .exception_helper import ExceptionHelper
        return ExceptionHelper()

    @staticmethod
    def get_file_helper():
        from .file_helper import FileHelper
        return FileHelper()

    @staticmethod
    def get_log_helper():
        from .log_helper import LogHelper
        return LogHelper()
    
    @staticmethod
    def get_type_helper():
        from .type_helper import TypeHelper
        return TypeHelper()

    