"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import React from "react";

export const DateFilter = () => {
  const data = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "thisWeek", label: "This Week" },
    { value: "lastWeek", label: "Last Week" },
    { value: "thisMonth", label: "This Month" },
  ];
  const router = useRouter();
  const pathname = usePathname();
  const onChange = (value: string) => {
    const currentQueryParams = qs.parseUrl(window.location.href).query;
    const updatedQueryParams = {
      ...currentQueryParams,
      createdAtFilter: value,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQueryParams,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  return (
    <Select onValueChange={(selected: string) => onChange(selected)}>
      <SelectTrigger className="w-40">
        <SelectValue
          placeholder="Filter by Date"
          className="flex items-center justify-center text-center"
        />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};