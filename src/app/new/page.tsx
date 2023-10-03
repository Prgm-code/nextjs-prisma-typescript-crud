"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NewPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  console.log(params);

  const { handleSubmit, register, setValue } = useForm();
  useEffect(() => {
    if (params.id) {
      const loadTask = async () => {
        const res = await axios.get(`/api/tasks/${params.id}`);
        console.log(res.data);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      };
      loadTask();
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (params.id) {
      await axios.put(`/api/tasks/${params.id}`, data);
    } else {
      await axios.post("/api/tasks", data);
    }
    //

    router.push("/");
    router.refresh();
  });

  return (
    <div className="mt-5 ">
      <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
        <form onSubmit={onSubmit} className="w-1/4">
          <h1 className="text-3xl font-bold">
            {params.id ? "Update Task" : "Create Task"}
          </h1>
          <label htmlFor="title" className="font-bold text-xs ">
            Write Your Title:
          </label>
          <input
            id="title"
            type="text"
            placeholder="write a Text"
            className=" px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300  text-black block 
          mb-2 w-full"
            {...register("title", { required: true })}
          />

          <label htmlFor="description" className="font-bold text-xs ">
            Write Your Description:
          </label>
          <textarea
            id="description"
            placeholder="write a Text"
            className=" px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300  text-black block w-full
        "
            {...register("description")}
          ></textarea>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
            >
              {params.id ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              className=" bg-red-500 px-3 py-1 rounded-md text-white mt-2 ml-2"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this task?")) {
        
                  await axios.delete(`/api/tasks/${params.id}`);
                  alert(`Task ${params.id} deleted`);

                  router.push("/");
                  router.refresh();
                }
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewPage;
