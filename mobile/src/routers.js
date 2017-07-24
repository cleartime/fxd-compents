import FxdUi from '../../build/';
const components =  Object.keys(FxdUi).filter((t,i)=>i>1)

const route =  [{
    path: '/',
    component: require('./views/home'),
}
]

components.forEach(i=>{
    let componentName = i.replace(/^\S/, t=>t.toLowerCase())
    route.push({
        path:`/${i}`,
        component:require(`./components/${componentName}`),
    })
})

export default {
  base: __dirname,
  routes: route,
};
