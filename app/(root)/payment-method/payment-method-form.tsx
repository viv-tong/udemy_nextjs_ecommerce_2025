"use client";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <CheckoutSteps current={2} />
    </>
  );
};

export default PaymentMethodForm;
