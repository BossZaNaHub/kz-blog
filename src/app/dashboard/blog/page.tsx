"use client";

import { Modal, ModalBody, ModalFooter } from "@/components/Modal";
import { Table, TBody, TableHeader, Thead } from "@/components/Table";
import { useToast } from "@/components/Toast";
import { RootStore } from "@/services";
import { adminListBlog } from "@/services/admin/blog";
import { Blog } from "@/services/blog";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "@/services/hook";
import Button from "@/components/Button";

const headers: TableHeader[] = [
  { key: "id", name: "#" },
  { key: "name", name: "name" },
  { key: "short_description", name: "short_description" },
  { key: "category", name: "category" },
  { key: "tags", name: "tags" },
  { key: "action", name: "view/edit" },
];

const Page = () => {
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state: RootStore) => state.admin_blog);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentBody, setContentBody] = useState<Blog | null>(null);
  const [mode, setMode] = useState<"view_mode" | "edit_mode" | null>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    dispatch(adminListBlog());
  }, []);

  useEffect(() => {
    if (error && !isError) {
      showToast(error, { status: "failed" });
      setIsError(true);
    }
  }, [error, isError]);

  const onClose = () => {
    console.log("page: onclose");
    setIsOpen(false);
    setContentBody(null);
  };

  const openModalWithMode = (data: Blog, mode: "view_mode" | "edit_mode" | null) => {
    console.log("edit: ", data);
    setMode(mode);
    setContentBody(data);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const changeQuillContent = (e: string) => {
    // let updateCotentBody: Blog = { ...contentBody };
    // updateCotentBody.content = e;
    // setContentBody(updateCotentBody);
    // console.log(updateCotentBody.content);
  };

  const _renderBlog = () => {
    if (mode === "view_mode" && contentBody) {
      return (
        <>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>id: </div>
            <div>{contentBody.id}</div>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>name: </div>
            <div>{contentBody.name}</div>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>short_description: </div>
            <div>{contentBody.short_description}</div>
          </div>
          <div className="border-b border-gray-700 dark:border-gray-50">
            <div className="flex space-x-2.5 pb-2">
              <div>content: </div>
              <button className="flex items-center" onClick={() => setPreview(!preview)}>
                <span className="px-2">Preview</span> {preview ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
            {preview ? <div dangerouslySetInnerHTML={{ __html: contentBody.content }} /> : <></>}
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>tags: </div>
            <div>{contentBody.tags.join(",")}</div>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>image </div>
            <div>
              <img className="w-fit max-w-full" src={contentBody.image_url} />
            </div>
          </div>

          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>slug: </div>
            <div>{contentBody.slug}</div>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>seo: </div>
            <div>{contentBody.seo.meta_title}</div>
            <div>{contentBody.seo.meta_description}</div>
          </div>
        </>
      );
    } else if (mode === "edit_mode" && contentBody) {
      return (
        <>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>id: </div>
            <input className="w-4/5 rounded-md border border-gray-700 indent-2" value={contentBody.id} />
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>name: </div>
            <input className="w-4/5 rounded-md border border-gray-700 indent-2" value={contentBody.name} />
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>short_description: </div>
            <textarea className="w-4/5 rounded-md border border-gray-700 indent-2" rows={5}>
              {contentBody.short_description}
            </textarea>
          </div>
          <div className="border-b border-gray-700 dark:border-gray-50">
            {/* <div className="flex space-x-2.5 pb-2">
              <div>content: </div>
              <button className="flex items-center" onClick={() => setPreview(!preview)}>
                <span className="px-2">Preview</span> {preview ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
            {preview ? <div dangerouslySetInnerHTML={{ __html: contentBody.content }} /> : <></>} */}
            <ReactQuill theme={"snow"} value={contentBody.content} onChange={(e: string) => changeQuillContent(e)} />
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>tags: </div>
            <textarea className="w-4/5 rounded-md border border-gray-700 indent-2" rows={5}>
              {contentBody.tags.join(",")}
            </textarea>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>image </div>
            <div>
              <img className="w-fit max-w-full" src={contentBody.image_url} />
            </div>
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>slug: </div>
            <input className="w-4/5 rounded-md border border-gray-700 indent-2" value={contentBody.slug} />
          </div>
          <div className="flex space-x-2.5 border-b border-gray-700 pb-2 dark:border-gray-50">
            <div>seo: </div>
            <label>
              <span>meta title</span>
              <input className="w-4/5 rounded-md border border-gray-700 indent-2" value={contentBody.seo.meta_title} />
            </label>
            <label>
              <span>meta description</span>
              <textarea className="w-4/5 rounded-md border border-gray-700 indent-2" rows={5}>
                {contentBody.seo.meta_description}
              </textarea>
            </label>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="m-4">
        <h1 className="py-2">Blog</h1>
        <Table>
          <Thead>
            {headers.map((v) => {
              return (
                <th className="p-4" key={v.key}>
                  {v.name}
                </th>
              );
            })}
          </Thead>
          <TBody>
            {data?.map((v: Blog, i: number) => {
              return (
                <tr
                  key={v.id}
                  className={`${
                    i % 2 == 0
                      ? "border-b bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-800"
                      : "border-b bg-white text-sm dark:border-gray-700 dark:bg-gray-900"
                  }`}
                >
                  <td className="p-1.5 text-center">{v.id}</td>
                  <td className="p-1.5 text-center">{v.name}</td>
                  <td className="p-1.5 text-center">{v.short_description}</td>
                  <td className="p-1.5 text-center">{v.category?.name}</td>
                  <td className="p-1.5 text-center">{v.tags.join(",")}</td>
                  <td className="flex justify-center space-x-1 p-1.5">
                    <Button className="mb-2 mr-2" onClick={() => openModalWithMode(v, "view_mode")}>
                      View
                    </Button>
                    <Button className="mb-2 mr-2" onClick={() => openModalWithMode(v, "edit_mode")}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </TBody>
        </Table>
        <Modal isOpen={isOpen} onClose={onClose} controlKeyboard={true} id="viewBlog">
          <ModalBody>{_renderBlog()}</ModalBody>
          <ModalFooter>
            {mode === "edit_mode" ? (
              <button className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                Update
              </button>
            ) : (
              <></>
            )}
            <button
              className="mb-2 mr-2 rounded-lg border border-gray-300 bg-red-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-gray-200 "
              onClick={() => onClose()}
            >
              Close Modal
            </button>
          </ModalFooter>
        </Modal>
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
