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
import { Input } from "@/components/ui/input"

interface PriceFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    price: z.coerce.number().min(1, "Price must be greater than $0")
})

export const PriceForm = ({
    initialData,
    courseId
}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        }
    })

    const router = useRouter()
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

    return (
        <div className="mt-6 border border-purple-900 rounded-md p-4 text-clip bg-gradient-to-tr from-purple-800/30 via-purple-900/20 to-black">
            <div className="font-medium flex items-center justify-between">
                <p className="font-extrabold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 text-transparent">
                    Course price
                </p>
                <Button 
                    variant="outline" 
                    onClick={toggleEdit} 
                    className="bg-purple-900 bg-opacity-30 border-purple-900 text-purple-400 hover:bg-purple-950 hover:text-purple-200">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Set price for this course
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.price && 'text-purple-500'
                )}>
                    {initialData.price || "Free course"}
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="Set price for this course"
                                            step="0.01"
                                            type="number"
                                            {...field}
                                            className="bg-purple-900 bg-opacity-30 border-purple-900 placeholder-purple-400"
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
                                className="bg-purple-900 bg-opacity-30 border-purple-900 text-purple-400 hover:bg-purple-950 hover:text-purple-200"
                            >
                                Set
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}