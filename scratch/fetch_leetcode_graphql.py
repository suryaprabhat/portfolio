import urllib.request
import json

print("====================================")
print("FETCHING LEETCODE VIA GRAPHQL")
print("====================================")

url = "https://leetcode.com/graphql"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
    "Referer": "https://leetcode.com/Surya_Prabhat/",
    "Origin": "https://leetcode.com"
}

query = {
    "query": """
    query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
            profile {
                ranking
                reputation
            }
        }
    }
    """,
    "variables": {
        "username": "Surya_Prabhat"
    }
}

try:
    req = urllib.request.Request(
        url, 
        data=json.dumps(query).encode('utf-8'), 
        headers=headers,
        method="POST"
    )
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode('utf-8'))
        print(json.dumps(res, indent=2))
except Exception as e:
    print("GraphQL request failed:", e)
