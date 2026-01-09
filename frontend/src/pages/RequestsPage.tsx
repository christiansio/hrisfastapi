import React from 'react';
import { useState } from 'react';
import { 
    ApprovalsSection, 
    AssignLeaveSection, 
    MyRequestsSection, 
    ApplySection 
} from '@/domains/requests/sections';

 
import { useAuth } from '@/auth/AuthContext'


import { RequestsHeader } from '@/domains/requests/sections/RequestsHeader';
import type { RequestsSections } from '@/domains/requests/types';


/**
 * The main component for the Requests & Approvals page.
 * It provides a UI for users to view their own leave requests and for approvers to manage pending requests.
 *
 * @returns {JSX.Element} The rendered requests page component.
 */

const RequestsPage: React.FC = () => {
    const { user } = useAuth(); 

    const [ activeSection, setActiveSection ] = useState<RequestsSections>(
        user?.role === 'approver' || user?.role === 'admin' ? "approvals" : "my-requests");   
    
    const renderSection = () => {
        switch (activeSection) {
        case "approvals":
            return <ApprovalsSection />;
        case "assign-leave":
            return <AssignLeaveSection />;
        case "my-requests":
            return <MyRequestsSection />;
        case "apply":
            return <ApplySection />;
        default:
            return null;
        }

    }

    return (
        <>
            <RequestsHeader
                active={activeSection}
                onChange={setActiveSection}
                user={user}
            />

            {renderSection()}
            
        </>
    );
};

export default RequestsPage;