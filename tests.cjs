const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const B=require('./core.js');
let results=[];function test(name,fn){fn();results.push({test:name,result:'PASS'});}
test('Blank BA workspace is not ready',()=>assert.equal(B.metrics(B.blank()).ready,false));
test('Sample BA workspace is covered but not ready',()=>{const m=B.metrics(B.sample());assert.equal(m.coverage,100);assert.equal(m.passed,2);assert.equal(m.failed,1);assert.equal(m.pending,1);assert.equal(m.ready,false);});
test('All tests passing with complete scope is ready for review',()=>{const w=B.sample();w.tests.forEach(t=>t.status='passed');assert.equal(B.metrics(w).ready,true);});
test('An uncovered requirement blocks readiness',()=>{const w=B.sample();w.tests.forEach(t=>t.status='passed');w.requirements.push({...w.requirements[0],id:'REQ-04'});assert.equal(B.metrics(w).ready,false);assert.equal(B.metrics(w).coverage,75);});
test('Missing owner or blocked tests prevent readiness',()=>{const w=B.sample();w.tests.forEach(t=>t.status='passed');w.owner='';assert.equal(B.metrics(w).ready,false);w.owner='Owner';w.tests[0].status='blocked';assert.equal(B.metrics(w).ready,false);});
test('Workspace imports reject orphan test links',()=>{const w=B.sample();w.tests[0].req='REQ-99';assert.throws(()=>B.validate(w));});
test('Workspace imports reject result without recorded evidence',()=>{const w=B.sample();w.tests[0].actual='';assert.throws(()=>B.validate(w));});
test('Workspace imports preserve IDs and calculate next IDs',()=>{const w=B.validate(B.sample());assert.equal(w.nextReq,4);assert.equal(w.nextTest,5);});
test('Report includes scope, traceability and actual test evidence',()=>{const report=B.report(B.sample());assert.ok(report.includes('UAT-03'));assert.ok(report.includes('original booking was cancelled'));assert.ok(report.includes('Out of scope'));assert.ok(report.includes('not execute tests'));});
const summary={executedAt:new Date().toISOString(),testsPassed:results.length,results};fs.mkdirSync(path.join(__dirname,'evidence'),{recursive:true});fs.writeFileSync(path.join(__dirname,'evidence/test-results.json'),JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));
