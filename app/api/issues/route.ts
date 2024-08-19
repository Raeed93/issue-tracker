import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client"
import { createIssueSchema } from '@/app/validationSchemas'


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    // if the validation is not successful, return a 400
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    // else create a new issue
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(newIssue, { status: 201 });
}