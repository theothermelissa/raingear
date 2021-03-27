import  React, { useState, useRef } from 'react';
import { sortBy } from 'lodash';
// import TimelineCard from './TimelineCard';
// import Airtable from 'airtable';
import { Table, Drawer, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Search from 'antd/lib/transfer/search';
import Highlighter from 'react-highlight-words';
import { format } from 'date-fns';
import B from '../images/icons_B.svg';
import H from '../images/icons_H.svg';
import S from '../images/icons_S.svg';
import T from '../images/icons_T.svg';
import selectStatusColor from './selectStatusColor.js';
// import { icons_B, icons_H, icons_S, icons_T } from '../images';

// const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

const AllFundraisers = ({ fundraisers }) => {
    // display a table of all fundraisers
    // fields: Organization | Status | Sales | FH Total | Org Total | D-Date | Products
    // Organization, Status, D-Date, & Products are filterable & orderable
    // Sales, FH Total, & Org Total are orderable
    // Clicking anywhere on the record opens the FullRecord

    const convertedDate = (date) => format(new Date(date), 'MMM dd');
    
    let updatedFundraisers = fundraisers.map(record => {
        return {
            ...record,
            "Delivery Date": convertedDate(record["Delivery Date"]),
            "Organization Proceeds": `$${Math.round(record["Organization Proceeds"])}`,
            "Total Revenue": `$${Math.round(record['Total Revenue'])}`,
            "Firehouse Fee": `$${Math.round(record['Firehouse Fee'])}`,
        }
    });
    // console.log("updatedFundraisers: ", updatedFundraisers);

    const dataSource = sortBy(updatedFundraisers, ['Priority', 'Delivery Date']);
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [visible, setVisible] = useState(false);
    // const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
    const searchInput = useRef(null);

    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    //         <div style={{ padding: 8 }}>
    //             <Input
    //                 ref={ searchInput }
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //                 onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                 style={{ width: 188, marginBottom: 8, display: 'block' }}
    //             />
    //             <Space>
    //                 <Button
    //                     type="primary"
    //                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //                     icon={<SearchOutlined />}
    //                     size="small"
    //                     style={{ width: 90 }}
    //                 >
    //                     Search
    //                 </Button>
    //                 <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
    //                     Reset
    //                 </Button>
    //                 <Button
    //                     type="link"
    //                     size="small"
    //                     onClick={() => {
    //                         confirm({ closeDropdown: false });
    //                         setSearchText(selectedKeys[0]);
    //                         setSearchedColumn(dataIndex);
    //                     }}
    //                 >
    //                     Filter
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    //     onFilter: (value, record) =>
    //         record[dataIndex]
    //             ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    //             : '',
    //     onFilterDropdownVisibleChange: (visible) => {
    //         if (visible) {
    //             setTimeout(() => searchInput.current.select(), 100);
    //         }
    //     },
    //     render: (text, record, index) =>
    //         searchedColumn === index ? <h2>{text}</h2> : text
    //         // searchedColumn === index ? (
    //         //     <Highlighter
    //         //         highlightStyle={{ backgroundColor: '#fff369', padding: 0 }}
    //         //         searchWords={[searchText]}
    //         //         autoEscape={true}
    //         //         textToHighlight={text ? text.toString() : ''}
    //         //     />
    //         // ) : (
    //         //     text
    //         // ),
    // })

    // const handleSearch = (selectedKeys, confirm, dataIndex) => {
    //     confirm();
    //     setSearchText(selectedKeys[0]);
    //     console.log("setting searchedColumn to: ", dataIndex);
    //     setSearchedColumn(dataIndex);
    // };

    // console.log("searchedColumn: ", searchedColumn);

    // const handleReset = clearFilters => {
    //     clearFilters();
    //     setSearchText('');
    //     setSearchedColumn('');
    // };

    
    const createSorter = (field) => (a, b) => a[field] >= b[field] ? -1 : 1;
    const createFilter = (field) => (value, record) => record[field].indexOf(value) === 0;
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    }
    
    const chooseProduct = (product) => {
        switch(product) {
            case 'Boston Butts':
                return <div className="tagContentHolder" onClick={showDrawer}>
                            <div className="circleBackground" style={{ backgroundColor: "#597ef7" }}>B</div>
                            <div className="productTagName" style={{ color: "#597ef7" }}>{product}</div>
                        </div>
            case 'Half Hams':
                return <div className="tagContentHolder" onClick={showDrawer}>
                            <div className="circleBackground" style={{ backgroundColor: "#7cb305" }}>H</div>
                            <div className="productTagName" style={{ color: "#7cb305" }}>{product}</div>
                        </div>
            case 'Whole Turkeys':
                return <div className="tagContentHolder" onClick={showDrawer}>
                            <div className="circleBackground" style={{ backgroundColor: "#13c2c2" }}>T</div>
                            <div className="productTagName" style={{ color: "#13c2c2" }}>{product}</div>
                        </div>
            case 'BBQ Sauce':
                return <div className="tagContentHolder" onClick={showDrawer}>
                            <div className="circleBackground" style={{ backgroundColor: "#9254de" }}>S</div>
                            <div className="productTagName" style={{ color: "#9254de" }}>{product}</div>
                        </div>
            default:
                return null;
        }
    }

    const columns = [
        {
          title: 'Organization',
          dataIndex: 'Organization',
          key: 'Organization',
          // width: '280px',
          // fixed: 'left',
          sorter: createSorter('Organization'),
          render: Organization => (
            <>
                <div onClick={showDrawer}>{Organization}</div>
            </>
          ),
        //   fixed: 'left',
        //   ...getColumnSearchProps('Organization')
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          key: 'Status',
          render: Status => (
            <>
                  <Tag color={selectStatusColor(Status)} onClick={showDrawer} key={Status}>
                    {Status.toUpperCase()}
                  </Tag>
            </>
          ),
          sorter: createSorter('Status')
        },
        {
            title: 'Sales',
            dataIndex: 'Total Revenue',
            key: 'Total Revenue',
            sorter: (a, b) => a['Total Revenue'] - b['Total Revenue'],
            render: item => (
                <>
                    <div onClick={showDrawer}>{item}</div>
                </>
              ),
            // ...getColumnSearchProps('Total Revenue')
        },
        {
          title: 'FH Total',
          dataIndex: 'Firehouse Fee',
          key: 'Firehouse Fee',
          render: item => (
            <>
                <div onClick={showDrawer}>{item}</div>
            </>
          ),
        //   ...getColumnSearchProps('Firehouse Fee')
        },
        {
          title: 'Org Total',
          dataIndex: 'Organization Proceeds',
          key: 'Organization Proceeds',
          render: item => (
            <>
                <div onClick={showDrawer}>{item}</div>
            </>
          ),
        //   ...getColumnSearchProps('Organization Proceeds')
        },
        {
          title: 'D-Date',
          dataIndex: 'Delivery Date',
          key: 'Delivery Date',
          render: item => (
            <>
                <div onClick={showDrawer}>{item}</div>
            </>
          ),
        //   ...getColumnSearchProps('Delivery Date')
        },
        {
          title: 'Products',
          dataIndex: 'Products',
          key: 'Products',
          filters: [
            {
                text: 'Boston Butts',
                value: 'Boston Butts',
            },
            {
                text: 'Half Hams',
                value: 'Half Hams',
            },
            {
                text: 'Whole Turkeys',
                value: 'Whole Turkeys',
            },
            {
                text: 'BBQ Sauce',
                value: 'BBQ Sauce',
            },
              ],
            onFilter: createFilter('Products'),
            // width: "200px",
            render: text => {
                return (
                    text.map((item) => chooseProduct(item))
                )
            },
        //   ...getColumnSearchProps('Products')
        },
      ];

    // const [activeFundraisers, setActiveFundraisers] = useState([]);


    // find a single record
    // useEffect( () => { base('Fundraisers').find(
    //     'rec43VLzoUTfiQX13', 
    //     function (err, record) {
    //         if (err) {
    //             console.log("Error: ", err);
    //             return;
    //         } 
    //         console.log("Retrieved fundraiser #: 'rec43VLzoUTfiQX13'")
    //         setActiveFundraisers(record);
    //         setHasBeenUpdated(false);
    //     });
    // }, [hasBeenUpdated]);

    // get all records that match certain criteria
    // useEffect( () => { base('Fundraisers').select({
    //         filterByFormula: "({Status} = 'Inquiry')"
    //     }).eachPage(function page(records, fetchNextPage) {
    //         records.forEach(function(record) {
    //             setActiveFundraisers(records.map(record => record.fields));
    //             console.log('Retrieved: ', record.get('Organization'));
    //         })
    //         fetchNextPage();
    //     }, function done(err) {
    //         console.log("Error: ", err);
    //     })
    // }, [])

    // search fundraisers prop for records that match certain criteria


    // const changeField = (id, fieldToChange, newValue) => {
    //     base('Fundraisers').update([
    //         {
    //             "id": id,
    //             "fields": {
    //                 [fieldToChange]: newValue
    //             }
    //         }
    //     ], function(err, records) {
    //         if (err) {
    //             console.log("Error: ", err);
    //             return;
    //         }
    //     });
    //     setHasBeenUpdated(true);
    // };

    
    
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}  pagination={false} size="small" scroll={{ x: 700, y: 250 }} />
            <Drawer
                title="Test Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}>Stuff Goes Here</Drawer>
            {/* <input type="text" value={inputValue} placeholder="Try it" onChange={(e) => setInputValue(e.target.value)}/> */}
            {/* <div>New Value: {inputValue}</div> */}
            {/* <Button onClick={() => changeField('rec43VLzoUTfiQX13', 'Organization', inputValue)}>Set New Name</Button> */}
            {/* <div>Active Fundraiser: {activeFundraisers.fields && <h1>{activeFundraisers.fields.Organization}</h1>}
            </div> */}
        </div>
    );
}

export default AllFundraisers;
