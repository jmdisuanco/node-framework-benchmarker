const {spawn} = require('child_process')
const fs = require('fs')
const autocannon = require('autocannon')


let framework= fs.readdirSync('./frameworks')
let index = 0
let max =Object.keys(framework).length
let report = []
console.log(max)
let start = (f)=>{

    let child = spawn('node', [`./frameworks/${f}`])

    child.stdout.on('data',  (data) => {
    console.log(`starting ${f}`)
     benchmark(child,f)
    });
    
    child.stderr.on('data',  (data) =>{
        console.log("Error");
        console.log('test: ' + data);
    });
    
    child.on('close',  (code) => {
        console.log("closing ", f);
        if(index < max) { 
            start(framework[index])
        }else{
            console.log(report)
            fs.writeFileSync('./report.json',JSON.stringify(report,null,2))
        }
    })
}


start(framework[index])

let benchmark = (child,f)=> {
    console.log(child.pid)
autocannon({
    title:f,
  url: 'http://localhost:9090',
  connections: 10, //default
  pipelining: 1, // default
  duration: 10 // default
}, endBechmark(child))
}

let endBechmark =(child)=> (err, result)=>{
    index += 1
    report.push(result)
    child.kill('SIGINT')
}