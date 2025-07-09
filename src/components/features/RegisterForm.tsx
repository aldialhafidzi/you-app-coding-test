'use client'

import { FormEvent, useMemo, useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import IconEye from "../ui/icons/IconEye"
import Link from "next/link"
import { register } from "@/services/auth"
import { useRouter } from "next/navigation"
import showError from "@/utils/error"

const RegisterForm = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
    })

    const isValidForm = useMemo(() => {
        return form?.email && form?.password && form?.passwordConfirmation && form?.username && (form?.password === form?.passwordConfirmation)
    }, [form])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await register(form)
            router.push('/login')
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-[25px] w-full" noValidate>
            <h5 className="text-3xl font-bold text-white ml-[18px]">Register</h5>
            <div className="flex flex-col gap-[15px]">
                <Input
                    value={form.email}
                    name="email"
                    placeholder="Enter Email"
                    onChange={(e) => setForm(prev => ({ ...prev, email: e?.target?.value }))}
                />

                <Input
                    value={form.username}
                    name="username"
                    placeholder="Create username"
                    onChange={(e) => setForm(prev => ({ ...prev, username: e?.target?.value }))}
                />

                <Input
                    value={form.password}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create Password"
                    onChange={(e) => setForm(prev => ({ ...prev, password: e?.target?.value }))}
                    trailing={
                        <button tabIndex={-1} type="button" onClick={() => setShowPassword(prev => !prev)}>
                            <IconEye />
                        </button>
                    }
                />

                <Input
                    value={form.passwordConfirmation}
                    name="passwordConfirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    onChange={(e) => setForm(prev => ({ ...prev, passwordConfirmation: e?.target?.value }))}
                    trailing={
                        <button tabIndex={-1} type="button" onClick={() => setShowPasswordConfirmation(prev => !prev)}>
                            <IconEye />
                        </button>
                    }
                />
            </div>

            <div>
                <Button disabled={!isValidForm || loading} type="submit">
                    {loading ? 'Please Wait..' : 'Register'}
                </Button>

                <p className="text-white text-center text-sm font-medium mt-[52px]">
                    Have an account? <Link href="/login" className="text-gold">Login here</Link>
                </p>
            </div>
        </form>
    )
}

export default RegisterForm