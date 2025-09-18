"use client";
import { useState } from 'react';
import {  Drawer, DrawerTrigger,  DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"

const CreateAccountDrawer = ({ children }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger> 
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div>
          <form></form>
        </div>  
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
