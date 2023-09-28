"use client"

import * as z from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import Image from "next/image"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { File, ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { Attachment, Course } from "@prisma/client"
import { FileUpload } from "@/components/file-upload"

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] }
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1, {
        message: "File is required"
    })
})

export const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values)
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
                Course attachments 
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
               <>
                {initialData.attachments.length === 0 && (
                    <p 
                    className="text-sm mt-2 text-red-500"
                    >
                        No attachments were provided for this course yet
                    </p>
                )}
                {
                    initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-neutral-800 rounded-md text-sm"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p>
                                        {attachment.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )
                }     
               </> 
            )}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) onSubmit({ url: url })
                        }}
                    />
                    <div className="flex items-center border bg-neutral-800 p-1 pl-2 rounded-md text-sm">
                        🎈 Provide resources, notes or any other attachment for your students
                    </div>
                </div>
            )}
        </div>
    )
}