"use client";

import Table, { TableHeader } from "@/components/Table";
import { useToast } from "@/components/Toast";
import { RootStore } from "@/services";
import { adminListBlog } from "@/services/admin/blog";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const headers: TableHeader[] = [
  { key: "id", name: "#" },
  { key: "name", name: "name" },
  { key: "short_description", name: "short_description" },
  { key: "category", name: "category" },
  { key: "tags", name: "tags" },
  { key: "action", name: "view/edit" },
];

const Page = () => {
  const editorRef = useRef<any | null>(null);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: RootStore) => state.admin_blog);
  const [isError, setIsError] = useState(false);
  const { showToast, closeToast } = useToast();

  useEffect(() => {
    dispatch(adminListBlog());
    // console.log(data, error);
  }, []);

  useEffect(() => {
    if (error && !isError) {
      showToast(error, { status: "failed" });
      setIsError(true);
    }
  }, [error, isError]);

  return (
    <>
      <div className="m-4">
        <h1 className="py-2">Blog</h1>
        <Table headers={headers} striped>
          {data?.map((v) => {
            return (
              <tr key={v.id} className="border-b">
                <td className="p-1.5 text-center">{v.id}</td>
                <td className="p-1.5 text-center">{v.name}</td>
                <td className="p-1.5 text-center">{v.short_description}</td>
                <td className="p-1.5 text-center">{v.category?.name}</td>
                <td className="p-1.5 text-center">{v.tags.join(",")}</td>
                <td className="p-1.5 text-center">
                  <a href="#view">view</a>
                  <a href="#edit">edit</a>
                </td>
              </tr>
            );
          })}
        </Table>

        {/* <Editor
          apiKey={"t9zu22s325vi4pjsukqcf0g4ab6djq4apltw6smgbqwqu234"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        /> */}
      </div>
    </>
  );
};

export default Page;
