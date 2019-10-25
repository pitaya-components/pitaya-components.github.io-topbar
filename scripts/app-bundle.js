define('__dot_dot__/src/configuration',['require','exports','module','aurelia-framework'],function (require, exports, module) {"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aurelia_framework_1 = require("aurelia-framework");
class PitayaTopbarConfiguration {
    constructor(_config) {
        this._config = _config;
    }
    use(...elements) {
        const imports = elements.map(element => aurelia_framework_1.PLATFORM.moduleName(`./${element}`));
        this._config.globalResources(imports);
    }
}
exports.PitayaTopbarConfiguration = PitayaTopbarConfiguration;

});
;
define('__dot_dot__/src/index',['require','exports','module','aurelia-framework','./configuration','./pitaya-topbar','./configuration'],function (require, exports, module) {"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const aurelia_framework_1 = require("aurelia-framework");
const configuration_1 = require("./configuration");
function configure(frameworkConfig, callback) {
    if (callback instanceof Function) {
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar")
        ]);
        const topbarConfig = new configuration_1.PitayaTopbarConfiguration(frameworkConfig);
        callback(topbarConfig);
        return;
    }
    frameworkConfig.globalResources([
        aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar"),
        aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar-row.html"),
        aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar-navigation.html"),
        aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar-actions.html"),
        aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar-action-icon.html")
    ]);
}
exports.configure = configure;
__export(require("./pitaya-topbar"));
__export(require("./configuration"));

});
;
define('__dot_dot__/src/pitaya-topbar',['require','exports','module','@material/top-app-bar','aurelia-framework','aurelia-typed-observable-plugin'],function (require, exports, module) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const top_app_bar_1 = require("@material/top-app-bar");
const aurelia_framework_1 = require("aurelia-framework");
const aurelia_typed_observable_plugin_1 = require("aurelia-typed-observable-plugin");
const logger = aurelia_framework_1.LogManager.getLogger("Pitaya:Topbar");
let PitayaTopbar = class PitayaTopbar {
    constructor(_container) {
        this._container = _container;
    }
    get container() {
        return this._container;
    }
    setScrollTarget(target) {
        if (!target) {
            logger.warn("PitayaTopbar has either no parent {Container} or its parent {Container} has no HTMLElement defined on it. The scrollTarget will have to be set manually.");
            return;
        }
        this._mdcComponent.setScrollTarget(target);
    }
    listen(eventName, handler, options) {
        this._mdcComponent.listen(eventName, handler, options);
    }
    unlisten(eventName, handler, options) {
        this._mdcComponent.unlisten(eventName, handler, options);
    }
    reinitialize() {
        this.detached();
        this.attached();
    }
    attached() {
        this._mdcComponent = new top_app_bar_1.MDCTopAppBar(this._rootElement);
        this._mdcFoundation = this._mdcComponent.getDefaultFoundation();
        this._mdcAdapter = this._mdcFoundation["adapter_"];
        const parentElement = this._container.parent.get(Element);
        this.setScrollTarget(parentElement);
        this.onAttached && this.onAttached({ component: this });
        this.onNavigation && this.listen("MDCTopAppBar:nav", (event) => {
            this.onNavigation({
                event,
                component: this
            });
        });
    }
    detached() {
        this._mdcComponent.destroy();
    }
};
__decorate([
    aurelia_typed_observable_plugin_1.bindable,
    __metadata("design:type", String)
], PitayaTopbar.prototype, "type", void 0);
__decorate([
    aurelia_typed_observable_plugin_1.bindable,
    __metadata("design:type", Function)
], PitayaTopbar.prototype, "onNavigation", void 0);
__decorate([
    aurelia_typed_observable_plugin_1.bindable,
    __metadata("design:type", Function)
], PitayaTopbar.prototype, "onAttached", void 0);
PitayaTopbar = __decorate([
    aurelia_framework_1.autoinject,
    aurelia_framework_1.viewResources(aurelia_framework_1.PLATFORM.moduleName("./pitaya-topbar.css")),
    __metadata("design:paramtypes", [aurelia_framework_1.Container])
], PitayaTopbar);
exports.PitayaTopbar = PitayaTopbar;

});
;
define('text!__dot_dot__/src/pitaya-topbar-action-icon.html',[],function(){return "<template bindable=\"icon, onClick\" role=button><button class=\"material-icons mdc-top-app-bar__action-item mdc-icon-button\" click.delegate=\"onClick && onClick({event:$event})\">${icon}</button></template>";});;
define('text!__dot_dot__/src/pitaya-topbar-actions.html',[],function(){return "<template class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-end\" role=toolbar><slot></slot></template>";});;
define('text!__dot_dot__/src/pitaya-topbar-navigation.html',[],function(){return "<template bindable=\"icon, onIconClick, title\" class=\"mdc-top-app-bar__section mdc-top-app-bar__section--align-start\"><button class=\"material-icons mdc-top-app-bar__navigation-icon mdc-icon-button\" if.bind=icon click.delegate=\"onIconClick && onIconClick({event:$event})\">${icon} </button><span if.bind=title class=mdc-top-app-bar__title>${title}</span><slot></slot></template>";});;
define('text!__dot_dot__/src/pitaya-topbar-row.html',[],function(){return "<template class=mdc-top-app-bar__row><slot></slot></template>";});;
define('text!__dot_dot__/src/pitaya-topbar.css',[],function(){return ".mdc-top-app-bar{background-color:#6200ee;background-color:var(--mdc-theme-primary,#6200ee);color:#fff;display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#fff;color:var(--mdc-theme-on-primary,#fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item:after,.mdc-top-app-bar .mdc-top-app-bar__action-item:before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:before{background-color:#fff}@supports not (-ms-ime-align:auto){.mdc-top-app-bar .mdc-top-app-bar__action-item:after,.mdc-top-app-bar .mdc-top-app-bar__action-item:before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:before{background-color:var(--mdc-theme-on-primary,#fff)}}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover:before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover:before{opacity:.08}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused:before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus:before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused:before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active:after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1.25rem;line-height:2rem;font-weight:500;letter-spacing:.0125em;text-decoration:inherit;text-transform:inherit;padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}.mdc-top-app-bar__title[dir=rtl],[dir=rtl] .mdc-top-app-bar__title{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-radius:0 0 24px 0}.mdc-top-app-bar--short-collapsed[dir=rtl],[dir=rtl] .mdc-top-app-bar--short-collapsed{border-radius:0 0 0 24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width .25s cubic-bezier(.4,0,.2,1)}.mdc-top-app-bar--short[dir=rtl],[dir=rtl] .mdc-top-app-bar--short{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity .2s cubic-bezier(.4,0,.2,1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);width:56px;transition:width .3s cubic-bezier(.4,0,.2,1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding .15s cubic-bezier(.4,0,.2,1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl],[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl],[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow .2s linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);transition:box-shadow .2s linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl],[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media (max-width:599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width .2s cubic-bezier(.4,0,.2,1)}.mdc-top-app-bar--short-collapsed{transition:width .25s cubic-bezier(.4,0,.2,1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl],[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}.mdc-icon-button{width:48px;height:48px;padding:12px;font-size:24px;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdc-icon-button img,.mdc-icon-button svg{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light,rgba(0,0,0,.38));cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button--on .mdc-icon-button__icon,.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@-webkit-keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-radius-in{0%{-webkit-animation-timing-function:cubic-bezier(.4,0,.2,1);animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@-webkit-keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-in{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@-webkit-keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}@keyframes mdc-ripple-fg-opacity-out{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-icon-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button:after,.mdc-icon-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-icon-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation:after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation:after{-webkit-animation:mdc-ripple-fg-opacity-out .15s;animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button:after,.mdc-icon-button:before{top:0;left:0;width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded:after,.mdc-icon-button.mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button:after,.mdc-icon-button:before{background-color:#000}.mdc-icon-button:hover:before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused:before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.pitaya-topbar{will-change:transform}.pitaya-topbar .mdc-top-app-bar__row{height:auto}.pitaya-topbar .mdc-icon-button:after,.pitaya-topbar .mdc-icon-button:before{background-color:#fff}@supports not (-ms-ime-align:auto){.pitaya-topbar .mdc-icon-button:after,.pitaya-topbar .mdc-icon-button:before{background-color:var(--mdc-theme-on-primary,#fff)}}.pitaya-topbar .mdc-icon-button:hover:before{opacity:.08}.pitaya-topbar .mdc-icon-button.mdc-ripple-upgraded--background-focused:before,.pitaya-topbar .mdc-icon-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.pitaya-topbar .mdc-icon-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.pitaya-topbar .mdc-icon-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.pitaya-topbar .mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}@media (max-width:840px){.pitaya-topbar .mdc-icon-button.mdc-ripple-upgraded--background-focused:before,.pitaya-topbar .mdc-icon-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:0}.pitaya-topbar .mdc-icon-button:hover:before{opacity:0}}";});;
define('text!__dot_dot__/src/pitaya-topbar.html',[],function(){return "<template ref=_rootElement class=\"mdc-top-app-bar pitaya-topbar ${ type ? 'mdc-top-app-bar--' + type : '' }\"><slot></slot></template>";});;
define('app',['require','exports','module'],function (require, exports, module) {"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class App {
    _navigationIconClicked() {
        console.log("nav icon clicked");
    }
    _actionClicked(message) {
        console.log("Icon clicked: ", message);
    }
}
exports.App = App;

});
;
define('text!app.html',[],function(){return "<template><pitaya-app><pitaya-view><pitaya-topbar><pitaya-topbar-row><pitaya-topbar-navigation title=\"Topbar Title\" icon=favorite on-icon-click.call=_navigationIconClicked()></pitaya-topbar-navigation><pitaya-topbar-actions><pitaya-topbar-action-icon icon=more_vert on-click.call=\"_actionClicked('more')\"></pitaya-topbar-action-icon></pitaya-topbar-actions></pitaya-topbar-row></pitaya-topbar></pitaya-view></pitaya-app></template>";});;
define('components/test',['require','exports','module','aurelia-framework'],function (require, exports, module) {"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const aurelia_framework_1 = require("aurelia-framework");
let Test = class Test {
};
Test = __decorate([
    aurelia_framework_1.autoinject
], Test);
exports.Test = Test;

});
;
define('text!components/test.html',[],function(){return "<template><h1>Test Component</h1></template>";});;
define('environment',['require','exports','module'],function (require, exports, module) {"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    debug: true,
    testing: true
};

});
;
define('main',['require','exports','module','./environment'],function (require, exports, module) {"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./environment");
function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin("pitaya-framework", (pluginConfig) => pluginConfig.enableDevelopment())
        .feature("resources");
    aurelia.use.developmentLogging(environment_1.default.debug ? "debug" : "warn");
    aurelia.start().then(() => aurelia.setRoot());
}
exports.configure = configure;

});

//# sourceMappingURL=app-bundle.js.map