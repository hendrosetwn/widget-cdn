/*! For license information please see widget-client.js.LICENSE.txt */
(()=>{"use strict";var e={338:(e,t,r)=>{var o=r(795);t.createRoot=o.createRoot,t.hydrateRoot=o.hydrateRoot},20:(e,t,r)=>{var o=r(609),n=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),u=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var o,c={},f=null,l=null;for(o in void 0!==r&&(f=""+r),void 0!==t.key&&(f=""+t.key),void 0!==t.ref&&(l=t.ref),t)i.call(t,o)&&!a.hasOwnProperty(o)&&(c[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===c[o]&&(c[o]=t[o]);return{$$typeof:n,type:e,key:f,ref:l,props:c,_owner:u.current}}t.jsx=c,t.jsxs=c},848:(e,t,r)=>{e.exports=r(20)},609:e=>{e.exports=window.React},795:e=>{e.exports=window.ReactDOM}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};r.r(o);var n=r(848),i=r(609),u=r.n(i),a=r(338);function c(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,o,n,i,u=f(e);if(t){var a=f(this).constructor;r=Reflect.construct(u,arguments,a)}else r=u.apply(this,arguments);return o=this,!(n=r)||"object"!=((i=n)&&"undefined"!=typeof Symbol&&i.constructor===Symbol?"symbol":typeof i)&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(o):n}}var p=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(u,e);var t,r,o,i=s(u);function u(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),i.apply(this,arguments)}return t=u,o=[{key:"init",value:function(e){var t=e.tenantId,r=e.container,o=document.getElementById(r);o?a.createRoot(o).render((0,n.jsx)(u,{tenantId:t})):console.error("Element not found")}}],(r=[{key:"render",value:function(){return(0,n.jsxs)("div",{children:["Hello, this is a widget for tenant: ",this.props.tenantId]})}}])&&c(t.prototype,r),o&&c(t,o),u}(u().Component);window.WidgetChatbot=p,window.WidgetChatbot=o})();