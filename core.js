
(function(root){
'use strict';
function blank(){return {title:'Untitled change request',problem:'',owner:'',scope:'',outOfScope:'',requirements:[],tests:[],nextReq:1,nextTest:1};}
function sample(){return {title:'Let customers reschedule repair visits',problem:'Customers must call support to change a repair appointment. Agents re-enter the booking, and a cancelled slot can be lost before the replacement is confirmed.',owner:'Service operations',scope:'Customers can choose an available replacement slot at least 24 hours before their current visit. Keep the existing booking if the new slot cannot be reserved.',outOfScope:'Technician routing, refunds, changing the service address, and same-day exceptions.',
requirements:[
{id:'REQ-01',title:'Allow changes before the cutoff',priority:'Must',given:'a confirmed appointment at least 24 hours away',when:'the customer chooses an available replacement slot',then:'the new slot is reserved and the old slot is released only after confirmation'},
{id:'REQ-02',title:'Protect the original booking',priority:'Must',given:'another customer has just taken the selected replacement slot',when:'the customer submits the change',then:'show an availability message and keep the original appointment unchanged'},
{id:'REQ-03',title:'Show a clear confirmation',priority:'Should',given:'the replacement booking has been saved successfully',when:'the rescheduling completes',then:'show the new date and time with a confirmation reference'}],
tests:[
{id:'UAT-01',req:'REQ-01',title:'Reschedule 48 hours before the visit',steps:'Start with a confirmed visit 48 hours away. Select an available slot and confirm.',expected:'Replacement is confirmed before the original slot is released.',status:'passed',actual:'Illustrative sample: replacement confirmed and original released.',tester:'Sample reviewer'},
{id:'UAT-02',req:'REQ-01',title:'Check the exact 24-hour boundary',steps:'Use an appointment exactly 24 hours away and submit a valid replacement.',expected:'The change is allowed at exactly 24 hours.',status:'not-run',actual:'',tester:''},
{id:'UAT-03',req:'REQ-02',title:'Replacement slot taken during checkout',steps:'Make the selected slot unavailable before confirming the change.',expected:'Original appointment remains and an availability message appears.',status:'failed',actual:'Illustrative sample: original booking was cancelled before the replacement failed.',tester:'Sample reviewer'},
{id:'UAT-04',req:'REQ-03',title:'Verify the confirmation details',steps:'Complete a successful change and read the confirmation.',expected:'New date, time and reference are displayed.',status:'passed',actual:'Illustrative sample: all three confirmation fields appear.',tester:'Sample reviewer'}],nextReq:4,nextTest:5};}
function metrics(w){
 const covered=w.requirements.filter(r=>w.tests.some(t=>t.req===r.id)).length;
 const passed=w.tests.filter(t=>t.status==='passed').length,failed=w.tests.filter(t=>t.status==='failed').length,blocked=w.tests.filter(t=>t.status==='blocked').length;
 const pending=w.tests.filter(t=>t.status==='not-run').length,uncovered=w.requirements.length-covered;
 const missingBrief=!w.problem.trim()||!w.scope.trim()||!w.owner.trim();
 const ready=w.requirements.length>0&&w.tests.length>0&&!uncovered&&!failed&&!blocked&&!pending&&!missingBrief;
 return {covered,uncovered,passed,failed,blocked,pending,missingBrief,coverage:w.requirements.length?Math.round(covered/w.requirements.length*100):0,ready};
}
function validate(w){
 if(!w||typeof w!=='object'||['title','problem','owner','scope','outOfScope'].some(k=>typeof w[k]!=='string'||w[k].length>10000)||!Array.isArray(w.requirements)||!Array.isArray(w.tests)||w.requirements.length>100||w.tests.length>500)throw Error('Invalid workspace file.');
 const ids=new Set();
 for(const r of w.requirements){if(!r||['id','title','given','when','then'].some(k=>typeof r[k]!=='string'||!r[k].trim()||r[k].length>3000)||!/^REQ-\d+$/.test(r.id)||ids.has(r.id)||!['Must','Should','Could'].includes(r.priority))throw Error('Invalid or duplicate requirement.');ids.add(r.id);}
 const testIds=new Set();
 for(const t of w.tests){if(!t||['id','req','title','steps','expected','actual','tester'].some(k=>typeof t[k]!=='string'||t[k].length>5000)||!/^UAT-\d+$/.test(t.id)||testIds.has(t.id)||!ids.has(t.req)||!t.title.trim()||!t.steps.trim()||!t.expected.trim()||!['passed','failed','blocked','not-run'].includes(t.status))throw Error('Invalid test or requirement link.');if(t.status!=='not-run'&&(!t.actual.trim()||!t.tester.trim()))throw Error('Recorded results require actual evidence and a tester.');testIds.add(t.id);}
 w.nextReq=Math.max(0,...w.requirements.map(r=>Number(r.id.slice(4))))+1;w.nextTest=Math.max(0,...w.tests.map(t=>Number(t.id.slice(4))))+1;
 return w;
}
function report(w){const m=metrics(w);let out='# '+w.title+'\n\nProject by Abhishek Sharma\n\n## Business brief\n\nOwner: '+w.owner+'\n\nProblem: '+w.problem+'\n\nIn scope: '+w.scope+'\n\nOut of scope: '+w.outOfScope+'\n\n## Readiness snapshot\n\n'+(m.ready?'Ready for stakeholder review — not release approval.':'Not ready for stakeholder review.')+'\n\nCoverage: '+m.coverage+'%. Passed: '+m.passed+'. Failed: '+m.failed+'. Blocked: '+m.blocked+'. Not run: '+m.pending+'.\n\n';
 for(const r of w.requirements){out+='## '+r.id+' — '+r.title+' ['+r.priority+']\n\nGiven '+r.given+'\n\nWhen '+r.when+'\n\nThen '+r.then+'\n\n';const tests=w.tests.filter(t=>t.req===r.id);if(!tests.length)out+='No linked UAT test.\n\n';for(const t of tests)out+='### '+t.id+' — '+t.title+'\n\nStatus: '+t.status+'\n\nSteps: '+t.steps+'\n\nExpected: '+t.expected+'\n\nActual: '+(t.actual||'Not recorded')+'\n\nTester: '+(t.tester||'Not recorded')+'\n\n';}
 return out+'---\nThis report records the workspace entries. It does not execute tests against an external system or establish business approval. Sample results, when present, are illustrative.\n';}
const api={blank,sample,metrics,validate,report};if(typeof module!=='undefined')module.exports=api;root.ChangeCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
