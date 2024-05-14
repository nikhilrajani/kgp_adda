"use server"

import User from "@/lib/models/user.model"
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";

interface Params{
    userId: string,
    name: string,
    username: string,
    hall: string,
    department: string,
    bio: string,
    image: string,
    path: string,
}

export async function updateUser({
    userId,
    name,
    username,
    hall,
    department,
    bio,
    image,
    path,
}:Params):Promise<void> {
    connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {
                username: username.toLowerCase(),
                name,
                hall,
                department,
                bio,
                image,
                onboarded:true,
            },
            {upsert: true},
        );
    

        
        if(path==='/profile/edit'){
            revalidatePath(path);
        }
    } catch (error) {
        console.log(error)
    }
}