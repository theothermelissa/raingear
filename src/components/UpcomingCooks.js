import React, { useState, useEffect } from 'react';

const UpcomingCooks = ({data}) => {
    const fields = data.map(el => {
        return el.fields;
    })

    return (
        <div>
            <h1>Fundraiser for: {fields.map(el => {
                return <h1>{el.organization}</h1>
            })}
            </h1>
        </div>
    )
};

export default UpcomingCooks;