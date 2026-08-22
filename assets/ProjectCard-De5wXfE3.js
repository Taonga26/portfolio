import{n as e,t}from"./index-BR-L_-sg.js";import{n}from"./fa-BlK4pbMx.js";import{n as r}from"./Loader-D31zcNVD.js";import{n as i}from"./storage-Chfi_QH0.js";var a=t();function o({title:e,subtitle:t}){return(0,a.jsxs)(r.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.6},className:`text-center mb-16`,children:[(0,a.jsx)(`h2`,{className:`text-3xl md:text-4xl lg:text-5xl font-bold`,children:e}),t&&(0,a.jsx)(`p`,{className:`text-sm sm:text-base lg:text-lg text-slate-400 mt-4 max-w-xl mx-auto text-lg`,children:t})]})}function s({project:t}){return(0,a.jsx)(r.div,{whileHover:{y:-10},className:`
                h-full
                bg-slate-800/70
                backdrop-blur-xl
                border
                border-slate-700
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:border-blue-500
                transition
            `,children:(0,a.jsxs)(e,{to:`/project/${t.id}`,children:[(0,a.jsx)(`div`,{className:`overflow-hidden`,children:(0,a.jsx)(`img`,{src:i(t.cover_image),alt:t.title,className:`
                            w-full
                            h-56
                            object-cover
                            hover:scale-110
                            transition
                            duration-500
                        `,loading:`lazy`})}),(0,a.jsxs)(`div`,{className:`p-6`,children:[(0,a.jsx)(`h3`,{className:`
                            text-xl md:text-2xl
                            font-bold
                            mb-3
                        `,children:t.title}),(0,a.jsx)(`p`,{className:`
                            text-slate-400
                            text-sm md:text-base
                            leading-7
                            mb-6
                        `,children:t.short_description}),(0,a.jsx)(`div`,{className:`flex flex-wrap gap-2 mb-6`,children:t.project_technologies?.map(({technologies:e})=>(0,a.jsx)(`span`,{className:`
                                        text-sm
                                        bg-blue-600/20
                                        text-blue-400
                                        px-3
                                        py-1
                                        rounded-full
                                    `,children:e.name},e.id))}),(0,a.jsxs)(`span`,{className:`
                            inline-flex
                            items-center
                            bg-blue-600
                            hover:bg-blue-700
                            px-5
                            py-1
                            rounded-xl
                            transition
                            text-sm sm:text-base text-white
                            gap-2
                        `,children:[`View Details`,(0,a.jsx)(n,{})]})]})]})})}export{o as n,s as t};