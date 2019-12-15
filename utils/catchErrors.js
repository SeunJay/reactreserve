function catchErrors(error, displayError) {
  let errorMsg;

  if (error.response) {
    errorMsg = error.response.data;
    console.log("Error", errorMsg);

    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
      console.log("Error", errorMsg);
    }
  } else if (error.request) {
    errorMsg = error.request;
    console.log("Error", errorMsg);
  } else {
    errorMsg = error.message;
    console.log("Error", errorMsg);
  }

  displayError(errorMsg);
}

export default catchErrors;
