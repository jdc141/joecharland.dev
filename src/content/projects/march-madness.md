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

## Features

Select any real tournament matchup and instantly see side-by-side team comparisons, derived matchup analytics, and predictions from two models — a deterministic formula model and a trained ML model. Compare model outputs against live DraftKings market odds.

## Tech

Built with Python and Streamlit. Team ratings come from the KenPom API, while schedule data, scores, and betting lines come from ESPN's free scoreboard API. The ML model is trained on 15 years of historical tournament results paired with pre-game KenPom ratings.
