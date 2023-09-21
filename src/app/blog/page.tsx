"use client";

import Card from "@/components/Card";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "@/services";
import { Blog, clientListBlog } from "@/services/blog";
import { useToast } from "@/components/Toast";
import Retry from "@/components/Retry";
import Loading from "@/components/Loading";

const Page = () => {
  const data = useSelector((state: RootStore) => state.blog);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(clientListBlog());
    if (data.error) showToast(data.error, { status: "failed" });
  }, []);

  const handleRetry = () => {
    setError(false);
    dispatch(clientListBlog());
  };

  if (!data.data && data.error) {
    if (!error) {
      showToast(data.error, { status: "failed" });
      setError(true);
    }

    return <Retry onClick={() => handleRetry()} full={true}></Retry>;
  } else {
    return (
      <Loading loading={data.isLoading}>
        <div className="w-full py-10">
          <div className="flex justify-center py-10">
            <h1 className="text-xl">Blog</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5 px-5">
            {data.data?.map((v: Blog, i: number) => {
              return (
                <Suspense fallback={<Loading variant="square" height="md" />} key={i}>
                  <Card className="basis-full md:basis-1/4" blog={v} />
                </Suspense>
              );
            })}
          </div>
        </div>
      </Loading>
    );
  }
};

export default Page;
