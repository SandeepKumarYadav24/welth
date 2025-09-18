"use client";
import { useState } from 'react';
import {  Drawer, DrawerTrigger,  DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from './ui/input';

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

   const {  register, handleSubmit, formState: { errors }, setValue, watch, reset,} = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger> 
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div>
          <form>

            <div className="space-y-2">
                <label htmlFor='name'>Account Name</label>
                <Input
                  id="name"
                  placeholder="eg.write something"
                  {...register("name")}
                />
                {errors.balance && (
                  <p className="text-sm text-red-500">{errors.balance.message}</p>
                )}
            </div>
          </form>
        </div>  
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
