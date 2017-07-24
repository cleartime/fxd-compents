import FxdUi from '../../build/';
const components =  Object.keys(FxdUi).filter((t,i)=>i>1)

const route =  [{
    path: '/',
    component: require(`./md/Welcome.md`),
    }
]

components.forEach(i=>{
    route.push({
        path:`/${i}`,
        component:require(`./md/${i}.md`),
    })
})

export default {
  base: __dirname,
  routes:route,
};
