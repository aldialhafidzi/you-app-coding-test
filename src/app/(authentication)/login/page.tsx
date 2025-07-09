'use client'

import LoginForm from "@/components/features/LoginForm"
import IconChevronLeft from "@/components/ui/icons/IconChevronLeft"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()

    return (
        <div className="p-6 max-w-[450px] mx-auto">
            <div className="flex items-center">
                <button type="button" className="inline-flex items-center gap-[10px] text-white p-2 -mx-2" onClick={() => router.back()}>
                    <IconChevronLeft />
                    <p className="font-bold text-sm">Back</p>
                </button>
            </div>

            <div className="min-h-[calc(100vh-86px)] flex items-center pb-[86px]">
                <LoginForm />
            </div>
        </div>
    );
}
