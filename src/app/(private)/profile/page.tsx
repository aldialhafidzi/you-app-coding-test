'use client'

import AboutForm from "@/components/features/AboutForm"
import IconChevronLeft from "@/components/ui/icons/IconChevronLeft"
import IconMore from "@/components/ui/icons/IconMore"
import IconPencil from "@/components/ui/icons/IconPencil"
import IconPig from "@/components/ui/icons/IconPig"
import IconVirgo from "@/components/ui/icons/IconVirgo"
import useGetProfile from "@/hooks/useGetProfile"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
    const router = useRouter()
    const { data: profile, fetchData } = useGetProfile()

    const userName = `@${profile?.username}`
    const interests = profile?.interests

    return (
        <div className="p-6 max-w-[450px] mx-auto bg-[#09141A] flex flex-col gap-[28px] min-h-[calc(100vh)]">
            <div className="flex items-center justify-between">
                <button type="button" className="inline-flex items-center gap-[10px] text-white p-2 -mx-2" onClick={() => router.back()}>
                    <IconChevronLeft />
                    <p className="font-bold text-sm">Back</p>
                </button>

                <p className="flex-auto text-center text-white font-semibold text-sm">{userName}</p>

                <button type="button" className="text-white p-2 -mx-2">
                    <IconMore />
                </button>
            </div>

            <div className="bg-[#162329] px-[27px] pb-[24px] pt-[13px] rounded-2xl flex flex-col gap-[33px] h-[190px] relative">
                <div className="flex justify-end items-center gap-4">
                    <IconPencil className="text-white transform translate-x-2" />
                </div>

                <div className="absolute left-[13px] bottom-[17px] flex flex-col gap-3">
                    <div className="flex flex-col gap-1.5">
                        <p className="font-bold text-sm text-white">{userName}</p>
                        {profile?.gender && <p className="text-sm font-medium">{profile?.gender}</p>}
                    </div>

                    {(profile?.horoscope && profile?.zodiac) &&
                        <div className="flex items-center gap-[15px]">
                            <span className="flex items-center gap-2 bg-white/6 rounded-[100px] font-semibold py-2 px-4">
                                <IconVirgo />
                                {profile?.horoscope}
                            </span>
                            <span className="flex items-center gap-2 bg-white/6 rounded-[100px] font-semibold py-2 px-4">
                                <IconPig />
                                {profile?.zodiac}
                            </span>
                        </div>
                    }
                </div>
            </div>

            <AboutForm onSuccess={() => fetchData()} profile={profile} />

            <div className="bg-[#0E191F] px-[27px] pb-[24px] pt-[13px] rounded-2xl flex flex-col gap-[33px]">
                <div className="flex justify-between items-center gap-4">
                    <p className="font-bold text-sm text-white">Interest</p>

                    <button
                        type="button"
                        className="text-white transform translate-x-2"
                        onClick={() => router.push('/profile/interest')}
                    >
                        <IconPencil />
                    </button>
                </div>

                {interests?.length ?
                    <div className="flex flex-wrap gap-3">
                        {profile?.interests?.map((v, index) => (
                            <span key={index} className="font-semibold text-sm py-2 px-4 rounded-[100px] bg-white/6">{v}</span>
                        ))}
                    </div>
                    :
                    <p className="text-white/52">Add in your interest to find a better match</p>
                }
            </div>
        </div>
    )
}
