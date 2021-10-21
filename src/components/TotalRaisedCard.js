import react from 'react';

const TotalRaisedCard = ({ amount }) => {
    return (
    <div 
        style={{
            marginLeft: "10px",
            width: "250px",
        }}
    >
        <h2 style={{ fontSize: "2em"}}>{`Total Raised: $${amount.toFixed(2)}`}</h2>
    </div>
    )
};

export default TotalRaisedCard;