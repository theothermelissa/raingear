import { base } from "../App";

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
        default: result = "";
    };
    return result;
}

export const getRoleSpecificSellerFields = (role) => {
    let result;
    switch (role) {
        case "organizer": result = [
                "email",
                "Nickname",
                "recordID",
                "phone",
                "orders",
                "sellerGuardian",
                "Total Orders",
                "Total Sales Volume",
            ];
            break;
        case "guardian": result = [
                "email",
                "Nickname",
                "recordID",
                "orders",
                "sellerGuardian",
                "Total Orders",
                "Total Sales Volume",
            ];
            break;
        case "seller": result = [
                "email",
                "Nickname",
                "recordID",
                "orders",
                "Total Orders",
                "Total Sales Volume",
            ];
            break;
        default: result = "";
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
        "buttCount",
        "hamCount",
        "turkeyCount",
        "sauceCount",
        "organizationProceeds"
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

export const arrayify = (string) => {
    let first = string.split(', ');
    let result = first.filter((element) => element != false);
    return result;
};

export const getRecordType = (id, data) => {
    let result;
    const {
        organizerRecords,
        "Fundraiser (from sellerRecords)": sellerRecords,
        "Active Fundraiser (from guardianRecords)": guardianRecords,
        // providerRecords,
    } = data;
    
    if (organizerRecords && organizerRecords.includes(id)) {
        result = "organizer";
    }
    if (sellerRecords && sellerRecords.includes(id)) {
        result = "seller";
    }
    if (guardianRecords && guardianRecords.includes(id)) {
        result = "guardian";
    };
    // if (providerRecords && providerRecords.includes(id)) {
    //     result = {
        // "role": "provider",
        // "id": id
    // };
    // };
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
    let stringToReturn = list.join(" || ");
    return stringToReturn;
}

export const createFilterFormula = (recordsList, fieldToSearch) => {
    let stringToReturn;
    let stringOpen = `OR({${fieldToSearch}}="`;
    let stringClose = `")`;
    let orSequence = () => {
        if (recordsList.length > 1) {
            return recordsList.join(`", {${fieldToSearch}}="`)
        } else {
            return `${recordsList[0]}`;
        }
    };
    stringToReturn = stringOpen + orSequence() + stringClose;
    return stringToReturn;
}