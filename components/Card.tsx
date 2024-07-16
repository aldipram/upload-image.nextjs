"use client"

import Image from "next/image"
import { DeleteButton, EditButton } from "./Button"
import type { Upload } from "@prisma/client"
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"

const Card = ({data} : {data: Upload}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

  return (
    <div className="max-w-sm border border-gray-200 rounded-md shadow">
            <div className="relative aspect-video">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    className="rounded-t-md object-cover"
                />
            </div>
            <div className="p-5 flex justify-between items-center relative">
                <h1 className="text-2xl font-bold text-gray-900 truncate capitalize">{data.title}</h1>
                <button onClick={handleOpen}>
                    <EllipsisVertical />
                </button>
                { open && 
                    <div className="flex gap-2 absolute right-2 top-14 z-50">
                        <EditButton id={data.id} />
                        <DeleteButton id={data.id} />
                    </div>
                }
            </div>
    </div>
  )
}

export default Card