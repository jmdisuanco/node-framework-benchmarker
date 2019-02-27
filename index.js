const {
    spawn
} = require('child_process')
const fs = require('fs')
const autocannon = require('autocannon')


let framework = fs.readdirSync('./frameworks')
let index = 0
let max = Object.keys(framework).length
let report = []
console.log(`${max} frameworks to benchmark`)
let start = (f) => {

    let child = spawn('node', [`./frameworks/${f}`])

    child.stdout.on('data', (data) => {
        console.log(`starting ${f}`)
        benchmark(child, f)
    });

    child.stderr.on('data', (data) => {
        console.log("Error");
        console.log('test: ' + data);
    });

    child.on('close', (code) => {
        console.log("closing ", f);
        if (index < max) {
            start(framework[index])
        } else {
            fs.writeFileSync('./report.json', JSON.stringify(report, null, 2))
            console.log('result has been save at report.json')
        }
    })
}


start(framework[index])

let benchmark = (child, f) => {
    console.log(`${index + 1} of ${max}`)
    autocannon({
        title: f,
        url: 'http://localhost:9090',
        connections: 100,
        pipelining: 10,
        duration: 5
    }, endBechmark(child))
}

let endBechmark = (child) => (err, result) => {
    index += 1
    report.push(result)
    child.kill('SIGINT')
}