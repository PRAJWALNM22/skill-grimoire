import { NextRequest, NextResponse } from "next/server";

export type WeatherConditionType =
  | "thunderstorm"
  | "rainy"
  | "cloudy"
  | "sunny"
  | "sunset"
  | "night"
  | "hazy";

export interface WeatherDataResponse {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: WeatherConditionType;
  conditionLabel: string;
  wmoCode: number;
  isDay: boolean;
  timeOfDay: "morning" | "afternoon" | "sunset" | "evening" | "night";
  humidity: number;
  windSpeed: number;
  localTime: string;
  formattedDate: string;
  source: "live" | "fallback" | "simulated";
}

// Map WMO Weather Codes to our dynamic themes
function mapWmoToCondition(code: number, isDay: boolean, hour: number): {
  condition: WeatherConditionType;
  conditionLabel: string;
  timeOfDay: "morning" | "afternoon" | "sunset" | "evening" | "night";
} {
  let timeOfDay: "morning" | "afternoon" | "sunset" | "evening" | "night" = "morning";
  if (hour >= 5 && hour < 12) timeOfDay = "morning";
  else if (hour >= 12 && hour < 17) timeOfDay = "afternoon";
  else if (hour >= 17 && hour < 19) timeOfDay = "sunset";
  else if (hour >= 19 && hour < 22) timeOfDay = "evening";
  else timeOfDay = "night";

  // Thunderstorm
  if ([95, 96, 99].includes(code)) {
    return {
      condition: "thunderstorm",
      conditionLabel: "Thunderstorm & Tempest",
      timeOfDay,
    };
  }

  // Rain / Drizzle / Showers
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      condition: "rainy",
      conditionLabel: "Rain Showers",
      timeOfDay,
    };
  }

  // Fog / Haze — distinct dusty/gritty atmosphere
  if ([45, 48].includes(code)) {
    return {
      condition: "hazy",
      conditionLabel: "Hazy & Misty",
      timeOfDay,
    };
  }

  // Snow
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      condition: "cloudy",
      conditionLabel: "Misty Overcast",
      timeOfDay,
    };
  }

  // Cloudy / Overcast
  if ([2, 3].includes(code)) {
    return {
      condition: "cloudy",
      conditionLabel: code === 2 ? "Partly Cloudy" : "Overcast",
      timeOfDay,
    };
  }

  // Clear / Sunny (or Night Starry / Sunset depending on time)
  if (timeOfDay === "sunset") {
    return {
      condition: "sunset",
      conditionLabel: "Golden Sunset",
      timeOfDay,
    };
  }

  if (!isDay || timeOfDay === "night" || timeOfDay === "evening") {
    return {
      condition: "night",
      conditionLabel: "Starry Night",
      timeOfDay,
    };
  }

  return {
    condition: "sunny",
    conditionLabel: "Clear & Radiant",
    timeOfDay,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");
  const cityParam = searchParams.get("city");

  let lat = latParam ? parseFloat(latParam) : null;
  let lon = lonParam ? parseFloat(lonParam) : null;
  let cityName = cityParam || "";
  let countryName = "India";

  // 1. If city/PIN code query is explicitly provided, geocode it to coordinates
  if (cityParam && cityParam.trim() !== "") {
    try {
      const searchRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityParam.trim())}&countrycodes=in&format=json&limit=1`,
        {
          headers: { "User-Agent": "SkillGrimoireWeather/1.0" },
          signal: AbortSignal.timeout(4000),
        }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData && searchData.length > 0) {
          lat = parseFloat(searchData[0].lat);
          lon = parseFloat(searchData[0].lon);
          const parts = searchData[0].display_name.split(",");
          let clean = parts[0]?.trim() || cityParam.trim();
          clean = clean
            .replace(/Yallappa Nayakana Hosakote/i, "Y N Hosakote")
            .replace(/Y\.?\s*N\.?\s*Hosakote/i, "Y N Hosakote");
          cityName = clean;
          countryName = "India";
        }
      }
    } catch (e) {
      console.warn("City geocode search failed:", e);
    }
  }

  // 2. If coordinates are provided (from browser GPS), reverse-geocode them to get the actual city/village
  if (lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon)) {
    if (!cityName) {
      // Try OpenStreetMap Nominatim for exact village / town / locality level resolution
      try {
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          {
            headers: { "User-Agent": "SkillGrimoireWeather/1.0" },
            signal: AbortSignal.timeout(3500),
          }
        );
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          const nCity =
            nomData.address?.village ||
            nomData.address?.suburb ||
            nomData.address?.town ||
            nomData.address?.city ||
            nomData.address?.county ||
            nomData.address?.state_district;
          if (nCity) cityName = nCity;
          if (nomData.address?.country) countryName = nomData.address.country;
        }
      } catch {}

      // Fallback to BigDataCloud reverse geocode
      if (!cityName) {
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
            { signal: AbortSignal.timeout(3500) }
          );
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            const detectedCity =
              geoData.locality ||
              geoData.city ||
              geoData.principalSubdivision ||
              geoData.localityInfo?.administrative?.[2]?.name;
            if (detectedCity) cityName = detectedCity;
            if (geoData.countryName) countryName = geoData.countryName;
          }
        } catch {}
      }

      // Normalize common extended names for cleaner UI display
      if (cityName) {
        cityName = cityName
          .replace(/Yallappa Nayakana Hosakote/i, "Y N Hosakote")
          .replace(/Y\.?\s*N\.?\s*Hosakote/i, "Y N Hosakote");
      }
    }
  } else {
    // If coordinates are not provided, detect user's current location via IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfIp = request.headers.get("cf-connecting-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : null) || realIp || cfIp || "";
    const isLocalOrPrivate = !clientIp || clientIp === "127.0.0.1" || clientIp === "::1" || clientIp.startsWith("192.168.") || clientIp.startsWith("10.") || clientIp.startsWith("172.");

    try {
      const ipUrl = isLocalOrPrivate ? "http://ip-api.com/json/" : `http://ip-api.com/json/${clientIp}`;
      const ipRes = await fetch(ipUrl, { signal: AbortSignal.timeout(3500) });
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        if (ipData.status === "success") {
          lat = ipData.lat;
          lon = ipData.lon;
          if (!cityName) cityName = ipData.city || ipData.regionName || "Your Location";
          if (ipData.country) countryName = ipData.country;
        }
      }
    } catch {}
  }

  // Fallback if everything fails
  if (lat === null || lon === null || isNaN(lat) || isNaN(lon)) {
    lat = 12.9716;
    lon = 77.5946;
  }
  if (!cityName) {
    cityName = "Your Location";
  }

  try {
    // 1. Fetch live Open-Meteo data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto&timeformat=unixtime`;
    
    const weatherRes = await fetch(weatherUrl, { next: { revalidate: 300 } });
    
    if (!weatherRes.ok) {
      throw new Error(`OpenMeteo HTTP error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    const current = weatherData.current;
    const isDay = current.is_day === 1;
    const wmoCode = current.weather_code ?? 0;
    const temp = Math.round(current.temperature_2m ?? 24);
    const feelsLike = Math.round(current.apparent_temperature ?? temp);
    const humidity = Math.round(current.relative_humidity_2m ?? 60);
    const windSpeed = Math.round(current.wind_speed_10m ?? 12);

    // Parse local time from response using UTC offset to get correct local hour
    // Open-Meteo returns current.time as a unix timestamp when timeformat=unixtime
    const utcOffsetSeconds: number = weatherData.utc_offset_seconds ?? 0;
    const currentUnixTime: number = typeof current.time === "number" ? current.time : Math.floor(Date.now() / 1000);
    const localTimestamp = currentUnixTime + utcOffsetSeconds;
    const localHour = Math.floor((localTimestamp % 86400) / 3600);

    const mapped = mapWmoToCondition(wmoCode, isDay, localHour);

    // Format display date and time
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: weatherData.timezone || "Asia/Kolkata",
    });

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: weatherData.timezone || "Asia/Kolkata",
    });

    const now = new Date();
    const localTimeString = timeFormatter.format(now);
    const formattedDateString = dateFormatter.format(now);

    const response: WeatherDataResponse = {
      city: cityName,
      country: countryName,
      temp,
      feelsLike,
      condition: mapped.condition,
      conditionLabel: mapped.conditionLabel,
      wmoCode,
      isDay,
      timeOfDay: mapped.timeOfDay,
      humidity,
      windSpeed,
      localTime: localTimeString,
      formattedDate: formattedDateString,
      source: "live",
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Weather fetch fallback trigger:", err);
    // Graceful fallback with atmospheric default
    const fallbackResponse: WeatherDataResponse = {
      city: cityName,
      country: countryName,
      temp: 24,
      feelsLike: 25,
      condition: "thunderstorm",
      conditionLabel: "Partly Cloudy",
      wmoCode: 95,
      isDay: false,
      timeOfDay: "evening",
      humidity: 65,
      windSpeed: 14,
      localTime: "7:25 PM",
      formattedDate: "May 20, 2025",
      source: "fallback",
    };
    return NextResponse.json(fallbackResponse);
  }
}
