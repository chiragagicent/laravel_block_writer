import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Delimiter from "./Delimiter";
import ImageTool from "./ImageTool";
import CodeTool from "./CodeTool";
import VideoTool from "./VideoTool";
const editor = new EditorJS({
    holderId: "editorjs",
    tools: {
        header: {
            class: Header,
            inlineToolbar: true,
            config: {
                placeholder: "Title",
            },
        },
        list: {
            class: List,
            inlineToolbar: ["link", "bold"],
        },
        embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
                youtube: true,
            },
        },
        code: CodeTool,
        delimiter: Delimiter,
        ImageToolool: ImageTool,
        video: VideoTool,
    },
    autofocus: true,
    placeholder: "Start writing...",
    data: {
        blocks: [
            {
                type: "header",
                data: {
                    text: "",
                    level: 2,
                },
            },
        ],
    },
});

let saveBtn = document.querySelector("button");

saveBtn.addEventListener("click", () => {
    editor
        .save()
        .then((outputData) => {
            console.log("Article data", outputData);
        })
        .catch((error) => {
            console.log("Saving failed:", error);
        });
});
