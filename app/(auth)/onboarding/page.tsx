import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

async function Page() {
    const user=await currentUser();

    const userInfo={};

    const userData={
        id:user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName,
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl,
        hall: userInfo?.hall || "",
        department: userInfo?.department || "",
    }
    return (
        <main className="mx-auto flx max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">Complete your KGPian Profile Now!</p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                    user={userData}
                    btnTitle="Submit"
                />
            </section>
        </main>
    )
}

export default Page;