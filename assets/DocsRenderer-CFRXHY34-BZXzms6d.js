const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-Ca-YMdQn.js","./index-DuuuSFPv.js"])))=>i.map(i=>d[i]);
import{_ as h}from"./iframe-DV2E9uym.js";import{r as a,e as n}from"./index-DuuuSFPv.js";import{b as E,C as d,A as R,H as v,D as f}from"./index-C3Hthr4O.js";import"./index-DPS9-N-h.js";import"./index-DrFu-skq.js";var s={},m;function w(){if(m)return s;m=1;var e=E();return s.createRoot=e.createRoot,s.hydrateRoot=e.hydrateRoot,s}var _=w(),i=new Map;function y(){return globalThis.IS_REACT_ACT_ENVIRONMENT}var C=({callback:e,children:t})=>{let r=a.useRef();return a.useLayoutEffect(()=>{r.current!==e&&(r.current=e,e())},[e]),t};typeof Promise.withResolvers>"u"&&(Promise.withResolvers=()=>{let e=null,t=null;return{promise:new Promise((r,o)=>{e=r,t=o}),resolve:e,reject:t}});var x=async(e,t,r)=>{let o=await g(t,r);if(y()){o.render(e);return}let{promise:u,resolve:c}=Promise.withResolvers();return o.render(a.createElement(C,{callback:c},e)),u},D=(e,t)=>{let r=i.get(e);r&&(r.unmount(),i.delete(e))},g=async(e,t)=>{let r=i.get(e);return r||(r=_.createRoot(e,t),i.set(e,r)),r},A={code:d,a:R,...v},M=class extends a.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){let{showException:t}=this.props;t(e)}render(){let{hasError:e}=this.state,{children:t}=this.props;return e?null:n.createElement(n.Fragment,null,t)}},P=class{constructor(){this.render=async(e,t,r)=>{let o={...A,...t==null?void 0:t.components},u=f;return new Promise((c,p)=>{h(async()=>{const{MDXProvider:l}=await import("./index-Ca-YMdQn.js");return{MDXProvider:l}},__vite__mapDeps([0,1]),import.meta.url).then(({MDXProvider:l})=>x(n.createElement(M,{showException:p,key:Math.random()},n.createElement(l,{components:o},n.createElement(u,{context:e,docsParameter:t}))),r)).then(()=>c())})},this.unmount=e=>{D(e)}}};export{P as DocsRenderer,A as defaultComponents};
