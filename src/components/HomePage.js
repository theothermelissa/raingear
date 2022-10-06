import React, { useContext } from 'react';
import { RecordsContext } from '../App';
import GuardianView from './views/GuardianView';
import OrganizerView from './views/OrganizerView';
import SellerView from './views/SellerView';
import ProviderView from './views/ProviderView';
import AdminView from './views/AdminView';

const HomePage = () => {
    const {
        recordsState: {
            fundraiserToDisplay,
            fundraiserToDisplay: {
                role,
                fundraisers
            }
        }
    } = useContext(RecordsContext);

    // console.log('fundraiserToDisplay: ', fundraiserToDisplay)


    return (
        <> {
            fundraiserToDisplay && <div> {
                role.role && <SellerView sellerIDs={
                    role.id
                } />
            }
                {
                    role === "admin" && fundraisers && <AdminView />
                }
                {
                    role === "guardian" && fundraisers && <GuardianView />
                }
                {
                    role === "organizer" && fundraisers && <OrganizerView />
                }
                {
                    role === "provider" && fundraisers && <ProviderView />
                } </div>
        } </>
    )
};

export default HomePage;
