import{c as e,f as t,n,t as r}from"./index-ChcaerZv.js";import{t as i}from"./fa-3CJALyHk.js";import{t as a}from"./supabase-DDu0klbY.js";import{n as o,t as s}from"./Loader-Byx4vKnm.js";import{n as c,t as l}from"./ProjectCard-Ml_K77M0.js";import{t as u}from"./PageTransition-BNcEJF4z.js";var d=t(e(),1);function f(){let[e,t]=(0,d.useState)([]),[n,r]=(0,d.useState)(!0);return(0,d.useEffect)(()=>{async function e(){let{data:e,error:n}=await a.from(`projects`).select(`
                    *,
                    project_technologies(
                        technologies(
                            id,
                            name,
                            icon
                        )
                    )
                    `).eq(`published`,!0).order(`sort_order`);n||t(e),r(!1)}e()},[]),{projects:e,loading:n}}var p=r();function m(){let{projects:e,loading:t}=f();return t?(0,p.jsx)(s,{}):(0,p.jsx)(u,{children:(0,p.jsxs)(`section`,{id:`projects`,className:`
                py-12 md:py-16
                px-6
                max-w-7xl
                mx-auto
            `,children:[(0,p.jsxs)(n,{to:`/`,className:`
                            inline-flex
                            items-center
                            gap-2
                            text-blue-400
                            hover:text-blue-300
                            transition
                        `,children:[(0,p.jsx)(i,{}),`Back`]}),(0,p.jsx)(c,{title:`Projects`,subtitle:`Some of the applications and systems I have designed and developed.`}),(0,p.jsxs)(o.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},className:`
                    mb-10
                    text-slate-400
                `,children:[(0,p.jsx)(`span`,{className:`text-sm sm:text-base lg:text-lg text-blue-400 font-bold text-xl`,children:e.length}),` `,`Projects Completed`]}),(0,p.jsx)(`div`,{className:`
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-8
                    lg:grid
                `,children:e.map((e,t)=>(0,p.jsx)(o.div,{initial:{opacity:0,y:50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5,delay:t*.1},children:(0,p.jsx)(l,{project:e},e.id)},e.id))})]})})}export{m as default};