export const defaultGuardianRecord = "recRQHAvZDdaZXPft";

export const getRoleSpecificOrderFields = (role) => {
    let result;
    switch (role) {
        case "organizer": result = [
                "Order ID",
                "Date",
                "Seller",
                "Supporter First Name",
                "Supporter Last Name",
                "Supporter Email",
                "Supporter Phone",
                "ButtQty",
                "HamQty",
                "TurkeyQty",
                "SauceQty",
                "ButtPrice (from Fundraiser)",
                "HamPrice (from Fundraiser)",
                "TurkeyPrice (from Fundraiser)",
                "SaucePrice (from Fundraiser)",
                "Total Price",
                "Status",
                "PlaceAnOrderURL",
                "Supporter AddressLine1",
                "Supporter AddressLine2",
                "Supporter State",
                "Supporter Zip",
            ];
            break;
        case "guardian": result = [
                "Order ID",
                "Date",
                "Seller",
                "Supporter First Name",
                "Supporter Last Name",
                "Supporter Email",
                "Supporter Phone",
                "ButtQty",
                "HamQty",
                "TurkeyQty",
                "SauceQty",
                "ButtPrice (from Fundraiser)",
                "HamPrice (from Fundraiser)",
                "TurkeyPrice (from Fundraiser)",
                "SaucePrice (from Fundraiser)",
                "Total Price",
                "Status",
                "PlaceAnOrderURL",
                "Supporter AddressLine1",
                "Supporter AddressLine2",
                "Supporter State",
                "Supporter Zip",
            ];
            break;
        case "seller": result = [
                "Order ID",
                "Date",
                "Seller",
                "Supporter First Name",
                "Supporter Last Name",
                "Supporter Email",
                "Supporter Phone",
                "ButtQty",
                "HamQty",
                "TurkeyQty",
                "SauceQty",
                "ButtPrice (from Fundraiser)",
                "HamPrice (from Fundraiser)",
                "TurkeyPrice (from Fundraiser)",
                "SaucePrice (from Fundraiser)",
                "Total Price",
                "Status",
                "PlaceAnOrderURL",
                "Supporter AddressLine1",
                "Supporter AddressLine2",
                "Supporter State",
                "Supporter Zip",
            ]
            break;
        case "provider": result = [
                "Order ID",
                "Date",
                // "Seller",
                // "Supporter First Name",
                // "Supporter Last Name",
                // "Supporter Email",
                // "Supporter Phone",
                "ButtQty",
                "HamQty",
                "TurkeyQty",
                "SauceQty",
                "ButtPrice (from Fundraiser)",
                "HamPrice (from Fundraiser)",
                "TurkeyPrice (from Fundraiser)",
                "SaucePrice (from Fundraiser)",
                "Total Price",
                "Status",
                // "PlaceAnOrderURL",
                // "Supporter AddressLine1",
                // "Supporter AddressLine2",
                // "Supporter State",
                // "Supporter Zip",
            ]
            break;
        default: result = "";
    };
    return result;
}

export const getRoleSpecificSellerFields = (role) => {
    let result;
    switch (role) {
        case "organizer": result = [
                "Email",
                "Nickname",
                "recordID",
                "Phone",
                "Orders",
                "SellerGuardian",
                "Total Orders",
                "Total Sales Volume",
                "Email (from SellerGuardian)",
                "Phone (from SellerGuardian)",
                "AddressLine1 (from SellerGuardian)",
                "AddressLine2 (from SellerGuardian)",
                "City (from SellerGuardian)",
                "State (from SellerGuardian)",
                "Zip (from SellerGuardian)",
                "Link to Order From This Seller",
                "Total Orders",
                "Total Sales Volume",
                "Contact Email",
                "Contact Phone",
                "Contact Address",
                "Contact Address Line 2",
                "Contact City",
                "Contact State",
                "Contact Zip",
            ];
            break;
        case "guardian": result = [
                "Email",
                "Nickname",
                "recordID",
                "Orders",
                "SellerGuardian",
                "Total Orders",
                "Total Sales Volume",
            ];
            break;
        case "provider": result = [
                // "Email",
                // "Nickname",
                "recordID",
                "Orders",
                "SellerGuardian",
                "Total Orders",
                "Total Sales Volume",
            ];
            break;
        default: result = [
            "Email",
            "Nickname",
            "recordID",
            "Orders",
            "Total Orders",
            "Total Sales Volume",
            "Link to Order From This Seller",
        ];
    }
    return result;
}

export const getFundraiserFields = () => {
    return [
        "fundraiserName",
        "organization",
        "deliveryDate",
        "deliveryAddress",
        "deliveryCity",
        "deliveryState",
        "deliveryZip",
        "deliveryNotes",
        "products",
        "customerButtPrice",
        "customerHamPrice",
        "customerTurkeyPrice",
        "customerSaucePrice",
        "orders",
        "contactFirstName",
        "contactLastName",
        "contactEmail",
        "contactPhone",
        "recordID",
        "sellers",
        "orderCount",
        "inviteSellersURL",
        "sellerGuardians",
        "status",
        "buttCount",
        "hamCount",
        "turkeyCount",
        "sauceCount",
        "organizationProceeds",
        "totalRevenue",
        "providerFee",
    ];
};

export const addRecordToArray = (record, array) => {
    if (array[0]) {
        return [
            ...array,
            record
        ]
    } else {
        return [record]
    }
};

export const saveRecordInArray = (record, list, index) => {
    list.splice(index, 1, record);
    return list;
};

export const arrayify = (input) => Array.isArray(input)
        ? input
        : input.split(", ");

// export const arrayify = (string) => {
//     let first = string.split(', ');
//     let result = first.filter((element) => element !== null && element !== '');
//     return result;
// };

export const getRecordType = (id, data) => {
    let result;
    const {
        organizerRecords,
        sellerRecords,
        "Fundraiser (from sellerRecords)": sellerFundraiserRecords,
        "Active Fundraiser (from guardianRecords)": guardianRecords,
        "Fundraisers (from Providers)": providerRecords,
    } = data;
    
    if (organizerRecords && organizerRecords.includes(id)) {
        result = "organizer";
    }
    if (sellerFundraiserRecords && sellerFundraiserRecords.includes(id)) {
        result = {role: "seller", id: sellerRecords};
    }
    if (guardianRecords && guardianRecords.includes(id)) {
        result = "guardian";
    };
    if (providerRecords && providerRecords.includes(id)) {
        result = "provider";
    };
    return result;
};

export const chooseTable = (recordType) => {
    let result;
    switch(recordType) {
        case "fundraiser": result = ("Fundraisers");
            break;
        case "seller": result = ("Sellers");
            break;
        case "order": result = ("Orders");
            break;
        case "guardian": result = ("SellerGuardians");
            break;
        default: result = ("");
    };
    return result;
};

export const anyOfThese = (list) => {
    let stringToReturn;
    if (list.length > 1 ) {
        stringToReturn = list.join(" || ");
    } else {
        return list[0];
    }
    return stringToReturn;
}

export const createFilterFormula = (recordsList, fieldToSearch) => {
    let stringToReturn;
    let stringOpen = `OR({${fieldToSearch}}="`;
    let stringClose = `")`;
    const recordsListAsArray = arrayify(recordsList);
    
    let orSequence = () => {
        if (recordsListAsArray.length > 1) {
            return recordsListAsArray.join(`", {${fieldToSearch}}="`)
        } else {
            return `${recordsListAsArray[0]}`;
        }
    };
    stringToReturn = stringOpen + orSequence() + stringClose;
    return stringToReturn;
}