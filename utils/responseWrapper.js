export const success = (statusCode, message, result) => {
  return {
    status: "OK",
    statusCode: statusCode,
    message: message,
    result: result?result:"No Results Found",
  };
};

export const error = (statusCode, message, result) => {
   return {
     status: "ERROR",
     statusCode: statusCode,
     message: message,
     result: result,
   };
 };
 
 export const warning = (statusCode, message, result) => {
   return {
     status: "WARNING",
     statusCode: statusCode,
     message: message,
     result: result,
   };
 };

