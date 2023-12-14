"use client";

import { useSubscriptionModal } from "@/lib/providers/subscription-modal-provider";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { Price, ProductWirhPrice } from "@/lib/supabase/supabase.types";
import { useToast } from "../ui/use-toast";

const SubscriptionModal = () => {
  const { open, setOpen } = useSubscriptionModal();
  const { toast } = useToast();
  const { subscription } = useSupabaseUser();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSupabaseUser();

  const onClickContinue = async (price: Price) => {
    try {
      setIsLoading(true);
      if (!user) {
        toast({ title: "You must be logged in" });
        setIsLoading(false);
        return;
      }
      if (subscription) {
        toast({ title: "Already on a paid plan" });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast({ title: "Oppse! Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {subscription?.status === "active" ? (
        <DialogContent>Already on a paid plan!</DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to a Pro Plan</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            To access Pro features you need to have a paid plan.
          </DialogDescription>
          {/* {products.length
            ? products.map((product) => (
                <div
                  className="flex items-center justify-between"
                  key={product.id}
                >
                  {product.prices?.map((price) => (
                    <Fragment key={price.id}>
                      <b className="text-3xl text-foreground">
                        {formatPrice(price)} / <small>{price.interval}</small>
                      </b>
                      <Button
                        onClick={() => onClickContinue(price)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader /> : "Upgrade ✨"}
                      </Button>
                    </Fragment>
                  ))}
                </div>
              ))
            : ""} */}
          {/* No Products Available */}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SubscriptionModal;