import{c as e,f as t,n,o as r,r as i,t as a}from"./index-DN3tUcW2.js";import{k as o}from"./fa-C6WVuVpN.js";import{t as s}from"./useAuth-BZqG9Av_.js";import{n as c,t as l}from"./Loader-7Exxj53F.js";var u=t(e(),1),d=a();function f(){let{user:e,loading:t,login:a}=s(),f=r(),[p,m]=(0,u.useState)(``),[h,g]=(0,u.useState)(``),[_,v]=(0,u.useState)(``),[y,b]=(0,u.useState)(!1);if(t)return(0,d.jsx)(l,{});if(e)return(0,d.jsx)(i,{to:`/admin`,replace:!0});async function x(e){e.preventDefault(),v(``),b(!0);let{error:t}=await a(p,h);if(t){v(t.message),b(!1);return}f(`/admin`)}return(0,d.jsx)(`main`,{className:`min-h-screen bg-slate-950 flex items-center justify-center px-6`,children:(0,d.jsxs)(c.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},className:`
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                    shadow-2xl
                `,children:[(0,d.jsxs)(`div`,{className:`text-center mb-8`,children:[(0,d.jsx)(`div`,{className:`
                        mx-auto
                        w-14
                        h-14
                        rounded-2xl
                        bg-blue-600/20
                        flex
                        items-center
                        justify-center
                        text-blue-400
                        mb-5
                    `,children:(0,d.jsx)(o,{size:22})}),(0,d.jsx)(`h1`,{className:`text-3xl font-bold text-white`,children:`Admin Login`}),(0,d.jsx)(`p`,{className:`text-slate-400 mt-2`,children:`Sign in to manage your portfolio.`})]}),_&&(0,d.jsx)(`div`,{className:`
                        bg-red-500/10
                        border
                        border-red-500/30
                        text-red-400
                        rounded-xl
                        p-4
                        mb-6
                        text-sm
                    `,children:_}),(0,d.jsxs)(`form`,{onSubmit:x,className:`space-y-5`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`label`,{className:`block text-sm text-slate-300 mb-2`,children:`Email`}),(0,d.jsx)(`input`,{type:`email`,value:p,onChange:e=>m(e.target.value),required:!0,className:`
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            `,placeholder:`admin@example.com`})]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`label`,{className:`block text-sm text-slate-300 mb-2`,children:`Password`}),(0,d.jsx)(`input`,{type:`password`,value:h,onChange:e=>g(e.target.value),required:!0,className:`
                                w-full
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            `,placeholder:`••••••••`})]}),(0,d.jsx)(`button`,{type:`submit`,disabled:y,className:`
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            text-white
                            font-semibold
                            py-3
                            rounded-xl
                            transition
                        `,children:y?`Signing in...`:`Sign In`})]}),(0,d.jsx)(n,{to:`/`,className:`
                                    inline-flex
                                    items-center
                                    text-blue-400
                                    hover:text-blue-300
                                    transition
                                    mt-2
                                `,children:`Back to site`})]})})}export{f as default};