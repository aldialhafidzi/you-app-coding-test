/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession, signOut } from "next-auth/react"

interface OptionsType extends RequestInit {
    timeout?: number
    revalidate?: number
    tags?: any[]
    body?: any,
    cache?: RequestCache
    customURL?: boolean
    useAuthToken?: boolean
}

async function fetcher(resource: string, options?: OptionsType) {
    const timeout = options?.timeout || 60000
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    let customOptions: any = {
        ...options,
        next: {
            revalidate: 3600,
            ...options?.next
        },
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            ...options?.headers
        }
    }

    if (typeof window !== 'undefined' && options?.useAuthToken) {
        const session: any = await getSession()
        if (session?.user?.token) {
            customOptions = {
                ...customOptions,
                headers: {
                    ...customOptions.headers,
                    'x-access-token': session?.user?.token
                }
            }
        }
    }

    if (customOptions?.headers?.['Content-Type'] === 'multipart/form-data') {
        delete customOptions?.headers?.['Content-Type']
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL || 'https://techtest.youapp.ai/api/'}${resource}`
    if (options?.customURL) url = resource

    const response = await fetch(url, {
        ...customOptions,
        signal: controller.signal,
    })

    if (response?.status === 403) {
        window.location.href = '/403'
    }

    if (response?.status === 401) {
        signOut()
    }

    clearTimeout(id)
    return response
}

export default fetcher