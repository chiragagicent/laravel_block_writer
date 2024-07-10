var exists = true;
class ImageTool {
    constructor({ data, api, config }) {
        this.api = api;
        this.config = config;
        this.data = data || {};
        this.wrapper = null;
        this.fileInput = null;
        this.captionInput = null;

        this.triggerFileInput();
    }
    //here i have used apis from the source code of  editorJS
    static get toolbox() {
        return {
            title: "Image",
            icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-11-1H5l3.5-4.5 2.5 3.01L17.5 9l3.5 5h-11zm-1-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
        };
    }

    render() {
        this.wrapper = document.createElement("div");

        if (this.data.url) {
            const img = document.createElement("img");
            img.src = this.data.url;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            this.wrapper.appendChild(img);

            this.createCaptionInput();
        }

        return this.wrapper;
    }
    //for taking input from window modal
    triggerFileInput() {
        exists = true;
        this.fileInput = document.createElement("input");
        this.fileInput.type = "file";
        this.fileInput.accept = "image/*";
        this.fileInput.style.display = "none";
        this.fileInput.addEventListener("change", (event) =>
            this.uploadImage(event)
        );

        document.body.appendChild(this.fileInput);
        this.fileInput.click();
    }
    //handling image upload
    uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.data.url = e.target.result;
                this.updateView();
                this.focusCaptionInput();
            };
            reader.readAsDataURL(file);
        }
    }
    //updating DOM
    updateView() {
        if (!this.wrapper) {
            this.wrapper = document.createElement("div");
        }
        this.wrapper.innerHTML = "";

        if (this.data.url) {
            const img = document.createElement("img");
            img.src = this.data.url;
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            this.wrapper.appendChild(img);

            this.createCaptionInput();
        }
    }
    //for creating captions
    createCaptionInput() {
        const captionWrapper = document.createElement("div");
        captionWrapper.classList.add("caption-wrapper");

        this.captionInput = document.createElement("input");
        this.captionInput.type = "text";
        this.captionInput.placeholder = "Enter caption (Optional)";
        this.captionInput.value = this.data.caption || "";
        this.captionInput.addEventListener("input", () => {
            this.data.caption = this.captionInput.value;
        });
        this.captionInput.addEventListener("keydown", (event) => {
            if (
                event.key === "Backspace" &&
                this.captionInput.value.trim() === ""
            ) {
                event.preventDefault();
                this.api.blocks.delete();
            } else if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevent default Enter behavior

                if (!this.captionInput.value.trim()) {
                    this.captionInput.placeholder = "";
                    const currentBlockIndex =
                        this.api.blocks.getCurrentBlockIndex(); //try to get index block using apis of editorJS for editing

                    const nextBlockIndex = currentBlockIndex + 1;
                    const nextBlock =
                        this.api.blocks.getBlockByIndex(nextBlockIndex);
                    if (nextBlock) {
                        this.api.caret.setToBlock(nextBlockIndex, "end");
                    }
                }

                if (exists) {
                    this.api.blocks.delete();
                    exists = false;
                } else {
                    console.log("yes");
                }
            }
        });
        this.captionInput.addEventListener("focus", () => {
            if (!this.captionInput.value.trim()) {
                this.captionInput.placeholder = "Enter caption (Optional)";
            }
        });

        captionWrapper.appendChild(this.captionInput);
        this.wrapper.appendChild(captionWrapper);
    }

    focusCaptionInput() {
        setTimeout(() => {
            this.captionInput.focus();
        }, 0);
    }
    //functions from source code of editorJS
    save(blockContent) {
        return {
            url: this.data.url,
            caption: this.data.caption,
        };
    }

    validate(savedData) {
        return !!savedData.url;
    }

    static get sanitize() {
        return {
            url: {},
            caption: {},
        };
    }
}

export default ImageTool;
