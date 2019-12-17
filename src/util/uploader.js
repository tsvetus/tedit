class Uploader {

    constructor (id, url, params) {
        this.handleChange = this.handleChange.bind(this);
        this.release = this.release.bind(this);
        this.upload = this.upload.bind(this);
        this.input  = document.createElement("input");
        this.input.setAttribute('style', 'display: none;');
        this.input.setAttribute('type', 'file');
        this.input.setAttribute('id', id);
        document.body.appendChild(this.input);
        this.input.addEventListener('change', this.handleChange);
        this.url = url;
        this.params = params;
    }

    handleChange(event) {
        if (event.target.files) {
            let data = new FormData();
            if (this.params) {
                for (let key in this.params) {
                    data.append(key, this.params[key]);
                }
            }
            data.append('file', event.target.files[0], event.target.files[0].name);
            let request = new XMLHttpRequest();
            request.open("POST", this.url);
            request.send(data);
            console.log('upload send to ' + this.url);
        }
    }

    upload(url, params) {
        if (url) {
            this.url = url;
        }
        if (params) {
            this.params = params;
        }
        this.input.click();
    }

    release() {
        this.input.removeEventListener('change', this.handleChange);
        document.body.removeChild(this.input);
    }

}

export default Uploader;