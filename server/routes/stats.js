const express = require('express');
const router = express.Router();

const GITHUB_USERNAME = 'suryaprabhat';
const LEETCODE_USERNAME = 'Surya_Prabhat';

// Fallback stats in case of rate-limiting or network issues
const fallbackStats = {
  github: {
    publicRepos: 30,
  },
  leetcode: {
    totalSolved: 203,
    easySolved: 157,
    mediumSolved: 46,
    hardSolved: 0,
    ranking: '789,252',
  }
};

router.get('/', async (req, res) => {
  const stats = {
    github: { ...fallbackStats.github },
    leetcode: { ...fallbackStats.leetcode }
  };

  // 1. Fetch GitHub Stats
  try {
    const ghResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 Node-Fetch' }
    });
    if (ghResponse.ok) {
      const ghData = await ghResponse.json();
      stats.github.publicRepos = ghData.public_repos;
    }
  } catch (err) {
    console.error('Failed to fetch live GitHub stats:', err.message);
  }

  // 2. Fetch LeetCode Stats via GraphQL
  try {
    const query = {
      query: `
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
            }
          }
        }
      `,
      variables: {
        username: LEETCODE_USERNAME
      }
    };

    const lcResponse = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Referer': `https://leetcode.com/${LEETCODE_USERNAME}/`,
        'Origin': 'https://leetcode.com'
      },
      body: JSON.stringify(query)
    });

    if (lcResponse.ok) {
      const lcData = await lcResponse.json();
      const user = lcData.data?.matchedUser;
      if (user) {
        const ranking = user.profile?.ranking;
        if (ranking) {
          stats.leetcode.ranking = ranking.toLocaleString();
        }
        
        const submissions = user.submitStatsGlobal?.acSubmissionNum;
        if (submissions) {
          for (const sub of submissions) {
            if (sub.difficulty === 'All') stats.leetcode.totalSolved = sub.count;
            if (sub.difficulty === 'Easy') stats.leetcode.easySolved = sub.count;
            if (sub.difficulty === 'Medium') stats.leetcode.mediumSolved = sub.count;
            if (sub.difficulty === 'Hard') stats.leetcode.hardSolved = sub.count;
          }
        }
      }
    }
  } catch (err) {
    console.error('Failed to fetch live LeetCode stats:', err.message);
  }

  res.json(stats);
});

module.exports = router;
