'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {Plus, Minus} from 'lucide-react';
import {Cart, CartItem} from "@/types";
import { toast } from 'sonner';
import { addItemToCart , removeItemFromCart} from '@/lib/actions/cart.actions';


const AddToCart = ( {cart, item}: {cart?: Cart; item: CartItem} ) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
            toast.error(res.message, {
                style: {
                    backgroundColor: 'hsl(var(--destructive))',
                    color: 'hsl(var(--destructive-foreground))'
                }
            });
            return;
        }
        // Handle success add to cart
        toast.success(res.message, 
            {
                action: {
                    label: "Go To Cart",
                    onClick: () => router.push('/cart'),
                    actionButtonStyle: {
                        backgroundColor: 'var(--primary)',
                        color: 'white'
                    }
                }
            }
        );
    }
    // Handle remove from cart
    const handleRemoveFromCart = async () => {
        const res = await removeItemFromCart(item.productId);
        toast.success(res.message, {
                style: {
                    backgroundColor: 'hsl(var(--destructive))',
                    color: 'hsl(var(--destructive-foreground))'
                }
            });

        return;
    }
    // Check if item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId)
    return existItem ? (
        <div>
            <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
                <Minus className='h-4 w-4'/>
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type='button' variant='outline' onClick={handleAddToCart}>
                <Plus className='h-4 w-4'/>
            </Button>
        </div>
    ) : (
        <Button className='w-full' type='button' onClick={handleAddToCart}>
            <Plus /> Add To Cart
        </Button>
    );
};

export default AddToCart;