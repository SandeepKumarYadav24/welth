import React from 'react';
import { 
  Card, 
  CardContent, 
  CardTitle, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Switch />
      </CardHeader>

      <CardContent>
        <p>Card Content</p>
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
