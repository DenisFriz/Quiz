import{s as c,P as o,j as r,H as m,C as d,M as u,I as h}from"./index-BeezAfBd.js";import{S as g}from"./Stack-_Xi8LCdn.js";const j=c(o)(()=>({padding:"10px",textAlign:"start",fontSize:"22px"})),I=c(o)(({theme:s})=>({textAlign:"start",margin:"20px 0px 10px",padding:"5px","&.Item-correct":{backgroundColor:s.palette.success.main},"&.Item-incorrect":{backgroundColor:s.palette.error.main}})),k=({correctAnswers:s,allQuestions:i,data:a,userAnswers:l})=>{const p=(e,t)=>e.correctAnswer==t?"Item-correct":l[t]==t?"Item-incorrect":"";return r.jsxs(m,{textAlign:"center",children:[r.jsxs(d,{variant:"h2",children:["Your result"," ",r.jsxs("span",{children:[s," / ",i]})]}),r.jsx(u,{to:"/",children:r.jsx(h,{variant:"contained",color:"secondary",children:"GO"})}),r.jsx(g,{spacing:2,children:a&&a.map((e,t)=>r.jsxs(j,{children:[t+1+") ",e.title,e.variants.map((x,n)=>r.jsxs(I,{className:p(e,n),children:[n+1+") ",x]},n))]},t))})]})};export{k as default};