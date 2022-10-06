const TotalProductSales = ({ data }) => {  
    return (
      <div
        style={{
          marginLeft: "10px",
          width: "250px", 
        }}
      >
        <h2 style={{ fontSize: "2em" }}>
          {data ? `Total Raised: $${data}` : `No sales yet`}
        </h2>
      </div>
    );
  };
  
  export default TotalProductSales;