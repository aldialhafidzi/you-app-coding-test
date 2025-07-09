import fetcher from "@/utils/fetcher"

export type ParamsRegister = {
    email: string
    username: string
    password: string
}

export type ParamsLogin = {
    email: string
    username: string
    password: string
}

export type ResponseRegister = {
    message: string
}

export type ResponseLogin = {
    message: string
    access_token: string
}

export async function register(params?: ParamsRegister): Promise<ResponseRegister> {
    const res = await fetcher('register', {
        method: 'POST',
        body: JSON.stringify(params)
    })
    if (!res.ok) throw await res.json()
    return await res.json()
}

export async function login(params?: ParamsLogin): Promise<ResponseLogin> {
    const res = await fetcher('login', {
        method: 'POST',
        body: JSON.stringify(params)
    })
    if (!res.ok) throw await res.json()
    return await res.json()
}