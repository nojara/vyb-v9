

## Plan: Replace All Slide Copywriting

### Summary
Rewrite the entire `RAW_SLIDES` array in `src/data/slides.ts` to match all 35 sections of the new copywriting document. This preserves existing layouts, themes, animations, media assets, and artist data — only the text content (headlines, subheadlines, body, pillars, stats, timeline, table) changes.

### Mapping: New Sections → Existing Slide Infrastructure

The current deck has ~36 slides. The new document has 35 sections. Here's the mapping, reusing existing layouts/themes and adjusting where the new content demands a different structure:

| New Section | Slide ID | Layout | Key Changes |
|---|---|---|---|
| 01 Hero | S01 | heroCenter | Minor text tweaks (already close) |
| 02 What is Vyb | S02 | editorialLeft | New longer body copy |
| 03 Simple Idea | S03 | manifesto | Updated body with Red Bull analogy |
| 04 What Actually Happens | S04 | editorialLeft | Completely new episode description |
| 05 Format Difference | S05 | cardGrid | Pillars: Intimate/Real/Connected/Ownable |
| 06 Brand Case | S06 | manifesto | Updated body about authenticity |
| 07 Business Case (Cultural Apex) | S08 | editorialLeft | Vision 2030 body, remove S07 editorial compass |
| 08 Two Forces | S09 | editorialSplit | Updated closing line |
| 09 Business of Vyb | S10 | editorialLeft | Same structure, minor text |
| 10 Four Levers | S11 | cardGrid | Updated pillar text + closing statement |
| 11 The Market | S13 | metricsGrid | Same stats, add sub-labels |
| 12 The Void | S14 | editorialLeft | Updated body with urgency |
| 13 The Episode (core) | New | editorialLeft | Long 6-step episode walkthrough |
| 14 Episode Structure | S21+S22 | timeline | Merge into single 7-act timeline |
| 15 Co-Creation Space | New | editorialSplit | Phygital — stage vs studio |
| 16 The Host | S23 | portraitSplit | Updated body copy |
| 17 Host Value | S24 | cardGrid | Same 3 pillars, updated text |
| 18 Snapchat | S16 | editorialLeft | Updated with "HOW IT WORKS" list |
| 19 One Episode Output | S18 | metricsGrid | New stats: 5 video/3 audio/4 social/12 total |
| 20 Season Total | S15/S28 | metricsGrid | New stats: 10/33/31/40/110+ |
| 21 The Winner | S20 | manifesto | Updated body about superfans |
| 22 How We Find Winner | S20a+S20b | editorialLeft + cardGrid | Updated selection funnel 200→20→5→1 |
| 23 What Winner Gets | S20c-S20f | editorialLeft | EP + MV + launch package + distribution |
| 24 Where Music Goes | S20g | cardGrid | Add Snapchat + Mobily App pillars |
| 25 The Loop | S20h | manifesto | Updated loop copy + closing line |
| 26 Mobily Integration | S20j | cardGrid | Watch/Vote/Stream/Exclusives + new body |
| 27 Media Partner | S25 | editorialLeft | Updated Billboard body |
| 28 Artist Roster | S25b | artistGrid | Same artist data, keep as-is |
| 29 Tier 1 Icons | S26 | editorialLeft | Updated body + featured names |
| 30 Tier 2 Pioneers | S27 | editorialSplit | Updated pillars + featured names |
| 31 Deliverables Table | S33 | table | Completely new verified asset matrix |
| 32 El Batron | S34 | editorialLeft | Updated body copy |
| 33 High-Production Visions | S35 | editorialSplit | Same structure, updated text |
| 34 Closing Hero | S36 | closing | Same structure |
| 35 Final CTA | New/S36 | closing | Merge with closing or keep as final slide |

### Slides Removed (content no longer in new doc)
- S07 (Editorial Compass) — replaced by section 06's approach content
- S12 (Compounding Logic) — absorbed into section 10 closing statement
- S19 (Music Output standalone) — absorbed into episode output sections
- S20i (Growth Builds) — absorbed into The Loop
- S20k (Passive to Active) — absorbed into Mobily Integration
- S20l (Content Levels) — removed
- S20m (Network to Culture) — absorbed into Mobily Integration
- S28 (VYB Content Engine old stats) — replaced by section 20
- S29 (Content Architecture) — removed
- S30 (Content Machine) — absorbed into deliverables
- S31 (Content Pillars intro) — merged into section 31
- S32 (Reach Benchmarks) — moved to bottom of section 31

### Implementation
One large edit to `src/data/slides.ts` replacing the `RAW_SLIDES` array with ~35 slides matching the new copywriting exactly. All existing `bgImage`, `bgVideo`, `media`, `artistData`, themes, layouts, and motion keys are preserved — only text fields change. The slide count reduces from ~36 to ~35, consolidating redundant slides.

### Technical Details
- File changed: `src/data/slides.ts` (rewrite RAW_SLIDES array)
- No layout/component changes needed — all existing layouts support the new content
- The `textBlocks` array on each slide will be updated to match new content
- Table slide (S31) gets the new verified asset matrix with correct numbers
- Stats slides get the corrected numbers (33 tracks, 41 video, 110+ total)
- Arabic translations in `src/data/translations-ar.ts` may need a follow-up pass

