import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
    email: z.email(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = bodySchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        return NextResponse.json({ exists: Boolean(user) });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
