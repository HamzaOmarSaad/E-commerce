"use client"

import { Button } from "@/components/ui/button"

function Error({ error }: { error:Error } ) {

    return (
        <div className="text-center">
            <p className="font-bold text-2xl">ysomthing went wrong </p>
            <div className="text-red-600 text-4xl">{error.message || "there is an internet error please check your internet"}</div>
            <Button>try again</Button>
        </div>
        
    )
}

export default Error
