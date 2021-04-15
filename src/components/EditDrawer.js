import React, {useContext} from 'react';
import {Drawer} from 'antd';
import {RecordsContext} from '../App';
import EditFundraiser from './EditFundraiser';
import CreateFundraiserInquiry from './CreateFundraiserInquiry';

const EditDrawer = () => {
    const {
        recordsDispatch,
        recordsState: {
            recordToEdit,
            drawerVisible
        }
    } = useContext(RecordsContext);

    const closeDrawer = () => recordsDispatch({
        type: "closeDrawer",
    });

    return (
        <Drawer forceRender
            width={"80vw"}
            visible={drawerVisible}
            onClose={closeDrawer}>
            {
            recordToEdit ? <EditFundraiser/> : <CreateFundraiserInquiry/>
        } </Drawer>
    )
};

export default EditDrawer;