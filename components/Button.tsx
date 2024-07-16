"use client"

import { deleteImage } from "@/lib/actions";
import clsx from "clsx";
import Link from "next/link";
import { useFormStatus } from "react-dom"

export const SubmitButton = ({label} : {label: string}) => {

  const { pending } = useFormStatus();

  return (
    <button 
      className={clsx("bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600", 
        {
          "opacity-50 cursor-progress": pending
        }
      )} 
      type="submit"
      disabled={pending}
    >
      {label === "upload" ? (
        <>
          {pending ? "Uploading..." : "Upload"}
        </>
      ) : (
        <>
          {pending ? "Updating..." : "Update"}
        </>
      )}
    </button>
  )
};

export const EditButton = ({id} : {id: string}) => {
  return (
    <Link
      href={`edit/${id}`}
      className="py-3 px-4 text-sm rounded-md bg-gray-400 hover:bg-gray-300 text-center w-full"
    >
      Edit
    </Link>
  )
};

export const DeleteButton = ({id} : {id: string}) => {
  const deleteImageById = deleteImage.bind(null, id);
  return (
    <form
      action={deleteImageById}
      className="py-3 px-4 text-sm rounded-md bg-red-500 hover:bg-red-400 text-center w-full"
    > 
      <DeleteBtn />
    </form>
  )
};

const DeleteBtn = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  )
}
