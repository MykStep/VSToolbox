Features:
  1. Scrap immoweb listings' information.
  2. Collect references.
  3. Calculates summary statistics.
  4. Create a copy/pastable summary of a valuation.

Release v0.1:
  1. Created settings foundation
  2. Added <additionalTools> settings
  
Release v0.2:
  1. Switched to Composition API, with possibility to use compononents
  2. Using Vite / Rolldown for bundling
  3. Added CSS to JS plugin for vite configuration

Refactor Plan:
  1. Shadow DOM [ V ]
  2. Pinia (State Management) [ V ]
  3. Service Layer [ V ]
  4. Better Component Structure

TODO for Better Component Structure:
  1. Delete deprecated folder (when ready)
  2. Install ESLint/Pettier
  3. Create factory.js (Service router)
  4. Complete App.vue refactor
  5. Nice to have: complete other TODOs scattered around the codebase (e.g, try/catch for _getTableData)