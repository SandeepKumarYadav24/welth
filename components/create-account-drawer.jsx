"use client";
import { useState } from 'react';
import {  Drawer, DrawerTrigger,  DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"

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
        <div className="px-4 pb-4">
          <form className='space-y-4'>
            <div className="space-y-2">
                <label htmlFor='name' className='text-sm font-medium'>Account Name</label>
                <Input
                  id="name"
                  placeholder="eg.write something"
                  {...register("name")}             //Connects an input to react-hook-form
                />
                {errors.balance && (
                  <p className="text-sm text-red-500">{errors.balance.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor='type' className='text-sm font-medium'>Account Type</label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">current</SelectItem>
                    <SelectItem value="SAVING">saving</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor='balance' className='text-sm font-medium'>Initial Balance</label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                {...register("balance")}
                />
                {errors.balance && (
                  <p className="text-sm text-red-500">{errors.balance.message}</p>
                )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
                <label htmlFor='isDefault' className='text-sm font-medium'> Set as Default</label>
                <p>This account will be selected by default for transactions</p>
                <Switch 
                  id="isDefault"
                  checked={watch("isDefault")}   //watch("isDefault") = what’s current value isDefault in the form?.
                  onCheckedChange={(checked) => setValue("isDefault", checked)}     //setValue("isDefault",checked) = update form when user toggles switch.
                />
            </div>
          </form>
        </div>  
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
