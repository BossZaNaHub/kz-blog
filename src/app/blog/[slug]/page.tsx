import api from "@/services/api";
import { Suspense, cache } from "react";
import { Blog } from "@/services/blog";
import { Response as BaseResp } from "@/services/common";
import { environmet } from "@/services/environment";
import { redirect } from "next/navigation";
import ButtonShare from "@/components/ButtonShare/ButtonShare";
import { Metadata, ResolvingMetadata } from "next";
import Loading from "@/components/Loading";
import { LuLoader } from "react-icons/lu";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

type MetaProps = {
  blog: Blog;
};

const getBlogBySlug = cache(async (slug: string) => {
  const response = await api.get(
    `${environmet.api_url}/api/v1/client/blog/${slug}`
  );

  if (!response.ok) {
    redirect("/404");
  }

  return response.data as BaseResp;
});

export async function generateMetadata(
  { blog }: MetaProps
  //   parent: ResolvingMetadata
): Promise<Metadata> {
  if (blog) {
    let meta: Metadata = {
      title: blog.seo.meta_title,
      description: blog.seo.meta_description,
    };
    return meta;
  }
  return {};
}

const Page = async ({ params }: Props) => {
  const result = await getBlogBySlug(params.slug);
  const blog = result.data.blog as Blog;

  generateMetadata({ blog });

  return (
    <div className="mx-auto flex w-full max-w-screen-md justify-center pt-10">
      <div className="mx-5 md:mx-0">
        <div className="py-10">
          <h1 className="text-4xl">{blog.name}</h1>
          <div className="text-gray-500">{"test short description"}</div>
        </div>
        <div className="">
          <ButtonShare />
        </div>
        <Suspense fallback={<LuLoader />}>
          <Image
            className="mx-auto my-5 w-full"
            src={"https://picsum.photos/700/376"}
            alt={blog.name}
            width={700}
            height={376}
          />
        </Suspense>
        <div
          className="pt-10"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default Page;
