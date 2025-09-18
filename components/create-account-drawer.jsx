"use client";
import { useState } from 'react';
import {  Drawer, DrawerTrigger,  DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer"

const CreateAccountDrawer = ({ children }) => {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger> 
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
