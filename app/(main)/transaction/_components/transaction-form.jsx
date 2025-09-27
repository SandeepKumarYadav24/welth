"use client";

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";

const AddTransactionForm = ({ accounts, categories}) => {
  useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:{
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(createTransaction);


  return <form>
    {/*  AI Recipt Scanner */}

    <div>
      <label>Type</label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EXPENSE">Expense</SelectItem>
          <SelectItem value="INCOME">Income</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </form>;
};

export default AddTransactionForm;
