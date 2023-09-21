import { getAuthSession } from "@/lib/auth"

export default async function Home() {
    const session = await getAuthSession()
    return (
        <div className="mt-40 antialiased">
            {
                session?.user ? (
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-bold">
                            Welcome {session.user.name}
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            You are now logged in.
                        </p>
                    </div>
                ) : (
                    <div className="mt-40 antialiased">
                        <h1 className="text-5xl font-extrabold tracking-tight text-center text-orange-500">
                            Mentury
                        </h1>
                        <p className="text-center text-neutral-600 mt-2 text-lg">
                            Explore, learn and complete our courses
                        </p>
                    </div>
                )
            }
        </div>
    )
}