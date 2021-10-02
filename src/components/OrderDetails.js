import React, {useContext, useState, useEffect} from 'react';
import {find, matchesProperty} from 'lodash';
import {RecordsContext} from '../App';

const OrderDetails = () => {
    const {
        recordsState: {
            focusedRecord,
            fundraiserToDisplay: {
                fundraisers: {
                    fields: {
                        sellerGuardians
                    }
                }

            }
        }
    } = useContext(RecordsContext);

    const [chosenOrder, setChosenOrder] = useState('');

    useEffect(() => {
        if (focusedRecord) {
            let sellers = [];
            sellerGuardians.forEach((guardian) => {
                const {fields: {
                        Sellers
                    }} = guardian;
                sellers.push(...Sellers);
            });
            const thisOrdersSeller = find(sellers, matchesProperty('id', focusedRecord.seller[0]));
            const sellerNickname = thisOrdersSeller.fields.Nickname
            setChosenOrder({
                ...focusedRecord,
                seller: sellerNickname
            });
        }
    }, [focusedRecord, sellerGuardians])

    // console.log("chosenOrder: ", chosenOrder);

    return (
        <div>
            <p>Sold by: {
                chosenOrder.seller
            }</p>
            <h2>Total Price: {
                chosenOrder.totalPrice
            }</h2>
            <p>Supporter: {
                chosenOrder.supporterFullName
            }</p>
            <p>Order Status: {
                chosenOrder.orderStatus
            }</p>
            <p>{
                chosenOrder.supporterPhone
            }</p>
            <p>
                <a href={
                    `mailto:${
                        chosenOrder.supporterEmail
                    }`
                }>
                    {
                    chosenOrder.supporterEmail
                }</a>
            </p>
            <p>Ordered on {
                chosenOrder.date
            }</p>
            {
            chosenOrder.premiumQty && <p>{`${chosenOrder.premiumQty} Premium Crate${chosenOrder.premiumQty > 1 ? `s`: ``} 🥩`}</p>
            }
            {
            chosenOrder.standardQty && <p>{`${chosenOrder.standardQty} Standard Crate${chosenOrder.standardQty > 1 ? `s`: ``} 🍖`}</p>
            }
            {
            chosenOrder.buttQty && <p>{`${chosenOrder.buttQty} Butt${chosenOrder.buttQty > 1 ? `s`: ``} 🐖`}</p>
            }
            {
            chosenOrder.hamQty && <p>{`${chosenOrder.hamQty} Ham${chosenOrder.hamQty > 1 ? `s`: ``} 🐷`}</p>
            }
            {
            chosenOrder.turkeyQty && <p>{`${chosenOrder.turkeyQty} Turkey${chosenOrder.turkeyQty > 1 ? `s`: ``} 🦃`}</p>
            }
            {
            chosenOrder.sauceQty && <p>{`${chosenOrder.sauceQty} Sauce${chosenOrder.sauceQty > 1 ? `s`: ``} 🥫`}</p>
            }
        </div>
    )
};

export default OrderDetails;
