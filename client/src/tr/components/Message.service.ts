import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "./ApiResponse";
import { callExternalApi } from "./ExternalApi.service";

const apiServerUrl = 'http://localhost:6060'

export const getPublicResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/public`,
    // url: `${apiServerUrl}/tr/model/alarm`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getProtectedResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  console.log('access token:')
  console.log(accessToken)
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/lazyalarms`,
    // url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  // console.log('GOING TO GET PROTECTED RESOURCE. CONFIG IS:')
  // console.log(config)
  // console.log(accessToken)
  // console.log('and pasted one is:')
  // console.log('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtXRWZtTUxSVnNxcTRFbXp3X2NOSSJ9.eyJpc3MiOiJodHRwczovL2Rldi1tMHpiaDd4N3E0djR0bG82LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJTUUUyejJQTktlTUFtd3daRThKRkg3U2J2MnlvN0RCY0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9zcGFycm93LnRyaWxsbGkuY29tIiwiaWF0IjoxNzA2ODAwOTI2LCJleHAiOjE3MDY4ODczMjYsImF6cCI6IlNRRTJ6MlBOS2VNQW13d1pFOEpGSDdTYnYyeW83REJjIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.lICNibgacJqhSV49bPfCbUbyC95fNJnlcC-YgTu6mZdNIcusys2x2lKNtEzfIxsjX-uJ0NMnlyLGMzP0ocwz9w0zmOVaBZ2zXM_PAOQWDsY3LXGlghXteFtsv2oO9-Kc83uv6leu7Ev6O2fdTcy9IxO_GU6UsH64hzu1HRoY_7v0GWZXEUySdmdJnJYyePASrAaoXSFvvdDLnuV5RenSSN4MGEAlKPemTuIdBdMT0CX_VZNjYL2p1p35ENuQdzGiwMjBiAlV3Xeg-7TkPjQRvEzUZpYLbY_hGXpdd3-W2c5vK7Y2B3eoUQN-6xBLA-PMYdaXgIWQvYTudb-hnoyoDw')

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getAdminResource = async (
  accessToken: string
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
