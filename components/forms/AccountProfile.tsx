"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod'
import Image from "next/image";
import profileImage from '@/public/assets/profile.svg'
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import {halls,departments} from '@/constants'

interface Props{
    user:{
        id:string,
        objectId:string,
        username:string,
        name:string,
        bio:string,
        image:string,
        hall:string,
        department:string,
    },
    btnTitle: string,
}

const AccountProfile = ({user,btnTitle}:Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const {startUpload} = useUploadThing("media");

    const form=useForm({
        resolver:zodResolver(UserValidation),
        defaultValues:{
            name:user?.name||"",
            username:user?.username||"",
            bio:user?.bio||"",
            profile_photo:user?.image||"",
            hall:user?.hall ||"",
            department:user?.department||"",
        }
    });

    const handleImage = (e: ChangeEvent<HTMLInputElement>,fieldChange: (value:string)=>void) => {
        e.preventDefault();

        const fileReader=new FileReader();

        if(e.target.files && e.target.files.length>0){
            const file=e.target.files[0];
            
            setFiles(Array.from(e.target.files));

            if(!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imageDataUrl=event.target?.result?.toString() || "";

                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob=values.profile_photo;

        const hasImageChanged = isBase64Image(blob);

        if(hasImageChanged){
            const imgRes=await startUpload(files);

            if(imgRes && imgRes[0].url){
                values.profile_photo=imgRes[0].url;
            }
        }

        //TODO: update user profile
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                        <FormLabel className="account-form_image-label">
                            {field.value ? (
                                <Image 
                                    src={field.value}
                                    alt="profile photo"
                                    width={96}
                                    height={96}
                                    priority
                                    className="rounded-full object-contain"
                                />
                            ):(
                                <Image 
                                    src={profileImage}
                                    alt="profile photo"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                            )}
                        </FormLabel>
                        <FormControl className="flex-1 text-base-semibold text-gray-200">
                            <Input
                                type="file"
                                accept="image/*"
                                placeholder="Upload a photo"
                                className="account-form_image-input"
                                onChange={(e)=>handleImage(e,field.onChange)}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                className="account-form_input no focus"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                className="account-form_input no focus"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row w-full">
                    <FormField
                        control={form.control}
                        name="hall"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full mx-2">
                            <FormLabel className="text-base-semibold text-light-2">
                                Hall of Residence
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="account-form_input">
                                        <SelectValue placeholder="Select your Hall of Residence" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="account-form_input">
                                    {halls.map((hall)=>(
                                        <SelectItem value={hall.short} key={hall.short}>
                                            {hall.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>                         
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Department
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="account-form_input">
                                        <SelectValue placeholder="Select your Department" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="account-form_input">
                                    {departments.map((department)=>(
                                        <SelectItem value={department.short} key={department.short}>
                                            {department.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>                         
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2">
                            Bio
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                rows={10}
                                className="account-form_input no focus"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
};

export default AccountProfile