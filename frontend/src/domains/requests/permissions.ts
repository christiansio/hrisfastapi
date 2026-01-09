import type { User } from '@/auth/AuthContext'

/**
 * PERMISSION RULE: Only users with the 'approver' or 'admin' role 
 * should see the Approvals section.
 */
export const canViewApprovals = (user: User) => {
    return user.role === "approver" || user.role === "admin"
};