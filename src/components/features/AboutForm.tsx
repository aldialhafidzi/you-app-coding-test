'use client'

import { FormEvent, useEffect, useMemo, useState } from "react"
import IconPencil from "../ui/icons/IconPencil"
import Input from "../ui/input"
import Select from "../ui/select"
import IconPlus from "../ui/icons/IconPlus"
import { createProfile, ProfileType, updateProfile } from "@/services/users"
import dayjs from "dayjs"

const AboutForm = ({
    onSuccess,
    profile
}: {
    onSuccess: () => void,
    profile?: ProfileType | null
}) => {
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState<ProfileType>({
        name: '',
        horoscope: '',
        zodiac: '',
        height: 0,
        weight: 0,
        gender: '',
        birthday: '',
        interests: []
    })

    const age = useMemo(() => {
        return dayjs(new Date()).diff(dayjs(profile?.birthday, 'DD MM YYYY'), 'year')
    }, [profile])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const payload = {
                birthday: form.birthday,
                height: Number(form.height),
                interests: form.interests,
                name: form.name,
                weight: Number(form.weight),
            }

            if (profile?.birthday) {
                await updateProfile(payload)
            } else {
                await createProfile(payload)
            }

            setShowForm(false)
            onSuccess()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (profile?.birthday) {
            setForm(prev => ({
                ...prev,
                name: profile?.name,
                birthday: profile?.birthday,
                height: profile?.height,
                weight: profile?.weight,
                horoscope: profile?.horoscope,
                zodiac: profile?.zodiac,
                interests: profile?.interests || [],
            }))
        }
    }, [profile])

    return (
        <div className="bg-[#0E191F] px-[27px] pb-[24px] pt-[13px] rounded-2xl flex flex-col gap-[33px]">
            <div className="flex justify-between items-center gap-4">
                <p className="font-bold text-sm text-white">About</p>

                {showForm ?
                    <button
                        type="button"
                        className="text-gold transform translate-x-2"
                        form="about-form"
                        onClick={onSubmit}
                    >
                        Save & Update
                    </button>
                    :
                    <button
                        type="button"
                        className="text-white transform translate-x-2"
                        onClick={() => setShowForm(true)}
                    >
                        <IconPencil />
                    </button>
                }
            </div>

            {showForm ?
                <>
                    <form id="about-form" onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
                        <div className="text-white flex items-center gap-[15px]">
                            <button type="button" className="bg-white/8 px-[20px] py-[28px] aspect-square w-[57px] h-[57px] rounded-[17px] flex items-center justify-center">
                                <IconPlus />
                            </button>

                            <p className="font-medium text-xs">Add image</p>
                        </div>
                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Display name:</p>
                            <div className="flex-auto">
                                <Input
                                    value={form?.name}
                                    name="name"
                                    placeholder="Enter name"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e?.target?.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Gender:</p>
                            <div className="flex-auto">
                                <Select
                                    value={form?.gender}
                                    name="gender"
                                    options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                                    placeholder="Select Gender"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, gender: e?.target?.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Birthday:</p>
                            <div className="flex-auto">
                                <Input
                                    value={form?.birthday}
                                    name="birthday"
                                    placeholder="DD MM YYYY"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, birthday: e?.target?.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Horoscope:</p>
                            <div className="flex-auto">
                                <Input
                                    value={form?.horoscope}
                                    name="horoscope"
                                    placeholder="--"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, horoscope: e?.target?.value }))}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Zodiac:</p>
                            <div className="flex-auto">
                                <Input
                                    value={form?.zodiac}
                                    name="zodiac"
                                    placeholder="--"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, zodiac: e?.target?.value }))}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Height:</p>
                            <div className="flex-auto">
                                <Input
                                    value={String(form?.height || '')}
                                    name="height"
                                    placeholder="Add height"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, height: Number(e?.target?.value || 0) }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-[30px]">
                            <p className="text-white/33 font-medium flex-none w-[35%]">Weight:</p>
                            <div className="flex-auto">
                                <Input
                                    value={String(form?.weight || '')}
                                    name="weight"
                                    placeholder="Add weight"
                                    variant="outline"
                                    className="text-right"
                                    onChange={(e) => setForm(prev => ({ ...prev, weight: Number(e?.target?.value || 0) }))}
                                />
                            </div>
                        </div>
                    </form>
                </>
                :

                <>
                    {profile?.birthday ?
                        <div className="flex flex-col gap-[15px]">
                            <p className="text-sm font-medium"><span className="text-white/33">Birthday:</span> {profile?.birthday} (Age {age})</p>
                            <p className="text-sm font-medium"><span className="text-white/33">Horoscope:</span> {profile?.horoscope}</p>
                            <p className="text-sm font-medium"><span className="text-white/33">Zodiac:</span> {profile?.zodiac}</p>
                            <p className="text-sm font-medium"><span className="text-white/33">Height:</span> {profile?.height} cm</p>
                            <p className="text-sm font-medium"><span className="text-white/33">Weight:</span> {profile?.weight} kg</p>
                        </div>
                        :
                        <p className="text-white/52">Add in your your to help others know you better</p>
                    }
                </>
            }
        </div>
    )
}

export default AboutForm