import { prisma } from "@/lib/prisma";

export const GetImages = async () => {
  try {
    const result = await prisma.upload.findMany({
        orderBy: {createdAt: "desc"},
    });
    return result;
  } catch (error) { 
    throw new Error("Failed to get data");
  }
};

export const GetImagesById = async (id: string) => {
  try {
    const result = await prisma.upload.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error("Failed to get data");
  }
};
