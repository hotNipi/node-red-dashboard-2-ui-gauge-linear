(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hotnipi-gauge-linear[data-v-d4cf7879]{container-type:inline-size;container-name:hotnipi-gauge-linear}.hotnipi-gauge-linear-grid-2[data-v-d4cf7879]{display:grid;grid-template-columns:2rem auto;gap:1rem;height:100%}.hotnipi-gauge-linear-grid-1[data-v-d4cf7879]{display:grid;grid-template-columns:1fr;gap:1rem;height:100%}.hotnipi-gauge-linear-icon[data-v-d4cf7879]{display:flex;justify-content:center;align-items:center}.hotnipi-gauge-linear-icon .v-icon[data-v-d4cf7879]{font-size:min(3rem,calc(var(--widget-row-height) * 1.1))}.hotnipi-gauge-linear-content[data-v-d4cf7879]{container-type:inline-size;container-name:level-content;display:grid;grid-template-rows:1.3em minmax(3px,1fr) .7em;gap:2px;height:100%}.hotnipi-gauge-linear-text[data-v-d4cf7879]{font-size:1.25em;line-height:1em;align-self:end;display:flex;gap:.5rem;justify-content:space-between;-webkit-user-select:none;user-select:none;overflow:auto}.hotnipi-gauge-linear-label[data-v-d4cf7879]{font-size:min(1rem,1.7cqh);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.hide-label .hotnipi-gauge-linear-label[data-v-d4cf7879]{display:none}.hide-label .hotnipi-gauge-linear-text[data-v-d4cf7879]{justify-content:flex-end}.hotnipi-gauge-linear-value[data-v-d4cf7879]{font-size:min(1rem,1.7cqh);font-weight:700}.hide-value .hotnipi-gauge-linear-value[data-v-d4cf7879]{display:none}.hotnipi-gauge-linear-unit[data-v-d4cf7879]{font-size:min(.75rem,1.275cqh);font-weight:400;padding-inline-start:.15em}.hotnipi-gauge-linear-stripe[data-v-d4cf7879]{display:flex}.hotnipi-gauge-linear-stripe-solid[data-v-d4cf7879]{display:block;position:relative}.hotnipi-gauge-linear-bar[data-v-d4cf7879]{background:#fff;position:absolute;left:0;top:0;width:100%;height:100%;transition:width .8s ease-in-out}.hotnipi-gauge-linear-led[data-v-d4cf7879]{background:#fff;width:100%;height:100%;border-left:1px solid rgb(var(--v-theme-group-background));border-right:1px solid rgb(var(--v-theme-group-background));border-radius:0}.hotnipi-gauge-linear-limits[data-v-d4cf7879]{display:block;position:relative;font-size:min(.75rem,1.275cqh);line-height:1;-webkit-user-select:none;user-select:none}.hotnipi-gauge-linear-limit[data-v-d4cf7879]{position:absolute;transform:translate(-50%)}.hide-limits .hotnipi-gauge-linear-limit[data-v-d4cf7879]{display:none}.hotnipi-gauge-linear-limit[data-v-d4cf7879]:first-child{left:0;transform:translate(0)}.hotnipi-gauge-linear-limit[data-v-d4cf7879]:last-child{right:0;transform:translate(0)}@container level-content (width < 130px){.hotnipi-gauge-linear-led[data-v-d4cf7879]:nth-child(2n){display:none}.hotnipi-gauge-linear-limit[data-v-d4cf7879]:not(:first-child):not(:last-child){display:none}}@container level-content (width < 120px){.hotnipi-gauge-linear-label[data-v-d4cf7879]{display:none}.hotnipi-gauge-linear-text[data-v-d4cf7879]{justify-content:flex-end}}@container hotnipi-gauge-linear (max-width: 160px){.hotnipi-gauge-linear-grid-2[data-v-d4cf7879]{grid-template-columns:1rem auto}.hotnipi-gauge-linear-icon .v-icon[data-v-d4cf7879]{font-size:calc(var(--v-icon-size-multiplier)* 2em)!important}@container style(--responsive-cut: icon){.hotnipi-gauge-linear-grid-2[data-v-d4cf7879]{grid-template-columns:1fr}.hotnipi-gauge-linear-icon[data-v-d4cf7879]{display:none}}}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
(function(h,d){typeof exports=="object"&&typeof module<"u"?d(exports,require("vuex"),require("vue")):typeof define=="function"&&define.amd?define(["exports","vuex","vue"],d):(h=typeof globalThis<"u"?globalThis:h||self,d(h["ui-gauge-linear"]={},h.vuex,h.Vue))})(this,function(h,d,t){"use strict";const b=(e,i)=>{const s=e.__vccOpts||e;for(const[l,o]of i)s[l]=o;return s},y={name:"UIGaugeLinear",inject:["$socket"],props:{id:{type:String,required:!0},props:{type:Object,default:()=>({})},state:{type:Object,default:()=>({enabled:!1,visible:!1})}},setup(e){},data(){return{label:"Level zero cross",icon:"mdi-account",min:{value:0,label:""},max:{value:100,label:""},unit:"cm³",dim:.2,animate:!0,colors:[],ticks:[],bar:"segmented",mode:"default",zeroCrossColors:["#ff4c16","#00e300"],value:0,previousValue:0,decimals:2,zeros:!0,class:"",inited:!1}},methods:{applyProperties:function(){const e=this.props;this.ticks=e.ticks,this.min={value:Number(e.min),label:e.minLabel},this.max={value:Number(e.max),label:e.maxLabel},this.colors=e.colors,this.mode=e.mode,this.bar=e.bar,this.label=e.label,this.unit=e.unit,this.property=e.property??"payload",this.dim=Number(e.dim),this.icon=e.icon.startsWith("mdi-")?e.icon:e.icon==""?"":"mdi-"+e.icon,this.zeroCrossColors=e.zeroCrossColors,this.class=this.props.myclass,this.decimals=Number(e.decimals),this.zeros=e.zeros},getElement:function(e,i){return i?this.$refs[e]:this.$refs[e]&&this.$refs[e].length?this.$refs[e][0]:null},labelFor:function(e){let i="";return!e.label||e.label==""?(i=e.value,this.mode=="zeroCross"&&(e===this.min?i="0":e===this.max?this.value<0?i=this.min.value:i=this.max.value:i=this.value<0?e.value*-1:e.value)):i=e.label,i},validate(e){let i;if(typeof e!="number"){if(i=parseFloat(e),isNaN(i))return null}else i=e;return i},full:function(){return Math.floor(this.colors.length*this.percentage/100)},half:function(){let e=this.colors.length*this.percentage/100;return e-=this.full(),e*=.5,e+=this.dim,e},segmentedFullBarColor:function(){let e=this.full()-1;return e=Math.min(e,this.colors.length-1),e=Math.max(e,0),this.colors[e].color},tickPosition:function(e){if(this.mode=="zeroCross"){let i=Math.abs(e),s=this.value<0?Math.abs(this.min.value):this.max.value;return Math.floor(i/s*100)+"%"}return Math.floor((e-this.min.value)/(this.max.value-this.min.value)*100)+"%"},arrangeTicks:function(){this.mode=="zeroCross"&&this.max.value!=Math.abs(this.min.value)&&(this.ticks=[]),this.ticks.forEach((e,i)=>{let s=this.getElement("tick-"+i);s&&(s.style.left=this.tickPosition(e.value))})},replaceColors:function(){this.bar=="segmented"&&this.colors.forEach((e,i)=>{let s=this.getElement("dot-"+i);s&&(s.style.backgroundColor=e.color)})},lit:function(){if(this.inited==!1)return;if(this.bar=="solid"){this.move();return}const e=this.previousValue>this.value;let i=e?1:.2,s=e?.12:.06,l=this.mode=="fullBar"?this.segmentedFullBarColor():null;this.mode=="zeroCross"&&(l=this.value<0?this.zeroCrossColors[0]:this.zeroCrossColors[1]),this.colors.forEach((o,a)=>{let n=this.getElement("dot-"+a);if(!n){console.log("lit() no dots found");return}a<this.full()?(n.style.opacity=1,i+=s):a==this.full()?n.style.opacity=this.half():n.style.opacity=this.dim,i-=s,l&&(n.style.backgroundColor=l),n.style.transition=this.animate&&i>0?"opacity "+i+"s":"unset"}),this.previousValue=this.value},move:function(){let e;if(this.mode=="fullBar"){e=this.getElement("bar",!0);let i=0,s=this.ticks.findLastIndex(l=>l.value<this.value);s>-1&&(i=s+1),i>this.colors.length-1&&(i=this.colors.length-1),e.style.backgroundColor=this.fullBarColors[i].color,e.style.width=this.percentage+"%"}else this.colors.forEach((i,s)=>{if(e=this.getElement("bar-"+s),!e){console.log("move() no bars found");return}e.style.width=this.percentage+"%",this.mode=="zeroCross"&&(e.style.backgroundColor=this.value<0?this.zeroCrossColors[0]:this.zeroCrossColors[1])})},onPayload:function(e){var s,l,o,a,n,c,r,f,m,p,g,_,k;if((e==null?void 0:e.payload)!=null){const u=this.validate(e.payload);u!==null&&(this.value=u,this.lit())}let i=!1;if((s=e.ui_update)!=null&&s.min&&((l=e.ui_update)!=null&&l.min.value)&&typeof((o=e.ui_update)==null?void 0:o.min.value)=="number"&&(this.min=e.ui_update.min,i=!0),(a=e.ui_update)!=null&&a.max&&((n=e.ui_update)!=null&&n.max.value)&&typeof((c=e.ui_update)==null?void 0:c.max.value)=="number"&&(this.max=e.ui_update.max,i=!0),(r=e.ui_update)!=null&&r.unit&&typeof e.ui_update.unit=="string"&&(this.unit=e.ui_update.unit),(f=e.ui_update)!=null&&f.label&&typeof e.ui_update.label=="string"&&(this.label=e.ui_update.label),((m=e.ui_update)==null?void 0:m.class)!=null&&typeof e.ui_update.class=="string"&&(this.class=e.ui_update.class),(p=e.ui_update)!=null&&p.icon&&typeof e.ui_update.icon=="string"){let u=e.ui_update.icon;this.icon=u.startsWith("mdi-")?u:u==""?"":"mdi-"+u}Array.isArray((g=e.ui_update)==null?void 0:g.ticks)&&(this.ticks=e.ui_update.ticks,i=!0),Array.isArray((_=e.ui_update)==null?void 0:_.colors)&&(this.colors=e.ui_update.colors,this.$nextTick(()=>{this.replaceColors(),this.lit()})),Array.isArray((k=e.ui_update)==null?void 0:k.zeroCrossColors)&&(this.zeroCrossColors=e.ui_update.zeroCrossColors,this.$nextTick(()=>{this.lit()})),i&&this.$nextTick(()=>{this.arrangeTicks(),this.lit()})}},computed:{...d.mapState("data",["messages"]),formattedValue:function(){let e=this.zeros==!0?this.decimals:0;return new Intl.NumberFormat("en",{useGrouping:!1,maximumFractionDigits:this.decimals,minimumFractionDigits:e}).format(this.value)},percentage:function(){let e=this.value;if(this.mode=="zeroCross"){e=Math.abs(this.value);let i=this.value<0?Math.abs(this.min.value):this.max.value;return Math.min(Math.floor(e/i*100),100)}return Math.min(Math.floor((e-this.min.value)/(this.max.value-this.min.value)*100),100)}},mounted(){this.applyProperties(),this.$socket.on("widget-load:"+this.id,e=>{this.onPayload(e)}),this.$socket.on("msg-input:"+this.id,e=>{this.onPayload(e),this.$store.commit("data/bind",{widgetId:this.id,msg:e})}),this.$nextTick(()=>{this.mode=="zeroCross"&&this.max.value!=Math.abs(this.min.value)&&(this.ticks=[]);let e;this.colors.forEach((i,s)=>{if(this.bar=="segmented"){if(e=this.getElement("dot-"+s),!e)return;e.style.backgroundColor=i.color}else if(this.mode!="fullBar"){if(e=this.getElement("bar-"+s),!e)return;e.style.maxWidth=i.size+"%"}}),this.mode=="fullBar"&&this.bar=="solid"&&(this.fullBarColors=[...this.colors],this.fullBarColors.reverse()),this.ticks.forEach((i,s)=>{let l=this.getElement("tick-"+s);l&&(l.style.left=this.tickPosition(i.value))}),this.inited=!0,this.lit()}),this.$socket.emit("widget-load",this.id)},unmounted(){var e,i;(e=this.$socket)==null||e.off("widget-load:"+this.id),(i=this.$socket)==null||i.off("msg-input:"+this.id)}},C={key:0,class:"hotnipi-gauge-linear-icon"},E={class:"hotnipi-gauge-linear-content"},x={class:"hotnipi-gauge-linear-text"},B={class:"hotnipi-gauge-linear-label"},z={class:"hotnipi-gauge-linear-value"},v={class:"hotnipi-gauge-linear-unit"},N={key:0,class:"hotnipi-gauge-linear-stripe"},V={key:1,class:"hotnipi-gauge-linear-stripe-solid"},M=["id"],F={key:1,class:"hotnipi-gauge-linear-bar",ref:"bar"},S={class:"hotnipi-gauge-linear-limits"},T={class:"hotnipi-gauge-linear-limit"},w={class:"hotnipi-gauge-linear-limit"};function D(e,i,s,l,o,a){const n=t.resolveComponent("v-icon");return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["hotnipi-gauge-linear",o.class]),style:{"--responsive-cut":"icon"}},[t.createElementVNode("div",{class:t.normalizeClass(o.icon?"hotnipi-gauge-linear-grid-2":"hotnipi-gauge-linear-grid-1")},[o.icon?(t.openBlock(),t.createElementBlock("div",C,[t.createVNode(n,{"aria-hidden":"false"},{default:t.withCtx(()=>[t.createTextVNode(t.toDisplayString(o.icon),1)]),_:1})])):t.createCommentVNode("",!0),t.createElementVNode("div",E,[t.createElementVNode("div",x,[t.createElementVNode("span",B,t.toDisplayString(o.label),1),t.createElementVNode("span",z,[t.createTextVNode(t.toDisplayString(a.formattedValue),1),t.createElementVNode("span",v,t.toDisplayString(o.unit),1)])]),o.bar=="segmented"?(t.openBlock(),t.createElementBlock("div",N,[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(o.colors,(c,r)=>(t.openBlock(),t.createElementBlock("div",{key:r,class:"hotnipi-gauge-linear-led",ref_for:!0,ref:"dot-"+r,style:t.normalizeStyle("background-color:"+c.color+";")},null,4))),128))])):t.createCommentVNode("",!0),o.bar=="solid"?(t.openBlock(),t.createElementBlock("div",V,[o.mode!="fullBar"?(t.openBlock(!0),t.createElementBlock(t.Fragment,{key:0},t.renderList(o.colors,(c,r)=>(t.openBlock(),t.createElementBlock("div",{key:r,id:"bar-"+r,style:t.normalizeStyle("background-color:"+c.color+";max-width:"+c.size+"%;"),class:"hotnipi-gauge-linear-bar",ref_for:!0,ref:"bar-"+r},null,12,M))),128)):t.createCommentVNode("",!0),o.mode=="fullBar"?(t.openBlock(),t.createElementBlock("div",F,null,512)):t.createCommentVNode("",!0)])):t.createCommentVNode("",!0),t.createElementVNode("div",S,[t.createElementVNode("span",T,t.toDisplayString(a.labelFor(o.min)),1),(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(o.ticks,(c,r)=>(t.openBlock(),t.createElementBlock("span",{key:r,class:"hotnipi-gauge-linear-limit",ref_for:!0,ref:"tick-"+r},t.toDisplayString(a.labelFor(c)),1))),128)),t.createElementVNode("span",w,t.toDisplayString(a.labelFor(o.max)),1)])])],2)],2)}const L=b(y,[["render",D],["__scopeId","data-v-d4cf7879"]]);h.UIGaugeLinear=L,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
