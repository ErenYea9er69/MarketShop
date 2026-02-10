import { NextResponse } from "next/next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, password } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        const updateData: any = { name };

        if (password) {
            if (password.length < 6) {
                return new NextResponse("Password must be at least 6 characters", { status: 400 });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("[USER_SETTINGS_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
