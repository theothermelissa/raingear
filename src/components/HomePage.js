import React, { useContext } from 'react';
import { RecordsContext } from '../App';
import GuardianView from './GuardianView';
import OrganizerView from './OrganizerView';
import SellerView from './SellerView';
import ProviderView from './ProviderView';

const HomePage = () => {
    const { recordsState: { fundraiserToDisplay: { role, fundraisers } } } = useContext(RecordsContext);
    return (
        <>
            {role.role && <SellerView sellerIDs={role.id}/>}
            {role === "guardian" && fundraisers && <GuardianView />}
            {role === "organizer" && fundraisers && <OrganizerView />}
            {role === "provider" && fundraisers && <ProviderView />}
        </>
    )
};

export default HomePage;