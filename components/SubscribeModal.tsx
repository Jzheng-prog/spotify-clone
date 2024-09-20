import React, { useState } from 'react'
import Modal from './Modal'
import { ProductWithPrice, Price } from '@/types'
import Button from './Button'
import { useUser } from '@/hooks/useUser'
import toast from 'react-hot-toast'
import { postData } from '@/libs/helper'
import { getStripe } from '@/libs/stripeClient'
import useSubscribeModal from '@/hooks/useSubscriptionModal'


interface SubscribeModalProps{
    products: ProductWithPrice[]
  }

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0)/100)

    return priceString
}
const SubscribeModal:React.FC<SubscribeModalProps> = ({products}) => {
    
    const {user, isLoading, subscription} = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const subscribeModal = useSubscribeModal()

    const onChange = (open: boolean) => {
        if(!open){
            subscribeModal.onClose();
        }
    }

    const handleCheckOut = async (price:Price) =>{
        // console.log(price)
        setPriceIdLoading(price.id)
        if(!user){
            setPriceIdLoading(undefined)
            return toast.error('Must be logged in!')
        }
        if(subscription){
            return toast('Already Subscribed!')
        }
        try{
            const {sessionId} = await postData({
                url:'/api/create-checkout-session',
                data: {price}
            })
            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId})
        }catch(error){
            toast.error((error as Error)?.message)
        }finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className='text-center'>
            No Products Available.
        </div>
    )

    if(products.length){
        content=(
            <div>
                {
                    products.map((prod)=>{
                        if(!prod.prices?.length){
                            return (
                                <div key={prod.id}>
                                    No prices Available.
                                </div>
                            )
                        }

                        return prod.prices.map((price)=>(
                            <Button 
                            key={price.id}
                            onClick={()=> handleCheckOut(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className='mb-4'
                            >
                                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                            </Button>
                        ))
                    })
                }
            </div>
        )
    }
    if(subscription){
        content = (
            <div className='text-center'>
                Already Subscribed.
            </div>
        )
    }
  return (
    <Modal 
    title='Only For Premium users' 
    description='Listen to Music with Spotify Premium'
    isOpen={subscribeModal.isOpen}
    onChange={onChange}>
        {content}
    </Modal>
  )
}

export default SubscribeModal
