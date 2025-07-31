
async function fetchLeaderboard() {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                console.log("Leaderboard data fetched:", data.data);
                const leaderboard = data.data.map(player => {
                    const score = (player.correct || 0) * 10;
                    return {
                        name: player.name || "N/A",
                        department: player.department || "N/A",
                        correct: player.correct ?? 0,
                        incorrect: player.incorrect ?? 0,
                        score
                    };
                });

                leaderboard.sort((a, b) => b.score - a.score);
                leaderboard.forEach((p, i) => p.rank = i + 1);

                updateLeaderboardUI(leaderboard);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        }