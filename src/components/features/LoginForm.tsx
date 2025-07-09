'use client'

import { FormEvent, useMemo, useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import IconEye from "../ui/icons/IconEye"
import Link from "next/link"
import { login } from "@/services/auth"
import { signIn } from "next-auth/react"
import showError from "@/utils/error"

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: ''
    })

    const isValidForm = useMemo(() => {
        return form?.email && form?.password
    }, [form])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await login({
                ...form,
                username: form.email
            })

            await signIn('credentials', {
                user: JSON.stringify({ token: response?.access_token }),
                token: response?.access_token,
                callbackUrl: '/'
            })
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-[25px] w-full" noValidate>
            <h5 className="text-3xl font-bold text-white ml-[18px]">Login</h5>
            <div className="flex flex-col gap-[15px]">
                <Input
                    value={form.email}
                    name="email"
                    placeholder="Enter Username/Email"
                    onChange={(e) => setForm(prev => ({ ...prev, email: e?.target?.value }))}
                />

                <Input
                    value={form.password}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    onChange={(e) => setForm(prev => ({ ...prev, password: e?.target?.value }))}
                    trailing={
                        <button tabIndex={-1} type="button" onClick={() => setShowPassword(prev => !prev)}>
                            <IconEye />
                        </button>
                    }
                />
            </div>

            <div>
                <Button disabled={!isValidForm || loading} type="submit">
                    {loading ? 'Please Wait..' : 'Login'}
                </Button>

                <p className="text-white text-center text-sm font-medium mt-[52px]">
                    No account? <Link href="/register" className="text-gold">Register here</Link>
                </p>
            </div>
        </form>
    )
}

export default LoginForm