export type HistoryItem = {
  id: string;
  title: string;
  createdAt: string;
};

export type ConversationDetail = {
  id: string;
  title: string;
  imageUrl: string;
  style: string | null;
  caption: string;
  hashtags: string[];
};

type HistoryResponse = {
  histories?: HistoryItem[];
  error?: string;
};

type ConversationResponse = {
  conversation?: ConversationDetail;
  error?: string;
};

export class ConversationNotFoundError extends Error {
  constructor() {
    super("Percakapan tidak ditemukan");
    this.name = "ConversationNotFoundError";
  }
}

export async function fetchHistories(): Promise<HistoryItem[]> {
  const res = await fetch("/api/history");

  if (!res.ok) {
    const data: HistoryResponse = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Gagal memuat riwayat percakapan");
  }

  const data: HistoryResponse = await res.json();
  return data.histories ?? [];
}

export async function fetchConversation(id: string): Promise<ConversationDetail> {
  const res = await fetch(`/api/history/${id}`);

  if (res.status === 404) {
    throw new ConversationNotFoundError();
  }

  if (!res.ok) {
    const data: ConversationResponse = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Gagal memuat percakapan");
  }

  const data: ConversationResponse = await res.json();

  if (!data.conversation) {
    throw new ConversationNotFoundError();
  }

  return data.conversation;
}
