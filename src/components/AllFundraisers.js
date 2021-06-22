import React, {useContext, useState, useEffect} from 'react';
import {sortBy, find, matchesProperty} from 'lodash';
import {Table, Tag} from 'antd';
import {format} from 'date-fns';
import selectStatusColor from './selectStatusColor.js';
import {RecordsContext} from '../App';

const AllFundraisers = ({ hoveredFundraiser }) => {
    const {recordsDispatch, recordsState: {
            hoveredID,
            fundraiserToDisplay: { fundraisers }
        }
    } = useContext(RecordsContext);

    const [updatedFundraisers, setUpdatedFundraisers] = useState('');
    
    const convertedDate = (date) => format(new Date(date), 'MMM dd');

    const chooseRecord = (id) => {
        recordsDispatch({type: 'chooseRecord', payload: id})
    }

    const isHighlighted = (id) => {
        if (hoveredFundraiser) {
            return (hoveredFundraiser === id) 
        } else return false;
    };

    const prefillStatus = (currentStatus) => {
        return(currentStatus ? currentStatus : "Inquiry")
    };

    const chooseProduct = (product) => {
        switch (product) {
            case 'Boston Butts':
                return <div key={product}
                    className='tagContentHolder'>
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
                return <div key={product}
                    className='tagContentHolder'>
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
                return <div key={product}
                    className='tagContentHolder'>
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
                return <div key={product}
                    className='tagContentHolder'>
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

    useEffect(() => {
        if (fundraisers) {
            setUpdatedFundraisers(fundraisers.map(fundraiser => {
                const { fields: record} = fundraiser
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
                    // 'isHovered': record['recordID'] === hoveredID,
                    'key': record["recordID"],
                    'status': `${
                        prefillStatus(record["status"])
                    }`
                }
            }))
        }
    }, [fundraisers, hoveredID]);

    const dataSource = sortBy(updatedFundraisers, ['priority', 'deliveryDate']);

    const createSorter = (field) => (a, b) => a[field] >= b[field] ? -1 : 1;
    const createFilter = (field) => (value, record) => record[field].indexOf(value) === 0;
    const isHovered = (id) => id === hoveredID;

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
                <> {
                    status && <Tag color={
                            selectStatusColor(status)
                        }
                        key={status}>
                        {
                        status.toUpperCase()
                    } </Tag>
                } </>
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
                if (text) {
                    return(text.map((item) => chooseProduct(item)))
                }
            }
        },
    ];

    return (
        <> {
            updatedFundraisers && 
            <div style={{ width: '70vw' }}>
                <Table dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size='small'
                    id='fundraisersTable'
                    bordered={true}
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
                                    chooseRecord(record["recordID"])
                                },
                                className: isHighlighted(record.recordID) ? 'hovered' : '', // click row
                                id: `row${
                                    record.recordID
                                }`,
                                key: rowIndex
                            };
                        }
                    }
                    />
            </div>
        } </>
    );
}

export default AllFundraisers;
