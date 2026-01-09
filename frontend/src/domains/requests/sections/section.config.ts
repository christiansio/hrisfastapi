// src/domains/requests/sections/sections.config.ts

/** * DOMAIN-DRIVEN DESIGN: Configuration lives within the domain (requests), 
 * not the page, ensuring that business logic ownership is centralized.
 */
import type { RequestsSections } from "../types";

/** * SINGLE SOURCE OF TRUTH: 
 * This array controls the order, naming, and keys for all tab-driven sections.
 * * Benefits:
 * - Easy reordering: Just move the objects in this array.
 * - Future-Safe: Can be easily filtered based on user permissions or roles.
 * - Extensible: Add 'badge' counts or 'icon' properties here without refactoring UI.
 */
export const REQUESTS_SECTIONS: {
    key: RequestsSections; // Key must match the valid types defined in domains/requests/types.ts
    label: string;       // The human-readable string displayed in the RequestsHeader
}[] = [
        {
            key: "approvals",
            label: "Approvals"
        },
        {
            key: "assign-leave",
            label: "Assign Leave"
        },
        {
            key: "my-requests",
            label: "My Requests"
        },
        {
            key: "apply",
            label: "Apply"
        },
    ];