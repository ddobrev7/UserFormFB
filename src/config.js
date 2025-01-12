const config = {
    development: {
      timeoutInMiliseconds: 1000,
    }
  };
  
 const currentEnvironment = process.env.NODE_ENV || 'development';
  
 export default config[currentEnvironment];