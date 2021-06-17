import  React, { useContext, useState, useEffect } from 'react';
import {Table, Tag} from 'antd';
import { find, matchesProperty, sortBy } from 'lodash';
import {format} from 'date-fns';
import {RecordsContext} from '../App';


const Orders = ({ orders, setHovered }) => {
  const {
    recordsDispatch, recordsState: {
      fundraiserToDisplay
    }
  } = useContext(RecordsContext);


  const [updatedOrders, setUpdatedOrders] = useState('');
  const [columns, setColumns] = useState('');
  
  const productInFundraiser = (product) => fundraiserToDisplay.fields.products.includes(product);
  const setFullName = (first, last) => `${first} ${last}`;

  const chooseRecord = (recordName) => {
    const chosenRecord = find(orders, matchesProperty('seller', recordName));
    recordsDispatch({type: 'chooseRecord', payload: chosenRecord["recordID"]})
  }
  const formatPhoneNumber= (ph) => {
    var cleaned = ('' + ph).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  useEffect(() => {
    const formattedDate = (date) => format(new Date(date), 'MMM dd');
    if (orders) {
      let allOrders = [];
      orders.map((order) => {
        const { id, fields: {
          "Order ID": orderID,
          Date: date,
          Seller: seller,
          "Supporter First Name": supporterFirstName,
          "Supporter Last Name": supporterLastName,
          "Supporter Email": supporterEmail,
          "Supporter Phone": supporterPhone,
          ButtQty: buttQty,
          HamQty: hamQty,
          TurkeyQty: turkeyQty,
          SauceQty: sauceQty,
          "ButtPrice (from Fundraiser)": buttPrice,
          "HamPrice (from Fundraiser)": hamPrice,
          "TurkeyPrice (from Fundraiser)": turkeyPrice,
          "SaucePrice (from Fundraiser)": saucePrice,
          "Total Price": totalPrice,
          Status: orderStatus,
          PlaceAnOrderURL: placeAnOrderURL,
          "Supporter Address": supporterAddress,
          "Supporter AddressLine2": supporterAddressLine2,
          "Supporter City": supporterCity,
          "Supporter State": supporterState,
          "Supporter Zip": supporterZip,
          "Supporter MailingList OptIn": supporterOptIn,
        } } = order;
        const formattedOrder = {
          orderID: orderID,
          date: formattedDate(date),
          seller: seller,
          supporterFirstName: supporterFirstName,
          supporterLastName: supporterLastName,
          supporterFullName: setFullName(supporterFirstName, supporterLastName),
          supporterEmail: supporterEmail,
          supporterPhone: formatPhoneNumber(supporterPhone),
          buttQty: productInFundraiser("Boston Butts") ? buttQty : '',
          hamQty: productInFundraiser("Half Hams") ? hamQty : '',
          turkeyQty: productInFundraiser("Whole Turkeys") ? turkeyQty : '',
          sauceQty: productInFundraiser("BBQ Sauce") ? sauceQty : '',
          buttPrice: productInFundraiser("Boston Butts") ? buttPrice : '',
          hamPrice: productInFundraiser("Half Hams") ? hamPrice : '',
          turkeyPrice: productInFundraiser("Whole Turkeys") ? turkeyPrice : '',
          saucePrice: productInFundraiser("BBQ Sauce") ? saucePrice : '',
          totalPrice: `$${totalPrice}`,
          orderStatus: orderStatus,
          placeAnOrderURL: placeAnOrderURL,
          supporterAddress: supporterAddress,
          supporterAddressLine2: supporterAddressLine2,
          supporterCity: supporterCity,
          supporterState: supporterState,
          supporterZip: supporterZip,
          supporterOptIn: supporterOptIn,
        }
        allOrders.push(formattedOrder);
      })
      setUpdatedOrders(allOrders);
      const createProductColumns = () => {
        let columnTitles = [];
        const productDataIndex = (product) => {
            let result;
            switch (product) {
                case "Boston Butts": result = ("buttQty");
                    break;
                case "Half Hams": result = ("hamQty");
                    break;
                case "Whole Turkeys": result = ("turkeyQty");
                    break;
                case "BBQ Sauce": result = ("sauceQty");
                    break;
                default: result = "";
            }
            return result;
        }
        fundraiserToDisplay.fields.products.map((product) => columnTitles.push({
            title: product,
            dataIndex: productDataIndex(product),
            key: (productDataIndex(product)),
            align: 'center',
        }));
        // console.log("columnTitles: ", columnTitles);
        return columnTitles;
      }
      const createEmailLink = (address) => `mailto:${address}`;
      setColumns([
        {
          title: 'Supporter',
          dataIndex: 'supporterFullName',
          key: 'name',
        },
        {
            title: 'Order Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: "Phone",
            dataIndex: 'supporterPhone',
            key: 'supporterPhone',
        },
        ...createProductColumns(),
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            key: 'totalPrice'
        },
        {
            title: 'Email',
            dataIndex: 'supporterEmail',
            key: 'supporterEmail',
            render: text => <a href={createEmailLink(text)}>{text}</a>,
            width: '00px'
        }
      ])
    }
  }, [orders])
  
  return (
    <>
      { 
      updatedOrders.length
        ? <Table
          columns={columns}
          dataSource={updatedOrders}
          pagination={false}
          id='ordersTable'
          // scroll={
          //   {
          //       x: 200,
          //       y: 250
          //   }
          // }
          />
        : <h1>No orders yet!</h1>
      }
    </>
  );
}

export default Orders;
