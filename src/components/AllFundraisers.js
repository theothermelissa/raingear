import React, { useContext, useState, useEffect } from 'react';
import {sortBy, find, matchesProperty} from 'lodash';
import {
    Table,
    Tag,
} from 'antd';
import {format} from 'date-fns';
import selectStatusColor from './selectStatusColor.js';
import {RecordsContext} from '../App';

const AllFundraisers = ({fundraisers}) => {
    const {
        recordsDispatch,
        recordsState: {
            hoveredID
        }
    } = useContext(RecordsContext);

    const convertedDate = (date) => format(new Date(date), 'MMM dd');
    const [updatedFundraisers, setUpdatedFundraisers] = useState('')

    const chooseRecord = (recordName) => {
        const chosenRecord = find(fundraisers, matchesProperty('organization', recordName));
        // console.log("chosenRecord['recordID']: ", chosenRecord['recordID']);
        recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
    }

    const prefillStatus = (currentStatus) => {
        return (
            currentStatus ? currentStatus : "Inquiry"
        )
    };

    
    useEffect(() => {
        setUpdatedFundraisers(fundraisers.map(record => {
            return {
                ...record,
                'deliveryDate': convertedDate(record['deliveryDate']),
                'organizationProceeds': `$${
                    Math.round(record['organizationProceeds'])
                }`,
                'totalRevenue': `$${
                    Math.round(record['totalRevenue'])
                }`,
                'firehouseFee': `$${
                    Math.round(record['firehouseFee'])
                }`,
                'isHovered': record['recordID'] === hoveredID,
                'key': record["recordID"],
                'status': `${prefillStatus(record["status"])}`
            }
        }))
    }, [fundraisers]);


    // const {
    //   fundraiserName,
    //   deliveryDate,
    //   daysUntilDelivery,
    //   deliveryAddress,
    //   deliveryCity,
    //   deliveryState,
    //   deliveryZip,
    //   deliveryNotes,
    //   products,
    //   customerButtPrice,
    //   customerHamPrice,
    //   customerTurkeyPrice,
    //   customerSaucePrice,
    //   firehouseButtPrice,
    //   firehouseHamPrice,
    //   firehouseTurkeyPrice,
    //   firehouseSaucePrice,
    //   buttCount,
    //   hamCount,
    //   turkeyCount,
    //   sauceCount,
    //   status,
    //   priority,
    //   orders,
    //   orderTotals,
    //   totalRevenue,
    //   organization,
    //   contactFirstName,
    //   contactLastName,
    //   contactFullName,
    //   contactEmail,
    //   contactPhone,
    //   contactPreferredMethod,
    //   contactAddress,
    //   contactAddressLine2,
    //   contactCity,
    //   contactState,
    //   contactZip,
    //   contactIsBilling,
    //   billingContactFullName,
    //   billingEmail,
    //   billingPhone,
    //   recordID,
    //   sellers,
    //   allOrders,
    //   orderCount,
    //   firehouseFee,
    //   ccFees,
    //   organizatinProceeds
    // } = updatedFundraisers;

    const dataSource = sortBy(updatedFundraisers, ['priority', 'deliveryDate']);
    // console.log('dataSource: ', dataSource);

    const createSorter = (field) => (a, b) => a[field] >= b[field] ? -1 : 1;
    const createFilter = (field) => (value, record) => record[field].indexOf(value) === 0;
    const isHovered = (id) => id === hoveredID;

    // const getRowHeightAndSetTop = (data, value) => {
    //     data && data.forEach((item, index) => {
    //         if (item.id === value) {
    //             setTableScrollTop(index);
    //         }
    //     })
    // }

    // const setTableScrollTop = (id, index) => {
    //     if (index != 0 || index != -1){
    //         let currentPosition = index *40;
    //         document.getElementById(id).scrollTop(currentPosition);
    //     }
    // }

    const chooseProduct = (product) => {
        switch (product) {
            case 'Boston Butts':
                return <div key={product} className='tagContentHolder'>
                    <div className='circleBackground'
                        style={
                            {backgroundColor: '#597ef7'}
                    }>B</div>
                    <div className='productTagName'
                        style={
                            {color: '#597ef7'}
                    }>
                        {product}</div>
                </div>
            case 'Half Hams':
                return <div key={product} className='tagContentHolder'>
                    <div className='circleBackground'
                        style={
                            {backgroundColor: '#7cb305'}
                    }>H</div>
                    <div className='productTagName'
                        style={
                            {color: '#7cb305'}
                    }>
                        {product}</div>
                </div>
            case 'Whole Turkeys':
                return <div key={product} className='tagContentHolder'>
                    <div className='circleBackground'
                        style={
                            {backgroundColor: '#13c2c2'}
                    }>T</div>
                    <div className='productTagName'
                        style={
                            {color: '#13c2c2'}
                    }>
                        {product}</div>
                </div>
            case 'BBQ Sauce':
                return <div key={product} className='tagContentHolder'>
                    <div className='circleBackground'
                        style={
                            {backgroundColor: '#9254de'}
                    }>S</div>
                    <div className='productTagName'
                        style={
                            {color: '#9254de'}
                    }>
                        {product}</div>
                </div>
            default:
                return null;
        }
    }

    const columns = [
        {
            title: 'Organization',
            dataIndex: 'organization',
            key: 'organization',
            sorter: createSorter('organization'),
            render: organization => (
                <>
                    <div>{organization}</div>
                </>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <>
                    {status && <Tag color={
                            selectStatusColor(status)
                        }
                        key={status}>
                        {
                        status.toUpperCase()
                    } </Tag>}
                </>
            ),
            sorter: createSorter('status')
        },
        {
            title: 'Sales',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            sorter: (a, b) => a['totalRevenue'] - b['totalRevenue'],
            render: item => (
                <>
                    <div>{item}</div>
                </>
            )
        },
        {
            title: 'FH Total',
            dataIndex: 'firehouseFee',
            key: 'firehouseFee',
            render: item => (
                <>
                    <div>{item}</div>
                </>
            )
        }, {
            title: 'Org Total',
            dataIndex: 'organizationProceeds',
            key: 'organizationProceeds',
            render: item => (
                <>
                    <div>{item}</div>
                </>
            )
        }, {
            title: 'D-Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: item => (
                <>
                    <div>{item}</div>
                </>
            )
        }, {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            filters: [
                {
                    text: 'Boston Butts',
                    value: 'Boston Butts'
                }, {
                    text: 'Half Hams',
                    value: 'Half Hams'
                }, {
                    text: 'Whole Turkeys',
                    value: 'Whole Turkeys'
                }, {
                    text: 'BBQ Sauce',
                    value: 'BBQ Sauce'
                },
            ],
            onFilter: createFilter('products'),
            render: text => {
                return(text.map((item) => chooseProduct(item)))
            }
        },
    ];

    return (
        <>
            {updatedFundraisers && <div>
                <Table dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size='small'
                    id='fundraisersTable'
                    scroll={
                        {
                            x: 700,
                            y: 250
                        }
                    }
                    onRow={
                        (record, rowIndex) => {
                            return {
                                onClick: event => {
                                    chooseRecord(record["organization"])
                                    // console.log("record org ", record["organization"]);
                                },
                                className: isHovered(record.recordID) ? 'hovered' : '', // click row
                                id: `row${record.recordID}`,
                                key: rowIndex,
                            };
                        }
                    }/>
            </div>}
        </>
    );
}

export default AllFundraisers;
