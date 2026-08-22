import{c as e,f as t,n,t as r}from"./index-BR-L_-sg.js";import{A as i,B as a,C as o,E as s,G as c,O as l,S as u,a as d,f,i as p,m,o as h,r as g,s as _,v}from"./fa-BlK4pbMx.js";import{t as y}from"./supabase-DDu0klbY.js";import{n as b,t as x}from"./Loader-D31zcNVD.js";import{r as S,t as C}from"./storage-Chfi_QH0.js";import{n as w,t as T}from"./ProjectCard-De5wXfE3.js";import{a as E,i as D,n as O,o as k,r as A,t as j}from"./pagination-BlpJ-BWc.js";import{t as M}from"./PageTransition-DuAVdGea.js";var N=t(e(),1),P=r();function F(){let[e,t]=(0,N.useState)(!1),n=[`About`,`Skills`,`Projects`,`Contact`];return(0,P.jsxs)(`nav`,{className:`
                fixed
                top-0
                w-full
                z-50
            
            `,children:[(0,P.jsxs)(`div`,{className:`
                    max-w-7xl
                    mx-auto
                    flex
                    justify-between
                    items-center
                    px-6
                    h-20
                `,children:[(0,P.jsx)(`a`,{href:`/`,className:`
                        text-2xl
                        font-black
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        bg-clip-text
                        text-transparent
                    `,children:`TC`}),(0,P.jsx)(`ul`,{className:`
                        hidden
                        md:flex
                        gap-8
                    `,children:n.map(e=>(0,P.jsx)(`li`,{children:(0,P.jsx)(`a`,{href:`#${e.toLowerCase()}`,className:`
                                        hover:text-blue-400
                                        transition
                                        font-semibold
                                    `,children:e})},e))}),(0,P.jsx)(`button`,{className:`
                        md:hidden
                        text-white
                    `,onClick:()=>t(!e),children:e?(0,P.jsx)(a,{size:20,className:`sm:w-6 sm:h-6`}):(0,P.jsx)(p,{size:20,className:`sm:w-6 sm:h-6`})})]}),e&&(0,P.jsx)(b.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:`auto`},className:`
                            md:hidden
                            bg-slate-950
                            border-t
                            border-slate-800
                        `,children:n.map(e=>(0,P.jsx)(`a`,{href:`#${e.toLowerCase()}`,className:`
                                        block
                                        px-6
                                        py-4
                                        border-b
                                        border-slate-800
                                        hover:text-blue-400
                                        transition
                                    `,onClick:()=>t(!1),children:e},e))})]})}function I(e,t,n,r){return new(n||=Promise)((function(i,a){function o(e){try{c(r.next(e))}catch(e){a(e)}}function s(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,s)}c((r=r.apply(e,t||[])).next())}))}function L(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==`function`&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw TypeError(`Generator is already executing.`);for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(i=o.trys,!((i=i.length>0&&i[i.length-1])||a[0]!==6&&a[0]!==2)){o=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(a[0]===6&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}function R(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function z(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r,i,a=n.call(e),o=[];try{for(;(t===void 0||t-->0)&&!(r=a.next()).done;)o.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(i)throw i.error}}return o}function B(e,t,n){if(n||arguments.length===2)for(var r,i=0,a=t.length;i<a;i++)!r&&i in t||(r||=Array.prototype.slice.call(t,0,i),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}function V(e,t,n,r,i){var a=[...arguments].slice(5);return I(this,void 0,void 0,(function(){var o,s,c,l,u,d;return L(this,(function(f){switch(f.label){case 0:f.trys.push([0,12,13,14]),o=R(a),s=o.next(),f.label=1;case 1:if(s.done)return[3,11];switch(c=s.value,typeof c){case`string`:return[3,2];case`number`:return[3,4];case`function`:return[3,6]}return[3,8];case 2:return[4,ee(e,t,c,n,r,i)];case 3:return f.sent(),[3,10];case 4:return[4,H(c)];case 5:return f.sent(),[3,10];case 6:return[4,c.apply(void 0,B([e,t,n,r,i],z(a),!1))];case 7:return f.sent(),[3,10];case 8:return[4,c];case 9:f.sent(),f.label=10;case 10:return s=o.next(),[3,1];case 11:return[3,14];case 12:return l=f.sent(),u={error:l},[3,14];case 13:try{s&&!s.done&&(d=o.return)&&d.call(o)}finally{if(u)throw u.error}return[7];case 14:return[2]}}))}))}function ee(e,t,n,r,i,a){return I(this,void 0,void 0,(function(){var o,s;return L(this,(function(c){switch(c.label){case 0:return o=e.textContent||``,s=function(e,t){var n=z(t).slice(0);return B(B([],z(e),!1),[NaN],!1).findIndex((function(e,t){return n[t]!==e}))}(o,n),[4,te(e,B(B([],z(re(o,t,s)),!1),z(ne(n,t,s)),!1),r,i,a)];case 1:return c.sent(),[2]}}))}))}function H(e){return I(this,void 0,void 0,(function(){return L(this,(function(t){switch(t.label){case 0:return[4,new Promise((function(t){return setTimeout(t,e)}))];case 1:return t.sent(),[2]}}))}))}function te(e,t,n,r,i){return I(this,void 0,void 0,(function(){var a,o,s,c,l,u,d,f,p,m,h,g,_;return L(this,(function(v){switch(v.label){case 0:if(a=t,i){for(o=0,s=1;s<t.length;s++)if(c=z([t[s-1],t[s]],2),l=c[0],(u=c[1]).length>l.length||u===``){o=s;break}a=t.slice(o,t.length)}v.label=1;case 1:v.trys.push([1,6,7,8]),d=R(function(e){var t,n,r,i,a,o,s;return L(this,(function(c){switch(c.label){case 0:t=function(e){return L(this,(function(t){switch(t.label){case 0:return[4,{op:function(t){return requestAnimationFrame((function(){return t.textContent=e}))},opCode:function(t){var n=t.textContent||``;return e===``||n.length>e.length?`DELETE`:`WRITING`}}];case 1:return t.sent(),[2]}}))},c.label=1;case 1:c.trys.push([1,6,7,8]),n=R(e),r=n.next(),c.label=2;case 2:return r.done?[3,5]:(i=r.value,[5,t(i)]);case 3:c.sent(),c.label=4;case 4:return r=n.next(),[3,2];case 5:return[3,8];case 6:return a=c.sent(),o={error:a},[3,8];case 7:try{r&&!r.done&&(s=n.return)&&s.call(n)}finally{if(o)throw o.error}return[7];case 8:return[2]}}))}(a)),f=d.next(),v.label=2;case 2:return f.done?[3,5]:(p=f.value,m=p.opCode(e)===`WRITING`?n+n*(Math.random()-.5):r+r*(Math.random()-.5),p.op(e),[4,H(m)]);case 3:v.sent(),v.label=4;case 4:return f=d.next(),[3,2];case 5:return[3,8];case 6:return h=v.sent(),g={error:h},[3,8];case 7:try{f&&!f.done&&(_=d.return)&&_.call(d)}finally{if(g)throw g.error}return[7];case 8:return[2]}}))}))}function ne(e,t,n){var r,i;return n===void 0&&(n=0),L(this,(function(a){switch(a.label){case 0:r=t(e),i=r.length,a.label=1;case 1:return n<i?[4,r.slice(0,++n).join(``)]:[3,3];case 2:return a.sent(),[3,1];case 3:return[2]}}))}function re(e,t,n){var r,i;return n===void 0&&(n=0),L(this,(function(a){switch(a.label){case 0:r=t(e),i=r.length,a.label=1;case 1:return i>n?[4,r.slice(0,--i).join(``)]:[3,3];case 2:return a.sent(),[3,1];case 3:return[2]}}))}var ie=`index-module_type__E-SaG`;(function(e,t){t===void 0&&(t={});var n=t.insertAt;if(e&&typeof document<`u`){var r=document.head||document.getElementsByTagName(`head`)[0],i=document.createElement(`style`);i.type=`text/css`,n===`top`&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}})(`.index-module_type__E-SaG::after {
  content: '|';
  animation: index-module_cursor__PQg0P 1.1s infinite step-start;
}

@keyframes index-module_cursor__PQg0P {
  50% {
    opacity: 0;
  }
}
`);var ae=(0,N.memo)((0,N.forwardRef)((function(e,t){var n=e.sequence,r=e.repeat,i=e.className,a=e.speed,o=a===void 0?40:a,s=e.deletionSpeed,c=e.omitDeletionAnimation,l=c!==void 0&&c,u=e.preRenderFirstString,d=u!==void 0&&u,f=e.wrapper,p=f===void 0?`span`:f,m=e.splitter,h=m===void 0?function(e){return B([],z(e),!1)}:m,g=e.cursor,_=g===void 0||g,v=e.style,y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}(e,[`sequence`,`repeat`,`className`,`speed`,`deletionSpeed`,`omitDeletionAnimation`,`preRenderFirstString`,`wrapper`,`splitter`,`cursor`,`style`]),b=y[`aria-label`],x=y[`aria-hidden`],S=y.role;s||=o;var C=[,,].fill(40);[o,s].forEach((function(e,t){switch(typeof e){case`number`:C[t]=Math.abs(e-100);break;case`object`:var n=e.type,r=e.value;if(typeof r!=`number`)break;n===`keyStrokeDelayInMs`&&(C[t]=r)}}));var w,T,E,D,O,k,A=C[0],j=C[1],M=function(e,t){t===void 0&&(t=null);var n=(0,N.useRef)(t);return(0,N.useEffect)((function(){e&&(typeof e==`function`?e(n.current):e.current=n.current)}),[e]),n}(t),P=ie;w=i?`${_?P+` `:``}${i}`:_?P:``,T=(0,N.useRef)((function(){var e,t=n;r===1/0?e=V:typeof r==`number`&&(t=Array(1+r).fill(n).flat());var i=e?B(B([],z(t),!1),[e],!1):B([],z(t),!1);return V.apply(void 0,B([M.current,h,A,j,l],z(i),!1)),function(){M.current}})),E=(0,N.useRef)(),D=(0,N.useRef)(!1),O=(0,N.useRef)(!1),k=z((0,N.useState)(0),2)[1],D.current&&(O.current=!0),(0,N.useEffect)((function(){return D.current||(E.current=T.current(),D.current=!0),k((function(e){return e+1})),function(){O.current&&E.current&&E.current()}}),[]);var F=p,I=d?n.find((function(e){return typeof e==`string`}))||``:null;return N.createElement(F,{"aria-hidden":x,"aria-label":b,role:S,style:v,className:w,children:b?N.createElement(`span`,{"aria-hidden":`true`,ref:M,children:I}):I,ref:b?void 0:M})})),(function(e,t){return!0}));function oe(){let[e,t]=(0,N.useState)(null);return(0,N.useEffect)(()=>{async function e(){let{data:e,error:n}=await y.from(`resume`).select(`
                    id,
                    file_name,
                    file_url,
                    updated_at
                `).eq(`active`,!0).maybeSingle();if(n){console.error(`Failed to load resume:`,n);return}if(!e){t(null);return}t({...e,url:S(e.file_url)})}e()},[]),e}function U(){let[e,t]=(0,N.useState)(null),[n,r]=(0,N.useState)(!0),[i,a]=(0,N.useState)(null);return(0,N.useEffect)(()=>{async function e(){r(!0),a(null);let{data:e,error:n}=await y.from(`profile`).select(`
                    *
                `).limit(1).maybeSingle();if(n){a(n),r(!1);return}t(e),r(!1)}e()},[]),{profile:e,loading:n,error:i}}function se(){let e=oe(),{profile:t,loading:r,error:i}=U();return r?(0,P.jsx)(`div`,{children:`Loading...`}):i?(0,P.jsx)(`div`,{children:`Failed to load profile.`}):(0,P.jsxs)(`section`,{className:`relative min-h-screen overflow-hidden`,children:[(0,P.jsxs)(`div`,{className:`absolute inset-0 -z-20`,children:[(0,P.jsx)(`div`,{className:`absolute left-20 top-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse`}),(0,P.jsx)(`div`,{className:`absolute right-20 bottom-20 w-80 h-80 bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse`}),(0,P.jsx)(`div`,{className:`absolute left-1/2 top-1/3 w-96 h-96 bg-violet-500 rounded-full blur-[140px] opacity-20 animate-pulse`})]}),(0,P.jsxs)(`div`,{className:`
        hidden
        lg:block
        absolute
        top-0
        right-[-80px]
        h-full
        w-[45%]
        overflow-hidden
        -skew-x-12
        origin-top
        -z-10

    `,children:[(0,P.jsx)(`img`,{src:C(t?.profile_image_path),className:`
        w-full
        h-full
        object-cover
        skew-x-12
        scale-110
    `,loading:`eager`}),(0,P.jsx)(`div`,{className:`
            absolute
            inset-0
            bg-gradient-to-br
            from-slate-900/80
            via-blue-900/50
            to-cyan-700/40
        `})]}),(0,P.jsxs)(`div`,{className:`relative z-10 max-w-7xl mx-auto min-h-screen grid lg:grid-cols-[1.3fr_0.7fr] items-center px-6`,children:[(0,P.jsxs)(b.div,{initial:{opacity:0,x:-80},animate:{opacity:1,x:0},transition:{duration:.8},className:`py-20`,children:[(0,P.jsx)(`p`,{className:`text-blue-400 text-xl mb-4`,children:`Hello, I'm`}),(0,P.jsxs)(`h1`,{className:`text-4xl sm:text-5xl lg:text-7xl font-black leading-tight`,children:[(0,P.jsx)(`span`,{className:`bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent`,children:t.name}),(0,P.jsx)(`br`,{}),t.last_name]}),(0,P.jsx)(`div`,{className:`text-lg sm:text-xl lg:text-2xl text-slate-300 mt-8 h-16`,children:(0,P.jsx)(ae,{sequence:[`Software Developer`,2e3,`Laravel Developer`,2e3,`React Developer`,2e3,`Flutter Developer`,2e3,`Machine Learning Enthusiast`,2e3],repeat:1/0})}),(0,P.jsx)(`p`,{className:`text-sm sm:text-base lg:text-lg text-slate-400 mt-8 max-w-xl leading-8`,children:t.short_bio}),(0,P.jsxs)(`div`,{className:`flex flex-wrap gap-4 mt-10`,children:[(0,P.jsx)(n,{to:`/projects`,className:`bg-blue-600 hover:bg-blue-700 transition px-6 py-3 md:px-7 md:py-3 rounded-xl sm:text-base
                                    text-sm`,children:`View Projects`}),(0,P.jsxs)(`a`,{href:S(e?.file_url),className:`border border-slate-600 hover:border-blue-500 hover:bg-blue-600 transition px-6 py-3 md:px-7 md:py-3 rounded-xl flex items-center gap-2 sm:text-base
                                      text-sm`,children:[(0,P.jsx)(f,{}),`Resume`]})]}),(0,P.jsxs)(`div`,{className:`flex gap-6 mt-10`,children:[(0,P.jsx)(`a`,{href:t.github_url,children:(0,P.jsx)(u,{className:`text-xl md:text-2xl`})}),(0,P.jsx)(`a`,{href:t.linkedin_url,children:(0,P.jsx)(l,{className:`text-xl md:text-2xl`})}),(0,P.jsx)(`a`,{href:t.facebook_url,children:(0,P.jsx)(v,{className:`text-xl md:text-2xl`})})]})]}),(0,P.jsx)(b.div,{initial:{opacity:0,x:80},animate:{opacity:1,x:0},transition:{duration:.8},className:`
        hidden
        lg:block
    `})]})]})}function ce(){let[e,t]=(0,N.useState)(null),[n,r]=(0,N.useState)(!0),[i,a]=(0,N.useState)(null);return(0,N.useEffect)(()=>{async function e(){r(!0);let{data:e,error:n}=await y.from(`about`).select(`*`).single();n?a(n):t(e),r(!1)}e()},[]),{about:e,loading:n,error:i}}function le(){let{about:e,loading:t,error:n}=ce();return t?(0,P.jsx)(`div`,{children:`Loading...`}):n?(0,P.jsx)(`div`,{children:`Failed to load About section.`}):e?(0,P.jsxs)(`section`,{id:`about`,className:`py-16 md:py-24 px-6 max-w-7xl mx-auto`,children:[(0,P.jsx)(w,{title:`About Me`,subtitle:`Passionate about building modern software solutions that make an impact.`}),(0,P.jsxs)(`div`,{className:`grid lg:grid-cols-2 gap-16 items-center`,children:[(0,P.jsx)(b.div,{initial:{opacity:0,x:-60},whileInView:{opacity:1,x:0},viewport:{once:!0},className:`flex justify-center`,children:(0,P.jsxs)(`div`,{className:`relative`,children:[(0,P.jsx)(`div`,{className:`absolute inset-0 rounded-3xl bg-blue-600 blur-3xl opacity-20`}),(0,P.jsx)(`img`,{src:C(e?.image_path),alt:`Taonga Chiwowa`,className:`relative w-[380px] rounded-3xl object-cover shadow-2xl`})]})}),(0,P.jsxs)(b.div,{initial:{opacity:0,x:60},whileInView:{opacity:1,x:0},viewport:{once:!0},children:[console.log(e),(0,P.jsxs)(`div`,{children:[(0,P.jsx)(`h3`,{className:`text-2xl md:text-3xl font-bold mb-6`,children:e.title}),(0,P.jsx)(`p`,{className:`text-sm sm:text-base lg:text-lg text-slate-400 leading-8`,children:e.content}),(0,P.jsx)(`br`,{}),(0,P.jsx)(`br`,{}),(0,P.jsx)(`p`,{className:`text-sm sm:text-base lg:text-lg text-slate-400 leading-8`,children:e.content_secondary})]}),(0,P.jsxs)(`div`,{className:`grid sm:grid-cols-2 gap-4 mt-10`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsx)(s,{className:`
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                `}),(0,P.jsx)(`span`,{children:`Full Stack Development`})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsx)(d,{className:`
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                `}),(0,P.jsx)(`span`,{children:`Machine Learning`})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsx)(o,{className:`
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                `}),(0,P.jsx)(`span`,{children:`Computer Science`})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,P.jsx)(i,{className:`
                                    text-lg
                                    md:text-xl
                                    text-blue-400
                                `}),(0,P.jsx)(`span`,{children:`Lusaka, Zambia`})]})]}),(0,P.jsxs)(`div`,{className:`grid grid-cols-2 gap-6 mt-12`,children:[(0,P.jsxs)(`div`,{className:`bg-slate-800 rounded-2xl p-6`,children:[(0,P.jsx)(`h4`,{className:`text-sm sm:text-base lg:text-lg text-blue-400 leading-7 uppercase`,children:`Focus`}),(0,P.jsx)(`p`,{className:`mt-2 font-semibold`,children:`Full Stack Development`})]}),(0,P.jsxs)(`div`,{className:`bg-slate-800 rounded-2xl p-6`,children:[(0,P.jsx)(`h4`,{className:`text-sm sm:text-base lg:text-lg text-blue-400 leading-7 uppercase`,children:`Interests`}),(0,P.jsx)(`p`,{className:`mt-2 font-semibold`,children:`AI & Cloud Computing`})]})]})]})]})]}):(0,P.jsx)(`div`,{children:`About information not found.`})}function ue(){let[e,t]=(0,N.useState)({}),[n,r]=(0,N.useState)(!0);return(0,N.useEffect)(()=>{async function e(){let{data:e,error:n}=await y.from(`skills`).select(`*`).order(`category`).order(`name`);if(n){console.error(n),r(!1);return}let i=e.reduce((e,t)=>(e[t.category]||(e[t.category]=[]),e[t.category].push(t),e),{});t(i),r(!1)}e()},[]),{skills:e,loading:n}}function de(){let{skills:e,loading:t}=ue();if(t)return(0,P.jsx)(x,{});let n=Object.entries(e);return(0,P.jsxs)(`section`,{id:`skills`,className:`
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
                overflow-hidden
            `,children:[(0,P.jsx)(w,{title:`Skills`,subtitle:`Technologies and tools I use to create modern software solutions.`}),(0,P.jsx)(D,{modules:[A,O,j],navigation:{nextEl:`.project-next`,prevEl:`.project-prev`},pagination:{clickable:!0},spaceBetween:20,breakpoints:{640:{slidesPerView:2},768:{slidesPerView:2},1024:{slidesPerView:3.5}},loop:!0,speed:3e3,autoplay:{delay:0,disableOnInteraction:!1,pauseOnMouseEnter:!0},children:n.map(([e,t])=>(0,P.jsx)(E,{children:(0,P.jsx)(fe,{category:e,items:t})},`slide-${e}`))})]})}function fe({category:e,items:t}){let n=[...t,...t];return(0,P.jsxs)(b.div,{whileHover:{y:-8},className:`
                w-[280px]
                md:w-[320px]
                shrink-0

                bg-slate-800/70
                backdrop-blur-xl

                border
                border-slate-700

                rounded-3xl
                p-6

                shadow-xl

                hover:border-blue-500

                transition-colors
            `,children:[(0,P.jsx)(`h3`,{className:`
                    text-xl
                    font-bold
                    capitalize
                    mb-6
                    text-blue-400
                `,children:e}),(0,P.jsxs)(`div`,{className:`
                    relative
                    h-[300px]
                    overflow-hidden
                `,children:[(0,P.jsx)(`div`,{className:`
                        absolute
                        top-0
                        left-0
                        right-0
                        h-12
                        bg-gradient-to-b
                        from-slate-800
                        to-transparent
                        z-10
                        pointer-events-none
                    `}),(0,P.jsx)(`div`,{className:`
                        absolute
                        bottom-0
                        left-0
                        right-0
                        h-12
                        bg-gradient-to-t
                        from-slate-800
                        to-transparent
                        z-10
                        pointer-events-none
                    `}),(0,P.jsx)(b.div,{className:`space-y-4`,animate:{y:[`0%`,`-50%`]},transition:{duration:12,ease:`linear`,repeat:1/0},children:n.map((e,t)=>{let n=k[e.icon];return(0,P.jsxs)(b.div,{whileHover:{scale:1.03},className:`
                                    flex
                                    items-center
                                    gap-4

                                    bg-slate-700/60

                                    rounded-xl

                                    px-4
                                    py-3

                                    cursor-default
                                `,children:[n&&(0,P.jsx)(n,{className:`
                                            text-xl
                                            md:text-2xl
                                            text-blue-400
                                            shrink-0
                                        `}),(0,P.jsx)(`span`,{className:`
                                        font-medium
                                        text-sm
                                        sm:text-base
                                        text-slate-300
                                    `,children:e.name})]},`${e.id}-${t}`)})})]})]})}function pe(e){return c({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z`},child:[]}]})(e)}function me(){let[e,t]=(0,N.useState)([]),[n,r]=(0,N.useState)(!0),[i,a]=(0,N.useState)(null);return(0,N.useEffect)(()=>{async function e(){r(!0);let{data:e,error:n}=await y.from(`projects`).select(`
                    *,
                    project_technologies(
                        technologies(
                            id,
                            name,
                            icon
                        )
                    )
                `).eq(`published`,!0).eq(`featured`,!0).order(`sort_order`);n?(console.error(`Failed to load featured projects:`,n),a(n),t([])):t(e??[]),r(!1)}e()},[]),{projects:e,loading:n,error:i}}function he(){let{projects:e,loading:t,error:r}=me();return t?(0,P.jsx)(`div`,{className:`py-40 text-center`,children:`Loading projects...`}):r?(0,P.jsx)(`div`,{children:`Failed to load profile.`}):(0,P.jsxs)(`section`,{id:`projects`,className:`
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
            `,children:[(0,P.jsx)(w,{title:`Projects`,subtitle:`Some of the applications and systems I have designed and developed.`}),(0,P.jsx)(b.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:`
                    mb-10
                    text-slate-400
                `,children:(0,P.jsxs)(`div`,{className:`flex justify-between text-white`,children:[(0,P.jsx)(`span`,{className:`text-sm sm:text-base lg:text-lg text-blue-400 font-bold text-xl`,children:e.length}),(0,P.jsx)(n,{to:`/projects`,className:`
                        inline-flex
                        items-center
                        bg-blue-600
                        hover:bg-blue-700
                        px-5
                        py-3
                        rounded-xl
                        transition
                        text-sm sm:text-base lg:text-lg text-white
                    `,children:(0,P.jsx)(pe,{})})]})}),(0,P.jsxs)(`div`,{className:`relative`,children:[(0,P.jsx)(`button`,{className:`
                project-prev 
                absolute
                top-50 
                -left-8 
                top-1/2 
                -translate-y-1/2 
                z-20 
                w-12 
                h-12 
                rounded-full 
                bg-slate-900/80 
                backdrop-blur 
                border 
                border-slate-700 
                flex items-center 
                justify-center 
                hover:bg-blue-600 
                transition`,children:(0,P.jsx)(h,{})}),(0,P.jsx)(`button`,{className:`
                project-next 
                absolute
                top-50 
                -right-8 
                top-1/2 
                -translate-y-1/2 
                z-20 
                w-12 
                h-12 
                rounded-full 
                bg-slate-900/80 
                backdrop-blur 
                border 
                border-slate-700 
                flex items-center 
                justify-center 
                hover:bg-blue-600 
                transition`,children:(0,P.jsx)(_,{})})]}),(0,P.jsx)(`div`,{className:`
            
            `,children:(0,P.jsx)(D,{modules:[A,O,j],navigation:{nextEl:`.project-next`,prevEl:`.project-prev`},pagination:{clickable:!0},spaceBetween:15,breakpoints:{640:{slidesPerView:1},768:{slidesPerView:1},1024:{slidesPerView:3}},loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},children:e.map(e=>(0,P.jsx)(E,{children:(0,P.jsx)(T,{project:e})},e.id))})})]})}var W=class{constructor(e=0,t=`Network Error`){this.status=e,this.text=t}},G={origin:`https://api.emailjs.com`,blockHeadless:!1,storageProvider:(()=>{if(!(typeof localStorage>`u`))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},K=e=>e?typeof e==`string`?{publicKey:e}:e.toString()===`[object Object]`?e:{}:{},ge=(e,t=`https://api.emailjs.com`)=>{if(!e)return;let n=K(e);G.publicKey=n.publicKey,G.blockHeadless=n.blockHeadless,G.storageProvider=n.storageProvider,G.blockList=n.blockList,G.limitRate=n.limitRate,G.origin=n.origin||t},q=async(e,t,n={})=>{let r=await fetch(G.origin+e,{method:`POST`,headers:n,body:t}),i=await r.text(),a=new W(r.status,i);if(r.ok)return a;throw a},J=(e,t,n)=>{if(!e||typeof e!=`string`)throw`The public key is required. Visit https://dashboard.emailjs.com/admin/account`;if(!t||typeof t!=`string`)throw`The service ID is required. Visit https://dashboard.emailjs.com/admin`;if(!n||typeof n!=`string`)throw`The template ID is required. Visit https://dashboard.emailjs.com/admin/templates`},_e=e=>{if(e&&e.toString()!==`[object Object]`)throw`The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/`},Y=e=>e.webdriver||!e.languages||e.languages.length===0,X=()=>new W(451,`Unavailable For Headless Browser`),ve=(e,t)=>{if(!Array.isArray(e))throw`The BlockList list has to be an array`;if(typeof t!=`string`)throw`The BlockList watchVariable has to be a string`},ye=e=>!e.list?.length||!e.watchVariable,be=(e,t)=>e instanceof FormData?e.get(t):e[t],Z=(e,t)=>{if(ye(e))return!1;ve(e.list,e.watchVariable);let n=be(t,e.watchVariable);return typeof n==`string`&&e.list.includes(n)},Q=()=>new W(403,`Forbidden`),xe=(e,t)=>{if(typeof e!=`number`||e<0)throw`The LimitRate throttle has to be a positive number`;if(t&&typeof t!=`string`)throw`The LimitRate ID has to be a non-empty string`},Se=async(e,t,n)=>{let r=Number(await n.get(e)||0);return t-Date.now()+r},$=async(e,t,n)=>{if(!t.throttle||!n)return!1;xe(t.throttle,t.id);let r=t.id||e;return await Se(r,t.throttle,n)>0||(await n.set(r,Date.now().toString()),!1)},Ce=()=>new W(429,`Too Many Requests`),we=async(e,t,n,r)=>{let i=K(r),a=i.publicKey||G.publicKey,o=i.blockHeadless||G.blockHeadless,s=i.storageProvider||G.storageProvider,c={...G.blockList,...i.blockList},l={...G.limitRate,...i.limitRate};return o&&Y(navigator)?Promise.reject(X()):(J(a,e,t),_e(n),n&&Z(c,n)?Promise.reject(Q()):await $(location.pathname,l,s)?Promise.reject(Ce()):q(`/api/v1.0/email/send`,JSON.stringify({lib_version:`4.4.1`,user_id:a,service_id:e,template_id:t,template_params:n}),{"Content-type":`application/json`}))},Te=e=>{if(!e||e.nodeName!==`FORM`)throw`The 3rd parameter is expected to be the HTML form element or the style selector of the form`},Ee=e=>typeof e==`string`?document.querySelector(e):e,De={init:ge,send:we,sendForm:async(e,t,n,r)=>{let i=K(r),a=i.publicKey||G.publicKey,o=i.blockHeadless||G.blockHeadless,s=G.storageProvider||i.storageProvider,c={...G.blockList,...i.blockList},l={...G.limitRate,...i.limitRate};if(o&&Y(navigator))return Promise.reject(X());let u=Ee(n);J(a,e,t),Te(u);let d=new FormData(u);return Z(c,d)?Promise.reject(Q()):await $(location.pathname,l,s)?Promise.reject(Ce()):(d.append(`lib_version`,`4.4.1`),d.append(`service_id`,e),d.append(`template_id`,t),d.append(`user_id`,a),q(`/api/v1.0/email/send-form`,d))},EmailJSResponseStatus:W};function Oe(){let{profile:e,loading:t,error:n}=U(),[r,a]=(0,N.useState)(!1),o=(0,N.useRef)();return t?(0,P.jsx)(`div`,{children:`Loading.....`}):n?(0,P.jsx)(`div`,{children:`Failed to load contact.`}):(0,P.jsxs)(`section`,{id:`contact`,className:`
                py-16 md:py-24
                px-6
                max-w-7xl
                mx-auto
            `,children:[(0,P.jsx)(w,{title:`Get In Touch`,subtitle:`Let's build something amazing together.`}),(0,P.jsxs)(`div`,{className:`
                    grid
                    lg:grid-cols-2
                    gap-12
                    mt-8 md:mt-12
                `,children:[(0,P.jsxs)(b.div,{initial:{opacity:0,x:-50},whileInView:{opacity:1,x:0},viewport:{once:!0},className:`
                        bg-slate-800/60
                        backdrop-blur-xl
                        border
                        border-slate-700
                        rounded-3xl
                        p-8
                    `,children:[(0,P.jsx)(`h3`,{className:`text-2xl md:text-3xl font-bold mb-6`,children:`Let's Talk`}),(0,P.jsx)(`p`,{className:`text-sm sm:text-base lg:text-lg text-slate-400 leading-8 mb-8`,children:`I'm always interested in discussing software development, new ideas, and opportunities to create impactful solutions.`}),(0,P.jsxs)(`div`,{className:`space-y-6`,children:[(0,P.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,P.jsx)(i,{className:`text-sm sm:text-base lg:text-lg text-blue-400`}),(0,P.jsx)(`span`,{children:e?.location})]}),(0,P.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,P.jsx)(m,{className:`text-sm sm:text-base lg:text-lg text-blue-400`}),(0,P.jsx)(`a`,{href:`mailto:${e.email}`,children:e.email})]})]}),(0,P.jsxs)(`div`,{className:`flex gap-5 mt-10`,children:[(0,P.jsx)(`a`,{href:e?.github_url,children:(0,P.jsx)(u,{size:22,className:`hover:text-blue-400 transition`})}),(0,P.jsx)(`a`,{href:e?.linkedin_url,children:(0,P.jsx)(l,{size:22,className:`hover:text-blue-400 transition`})})]})]}),(0,P.jsxs)(b.form,{ref:o,onSubmit:async e=>{e.preventDefault(),a(!0);try{await De.sendForm(`service_w9wvqeu`,`template_8hh1ox4`,o.current,`cR89bmsQIpAzVntYJ`),alert(`Message sent successfully`),o.current.reset()}catch(e){alert(`Message not sent`),console.error(e)}finally{a(!1)}},initial:{opacity:0,x:50},whileInView:{opacity:1,x:0},viewport:{once:!0},className:`
                        bg-slate-800/60
                        backdrop-blur-xl
                        border
                        border-slate-700
                        rounded-3xl
                        p-8
                        space-y-6
                    `,children:[(0,P.jsx)(`input`,{type:`email`,name:`user_email`,placeholder:`Email Address`,required:!0,className:`
                            w-full
                            border
                            border-white
                            rounded-xl
                            p-4
                            outline-none
                            focus:border-blue-500
                            transition
                        `}),(0,P.jsx)(`textarea`,{rows:`6`,name:`message`,placeholder:`Your Message`,required:!0,className:`
                            w-full
                            border
                            border-slate-700
                            rounded-xl
                            p-4
                            outline-none
                            focus:border-blue-500
                            transition
                        `}),(0,P.jsx)(`button`,{type:`submit`,disabled:r,className:`
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            py-4
                            rounded-xl
                            font-semibold
                            transition
                            hover:scale-[1.02]
                        `,children:r?`Sending...`:`Send Message`})]})]})]})}function ke(){return(0,P.jsxs)(b.footer,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},className:`
                relative
                mt-20
                border-t
                border-slate-800
                overflow-hidden
            `,children:[(0,P.jsx)(`div`,{className:`
                    absolute
                    left-1/2
                    top-0
                    -translate-x-1/2
                    w-96
                    h-40
                    bg-blue-600
                    opacity-20
                    blur-[100px]
                `}),(0,P.jsxs)(`div`,{className:`
                    relative
                    max-w-7xl
                    mx-auto
                    px-6
                    py-10
                    flex
                    flex-col
                    items-center
                    gap-6
                `,children:[(0,P.jsx)(n,{to:`/admin/login`,className:`
                        text-2xl
                        font-bold
                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        bg-clip-text
                        text-transparent
                    `,children:`Taonga Chiwowa`}),(0,P.jsxs)(`div`,{className:`
                        flex
                        flex-wrap
                        justify-center
                        gap-6
                        text-sm sm:text-base lg:text-lg text-slate-400
                    `,children:[(0,P.jsx)(`a`,{href:`#about`,className:`hover:text-blue-400 transition`,children:`About`}),(0,P.jsx)(`a`,{href:`#skills`,className:`hover:text-blue-400 transition`,children:`Skills`}),(0,P.jsx)(`a`,{href:`#projects`,className:`hover:text-blue-400 transition`,children:`Projects`}),(0,P.jsx)(`a`,{href:`#contact`,className:`hover:text-blue-400 transition`,children:`Contact`})]}),(0,P.jsxs)(`div`,{className:`flex gap-6`,children:[(0,P.jsx)(`a`,{href:`#`,target:`_blank`,rel:`noreferrer`,children:(0,P.jsx)(u,{size:24,className:`
                                hover:text-blue-400
                                transition
                            `})}),(0,P.jsx)(`a`,{href:`#`,target:`_blank`,rel:`noreferrer`,children:(0,P.jsx)(l,{size:24,className:`
                                hover:text-blue-400
                                transition
                            `})})]}),(0,P.jsxs)(`p`,{className:`text-slate-500 text-sm`,children:[`© `,new Date().getFullYear(),` Taonga Chiwowa. All rights reserved.`]})]})]})}function Ae(){let[e,t]=(0,N.useState)(!1);return(0,N.useEffect)(()=>{let e=()=>t(window.scrollY>300);return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]),e?(0,P.jsx)(`button`,{onClick:()=>window.scrollTo({top:0,behavior:`smooth`}),className:`fixed bottom-6 right-4 bg-blue-600 hover:bg-blue-700 p-4 rounded-full z-30 shadow-lg transition`,children:(0,P.jsx)(g,{})}):null}function je(){return(0,P.jsxs)(M,{children:[(0,P.jsx)(F,{}),(0,P.jsx)(se,{}),(0,P.jsx)(le,{}),(0,P.jsx)(de,{}),(0,P.jsx)(he,{}),(0,P.jsx)(Oe,{}),(0,P.jsx)(ke,{}),(0,P.jsx)(Ae,{})]})}export{je as default};