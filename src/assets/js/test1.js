let a=[]
if(Array.isArray(a)){
  a={}
}

Promise.resolve().then(() => a=null)
