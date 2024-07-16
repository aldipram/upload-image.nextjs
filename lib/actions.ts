"use server"

import { EditSchema, UploadSchema } from "./models/schema";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GetImagesById } from "./data";

export const uploadImage = async (prevState: unknown, formData: FormData) => {
    const validatedFields = UploadSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    };

    const { title, image } = validatedFields.data;
    const { url } = await put(image.name, image, {
        access: "public",
        multipart: true
    });

    try {
        await prisma.upload.create({
            data: {
                title,
                image: url,
            }
        });
    } catch (error) {
        return { message: "Failed to create data"}
    }

    revalidatePath("/");
    redirect("/");
};

export const deleteImage = async (id: string) => {
    const data = await GetImagesById(id);
    if (!data) return { message: "Data not found"}

    await del(data.image)
    try {
        await prisma.upload.delete({
            where: { id }
        })
    } catch (error) {
        return { message: "Failed to delete data"}
    }
    revalidatePath("/");
};

export const updateImage = async (id: string, prevState: unknown, formData: FormData) => {
    const validatedFields = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    };

    const data = await GetImagesById(id);
    if (!data) return { message: "Data not found"}

    const { title, image } = validatedFields.data;
    let imagePath;
    if (!image || image.size <= 0) {
        imagePath = data.image;
    } else {
        await del(data.image)
        const { url } = await put(image.name, image, {
            access: "public",
            multipart: true
        });
        imagePath = url;
    }

    try {
        await prisma.upload.update({
            data: {
                title,
                image: imagePath,
            },
            where: { id }
        });
    } catch (error) {
        return { message: "Failed to update data"}
    }

    revalidatePath("/");
    redirect("/");
};