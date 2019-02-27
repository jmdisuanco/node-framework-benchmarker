"use strict";
const config = require('./config')
const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
}
const {
    spawn
} = require("child_process");
const fs = require("fs");
const autocannon = require("autocannon");
const os = require("os");
let cpu = os.cpus();
let env = {
    os: os.arch(),
    model: cpu[0].model,
    speed: cpu[0].speed,
    cores: Object.keys(cpu).length,
    mem: os.totalmem()
};
let summary = []
let framework = fs.readdirSync("./frameworks");
let index = 0;
let max = Object.keys(framework).length;
let frameworks = [];
console.log(`${max} frameworks to benchmark`);
let start = f => {
    let child = spawn("node", [`./frameworks/${f}`]);

    child.stdout.on("data", data => {
        console.log(`starting ${f}`);
        benchmark(child, f);
    });

    child.stderr.on("data", data => {
        console.log("Error");
        console.log("test: " + data);
    });

    child.on("close", code => {
        console.log("closing ", f);
        if (index < max) {
            start(framework[index]);
        } else {
            let report = {
                env,
                frameworks
            };
            fs.writeFileSync("./report.json", JSON.stringify(report, null, 2));
            console.log("result has been save at report.json");
            summaryReport(report)
        }
    });
};

start(framework[index]);

let benchmark = (child, f) => {
    console.log(`${index + 1} of ${max}`);
    autocannon({
            title: f.split(".")[0],
            url: `${config.url}:${config.port}`,
            connections: config.connections,
            pipelining: config.pipelining,
            duration: config.duration
        },
        endBechmark(child)
    );
};

let endBechmark = child => (err, result) => {
    index += 1;
    frameworks.push(result);
    summary.push({
        title: result.title,
        request: result.requests.average
    })
    child.kill("SIGINT");
};


let summaryReport = (report) => {
    let {
        env,
        frameworks
    } = report

    let osMD = `
        | Model | Cores | Ram |
        |-------|-------|-----|
        |${env.model} | ${env.cores} | ${env.mem}|
    
    `

    let summaryMD = `
    | Framework | Req/Sec |
    |-----------|---------|\n`

    summary.map(f => {
        summaryMD += `|${f.title}|${f.request}| \n`
    })
    console.log(osMD)
    console.log(summaryMD)
}