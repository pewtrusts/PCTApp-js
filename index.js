import Router from '@Router';
export default class PCTApp {
    init(options){
        this.router = new Router();
        this.router.init(options);
        this.disableHoverOnTouch();
    }
    disableHoverOnTouch(){
    // HT: https://stackoverflow.com/a/30303898
        var hasHoverClass = false;
        var container = document.body;
        var lastTouchTime = 0;

        function enableHover() {
            // filter emulated events coming from touch events
            if (new Date() - lastTouchTime < 500) return;
            if (hasHoverClass) return;

            container.classList.add('has-hover');
            hasHoverClass = true;
        }

        function disableHover() {
            if (!hasHoverClass) return;
            container.classList.remove('has-hover');
            hasHoverClass = false;
        }

        function updateLastTouchTime() {
            lastTouchTime = new Date();
        }

        document.addEventListener('touchstart', updateLastTouchTime, true);
        document.addEventListener('touchstart', disableHover, true);
        document.addEventListener('mousemove', enableHover, true);

        enableHover();
    }
}