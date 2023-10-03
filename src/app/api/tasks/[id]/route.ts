
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
    params: {
        id: string;
    }
    }


export async function GET(request: Request, { params }: Params ) {
    const task = await prisma.task.findFirst({
        where : {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: Params ) {
    const _data = await request.json();

    const updatedTask = await  prisma.task.update({
        where: {
            id: parseInt(params.id)
        },
        data: _data 

    })
    return NextResponse.json(updatedTask);
}

export async function DELETE (request: Request, { params }: Params ) {
    const deletedTask = await prisma.task.delete({
        where: {
            id: parseInt(params.id)
        }
    })
    return NextResponse.json(deletedTask);
}
