const selectStatusColor = (status) => {
    switch (status) {
        case 'Inquiry':
            return '#f50';
        case 'Active':
            return '#7cb305';
        case 'Finalized':
            return '#faad14';
        case 'Delivered':
            return '#597ef7';
        case 'Cancelled':
            return '#bfbfbf';
        case 'paid':
            return '#7cb305';
        case 'unpaid':
            return '#f50';
        default:
            return '#bfbfbf';
    }
};

export default selectStatusColor;
