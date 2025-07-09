'use client'

import IconChevronLeft from "@/components/ui/icons/IconChevronLeft"
import IconX from "@/components/ui/icons/IconX"
import useGetProfile from "@/hooks/useGetProfile"
import { updateProfile } from "@/services/users"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function InterestPage() {
    const router = useRouter()

    const { data: profile } = useGetProfile()

    const [loading, setLoading] = useState(false)
    const [interests, setInterests] = useState<string[]>([])

    const [value, setValue] = useState<string>('')

    const onSubmit = async () => {
        setLoading(true)

        try {
            await updateProfile({
                ...profile,
                interests,
            })

            router.push('/profile')
        } catch (error) {
            console.log(error)
            alert('Something wrong!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInterests(profile?.interests || [])
    }, [profile])

    return (
        <div className="p-6 max-w-[450px] mx-auto flex flex-col gap-[28px]">
            <div className="flex items-center justify-between">
                <button type="button" className="inline-flex items-center gap-[10px] text-white p-2 -mx-2" onClick={() => router.back()}>
                    <IconChevronLeft />
                    <p className="font-bold text-sm">Back</p>
                </button>

                <button type="button" disabled={loading} className="text-sky p-2 -mx-2 font-semibold" onClick={onSubmit}>
                    Save
                </button>
            </div>

            <div className="min-h-[calc(100vh-120px)] flex items-center pb-[120px]">
                <div className="flex flex-col gap-[35px] w-full">
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-bold text-gold">Tell everyone about yourself</p>
                        <p className="font-bold text-xl">What interest you?</p>
                    </div>

                    <div className="bg-[#D9D9D9]/6 py-[10px] px-[17px] rounded-[10px] w-full flex flex-wrap gap-x-1 gap-y-2">
                        {interests?.map((v, index) => (
                            <div key={index} className="flex items-center gap-[7px] bg-white/10 rounded-[4px] p-2">
                                <p className="font-semibold">{v}</p>
                                <button
                                    type="button"
                                    onClick={() => setInterests(prev => prev?.filter((p, pIndex) => pIndex !== index))}
                                >
                                    <IconX />
                                </button>
                            </div>
                        ))}

                        <input
                            value={value}
                            className="outline-none flex-auto px-3"
                            onChange={(e) => setValue(e?.target?.value)}
                            onKeyUp={(e) => {
                                const isDuplicate = interests?.includes(value);

                                if (e?.key === 'Enter' && !isDuplicate) {
                                    setInterests(prev => [...prev, value])
                                    setValue('')
                                }

                                if (isDuplicate) {
                                    setValue('')
                                }

                                if (e?.key === 'Backspace' && !value) {
                                    setInterests(prev => prev?.filter((p, pIndex) => pIndex !== prev?.length - 1))
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
