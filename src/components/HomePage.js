import React, { useContext } from 'react';
import { RecordsContext } from '../App';
import GuardianView from './GuardianView';
import OrganizerView from './OrganizerView';
import SellerView from './SellerView';
import FundraisersPage from './FundraisersPage';

const HomePage = () => {
    const { recordsState: { fundraiserToDisplay: { role } } } = useContext(RecordsContext);
    return (
        <>
            {role.role && <SellerView sellerIDs={role.id}/>}
            {role === "guardian" && <GuardianView />}
            {role === "organizer" && <OrganizerView />}
            {role === "provider" && <FundraisersPage />}
        </>
    )
};

export default HomePage;