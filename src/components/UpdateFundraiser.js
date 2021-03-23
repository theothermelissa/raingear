import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appWga5gfjEZX4q7X');

const UpdateFundraiser = (fundraiser) => {
    base('Fundraisers').update([
        
    ])
}
