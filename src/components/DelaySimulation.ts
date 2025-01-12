export const simulateNetworkDelay = (ms:any) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
