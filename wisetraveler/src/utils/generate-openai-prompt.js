export function generatePrompt(values) {
    const tripPreferences = {
      adventure: values.adventure ? true : false,
      luxury: values.luxury ? true : false,
      nature: values.nature ? true : false,
    };
  
    return JSON.stringify({
      instructions: "You are an expert travel planner who designs unique and personalized travel itineraries.",
      prompt: "Generate a well-balanced itinerary for an unforgettable trip based on the following preferences.",
      
      tripDetails: {
        destination: values.destination,
        budget: values.budget, // Budget, Mid-range, or Luxury
        duration: values.duration, // in days
        group_size: values.group_size, // Number of travelers
        preferences: tripPreferences,
      },
  
      rules: {
        format: "Return a valid JSON object.",
        title: "Provide a catchy and exciting title for the trip.",
        description: "Summarize the unique experience of the trip.",
        itinerary: {
          details: "List daily activities with time, activity name, and location.",
          food: "Include at least one recommended restaurant or local dish per day.",
          experience: "Suggest sightseeing, adventure, cultural experiences, and relaxation.",
          budgetMatching: "Ensure activities match the traveler’s budget and preferences.",
        },
        costBreakdown: {
          estimate: "Provide an estimated budget for accommodation, food, activities, and transport.",
          matchBudget: "Ensure the cost matches the selected budget type.",
          totalCost: "Show a total estimated cost.",
        },
      },
  
      responseFormat: {
        title: "Trip title",
        description: "Short description of the trip",
        destination: "Destination provided by the user",
        budget: "Budget category (Budget, Mid-range, or Luxury)",
        duration: "Total trip length in days",
        group_size: "Number of travelers",
        preferences: {
          adventure: "Boolean",
          luxury: "Boolean",
          nature: "Boolean",
        },
        itinerary: [
          {
            day: "Number",
            activities: [
              {
                time: "String",
                activity: "String",
                location: "String",
                estimated_cost: "Number",
              },
            ],
            recommended_food: {
              restaurant: "String",
              dish: "String",
              estimated_cost: "Number",
            },
          },
        ],
        cost_estimate: {
          accommodation: "Number",
          food: "Number",
          activities: "Number",
          transport: "Number",
          total: "Number",
        },
      },
  
      example: {
        title: "Tropical Adventure in Bali",
        description: "Experience Bali’s rich culture, stunning beaches, and thrilling adventures...",
        destination: "Bali, Indonesia",
        budget: "Mid-range",
        duration: 7,
        group_size: 2,
        preferences: { adventure: true, luxury: false, nature: true },
        itinerary: [
          {
            day: 1,
            activities: [
              { time: "10:00 AM", activity: "Visit Uluwatu Temple", location: "Uluwatu", estimated_cost: 15 },
              { time: "1:00 PM", activity: "Relax at Padang Padang Beach", location: "South Bali", estimated_cost: 5 },
            ],
            recommended_food: {
              restaurant: "Warung Made",
              dish: "Nasi Goreng",
              estimated_cost: 10,
            },
          },
        ],
        cost_estimate: {
          accommodation: 500,
          food: 200,
          activities: 300,
          transport: 150,
          total: 1150,
        },
      },
  
      finalInstructions: "Respond ONLY with the completed JSON object. No extra text or explanations.",
    }, null, 2);
  }
  