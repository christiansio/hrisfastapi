/** * DOMAIN-LEVEL OWNERSHIP: 
 * This type is defined in the domain layer rather than the page layer. 
 * It serves as the "Source of Truth" for what constitutes a valid Request Section.
 */
export type RequestsSections =
  | "approvals"    // Used for Manager/Admin approval workflows
  | "assign-leave" // Used for Admin-side leave allocation
  | "my-requests"  // Used for the employee's personal history
  | "apply";       // Used for the request application form

/**
 * ARCHITECTURAL BENEFIT:
 * By defining this as a Union Type, TypeScript will provide:
 * 1. Autocomplete: When switching tabs in RequestsPage.tsx.
 * 2. Exhaustiveness Checking: Ensuring your 'switch' statement in the Page 
 * covers every possible section.
 * 3. Validation: The REQUEST_SECTIONS config is forced to stay in sync with 
 * these specific keys.
 */