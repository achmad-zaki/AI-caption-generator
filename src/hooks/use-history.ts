"use client";

import { fetchHistories } from "@/lib/api/history";
import { historyKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useHistories() {
  return useQuery({
    queryKey: historyKeys.lists(),
    queryFn: fetchHistories,
  });
}
