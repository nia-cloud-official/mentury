"use client"

import * as z from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

import { Course } from "@prisma/client"
import { Combobox } from "@/components/ui/combobox"

interface CategoryFormProps {
    initialData: Course
    courseId: string
    options: { 
        label: string 
        value: string 
    }[]
}

const formSchema = z.object({
    categoryId: z.string().min(1, "Select a category for this course to continue")
})

export const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ""
        }
    })

    const { isSubmitting, isValid } = form.formState

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

    const selectedOption = options.find((option) => option.value === initialData.categoryId)

    return (
        <div className="mt-6 border bg-neutral-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && 'text-neutral-500'
                )}>
                    {selectedOption?.label || "No category selected to this course"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Combobox 
                                            options={...options}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button 
                                variant="outline"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}