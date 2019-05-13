import Router from '@Router';
export default class PCTApp {
    constructor(container, options){
        this.container = container;
        this.el = document.querySelector(container);
        Object.keys(options).forEach(option => {
            this[option] = options[option];
        });
    }
    init(routerOptions){
        if ( this.needsRouter ){ // comes from options object
            this.router = new Router();
            this.router.init(routerOptions);
        }
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
    createComponent(model, component, selector, _options){ 
        var options = Object.create({
            children: [],
            data: null,
            model,
            parent: null,
            rerenderOnDataMismatch: false,
            createComponent: this.createComponent // should be backward compatible
        });
        if ( _options !== null && typeof _options === 'object' ){
            for ( let key in _options ){
                if ( _options.hasOwnProperty(key) ){
                    options[key] = _options[key];
                }
            }
        }
        return new component(selector, options);
    }
}