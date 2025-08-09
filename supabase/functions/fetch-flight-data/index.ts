import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { flightNumber, date } = await req.json()
    
    if (!flightNumber) {
      return new Response(
        JSON.stringify({ error: 'Flight number is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get API key from Supabase secrets
    const apiKey = Deno.env.get('AVIATIONSTACK_API_KEY')
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Format flight number (remove spaces, convert to uppercase)
    const formattedFlightNumber = flightNumber.replace(/\s+/g, '').toUpperCase()
    
    // Use AviationStack API to fetch flight data
    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${formattedFlightNumber}&limit=1`
    
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`API error: ${data.error?.message || 'Unknown error'}`)
    }

    if (!data.data || data.data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Flight not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const flight = data.data[0]
    
    // Transform the API response to match our FlightData interface
    const flightData = {
      flightNumber: flight.flight.iata || flightNumber,
      departure: {
        airport: flight.departure.iata,
        city: flight.departure.timezone?.split('/')[1]?.replace('_', ' ') || flight.departure.iata,
        time: flight.departure.scheduled || flight.departure.estimated
      },
      arrival: {
        airport: flight.arrival.iata,
        city: flight.arrival.timezone?.split('/')[1]?.replace('_', ' ') || flight.arrival.iata,
        time: flight.arrival.scheduled || flight.arrival.estimated
      }
    }

    return new Response(
      JSON.stringify({ flightData }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error fetching flight data:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch flight data' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})