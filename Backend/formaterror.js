function formatErrorMessage(itemIds, errorCode) {
    const formattedItems = itemIds.map(id => ({
      item_id: id,
      error: errorCode
    }));
  
    return JSON.stringify(formattedItems);
  }
  
  // Example usage:
  const itemIds = ["I1", "I2", "I3"];
  const errorCode = "40002";
  const errorMessage = formatErrorMessage(itemIds, errorCode);
  
  const errorResponse = {
    error: {
      type: "DOMAIN-ERROR",
      code: errorCode,
      message: errorMessage
    }
  };
  
  console.log(JSON.stringify(errorResponse, null, 2));
  