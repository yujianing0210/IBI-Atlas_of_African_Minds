import csv
import json
import re

def parse_coordinates(coord_str):
    """Parse coordinates string like '-5.10, 38.60' into lat, lng"""
    if not coord_str or coord_str.strip() == '':
        return None, None

    # Remove quotes if present
    coord_str = coord_str.strip('"')

    # Split by comma
    parts = coord_str.split(',')
    if len(parts) != 2:
        return None, None

    try:
        lat = float(parts[0].strip())
        lng = float(parts[1].strip())
        return lat, lng
    except ValueError:
        return None, None

def convert_csv_to_json():
    quotes = []

    with open('quotes.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            # Parse coordinates
            lat, lng = parse_coordinates(row.get('Coordinates (Lat, Long)', ''))

            if lat is None or lng is None:
                print(f"Skipping entry due to invalid coordinates: {row.get('Tribe', row.get('Author', 'Unknown'))}")
                continue

            # Determine name and type
            tribe = row.get('Tribe', '').strip()
            author = row.get('Author', '').strip()

            if tribe:
                name = tribe
                quote_type = 'tribe'
            elif author:
                name = author
                quote_type = 'person'
            else:
                print(f"Skipping entry - no tribe or author: {row}")
                continue

            # Clean quote content (remove extra quotes)
            quote = row.get('Quote Content', '').strip()
            if quote.startswith('"') and quote.endswith('"'):
                quote = quote[1:-1]

            quote_entry = {
                'id': len(quotes) + 1,
                'quote': quote,
                'name': name,
                'type': quote_type,
                'country_region': row.get('Country/Region', '').strip(),
                'latitude': lat,
                'longitude': lng,
                'background': row.get('Background Info', '').strip()
            }

            quotes.append(quote_entry)

    return quotes

if __name__ == '__main__':
    quotes = convert_csv_to_json()
    print(f"Converted {len(quotes)} quotes from CSV")

    # Save to JSON
    with open('public/data/quotes.json', 'w', encoding='utf-8') as f:
        json.dump(quotes, f, indent=2, ensure_ascii=False)

    print("Saved to public/data/quotes.json")

    # Show sample
    print("\nSample entries:")
    for i, quote in enumerate(quotes[:3]):
        print(f"{i+1}: {quote['name']} ({quote['type']}) - {quote['country_region']}")