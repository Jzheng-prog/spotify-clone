import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import {stripe} from'@/libs/stripe'

import {
    upsertProductRecord,upsertPriceRecord,manageSubscriptionStatusChange
} from'@/libs/supabaseAdmin'

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',

])

export async function POST(
    request: Request
){
    const body = await request.text();
    const sig = headers().get('Stripe-Signature')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try{
        if(!sig|| !webhookSecret) return
        event = stripe.webhooks.constructEvent(body,sig,webhookSecret)
    }catch(error){
        console.log('Error Message: ' + error.message)
        return new NextResponse(`Webhoock Error: ${error.message}`, {status:400})
    }

    if(relevantEvents.has(event.type)){
        try{
            switch (event.type){
                case 'product.created': 
                case 'product.updated': 
                    await upsertProductRecord(event.data.object as Stripe.Product)
                    break

                case 'price.created': 
                case 'price.updated': 
                    await upsertPriceRecord(event.data.object as Stripe.Price)
                    break
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const sub = event.data.object as Stripe.Subscription
                    await manageSubscriptionStatusChange(
                        sub.id,
                        sub.customer as string,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    const checkOutSession = event.data.object as Stripe.Checkout.Session;
                    
                    console.log('checkoutsession.mode:', checkOutSession.mode)
                    console.log('checkoutsession:', checkOutSession)

                    if(checkOutSession.mode === 'subscription'){
                        const subscriptionId = checkOutSession.subscription;

                        console.log('checkoutsession.subscription:', checkOutSession.subscription)

                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkOutSession.customer as string,
                            true
                        )
                    }
                    break

                default:
                    throw new Error('Unhandled relvant events!')
            }
        }catch(error){
            console.log(error)
            return new NextResponse('Webhook error',{status:400})
        }
    }
    return NextResponse.json({received: true},{status:200})
}