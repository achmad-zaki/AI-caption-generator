export const historyKeys = {
  all: ["histories"] as const,
  lists: () => [...historyKeys.all, "list"] as const,
  details: () => [...historyKeys.all, "detail"] as const,
  detail: (id: string) => [...historyKeys.details(), id] as const,
};
