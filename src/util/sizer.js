class Sizer {

    constructor () {
        this.getWidth = this.getWidth.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    start(callback) {
        window.addEventListener('resize', this.handleResize);
        this.callback = callback;
    }

    stop() {
        this.callback = null;
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        if (this.callback) {
            this.callback({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }

}

export default Sizer;