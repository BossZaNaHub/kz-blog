"use client";

import Card from "@/components/Card";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/services";
import { Blog, clientListBlog } from "@/services/blog";

const Page = () => {
  const data = useSelector((state: RootStore) => state.blog);
  //   const [blogs, setBlogs] = useState<Blog[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clientListBlog());
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center py-10">
        <h1 className="text-xl">Blog</h1>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-[2.75rem] px-10">
        {data.data?.map((v: Blog, i: number) => {
          return (
            <Suspense
              fallback={<Loading variant="square" height="md" />}
              key={i}
            >
              <Card className="basis-full md:basis-1/4" blog={v} />
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
