import { currentUser } from "@clerk/nextjs/server"

export default async function Home(){
  const user=await currentUser();
  return (
    <>
      <h1 className="head-text text-left">Home</h1> 
    </>
  )
}