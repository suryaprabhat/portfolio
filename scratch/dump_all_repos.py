import urllib.request
import json

url = "https://api.github.com/users/suryaprabhat/repos?per_page=100"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        repos = json.loads(response.read().decode())
        print(f"Total repos: {len(repos)}")
        formatted = []
        for r in repos:
            formatted.append({
                'name': r['name'],
                'description': r['description'] or 'No description provided.',
                'language': r['language'] or 'Python',
                'stars': r['stargazers_count'],
                'url': r['html_url'],
                'fork': r['fork']
            })
        print(json.dumps(formatted, indent=2))
except Exception as e:
    print(e)
