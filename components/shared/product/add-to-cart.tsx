'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {Plus} from 'lucide-react';
import {CartItem} from "@/types";
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.actions';


const AddToCart = ( {item}: {item: CartItem} ) => {
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
        toast.success(`${item.name} added to cart`, 
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
    return (
        <Button className='w-full' type='button' onClick={handleAddToCart}>
            <Plus /> Add To Cart
        </Button>
    );
};

export default AddToCart;