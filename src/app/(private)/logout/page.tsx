'use client'
import { signOut } from "next-auth/react"
import { useEffect } from "react"

export default function Logout() {
    useEffect(() => {
        signOut()
    }, [])

    return (
        <main className="min-h-[500px] container flex items-center justify-center gap-2">
            <span>Logout..</span>
        </main>
    )
}