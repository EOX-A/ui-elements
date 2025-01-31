import{g as B}from"./index-DuuuSFPv.js";function H(m,S){for(var f=0;f<S.length;f++){const u=S[f];if(typeof u!="string"&&!Array.isArray(u)){for(const x in u)if(x!=="default"&&!(x in m)){const h=Object.getOwnPropertyDescriptor(u,x);h&&Object.defineProperty(m,x,h.get?h:{enumerable:!0,get:()=>u[x]})}}}return Object.freeze(Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}))}var E={exports:{}},M;function D(){return M||(M=1,function(m,S){ace.define("ace/ext/textarea",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/ace"],function(f,u,x){var h=f("../lib/event"),L=f("../lib/useragent"),k=f("../ace");x.exports=u=k;var O=function(e,c,a){var n=e.style[a];return n||(window.getComputedStyle?n=window.getComputedStyle(e,"").getPropertyValue(a):n=e.currentStyle[a]),(!n||n=="auto"||n=="intrinsic")&&(n=c.style[a]),n};function C(e,c){for(var a in c)e.style[a]=c[a]}function $(e,c){if(e.type!="textarea")throw new Error("Textarea required!");var a=e.parentNode,n=document.createElement("div"),o=function(){var t="position:relative;";["margin-top","margin-left","margin-right","margin-bottom"].forEach(function(l){t+=l+":"+O(e,n,l)+";"});var r=O(e,n,"width")||e.clientWidth+"px",d=O(e,n,"height")||e.clientHeight+"px";t+="height:"+d+";width:"+r+";",t+="display:inline-block;",n.style.cssText=t};for(h.addListener(window,"resize",o),o(),a.insertBefore(n,e.nextSibling);a!==document;){if(a.tagName.toUpperCase()==="FORM"){var p=a.onsubmit;a.onsubmit=function(t){e.value=c(),p&&p.call(this,t)};break}a=a.parentNode}return n}u.transformTextarea=function(e,c){var a=e.autofocus||document.activeElement==e,n,o=$(e,function(){return n.getValue()});e.style.display="none",o.style.background="white";var p=document.createElement("div");C(p,{top:"0px",left:"0px",right:"0px",bottom:"0px",border:"1px solid gray",position:"absolute"}),o.appendChild(p);var t=document.createElement("div");C(t,{position:"absolute",right:"0px",bottom:"0px",cursor:"nw-resize",border:"solid 9px",borderColor:"lightblue gray gray #ceade6",zIndex:101});var r=document.createElement("div"),d={top:"0px",left:"20%",right:"0px",bottom:"0px",position:"absolute",padding:"5px",zIndex:100,color:"white",display:"none",overflow:"auto",fontSize:"14px",boxShadow:"-5px 2px 3px gray"};L.isOldIE?d.backgroundColor="#333":d.backgroundColor="rgba(0, 0, 0, 0.6)",C(r,d),o.appendChild(r),c=c||u.defaultOptions;var l=k.edit(p);n=l.getSession(),n.setValue(e.value||e.innerHTML),a&&l.focus(),o.appendChild(t),j(l,p,r,k,c),I(r,t,l);var w="";return h.addListener(t,"mousemove",function(g){var i=this.getBoundingClientRect(),y=g.clientX-i.left,v=g.clientY-i.top;y+v<(i.width+i.height)/2?(this.style.cursor="pointer",w="toggle"):(w="resize",this.style.cursor="nw-resize")}),h.addListener(t,"mousedown",function(g){if(g.preventDefault(),w=="toggle"){l.setDisplaySettings();return}o.style.zIndex="100000";var i=o.getBoundingClientRect(),y=i.width+i.left-g.clientX,v=i.height+i.top-g.clientY;h.capture(t,function(s){o.style.width=s.clientX-i.left+y+"px",o.style.height=s.clientY-i.top+v+"px",l.resize()},function(){})}),l};function j(e,c,a,n,o){function p(t){return t==="true"||t==!0}return e.setDisplaySettings=function(t){t==null&&(t=a.style.display=="none"),t?(a.style.display="block",a.hideButton.focus(),e.on("focus",function r(){e.removeListener("focus",r),a.style.display="none"})):e.focus()},e.$setOption=e.setOption,e.$getOption=e.getOption,e.setOption=function(t,r){switch(t){case"mode":e.$setOption("mode","ace/mode/"+r);break;case"theme":e.$setOption("theme","ace/theme/"+r);break;case"keybindings":switch(r){case"vim":e.setKeyboardHandler("ace/keyboard/vim");break;case"emacs":e.setKeyboardHandler("ace/keyboard/emacs");break;default:e.setKeyboardHandler(null)}break;case"wrap":case"fontSize":e.$setOption(t,r);break;default:e.$setOption(t,p(r))}},e.getOption=function(t){switch(t){case"mode":return e.$getOption("mode").substr(9);case"theme":return e.$getOption("theme").substr(10);case"keybindings":var r=e.getKeyboardHandler();switch(r&&r.$id){case"ace/keyboard/vim":return"vim";case"ace/keyboard/emacs":return"emacs";default:return"ace"}default:return e.$getOption(t)}},e.setOptions(o),e}function I(e,c,a){var n=null,o={mode:"Mode:",wrap:"Soft Wrap:",theme:"Theme:",fontSize:"Font Size:",showGutter:"Display Gutter:",keybindings:"Keyboard",showPrintMargin:"Show Print Margin:",useSoftTabs:"Use Soft Tabs:",showInvisibles:"Show Invisibles"},p={mode:{text:"Plain",javascript:"JavaScript",xml:"XML",html:"HTML",css:"CSS",scss:"SCSS",python:"Python",php:"PHP",java:"Java",ruby:"Ruby",c_cpp:"C/C++",coffee:"CoffeeScript",json:"json",perl:"Perl",clojure:"Clojure",ocaml:"OCaml",csharp:"C#",haxe:"haXe",svg:"SVG",textile:"Textile",groovy:"Groovy",liquid:"Liquid",Scala:"Scala"},theme:{clouds:"Clouds",clouds_midnight:"Clouds Midnight",cobalt:"Cobalt",crimson_editor:"Crimson Editor",dawn:"Dawn",gob:"Green on Black",eclipse:"Eclipse",idle_fingers:"Idle Fingers",kr_theme:"Kr Theme",merbivore:"Merbivore",merbivore_soft:"Merbivore Soft",mono_industrial:"Mono Industrial",monokai:"Monokai",pastel_on_dark:"Pastel On Dark",solarized_dark:"Solarized Dark",solarized_light:"Solarized Light",textmate:"Textmate",twilight:"Twilight",vibrant_ink:"Vibrant Ink"},showGutter:n,fontSize:{"10px":"10px","11px":"11px","12px":"12px","14px":"14px","16px":"16px"},wrap:{off:"Off",40:"40",80:"80",free:"Free"},keybindings:{ace:"ace",vim:"vim",emacs:"emacs"},showPrintMargin:n,useSoftTabs:n,showInvisibles:n},t=[];t.push("<table><tr><th>Setting</th><th>Value</th></tr>");function r(s,b,T,_){if(!T){s.push("<input type='checkbox' title='",b,"' ",_+""=="true"?"checked='true'":"","'></input>");return}s.push("<select title='"+b+"'>");for(var z in T)s.push("<option value='"+z+"' "),_==z&&s.push(" selected "),s.push(">",T[z],"</option>");s.push("</select>")}for(var d in u.defaultOptions)t.push("<tr><td>",o[d],"</td>"),t.push("<td>"),r(t,d,p[d],a.getOption(d)),t.push("</td></tr>");t.push("</table>"),e.innerHTML=t.join("");for(var l=function(s){var b=s.currentTarget;a.setOption(b.title,b.value)},w=function(s){var b=s.currentTarget;a.setOption(b.title,b.checked)},g=e.getElementsByTagName("select"),i=0;i<g.length;i++)g[i].onchange=l;for(var y=e.getElementsByTagName("input"),i=0;i<y.length;i++)y[i].onclick=w;var v=document.createElement("input");v.type="button",v.value="Hide",h.addListener(v,"click",function(){a.setDisplaySettings(!1)}),e.appendChild(v),e.hideButton=v}u.defaultOptions={mode:"javascript",theme:"textmate",wrap:"off",fontSize:"12px",showGutter:"false",keybindings:"ace",showPrintMargin:"false",useSoftTabs:"true",showInvisibles:"false"}}),function(){ace.require(["ace/ext/textarea"],function(f){m&&(m.exports=f)})}()}(E)),E.exports}var P=D();const F=B(P),N=H({__proto__:null,default:F},[P]);export{N as e};
