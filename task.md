# Tử Vi Vận Hạn 2026 - Task Breakdown

## Phase 1: Project Setup & Engine Enhancement
- [ ] Create new Vite project in target workspace
- [ ] Port existing `tuvi.js` engine to new project
- [ ] Add Nguyệt vận (monthly fortune) calculation for 2026
- [ ] Add Đại vận (10-year period) calculation module
- [ ] Create `vanhan2026.js` for year-specific fortune engine

## Phase 2: UI Components - Modern Design
- [ ] Design system setup (CSS variables, typography, colors)
- [ ] Form input component (birth info + target year)
- [ ] 12-Cung chart component (based on existing LaSo.jsx)
- [ ] Tab navigation (Tổng quan | Nguyệt vận | Đại vận | 12 Cung)
- [ ] Monthly fortune cards (12 months)
- [ ] Fortune score chart (điểm vận khí 0-100)
- [ ] 10-year period timeline chart

## Phase 3: AI Interpretation (Gemini)
- [ ] Create AI interpretation service module
- [ ] System prompt for Tu Vi interpretation
- [ ] User prompt template with JSON chart data
- [ ] Parse and display AI responses
- [ ] Add loading states and error handling

## Phase 4: Profile Management
- [ ] Local storage for saved charts
- [ ] Profile list with search/filter
- [ ] Pin "main chart" feature
- [ ] Family chart management

## Phase 5: Advanced Features
- [ ] Settings: interpretation tone, length, language
- [ ] Disclaimer modal
- [ ] Charts/visualizations (thịnh suy, tài lộc, timeline)
- [ ] Export PDF functionality

## Verification
- [ ] Test chart generation accuracy vs thienluong.net
- [ ] Test monthly fortune calculation
- [ ] Verify AI interpretation format
- [ ] Test responsive design
