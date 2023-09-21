import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import { Blog } from "@/services/blog";

type ICardProp = HTMLAttributes<HTMLDivElement> & {
  blog?: Blog;
};

const Card: FC<ICardProp> = (props) => {
  return (
    <div className={`bg-primary w-full rounded-lg shadow-md ${props.className}`}>
      <a href={`/blog/${props.blog?.slug}`} className="bg-card-transition">
        <img
          className="w-full rounded-t-lg md:h-56"
          src={props.blog?.image_url ? props.blog?.image_url : "https://picsum.photos/900/600"}
          width={256}
          height={256}
          alt={props.blog?.seo.meta_title || "blog-image"}
        />
        <div className="p-5">
          <h5 className="text-primary mb-2 line-clamp-3 text-2xl tracking-tight">{props.blog?.name}</h5>
          <p className="mb-3text-white mb-2">{props.blog?.short_description}</p>
          <a
            className="btn-primary inline-flex items-center rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            href={`/blog/${props.blog?.slug}`}
          >
            Read More
          </a>
        </div>
      </a>
    </div>
  );
};

export default Card;
