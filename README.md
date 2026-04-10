**Introduction**

PBTI (Programmer Behavioral Type Indicator) is a behavioral personality assessment tool designed to analyze programmer-AI interaction patterns. It presents a 32-question quiz that captures behavioral tendencies across five dimensions—Prompt, Review, Stack, Emotion, and Workflow—and generates a real-time personality match with one of 24 distinct types. The project balances educational insight with entertainment value, targeting developers and AI enthusiasts who want to reflect on their collaboration styles with artificial intelligence. Its pixel-art visual design with CRT effects immerses users in a nostalgic yet modern interface, while the scoring algorithms provide nuanced dimensional profiles and actionable insights.

**Project Structure**

The project follows a clean separation of concerns:

Frontend presentation and user interaction live in the HTML and CSS files, with JavaScript orchestrating navigation, rendering, and animations.
Data for questions, personalities, and loading tips resides in a dedicated data module.
The scoring engine encapsulates the algorithmic logic for computing dimensional profiles and personality matches.
Utility scripts support model validation, simulation, and maintenance tasks.

**Core Components**

1. Behavioral Dimensions and Questions
  Five-dimensional model: Prompt (P), Review (R), Stack (S), Emotion (E), and Workflow (W). Each dimension is composed of three sub-dimensions, mapped to 32 questions that capture behavioral tendencies.
  The data module defines questions, scoring weights per option, and 24 personality types with associated dimensional profiles.

2. Scoring Engine
  The algorithm computes dimensional profiles by aggregating weighted scores per sub-dimension, then normalizes each dimension to a 1–5 scale.
  It calculates personality matches by comparing the user’s dimensional profile against predefined personality types and ranks the closest matches.

3. User Interface and Experience
  Pages: Home, Quiz, Loading, and Results. Navigation is handled by the application logic, with smooth transitions and pixel/CRT styling.
  Real-time feedback: progress bar, animated stat bars, and dynamic result rendering.
Sharing: copy-to-clipboard functionality for quick social sharing of results.

4. Visual Design
  Pixel borders, CRT scanlines, glitch text, and vibrant color accents create a distinctive retro-futuristic aesthetic   aligned with the theme of programmer-AI interaction.
