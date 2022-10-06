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

    return (
        <div>
            {<p style={chosenOrder.orderStatus === 'paid' ? {color: "#389e0d"} : {color: "#ad8b00"}}>Order Status: {
                chosenOrder.orderStatus
            }</p>}
            <p>Sold by: {
                chosenOrder.seller
            }</p>
            <h2>Total Price: {
                chosenOrder.totalPrice
            }</h2>
            <p>Supporter: {
                chosenOrder.supporterFullName
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
            chosenOrder.premiumQty > 0 && <p>{`${chosenOrder.premiumQty} Premium Crate${chosenOrder.premiumQty > 1 ? `s`: ``} 🥩`}</p>
            }
            {
            chosenOrder.standardQty > 0 && <p>{`${chosenOrder.standardQty} Standard Crate${chosenOrder.standardQty > 1 ? `s`: ``} 🍖`}</p>
            }
            {
            chosenOrder.buttQty > 0 && <p>{`${chosenOrder.buttQty} Butt${chosenOrder.buttQty > 1 ? `s`: ``} 🐖`}</p>
            }
            {
            chosenOrder.hamQty > 0 && <p>{`${chosenOrder.hamQty} Ham${chosenOrder.hamQty > 1 ? `s`: ``} 🐷`}</p>
            }
            {
            chosenOrder.turkeyQty > 0 && <p>{`${chosenOrder.turkeyQty} Turkey${chosenOrder.turkeyQty > 1 ? `s`: ``} 🦃`}</p>
            }
            {
            chosenOrder.sauceQty > 0 && <p>{`${chosenOrder.sauceQty} Sauce${chosenOrder.sauceQty > 1 ? `s`: ``} 🥫`}</p>
            }
        </div>
    )
};

export default OrderDetails;
