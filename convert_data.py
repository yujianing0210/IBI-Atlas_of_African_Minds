import json

# Load the original data
with open('src/data/quotes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Loaded {len(data)} quotes")

# Convert to new format
converted_data = []
for i, item in enumerate(data, 1):
    # Determine type: if name has spaces and is all caps, it's a person; otherwise tribe
    name = item['source']
    # Person names have spaces, tribe names don't
    quote_type = 'person' if ' ' in name else 'tribe'

    converted_item = {
        'id': i,
        'quote': item['quote'],
        'name': name,
        'type': quote_type,
        'country_region': item['location'],
        'latitude': item['latitude'],
        'longitude': item['longitude'],
        'background': item['background']
    }
    converted_data.append(converted_item)

# Save the converted data
with open('src/data/quotes.json', 'w', encoding='utf-8') as f:
    json.dump(converted_data, f, indent=2, ensure_ascii=False)

print("Data conversion completed!")