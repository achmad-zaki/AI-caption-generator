"use client";

import { fetchConversation } from "@/lib/api/history";
import { authClient } from "@/lib/auth-client";
import { historyKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useConversation(id: string) {
  const { data: session } = authClient.useSession();

  return useQuery({
    queryKey: historyKeys.detail(id),
    queryFn: () => fetchConversation(id),
    enabled: !!id && !!session,
  });
}
