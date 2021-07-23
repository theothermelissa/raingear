import React, {useContext, useState, useEffect} from 'react';
import {sortBy, uniqueId, snakeCase} from 'lodash';
import {Table, Tag} from 'antd';
import {format} from 'date-fns';
import selectStatusColor from './selectStatusColor.js';
import {RecordsContext} from '../App';

const AllFundraisers = ({ hoveredFundraiser }) => {
    const {recordsDispatch, recordsState: {
            fundraiserToDisplay: { fundraisers }
        }
    } = useContext(RecordsContext);

    const [dataSource, setDataSource] = useState('');
    
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
                return <div key={uniqueId(`${snakeCase(product)}`)}
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
                return <div key={uniqueId(`${snakeCase(product)}`)}
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
                return <div key={uniqueId(`${snakeCase(product)}`)}
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
                return <div key={uniqueId(`${snakeCase(product)}`)}
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
            let formattedFundraisers = fundraisers.map(fundraiser => {
                const { fields} = fundraiser;
                return {
                        ...fields,
                        'deliveryDate': convertedDate(fields['deliveryDate']),
                        'organizationProceeds': `$${
                            Math.round(fields['organizationProceeds'])
                        }`,
                        'totalRevenue': `$${
                            Math.round(fields['totalRevenue'])
                        }`,
                        'providerFee': `$${
                            Math.round(fields['providerFee'])
                        }`,
                        // 'key': uniqueId(`${id}`),
                        'status': `${
                            prefillStatus(fields["status"])
                        }`
                }
            });
            setDataSource(sortBy(formattedFundraisers, 'priority'))
        }
    }, [fundraisers]);

    const createSorter = (field) => (a, b) => a[field] >= b[field] ? -1 : 1;
    const createFilter = (field) => (value, record) => record[field].indexOf(value) === 0;

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
                        key={uniqueId('status_')}>
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
            title: "We've Made",
            dataIndex: 'providerFee',
            key: 'providerFee',
            render: item => (
                <>
                    <div>{item}</div>
                </>
            )
        }, {
            title: "They've Raised",
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
            <div style={{ width: '70vw' }}>
        { dataSource && 
                <Table 
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    size='small'
                    id='fundraisersTable'
                    bordered={true}
                    rowKey={row => row.key}
                    scroll={
                        {
                            x: 700,
                            y: 250
                        }
                    }
                    onRow={
                        (record, rowIndex) => {
                            const { recordID: id } = record;
                            return {
                                onClick: event => {
                                    chooseRecord(id)
                                },
                                className: isHighlighted(id) ? 'hovered' : '', 
                                id: id,
                                key: uniqueId(`${id}_${rowIndex}`),
                            };
                        }
                    }
                    />
                } 
            </div>
    );
}

export default AllFundraisers;
