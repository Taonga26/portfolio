import{a as e,c as t,f as n,i as r,n as i,o as a,t as o}from"./index-BR-L_-sg.js";import{B as s,N as c,R as l,V as u,W as d,b as f,c as p,h as m,i as h,z as g}from"./fa-BlK4pbMx.js";import{t as _}from"./useAuth-Czo0iYGW.js";var v=n(t(),1),y=o();function b(){let[t,n]=(0,v.useState)(!1),{user:o,logout:b}=_(),x=e(),S=a(),C=[{name:`Dashboard`,path:`/admin`,icon:g},{name:`Projects`,path:`/admin/projects`,icon:c},{name:`Skills`,path:`/admin/skills`,icon:u},{name:`Technologies`,path:`/admin/technologies`,icon:p},{name:`Resume`,path:`/admin/resume`,icon:f},{name:`Personal Info`,path:`/admin/profile`,icon:d}];async function w(){await b(),S(`/admin/login`)}function T(e){return e===`/admin`?x.pathname===`/admin`:x.pathname.startsWith(e)}return(0,y.jsxs)(`div`,{className:`min-h-screen bg-slate-950 text-white`,children:[(0,y.jsxs)(`header`,{className:`
                    lg:hidden
                    fixed
                    top-0
                    left-0
                    right-0
                    h-16
                    bg-slate-900
                    border-b
                    border-slate-800
                    z-40
                    flex
                    items-center
                    justify-between
                    px-5
                `,children:[(0,y.jsx)(`button`,{onClick:()=>n(!0),className:`
                        text-slate-300
                        hover:text-white
                    `,children:(0,y.jsx)(h,{size:22})}),(0,y.jsx)(`span`,{className:`font-bold`,children:`Portfolio Admin`}),(0,y.jsx)(`div`,{className:`w-6`})]}),t&&(0,y.jsx)(`div`,{onClick:()=>n(!1),className:`
                        fixed
                        inset-0
                        bg-black/60
                        z-40
                        lg:hidden
                    `}),(0,y.jsxs)(`aside`,{className:`
                    fixed
                    top-0
                    left-0
                    bottom-0
                    w-72
                    bg-slate-900
                    border-r
                    border-slate-800
                    z-50
                    transform
                    transition-transform
                    duration-300

                    lg:translate-x-0

                    ${t?`translate-x-0`:`-translate-x-full`}
                `,children:[(0,y.jsxs)(`div`,{className:`
                        h-20
                        flex
                        items-center
                        justify-between
                        px-6
                        border-b
                        border-slate-800
                    `,children:[(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`h1`,{className:`font-bold text-lg`,children:`Portfolio Admin`}),(0,y.jsx)(`p`,{className:`text-xs text-slate-500`,children:`Management Panel`})]}),(0,y.jsx)(`button`,{onClick:()=>n(!1),className:`
                            lg:hidden
                            text-slate-400
                            hover:text-white
                        `,children:(0,y.jsx)(s,{size:20})})]}),(0,y.jsx)(`nav`,{className:`p-4 space-y-2`,children:C.map(e=>{let t=e.icon;return(0,y.jsxs)(i,{to:e.path,onClick:()=>n(!1),className:`
                                    flex
                                    items-center
                                    gap-4
                                    px-4
                                    py-3
                                    rounded-xl
                                    transition

                                    ${T(e.path)?`bg-blue-600 text-white`:`text-slate-400 hover:bg-slate-800 hover:text-white`}
                                `,children:[(0,y.jsx)(t,{}),(0,y.jsx)(`span`,{className:`font-medium`,children:e.name})]},e.path)})}),(0,y.jsxs)(`div`,{className:`
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-4
                        border-t
                        border-slate-800
                    `,children:[(0,y.jsxs)(`div`,{className:`
                            px-4
                            py-3
                            mb-3
                            bg-slate-800/60
                            rounded-xl
                        `,children:[(0,y.jsx)(`p`,{className:`text-xs text-slate-500`,children:`Signed in as`}),(0,y.jsx)(`p`,{className:`
                                text-sm
                                text-slate-300
                                truncate
                                mt-1
                            `,children:o?.email})]}),(0,y.jsxs)(i,{to:`/`,target:`_blank`,className:`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-slate-400
                            hover:bg-slate-800
                            hover:text-white
                            transition
                        `,children:[(0,y.jsx)(m,{}),(0,y.jsx)(`span`,{children:`View Website`})]}),(0,y.jsxs)(`button`,{onClick:w,className:`
                            w-full
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            text-red-400
                            hover:bg-red-500/10
                            transition
                        `,children:[(0,y.jsx)(l,{}),(0,y.jsx)(`span`,{children:`Sign Out`})]})]})]}),(0,y.jsx)(`main`,{className:`
                    lg:ml-72
                    min-h-screen
                    pt-16
                    lg:pt-0
                `,children:(0,y.jsx)(`div`,{className:`p-6 md:p-10`,children:(0,y.jsx)(r,{})})})]})}export{b as default};