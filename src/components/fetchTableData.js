import React, { useState, useContext } from 'react';
import { RecordsContext, base } from '../App';
import { notification } from 'antd';

const fetchTableData = (tableToFetch) => {
    // const {recordsDispatch, recordsState} = useContext(RecordsContext);
    const [tableData, setTableData] = useState([]);

    base(tableToFetch).select().eachPage(function page(records, fetchNextPage) {
            setTableData(records.map(record => record.fields));
            fetchNextPage();
        }, function done(err) {
            if (err) {
              console.error(err);
              notification["error"]({
                message: 'Uh oh...',
                description: `Something went wrong :( \n ${err}`,
                placement: 'topLeft',
                duration: 0,
              });
            }
        }
        )
        console.log('tableData: ', tableData);
};

export default fetchTableData;