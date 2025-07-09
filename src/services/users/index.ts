import fetcher from "@/utils/fetcher"

export interface BaseResponse<T> {
    message: string
    data: T
}

export interface ProfileType {
    email?: string
    username?: string
    name: string
    birthday: string
    horoscope: string
    zodiac: string
    height: number
    weight: number
    interests: string[]
    gender?: string
}

export interface ParamsCreateProfile {
    name?: string
    birthday?: string
    height?: number
    weight?: number
    interests?: string[]
}

export async function getProfile(): Promise<BaseResponse<ProfileType>> {
    const res = await fetcher('getProfile', {
        useAuthToken: true,
        next: {
            tags: ['getProfile'],
            revalidate: 3600
        }
    })
    if (!res.ok) throw await res.json()
    return await res.json()
}

export async function createProfile(params: ParamsCreateProfile): Promise<BaseResponse<ProfileType>> {
    const res = await fetcher('createProfile', {
        useAuthToken: true,
        method: 'POST',
        body: JSON.stringify(params)
    })

    if (!res.ok) throw await res.json()
    return await res.json()
}

export async function updateProfile(params: ParamsCreateProfile): Promise<BaseResponse<ProfileType>> {
    const res = await fetcher('updateProfile', {
        useAuthToken: true,
        method: 'PUT',
        body: JSON.stringify(params)
    })

    if (!res.ok) throw await res.json()
    return await res.json()
}