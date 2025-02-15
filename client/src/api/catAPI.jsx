export const retrieveCatFacts = async () => {
  try {
    const response = await fetch("https://catfact.ninja/fact"); 

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Cat Fact:", data.fact); 
    return data.fact; 
  } catch (error) {
    console.error("Error retrieving cat fact:", error);
    return "Could not fetch a cat fact at this time."; 
  }
};
