// not yet in use

type ListingNormalized = {
    countryCode: string;
    address?: {
        street?: string;
        houseNumber?: string;
        postalCode?: string;
        city?: string;
        region?: string;
    };

    geo?: { lat: number; lon: number };

    propertyType: "apartment" | "apartment_block" | "commercial" | "construction_plot" | "garage" | "house" | "new_apartment" | "new_house" | "other_plot";
    transactionType: "sale" | "rent" | "new_build" | "life_annuity" | "public_sale";

    price?: {
        type: "full" | "excluding_vat" | "starting_from" | "monthly";
        amount: number;
        options?: Array<{name?: string; amount: number}>; // for apartment garages, basement storages, or add-ons
        monthlyAnnuity?: number;
    } | null;

    areas?: {
        livingArea?: number | null;
        parcelArea?: number | null;
    };

    rooms?: { bedrooms?: number | null; bathrooms?: number | null };

    energy?: { epcLabel?: "A" | "B" | "C" | "D" | "E" | "F" | "G" | null; epcValue?: number | null };

    features?: {
        hasTerrace?: boolean | null;
        terraceArea?: number | null;
        hasParking?: boolean | null;
    };

    description?: string;
    
    media?: Array<{ type: "image" | "video" | "floorplan" | "3d_model"; url: string }>;

    publishedAt?: string;
};

type SourceMeta = {
    source: string;              // e.g. "immoweb"
    sourceListingId?: string;
    listingUrl: string;
    scrapedAt: string;
    locale?: string;
};

type ExtractionReport = {
  overall: { status: "ok" | "partial" | "failed" };
  warnings: Array<{ code: string; message: string }>;
  fieldDetails: Record<
    string,
    {
      raw: unknown;
      extractionMethod: "table" | "regex" | "css" | null;
    }
  >;
};

type CanonicalListing = {
  listingNormalized: ListingNormalized;
  sourceMeta: SourceMeta;
  extractionReport: ExtractionReport;
  extras: Record<string, Record<string, unknown>>; // extras[source][key]; e.g: views and saves
};