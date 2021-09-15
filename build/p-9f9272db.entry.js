import{r as a,h as t,g as e}from"./p-15bbdd30.js";import{c as i}from"./p-43a9faca.js";const n=class{constructor(t){a(this,t),this.panelCount=0,this.flowDirection=null,this.panels=[],this.getFlowDirection=(a,t)=>a&&t>1||a>1?t<a?"retreating":"advancing":null,this.updateFlowProps=()=>{const{panels:a}=this,t=Array.from(this.el.querySelectorAll("calcite-panel")),e=a.length,i=t.length,n=t[i-1],r=t[i-2];if(i&&n&&t.forEach((a=>{a.showBackButton=i>1,a.hidden=a!==n})),r&&(r.menuOpen=!1),this.panels=t,e!==i){const a=this.getFlowDirection(e,i);this.panelCount=i,this.flowDirection=a}},this.panelItemMutationObserver=i("mutation",this.updateFlowProps)}async back(){const a=this.el.querySelector("calcite-panel:last-child");if(a)return(a.beforeBack?a.beforeBack:()=>Promise.resolve()).call(a).then((()=>(a.remove(),a)))}connectedCallback(){var a;null===(a=this.panelItemMutationObserver)||void 0===a||a.observe(this.el,{childList:!0,subtree:!0}),this.updateFlowProps()}disconnectedCallback(){var a;null===(a=this.panelItemMutationObserver)||void 0===a||a.disconnect()}handleCalcitePanelBackClick(){this.back()}render(){const{flowDirection:a,panelCount:e}=this;return t("div",{class:{frame:!0,"frame--advancing":"advancing"===a,"frame--retreating":"retreating"===a},key:e},t("slot",null))}get el(){return e(this)}};n.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:stretch;align-items:stretch;background-color:transparent;width:100%;overflow:hidden;position:relative}:host .frame{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:stretch;align-items:stretch;width:100%;padding:0;margin:0;-ms-flex-direction:column;flex-direction:column;position:relative}:host ::slotted(calcite-panel){height:100%}:host ::slotted(.calcite-match-height:last-child){display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden}:host .frame--advancing{-webkit-animation:calcite-frame-advance 150ms ease-in-out;animation:calcite-frame-advance 150ms ease-in-out}:host .frame--retreating{-webkit-animation:calcite-frame-retreat 150ms ease-in-out;animation:calcite-frame-retreat 150ms ease-in-out}@-webkit-keyframes calcite-frame-advance{0%{--bg-opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{--bg-opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-advance{0%{--bg-opacity:0.5;-webkit-transform:translate3d(50px, 0, 0);transform:translate3d(50px, 0, 0)}100%{--bg-opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@-webkit-keyframes calcite-frame-retreat{0%{--bg-opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{--bg-opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{--bg-opacity:0.5;-webkit-transform:translate3d(-50px, 0, 0);transform:translate3d(-50px, 0, 0)}100%{--bg-opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}}";export{n as calcite_flow}