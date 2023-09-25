"use client"

import * as z from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { Course } from "@prisma/client"
import { FileUpload } from "@/components/file-upload"

interface ImageFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    })
})

export const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated success!", {
                icon: "👏",
                duration: 5000,
                style: {
                    background: "#10b98160",
                    color: "#fff",
                    border: "1px solid #10b981",
                }
            })
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Something went wrong", {
                duration: 5000,
                style: { 
                    background: "#ff261760", 
                    color: "#ccc", 
                    border: "1px solid #ff2617",
                }
            })
        }
    }

    return (
        <div className="mt-6 border bg-neutral-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an image
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="mt-5 flex items-center justify-center h-60 bg-neutral-800 rounded-md">
                        <ImageIcon className="h-10 w-10 text-neutral-500"/>
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) onSubmit({ imageUrl: url })
                        }}
                    />
                    <div className="text-xs text-muted-foreground border border-neutral-600 p-1 rounded-md bg-neutral-800 text-center">
                        ✨ Pro tip: Use a 16:9 image for best results
                    </div>
                </div>
            )}
        </div>
    )
}