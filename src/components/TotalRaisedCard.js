const TotalRaisedCard = ({ amount }) => {
    return (
    <div 
        style={{
            marginLeft: "10px",
            width: "250px",
        }}
    >
      <h2 style={{ fontSize: "2em" }}>
        {amount ? `Total Raised: $${amount.toFixed(2)}` : `No proceeds yet`}
      </h2>
    </div>
  );
};

export default TotalRaisedCard;
