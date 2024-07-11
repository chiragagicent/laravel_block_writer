class Delimiter {
    static get toolbox() {
        return {
            title: "Delimiter",
            icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M5 13.5C3.62 13.5 2.5 14.62 2.5 16S3.62 18.5 5 18.5 7.5 17.38 7.5 16 6.38 13.5 5 13.5zm14 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-7.5-8c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>',
        };
    }

    constructor({ data }) {
        this.data = data;
    }

    render() {
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("ce-delimiter");
        this.wrapper.textContent = ". . . . . . .";

        return this.wrapper;
    }

    save() {
        return {};
    }
}

export default Delimiter;
