/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialProviders from 'next-auth/providers/credentials'
import { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
    providers: [
        CredentialProviders({
            name: 'Credentials',
            async authorize(credentials): Promise<any> {
                try {
                    return {
                        user: JSON.parse(credentials?.user || '{}'),
                        token: credentials?.token,
                    }
                } catch (error) {
                    console.log(error)
                    throw new Error('Login Error!')
                }
            },
            credentials: {
                user: { label: 'user', type: 'text' },
                token: { label: 'token', type: 'text' },
            },
        }),
    ],
    callbacks: {
        async session(payload) {
            const { session, token }: any = payload
            return { ...session, user: { ...token, ...token?.user, ...token.user.user } }
        },
        async signIn() {
            return true
        },
        async jwt(payload: any) {
            const { token, user, session, trigger } = payload

            if (user) {
                token.user = { ...user }
                token.token = user.token
            } else if (trigger === 'update') {
                token.user = { ...session }
            }

            return token
        },
    },
}

export default authOptions