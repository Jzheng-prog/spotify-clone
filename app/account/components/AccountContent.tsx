"use client"

import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscriptionModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helper";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccountContent = () => {

    const router = useRouter();
    const subModal = useSubscribeModal();
    const {isLoading, subscription, user} = useUser();
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')
        }
        console.log("useEffect from AccountContent subscription status:", subscription)
    },[isLoading, user, router,subscription])

    const redirectToCustomerPortal = async ()=>{
        setLoading(true);
        try{
            const {url} = await postData({
                url:'/api/create-portal-link'
            })
            window.location.assign(url)
        }catch(error){
            if(error){
                toast.error((error as Error).message)
            }
        }
        setLoading(false)
    }
  return (
    <div className="mb-7 px-6">
        {
            !subscription &&(
                <div className="flex flex-col gap-y-4">
                    <p>No Active Plan</p>
                    <Button className="w-[300px] my-4" onClick={subModal.onOpen}>
                        Subscribe
                    </Button>
                </div>
            )
        }
        {
            subscription &&(
                <div>
                    <p>You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
                    <Button className="w-[300px] my-4" onClick={redirectToCustomerPortal} disabled={loading||isLoading}>
                        Open customer portal
                    </Button>
                </div>
            )
        }
      
    </div>
  )
}

export default AccountContent
