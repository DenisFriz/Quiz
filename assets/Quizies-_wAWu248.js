import{y as b,K as I,g as M,a as z,F as S,s as g,d,L as w,r as R,b as A,_ as O,j as n,e as Q,f as B,H as l,C as F,M as G,I as x,J as T,P as j,N}from"./index-DucZVDSD.js";import{S as h}from"./Stack-DkNv1-7Z.js";function P(e,i=0,r=1){return I(e,i,r)}function X(e){e=e.slice(1);const i=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(i);return r&&r[0].length===1&&(r=r.map(t=>t+t)),r?`rgb${r.length===4?"a":""}(${r.map((t,a)=>a<3?parseInt(t,16):Math.round(parseInt(t,16)/255*1e3)/1e3).join(", ")})`:""}function L(e){if(e.type)return e;if(e.charAt(0)==="#")return L(X(e));const i=e.indexOf("("),r=e.substring(0,i);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(b(9,e));let t=e.substring(i+1,e.length-1),a;if(r==="color"){if(t=t.split(" "),a=t.shift(),t.length===4&&t[3].charAt(0)==="/"&&(t[3]=t[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a)===-1)throw new Error(b(10,a))}else t=t.split(",");return t=t.map(s=>parseFloat(s)),{type:r,values:t,colorSpace:a}}function D(e){const{type:i,colorSpace:r}=e;let{values:t}=e;return i.indexOf("rgb")!==-1?t=t.map((a,s)=>s<3?parseInt(a,10):a):i.indexOf("hsl")!==-1&&(t[1]=`${t[1]}%`,t[2]=`${t[2]}%`),i.indexOf("color")!==-1?t=`${r} ${t.join(" ")}`:t=`${t.join(", ")}`,`${i}(${t})`}function K(e,i){return e=L(e),i=P(i),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${i}`:e.values[3]=i,D(e)}function q(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function H(e){return parseFloat(e)}function J(e){return M("MuiSkeleton",e)}z("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const V=["animation","className","component","height","style","variant","width"];let p=e=>e,v,k,y,C;const Y=e=>{const{classes:i,variant:r,animation:t,hasChildren:a,width:s,height:o}=e;return B({root:["root",r,t,a&&"withChildren",a&&!s&&"fitContent",a&&!o&&"heightAuto"]},J,i)},Z=S(v||(v=p`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),ee=S(k||(k=p`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),te=g("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,i)=>{const{ownerState:r}=e;return[i.root,i[r.variant],r.animation!==!1&&i[r.animation],r.hasChildren&&i.withChildren,r.hasChildren&&!r.width&&i.fitContent,r.hasChildren&&!r.height&&i.heightAuto]}})(({theme:e,ownerState:i})=>{const r=q(e.shape.borderRadius)||"px",t=H(e.shape.borderRadius);return d({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:K(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},i.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${t}${r}/${Math.round(t/.6*10)/10}${r}`,"&:empty:before":{content:'"\\00a0"'}},i.variant==="circular"&&{borderRadius:"50%"},i.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},i.hasChildren&&{"& > *":{visibility:"hidden"}},i.hasChildren&&!i.width&&{maxWidth:"fit-content"},i.hasChildren&&!i.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&w(y||(y=p`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),Z),({ownerState:e,theme:i})=>e.animation==="wave"&&w(C||(C=p`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),ee,(i.vars||i).palette.action.hover)),ie=R.forwardRef(function(i,r){const t=A({props:i,name:"MuiSkeleton"}),{animation:a="pulse",className:s,component:o="span",height:c,style:U,variant:W="text",width:_}=t,f=O(t,V),m=d({},t,{animation:a,component:o,variant:W,hasChildren:!!f.children}),E=Y(m);return n.jsx(te,d({as:o,ref:r,className:Q(E.root,s),ownerState:m},f,{style:d({width:_,height:c},U)}))}),$=ie,re=g(l)(()=>({margin:"0 auto",width:"100px",height:"100px","& > img":{maxWidth:"100%",height:"auto",objectFit:"cover"}})),ne=({title:e,image:i,setLikedQuiz:r})=>{const t=()=>{r(a=>{const s=a||[];return s.every(c=>c.title!==e)?[...s,{image:i,title:e}]:s})};return n.jsxs(h,{textAlign:"center",children:[n.jsx(re,{children:n.jsx("img",{src:i})}),n.jsx(F,{noWrap:!0,variant:"subtitle1",children:e}),n.jsx(G,{to:`/detail/${e}`,children:n.jsx(x,{variant:"contained",color:"secondary",children:"Start"})}),n.jsx(x,{variant:"contained",color:"error",style:{marginTop:"10px"},onClick:t,children:"Like"})]})},ae=g(l)(()=>({width:"50px",height:"50px","& > img":{objectFit:"cover",maxWidth:"100%",height:"auto"}})),se=({data:e,setLikedQuiz:i})=>{const r=t=>{if(e){const a=e.filter(s=>s.title!==t);i(a)}};return n.jsx(h,{children:e==null?void 0:e.map(t=>n.jsxs(h,{direction:"row",columnGap:2,flexWrap:"wrap",children:[n.jsx(ae,{children:n.jsx("img",{src:t.image,alt:t.title})}),n.jsxs(l,{flexGrow:1,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",children:[t.title,n.jsx(x,{variant:"contained",color:"error",onClick:()=>r(t.title),children:"Unlike"})]})]},t.title))})},u=()=>n.jsxs(l,{children:[n.jsx($,{animation:"wave",variant:"circular",width:100,height:100,sx:{marginBottom:"10px"}}),n.jsx($,{animation:"wave",variant:"rectangular",width:100,height:40,sx:{borderRadius:"10px"}})]}),oe=()=>{const[e,i]=R.useState(null),{isLoading:r,errorContext:t,data:a}=T();return r?n.jsxs(j,{elevation:3,sx:{padding:"20px",display:"flex",columnGap:"24px",rowGap:"20px",flexWrap:"wrap"},children:[n.jsx(u,{}),n.jsx(u,{}),n.jsx(u,{})]}):t.isError?n.jsx(N,{error:t,resetErrorBoundary:()=>window.location.href="/"}):n.jsxs(j,{elevation:3,sx:{padding:"20px",display:"flex",flexDirection:{xs:"column-reverse",sm:"row"},justifyContent:"space-between",columnGap:"24px",rowGap:"20px",flexWrap:"nowrap"},children:[n.jsx(h,{direction:"row",flexWrap:"wrap",spacing:3,children:a&&a.map((s,o)=>n.jsx(ne,{title:s.title,image:s.image,setLikedQuiz:i},o))}),n.jsx(l,{width:"300px",children:n.jsx(se,{data:e,setLikedQuiz:i})})]})},de=()=>n.jsx(oe,{});export{de as default};
