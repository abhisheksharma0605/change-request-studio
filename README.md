# Change Request Studio

**Project by Abhishek Sharma** · Interactive business analysis project

[Open live demo](https://abhisheksharma0605.github.io/change-request-studio/) · [Test evidence](evidence/test-results.json)

A change can look complete while a critical requirement is untested. This workspace connects a business problem to acceptance criteria, UAT evidence and a readiness decision.

The repair-booking example contains 3 requirements and 4 illustrative test results. The app does not implement appointment booking or execute tests against another system.

## Rules and decisions

| Rule | Behavior |
|---|---|
| Traceability | Each test links to an existing requirement |
| Evidence | Recorded outcomes need actual behavior and a tester |
| Coverage | Requirements with tests / all requirements |
| Readiness | Complete brief, full coverage, at least one requirement/test and all tests passed |
| Brief changes | Reset all test results |
| Requirement changes | Reset linked test results |
| Test-definition changes | Reset that test result |

Ready means **ready for stakeholder review**, not production approval. This demonstrates scope control, acceptance criteria, UAT planning and requirements traceability. There is no authentication, multi-user collaboration or versioned audit trail.

## Technology

HTML, CSS and JavaScript. Runs in the browser with local storage. Hosted on GitHub Pages. Automated checks use Node.js.

## Provenance

Personal portfolio project developed with AI coding assistance. All sample data is synthetic. No employer code, proprietary FIS materials or client documents are included. This prototype does not claim production use or measured business savings.
