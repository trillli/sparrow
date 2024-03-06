import React from 'react'

//Value is string
export type trmapKS_VS = {[key: string]: string}
export type trmapKN_VS = {[key: number]: string}
export type trmapKSN_Vs = {[key: string | number]: string}

//Value is number
export type trmapKS_VN = {[key: string]: number}
export type trmapKN_VN = {[key: number]: number}
export type trmapKSN_VN = {[key: string | number]: number}

//Value is boolean
export type trmapKS_VB = {[key: string]: boolean}
export type trmapKN_VB = {[key: number]: boolean}
export type trmapKSN_VB = {[key: string | number]: boolean}

//Value is string array
export type trmapKS_VSa = {[key: string]: string[]}
export type trmapKN_VSa = {[key: number]: string[]}
export type trmapKSN_VSa = {[key: string | number]: string[]}

//Value is number array
export type trmapKS_VNa = {[key: string]: number[]}
export type trmapKN_VNa = {[key: number]: number[]}
export type trmapKSN_VNa = {[key: string | number]: number[]}

//Value is boolean array
export type trmapKS_VBa = {[key: string]: boolean[]}
export type trmapKN_VBa = {[key: number]: boolean[]}
export type trmapKSN_VBa = {[key: string | number]: boolean[]}

//Value is function
export type trmapKS_VF = {[key: string]: Function}
export type trmapKN_VF = {[key: number]: Function}
export type trmapKSN_VF = {[key: string | number]: Function}

//Value is any
export type trmapKS_VA = {[key: string]: any}
export type trmapKN_VA = {[key: number]: any}
export type trmapKSN_VA = {[key: string | number]: any}