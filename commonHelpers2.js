import"./assets/styles-33ffc167.js";import{i as o}from"./assets/vendor-d07556bb.js";const a=document.querySelector("form");a.addEventListener("submit",function(t){t.preventDefault();const i=t.target.elements.delay,n=t.target.elements.state,s=parseInt(i.value),r=n.value;new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"?e(s):m(s)},s)}).then(e=>{o.success({title:"✅",message:`Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{o.error({title:"❌",message:`Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map
