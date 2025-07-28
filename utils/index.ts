import { CarProps, FilterProps } from "@types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age
  
  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);
  
  // Set the specified search parameter to the given value
  searchParams.set(type, value);
  
  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);
  
  // Delete the specified search parameter
  newSearchParams.delete(type.toLowerCase());
  
  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;
  
  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  
  // Debug: Log the API key to make sure it's being read
  console.log("API Key:", process.env.NEXT_PUBLIC_RAPID_API_KEY ? "Key found" : "Key missing");
  console.log("Filters:", filters);
  
  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  
  // Build URL with only non-empty parameters
  const params = new URLSearchParams();
  
  // Only add parameters that have actual values
  if (manufacturer && manufacturer.trim() !== '') {
    params.append('make', manufacturer.toLowerCase());
  }
  if (year && year > 0) {
    params.append('year', year.toString());
  }
  if (model && model.trim() !== '') {
    params.append('model', model.toLowerCase());
  }
  if (fuel && fuel.trim() !== '') {
    // Map fuel types to API expected values
    const fuelMap: {[key: string]: string} = {
      'gas': 'gas',
      'gasoline': 'gas',
      'diesel': 'diesel',
      'electric': 'electricity',
      'electricity': 'electricity'
    };
    const mappedFuel = fuelMap[fuel.toLowerCase()] || fuel.toLowerCase();
    params.append('fuel_type', mappedFuel);
  }
  
  // DO NOT include limit parameter for free tier
  // Free tier gets default of 1 result, premium gets more
  
  const apiUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${params.toString()}`;
  console.log("API URL:", apiUrl);
  console.log("Headers:", headers);
  
  try {
    const response = await fetch(apiUrl, {
      headers: headers,
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      
      // If specific filters don't work, try a simple request
      if (params.toString() !== '') {
        console.log("Trying fallback request with just make=toyota...");
        const fallbackResponse = await fetch(
          `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=toyota`,
          { headers: headers }
        );
        
        if (fallbackResponse.ok) {
          const fallbackResult = await fallbackResponse.json();
          console.log("Fallback result:", fallbackResult);
          return fallbackResult || [];
        }
      }
      
      return [];
    }
    
    // Parse the response as JSON
    const result = await response.json();
    console.log("API Result:", result);
    console.log("Number of cars returned:", result?.length || 0);
    
    return result || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  
  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  
  return `${url}`;
}