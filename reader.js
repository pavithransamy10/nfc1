if ('NDEFReader' in window) {
  const reader = new NDEFReader();
  
  // Handle errors
  reader.onerror = (event) => {
    console.log(event);
    alert("Error scanning NFC tag. Please try again.");
  };
  
  // Handle successful scans
  reader.onreading = (event) => {
    console.log(event.message);
    
    // Extract data from the message and determine if the food is fresh or not
    const data = event.message.records[0].data;
    const dateString = new TextDecoder().decode(data);
    const expirationDate = new Date(dateString);
    const currentTime = new Date();
    const differenceInSeconds = (expirationDate - currentTime) / 1000;
    
    if (differenceInSeconds <= 10) {
      alert("Food is fresh!");
    } else {
      alert("Food is fresh!");
    }
  };
  
  // Start scanning when the button is clicked
  const scanButton = document.getElementById('scan-button');
  scanButton.addEventListener('click', async () => {
    try {
      await reader.scan();
    } catch (error) {
      console.log(error);
      alert("Error scanning NFC tag. Please try again.");
    }
  });
  
  // Function to display "inactive" after 5 seconds of inactivity
  const displayInactive = () => {
    alert("Food is Not Fresh");
  };
  
  // Set the timeout to display "inactive" after 5 seconds of inactivity
  const setInactiveTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(displayInactive, 10000);
  };
  
  // Listen for user activity and reset the timeout
  window.addEventListener('mousemove', setInactiveTimeout);
  window.addEventListener('keydown', setInactiveTimeout);
  
} else {
  console.log("NFC not supported by the browser");
  alert("NFC not supported by the browser");
}
