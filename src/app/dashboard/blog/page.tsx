"use client"

import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"

const Page = () => {
    const editorRef = useRef<any | null>(null)

    const log = () => {

    }

    return (
        <>
            <div className="flex justify-center">
                <Editor
                    apiKey={"t9zu22s325vi4pjsukqcf0g4ab6djq4apltw6smgbqwqu234"}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </>
    )
}

export default Page