"use client"

import * as z from "zod"
import axios from "axios"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

// UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import toast from "react-hot-toast"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    })
})

export default function CreatePage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values)
            router.push(`/teacher/courses/${response.data.id}`)
            toast.success("Course created!", {
                icon: "👏",
                duration: 5000,
                style: {
                    background: "#10b98160",
                    color: "#fff",
                    border: "1px solid #10b981",
                }
            })
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                icon: "🚨",
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
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6 mt-10">
            <div>
                <h1 className="text-2xl">
                    Name your course
                </h1>
                <p className="text-neutral-600 text-sm">
                    Give your course a name to get started.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to programming'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        What will you teach in this course?
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button variant="ghost">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}