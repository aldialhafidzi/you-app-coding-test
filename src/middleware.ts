/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'

const privatePathNames = ['profile']

export default withAuth(
    async (request) => {
        const userAuth: any = await getToken({ req: request })
        const auth = userAuth?.token ? jwtDecode(userAuth?.token) : null
        const now = dayjs().valueOf() / 1000
        const pathName = request.nextUrl.pathname
        const firstPathName = pathName?.split('/')?.[1]

        if (now >= (auth?.exp || 0) && privatePathNames?.includes(firstPathName) && auth) {
            return NextResponse.rewrite(new URL('/logout', request.url))
        }

        if (privatePathNames?.includes(firstPathName) && !auth) {
            return NextResponse.redirect(new URL('/profile', request.url))
        }

        if (request.nextUrl.searchParams.get('login') && (now <= (auth?.exp || 0))) {
            const redirectUrl = new URL(request.url)
            redirectUrl.searchParams.delete('login')

            return NextResponse.redirect(new URL('/profile', redirectUrl))
        }

        if (request.nextUrl.searchParams.get('register') && (now <= (auth?.exp || 0))) {
            const redirectUrl = new URL(request.url)
            redirectUrl.searchParams.delete('register')

            return NextResponse.redirect(new URL('/profile', redirectUrl))
        }

        if (firstPathName === 'logout' && !auth) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        
        if (pathName === '/' && auth) {
            return NextResponse.redirect(new URL('/profile', request.url))
        }

        if (pathName === '/' && !auth) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    },
)

export const config = {
    matcher: [
        '/',
        '/profile/:path*',
        '/logout'
    ],
}
