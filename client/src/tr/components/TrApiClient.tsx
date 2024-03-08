export type TrFetchConfig = {
  accessToken: string
  headers?: {[key:string]: string}
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'get' | 'post' | 'put' | 'patch' | 'delete'
  omitDefaultHeaders?: boolean
  path: string
  payload?: any
}

export type TrFetchResult = {
  status: number | null
  requestConfig: TrFetchConfig
  request: Request | null
  ok?: {
    data: {[key: string]: any}
  }
  error?: {
    response: Response | null
  }
}


class TrFetchError implements Error {
  
  defaultMessage: string = 'An exception ocurred during the processing of the request. See "requestConfig" for the provided API call config, "request" for the configured Fetch request, and "response" for the full response object.'
  message: string
  name: string
  result: TrFetchResult

  constructor(result: TrFetchResult, messageOverride: string = '') {
    this.message = (messageOverride == '') ? this.defaultMessage : messageOverride
    this.name = 'TrFetchError'
    this.result = result
  }

}




//headers: we'll automatically create the content-type and authorization headers; any customHeaders
//  provided will be appended to these default headers
//method: matches options provided by trillli_rest/views.py (ModelViewSet and APIView)
//path: if does not begin with slash, one will be prepended automatically 
const _sanitizeRequestConfig = (config:TrFetchConfig):TrFetchConfig => {
  
  //Add default headers
  const defaultHeaders = config.omitDefaultHeaders ? {} : {
    'Authorization': `Bearer ${config.accessToken}`,
    'content-type': 'application/json'
  }
    
  config.headers = (config.headers) ? {...defaultHeaders, ...config.headers} as {[key:string]: string} : defaultHeaders as {[key:string]: string}

  //Check for post body, if required
  const payloadRequired: boolean = ['POST', 'PUT', 'PATCH'].includes(config.method.toUpperCase())
  const payloadMissing: boolean = (!config.payload)
  
  if (payloadRequired && payloadMissing) {
    const trFetchBad: TrFetchResult = {
      status: null,
      request: null,
      requestConfig: config,
      error: {
        response: null
      }
    }
    const message = `Bad request; Request of type ${config.method} must include a payload. Request not sent.`
    const error = new TrFetchError(trFetchBad, message)
    // throw error
    console.log(error)

  }

  //Prepend slash to path if it does not already start with one
  config.path = (config.path[0] == '/') ? config.path : `/${config.path}`

  return config

}


export const trFetch = async(config:TrFetchConfig): Promise<TrFetchResult> => {

  //Sanitize request config
  config = _sanitizeRequestConfig(config)

  const urlBase = import.meta.env.VITE_TRILLLI_SERVER_URL_BASE

  const requestFetch: Request = new Request(urlBase + config.path, {
    method: config.method,
    headers: config.headers,
    body: (config.method?.toUpperCase() == 'GET') ? null : config.payload
  })

  try {

    config.body = (config.method?.toUpperCase() == 'GET') ? null : config.payload

    const responseFetch: Response = await fetch(urlBase + config.path, {
      method: config.method,
      headers: config.headers,
      body: config.body
    })

    if (!responseFetch.ok) {
      const trApiResponseBad:TrFetchResult = {
        status: responseFetch.status,
        request: requestFetch,
        requestConfig: config,
        error: {
          response: responseFetch
        }
      }
      const error = new TrFetchError(trApiResponseBad)
      // throw error
      console.log(error)
    }

    const responseJson = await responseFetch.json()
    const trApiResponseOk: TrFetchResult = {
      status: responseFetch.status,
      request: requestFetch,
      requestConfig: config,
      ok: {
        data: responseJson
      }
    }
    return trApiResponseOk
  } catch (error) {
    if (error instanceof TrFetchError) {
      // throw error
      console.log(error)
    } else {
      const trFetchBad:TrFetchResult = {
        status: null,
        request: requestFetch,
        requestConfig: config,
        error: {
          response: null
        }
      }

      const message = JSON.stringify({
        message: `Unhandled error during fetch attempt. Message: ${error.message}`,
        error: error
      })
      const fetchError = new TrFetchError(trFetchBad, message)
      console.log(fetchError)

    }
    
  }

}


  