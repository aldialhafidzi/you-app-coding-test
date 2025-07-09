'use client'

import { getProfile, ProfileType } from "@/services/users"
import { useEffect, useState } from "react"

export default function useGetProfile() {
    const [data, setData] = useState<ProfileType | null>(null)

    const fetchData = async () => {
        const response = await getProfile()
        setData(response?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, fetchData }
}