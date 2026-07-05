const express = require('express');
const router = express.Router();

const GITHUB_USERNAME = 'suryaprabhat';
const LEETCODE_USERNAME = 'Surya_Prabhat';

// Fallback stats in case of rate-limiting or network issues
const fallbackStats = {
  github: {
    publicRepos: 47,
    languages: [
      { name: 'Python', percentage: 45 },
      { name: 'JavaScript', percentage: 25 },
      { name: 'TypeScript', percentage: 15 },
      { name: 'HTML/CSS', percentage: 15 }
    ]
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
    github: { 
      publicRepos: fallbackStats.github.publicRepos,
      languages: [...fallbackStats.github.languages]
    },
    leetcode: { ...fallbackStats.leetcode }
  };

  // 1. Fetch GitHub Stats & Language Distribution dynamically
  try {
    const headers = { 'User-Agent': 'Mozilla/5.0 Node-Fetch' };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user repositories to analyze actual programming languages and count repos
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
      headers
    });
    
    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      
      // Update publicRepos count dynamically from the actual repos array length (resolves to 47)
      stats.github.publicRepos = repos.length;

      const langCounts = {};
      let totalLangs = 0;

      for (const repo of repos) {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          totalLangs++;
        }
      }

      if (totalLangs > 0) {
        // Calculate percentages
        const languages = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangs) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage);

        stats.github.languages = languages;
      }
    } else {
      console.warn(`GitHub API request failed with status: ${reposResponse.status}. Using fallback repos count.`);
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
