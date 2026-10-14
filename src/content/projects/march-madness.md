---
title: "March Madness Predictor"
description: "NCAA tournament matchup explorer with live KenPom ratings, dual prediction models, and real-time ESPN odds comparison."
image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop"
tech: ["Python", "Streamlit", "KenPom API", "ESPN API", "scikit-learn"]
order: 1
inProgress: false
demo: [true, "https://madness.joecharland.dev"]
deployed: true
github: [true, "https://github.com/jdc141/march-madness-model"]
---

A live March Madness prediction engine powered by KenPom efficiency ratings and the ESPN tournament schedule API.

## 2026 Tournament Results

Every pick was graded against the final scores of all 67 games in the 2026 tournament, using the KenPom ratings as they stood on the morning of each game and DraftKings lines from ESPN.

| Pick type | Record | Hit rate |
| --- | --- | --- |
| ML model, game winners | 49–18 | 73.1% |
| Formula model, game winners | 48–19 | 71.6% |
| Both models agreed | 45–15 | 75.0% |
| Betting favorite (baseline) | 48–19 | 71.6% |
| Formula spread picks (1.5+ pt edge) | 17–15 | 53.1% |
| Formula over/under picks (2+ pt edge) | 5–5 | 50.0% |

- **Picking winners:** the ML model finished one game ahead of the betting favorites, and the formula model matched them exactly. Both models picked Michigan in the title game.
- **Against the spread:** 53.1% is just above the 52.4% needed to break even at standard −110 pricing, on a small sample of 32 picks.
- **Over/under:** only graded from March 22 on, after the totals model was reworked mid-tournament.
- **Moneyline value bets:** the one clear miss. Flat one-unit bets lost 5.2 units on the formula model (21–14) and 7.4 units on the ML model (19–27).

## Features

Select any real tournament matchup and instantly see side-by-side team comparisons, derived matchup analytics, and predictions from two models — a deterministic formula model and a trained ML model. Compare model outputs against live DraftKings market odds.

## Tech

Built with Python and Streamlit. Team ratings come from the KenPom API, while schedule data, scores, and betting lines come from ESPN's free scoreboard API. The ML model is trained on 15 years of historical tournament results paired with pre-game KenPom ratings.
