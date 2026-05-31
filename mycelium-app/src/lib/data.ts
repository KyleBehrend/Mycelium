// Mycelium — sample data (TypeScript)

export type Stream = {
  id: string;
  label: string;
  short: string;
  color: string;   // accent (--ac) — derived from the stream's clay icon
  dot: string;     // pip colour (matches the accent in the Stream Shop system)
  tagline: string; // one-line description shown on the Dashboard hero
};

export type Org = {
  id: string;
  name: string;
  country: string;
  logo: string;
  tint: string;
  streams: string[];
  members: number;
};

export type Person = {
  id: string;
  name: string;
  org: string;
  role: string;
  country: string;
  streams: string[];
  title: string;
  tint: string;
};

export type Campaign = {
  id: string;
  title: string;
  org: string;
  streams: string[];
  start: string;
  end: string;
  featured: boolean;
  cta: string;
  support: string[];
  description: string;
  supporters: number;
};

export type Learning = {
  id: string;
  author: string;
  title: string;
  streams: string[];
  content: string;
  when: string;
  reactions: { helpful: number; insightful: number; bookmarked: number };
  comments: number;
  pinned: boolean;
};

export type SocialPost = {
  id: string;
  user: string;
  org: string;
  platform: 'linkedin' | 'twitter' | 'instagram';
  streams: string[];
  description: string;
  request: string;
  when: string;
  engagements: number;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  type: string;
  stream: string;
  source: string;
  updated: string;
  size: string;
  downloads: number;
};

export type LearningFeedItem = {
  id: string;
  source: string;
  title: string;
  when: string;
  stream: string;
  summary: string;
};

export type UpcomingTask = {
  label: string;
  due: string;
  stream: string;
};

// Accent colours are derived from each stream's 3D clay icon, so chips, hero
// washes, stat numbers and active rings all read off the one --ac value.
export const STREAMS: Stream[] = [
  { id: 'public-health', label: 'Public Health', short: 'Health', color: '#C2674E', dot: '#C2674E', tagline: 'Diet, nutrition and dietary guidelines — the clinical case for plant-rich eating.' },
  { id: 'research', label: 'Research & Academia', short: 'Research', color: '#3F4E8F', dot: '#3F4E8F', tagline: 'Alt-protein science and food-systems research building the evidence base.' },
  { id: 'policy', label: 'Policy Change', short: 'Policy', color: '#5E7A4E', dot: '#5E7A4E', tagline: 'EU and national food policy, advocacy and the legislative agenda.' },
  { id: 'corporate', label: 'Corporate & Industry', short: 'Corporate', color: '#A85A30', dot: '#A85A30', tagline: 'Food manufacturers and the supply chain reformulating toward plants.' },
  { id: 'culinary', label: 'Culinary Training', short: 'Culinary', color: '#D2772E', dot: '#D2772E', tagline: 'Chefs and culinary schools making plant-forward cooking the default craft.' },
  { id: 'farm', label: 'Farm Adaptation', short: 'Farm', color: '#3E6B3A', dot: '#3E6B3A', tagline: 'Crop diversification and regenerative transition for growers.' },
  { id: 'retail', label: 'Retailer Engagement', short: 'Retail', color: '#6E7A42', dot: '#6E7A42', tagline: 'Supermarkets and grocery: shifting the plant-to-animal sales ratio on the shelf.' },
  { id: 'consumer', label: 'Consumer Engagement', short: 'Consumer', color: '#C9622E', dot: '#C9622E', tagline: 'Behaviour-change campaigns that move the public from intention to plate.' },
  { id: 'public-food', label: 'Public Food', short: 'Public Food', color: '#2E6E6A', dot: '#2E6E6A', tagline: 'Schools, hospitals and procurement — defaulting institutions to plant-rich menus.' },
  { id: 'universities', label: 'Universities', short: 'Universities', color: '#4F6A99', dot: '#4F6A99', tagline: 'Campus food and the student movement building the next generation of advocates.' },
  { id: 'media', label: 'Media & Film', short: 'Media', color: '#B23636', dot: '#B23636', tagline: 'Documentary, journalism and storytelling that reframes the food conversation.' },
  { id: 'capacity', label: 'Capacity Building', short: 'Capacity', color: '#4E7A52', dot: '#4E7A52', tagline: 'Nonprofit strategy and the movement infrastructure that holds it together.' },
  { id: 'careers', label: 'Careers & Talent', short: 'Careers', color: '#8E3A86', dot: '#8E3A86', tagline: 'Jobs, recruiting and the training pipelines that staff the movement.' },
  { id: 'law', label: 'Law & Litigation', short: 'Law', color: '#3E4651', dot: '#3E4651', tagline: 'Food law and legal advocacy — pressure through the courts.' },
];

export const streamById = (id: string): Stream => STREAMS.find(s => s.id === id) || STREAMS[0];

export const ORGS: Org[] = [
  { id: 'veganuary', name: 'Veganuary', country: 'UK', logo: 'V', tint: '#B03E78', streams: ['consumer', 'public-health'], members: 4 },
  { id: 'proveg', name: 'ProVeg International', country: 'Germany', logo: 'P', tint: '#2E5EA8', streams: ['policy', 'consumer', 'corporate'], members: 6 },
  { id: 'gfi-eu', name: 'Good Food Institute Europe', country: 'EU', logo: 'G', tint: '#6A4C93', streams: ['research', 'policy', 'corporate'], members: 5 },
  { id: 'proveg-intl', name: 'Planetary Plates Network', country: 'Global', logo: 'PP', tint: '#1B7A55', streams: ['public-food', 'culinary'], members: 3 },
  { id: 'vegansoc', name: 'The Vegan Society', country: 'UK', logo: 'VS', tint: '#B03E78', streams: ['consumer', 'capacity'], members: 4 },
  { id: 'eapf', name: 'European Alliance for Plant-based Foods', country: 'EU', logo: 'EA', tint: '#2E5EA8', streams: ['policy', 'corporate'], members: 4 },
  { id: 'dvf', name: 'Danish Vegetarian Assoc.', country: 'Denmark', logo: 'DV', tint: '#157A6E', streams: ['public-health', 'public-food'], members: 2 },
  { id: 'albert', name: 'Albert Schweitzer Stiftung', country: 'Germany', logo: 'AS', tint: '#8A6310', streams: ['retail', 'consumer'], members: 3 },
  { id: 'l214', name: 'L214', country: 'France', logo: 'L', tint: '#2E5EA8', streams: ['policy', 'media'], members: 3 },
  { id: 'animaleq', name: 'Animal Equality', country: 'Spain', logo: 'AE', tint: '#2E5EA8', streams: ['policy', 'media'], members: 2 },
  { id: 'sdi', name: 'Stray Dog Institute', country: 'US/EU', logo: 'S', tint: '#1C6E8C', streams: ['capacity', 'careers'], members: 2 },
  { id: 'faunalytics', name: 'Faunalytics', country: 'Global', logo: 'F', tint: '#6A4C93', streams: ['research'], members: 2 },
  { id: 'slingshot', name: 'Project Slingshot', country: 'UK', logo: 'PS', tint: '#3E6B3A', streams: ['farm', 'corporate', 'media', 'policy'], members: 3 },
];

export const orgById = (id: string): Org => ORGS.find(o => o.id === id)!;

export const PEOPLE: Person[] = [
  { id: 'u-mara', name: 'Mara Lindqvist', org: 'veganuary', role: 'Campaigns Director', country: 'Sweden', streams: ['consumer', 'public-health'], title: 'Track Lead — Consumer Campaigns', tint: '#B03E78' },
  { id: 'u-amelie', name: 'Amélie Rousseau', org: 'l214', role: 'EU Policy Lead', country: 'France', streams: ['policy', 'law'], title: 'Member', tint: '#2E5EA8' },
  { id: 'u-jonas', name: 'Jonas Eriksen', org: 'dvf', role: 'Executive Director', country: 'Denmark', streams: ['public-health', 'public-food'], title: 'Member', tint: '#157A6E' },
  { id: 'u-priya', name: 'Priya Iyer', org: 'gfi-eu', role: 'Senior Policy Analyst', country: 'Belgium', streams: ['research', 'policy'], title: 'Track Lead — Alt Proteins', tint: '#6A4C93' },
  { id: 'u-tomas', name: 'Tomáš Novák', org: 'proveg', role: 'Retail Engagement Manager', country: 'Czechia', streams: ['retail', 'consumer'], title: 'Member', tint: '#8A6310' },
  { id: 'u-isabel', name: 'Isabel Moreno', org: 'animaleq', role: 'Investigations Lead', country: 'Spain', streams: ['policy', 'media'], title: 'Member', tint: '#2E5EA8' },
  { id: 'u-anke', name: 'Anke Hoffmann', org: 'albert', role: 'Corporate Outreach', country: 'Germany', streams: ['retail', 'corporate'], title: 'Member', tint: '#8A6310' },
  { id: 'u-finn', name: "Finn O'Brien", org: 'eapf', role: 'Policy Strategist', country: 'Ireland', streams: ['policy', 'consumer'], title: 'Member', tint: '#2E5EA8' },
  { id: 'u-elena', name: 'Elena Marchetti', org: 'eapf', role: 'Senior Policy Officer', country: 'Italy/EU', streams: ['policy', 'law'], title: 'Track Lead — Policy & Advocacy', tint: '#2E5EA8' },
  { id: 'u-marcus', name: 'Marcus Halberg', org: 'sdi', role: 'Program Director', country: 'Germany', streams: ['capacity', 'careers'], title: 'Admin', tint: '#1C6E8C' },
  { id: 'u-saoirse', name: 'Saoirse Walsh', org: 'faunalytics', role: 'Research Director', country: 'Ireland', streams: ['research'], title: 'Track Lead — Research', tint: '#6A4C93' },
  { id: 'u-leah', name: 'Leah Bauer', org: 'vegansoc', role: 'Communications Lead', country: 'UK', streams: ['consumer', 'media'], title: 'Member', tint: '#B03E78' },
  { id: 'u-pieter', name: 'Pieter van Dijk', org: 'proveg', role: 'EU Affairs Director', country: 'Netherlands', streams: ['policy', 'corporate'], title: 'Member', tint: '#2E5EA8' },
  { id: 'u-noor', name: 'Noor Yilmaz', org: 'veganuary', role: 'Growth & Partnerships', country: 'UK', streams: ['consumer', 'retail'], title: 'Member', tint: '#B03E78' },
];

export const personById = (id: string): Person => PEOPLE.find(p => p.id === id)!;
export const CURRENT_USER = PEOPLE[0];

export const CAMPAIGNS: Campaign[] = [
  { id: 'c-veg27', title: 'Veganuary 2027 — Launch', org: 'veganuary', streams: ['consumer', 'public-health', 'media'], start: '2026-12-01', end: '2027-01-31', featured: true, cta: 'Share the launch posts from Jan 1 and tag #Veganuary2027. Businesses: register a product or menu launch before the early-December deadline.', support: ['social_media', 'newsletter'], description: "The world's largest plant-based campaign returns for its 2027 edition — a 31-day vegan pledge. Around 30 million people took part in 2026; the published 5-year strategy targets 33M+ for 2027.", supporters: 64 },
  { id: 'c-slingshot', title: 'Project Slingshot — Ban CO2 Gas Chambers for Pigs', org: 'slingshot', streams: ['policy', 'corporate', 'farm', 'media'], start: '2026-04-01', end: '2026-12-31', featured: true, cta: "Sign the petition to DEFRA to ban CO2 gas chambers for pigs, email your MP, and tell Tesco and McDonald's to drop pork from CO2-gassed pigs.", support: ['petition', 'policy_action', 'social_media'], description: 'The debut campaign from Project Slingshot, the new anti-factory-farming org from Veganuary co-founder Matthew Glover. A celebrity-fronted push across 200+ London Underground stations, part of a goal to end factory farming by 2040.', supporters: 38 },
  { id: 'c-plantrich', title: 'Plant-Rich Europe — retailer call', org: 'proveg', streams: ['retail', 'corporate', 'public-health'], start: '2026-04-21', end: '2026-12-31', featured: true, cta: 'Endorse the Plant-Rich Europe call: ask supermarkets to measure their plant-to-animal sales ratio, disclose it annually, and set targets aligned to the Planetary Health Diet.', support: ['policy_action', 'social_media'], description: 'A joint civil-society call (ProVeg, Madre Brava, WRI, WWF + 25 orgs across 12 countries) urging European retailers to rebalance plant- vs animal-based food sales — targeting 60% plant-based by 2035.', supporters: 47 },
  { id: 'c-labelling', title: 'Defend fair plant-based food names', org: 'eapf', streams: ['policy', 'law', 'consumer', 'retail'], start: '2026-03-05', end: '2026-09-30', featured: true, cta: 'Brief your MEPs before formal adoption: keep plant-based naming proportionate. "Veggie burger" survived the trilogue — now stop the 31 restricted terms from fragmenting the single market.', support: ['policy_action'], description: "Following the 5 March 2026 provisional EU deal restricting animal terms (e.g. 'steak', 'drumstick') on plant-based products, EAPF and allies are pushing to keep the final rules coherent through adoption.", supporters: 53 },
  { id: 'c-incubator', title: 'ProVeg Incubator — Fast-track to Impact (Cohort 2)', org: 'proveg', streams: ['careers', 'capacity', 'research'], start: '2026-05-12', end: '2026-06-21', featured: false, cta: 'Spread the word to alt-protein founders: applications for Cohort 2 close June 21. Equity-free, fully online, 300+ mentors.', support: ['newsletter', 'social_media'], description: "The world's first alt-protein accelerator is recruiting its second cohort — a three-month online programme culminating in a pitch at The New Food Paradigm in Paris.", supporters: 12 },
  { id: 'c-altprot111', title: 'Alt proteins: the €111bn EU opportunity', org: 'gfi-eu', streams: ['policy', 'research', 'farm'], start: '2026-01-28', end: '2026-12-31', featured: false, cta: 'Use the new economic data in your EU outreach: alternative proteins could add €111bn/yr and 414,000 jobs by 2040. Press for a dedicated European Alternative Protein Strategy.', support: ['policy_action'], description: "GFI Europe's Systemiq-backed analysis (Jan 2026) quantifying the upside of alternative proteins, fuelling the call for a Horizon Europe protein-diversification partnership and €50m+/yr in public R&D.", supporters: 29 },
  { id: 'c-schoolplates', title: 'ProVeg School Plates', org: 'proveg', streams: ['public-food', 'public-health', 'culinary'], start: '2026-01-01', end: '2026-12-31', featured: false, cta: 'Refer a local authority or school caterer for free menu consultation, recipe development, and chef training to add and promote plant-based school meals.', support: ['event'], description: "ProVeg UK's award-winning programme (APPG Excellence in School Food, 2025) helping 100+ catering partners raise the quality and uptake of plant-based meals in schools.", supporters: 22 },
  { id: 'c-aeendff', title: 'End Factory Farming — UK petition', org: 'animaleq', streams: ['policy', 'farm'], start: '2026-02-01', end: '2026-12-31', featured: false, cta: 'Sign and share the petition calling on the UK Government to phase out factory farming — from mother-pig cages to the gassing of male chicks.', support: ['petition'], description: "Animal Equality's UK petition, built on a decade of farm and slaughterhouse investigations, pressing the government to transition away from factory farming.", supporters: 31 },
  { id: 'c-l214turkey', title: 'L214: Carrefour & the Plant Protein Pact', org: 'l214', streams: ['corporate', 'retail', 'farm', 'law'], start: '2026-05-06', end: '2026-08-31', featured: false, cta: "Sign the petition asking Carrefour to honour the Plant Protein Pact after L214's investigation into turkeys raised for its own-brand range.", support: ['petition'], description: "A May 2026 L214 exposé of an intensive turkey farm in Maine-et-Loire — birds confined 126 days in uncleaned sheds, meat sold under Carrefour's 'Simpl' brand. A legal complaint has been filed.", supporters: 18 },
  { id: 'c-livevegan', title: 'Live Vegan for Less', org: 'vegansoc', streams: ['consumer', 'culinary', 'public-health'], start: '2026-06-01', end: '2026-08-31', featured: false, cta: 'Share your low-budget vegan recipes via the campaign form, and pass on the cost-comparison tips with #LiveVeganForLess.', support: ['social_media', 'newsletter'], description: "The Vegan Society's affordability campaign — budget recipes, cost-comparison research, and policy asks — relaunching with an influencer recipe series over summer 2026.", supporters: 26 },
  { id: 'c-plantpotential', title: 'Plant Potential — retail & industry', org: 'albert', streams: ['corporate', 'retail', 'capacity'], start: '2026-01-01', end: '2026-12-31', featured: false, cta: 'Connect food manufacturers and retailers to the Plant Potential toolbox: diversification targets, plant-based defaults, and price-parity support.', support: ['event'], description: "Albert Schweitzer Foundation's B2B programme helping food companies shift portfolios toward plant-based, alongside its influential supermarket plant-based and animal-welfare rankings.", supporters: 14 },
  { id: 'c-summit', title: 'Plant Food System Summit — Berlin', org: 'proveg-intl', streams: ['capacity', 'policy', 'consumer', 'research'], start: '2026-11-21', end: '2026-11-22', featured: true, cta: 'Apply to attend or submit a session proposal for the Summit (Berlin, Nov 21-22). It is for the people running the movement, across all 14 tracks.', support: ['event'], description: "The movement's annual gathering in Berlin, convened by a coalition including ProVeg, EAPF, and Planetary Plates Network — two days to connect, share what works, and coordinate across the 14 tracks.", supporters: 41 },
  { id: 'c-livestock', title: 'EU Livestock Strategy — June window', org: 'eapf', streams: ['policy', 'farm'], start: '2026-05-01', end: '2026-06-30', featured: false, cta: "Coordinate messaging ahead of the Commission's EU livestock strategy (expected June 2026): push for protein diversification and a plant-rich transition.", support: ['policy_action'], description: "The European Commission's long-term livestock strategy is due in June 2026 after its spring call for evidence — a key window to shape how the EU frames the future of protein.", supporters: 33 },
];

export const LEARNINGS: Learning[] = [
  { id: 'l-school', author: 'u-jonas', title: 'What worked (and didn\u2019t) in our Copenhagen schools pilot', streams: ['public-food', 'public-health'], content: 'Three things mattered more than we expected: (1) the chefs, not the parents, were the hardest sell — their identity was tied to the old menu; (2) reframing as "default plant + opt-in meat" worked, "meatless Mondays" didn\u2019t; (3) the dietitian endorsement letter unlocked the principals. Happy to share the template.', when: '2 days ago', reactions: { helpful: 24, insightful: 12, bookmarked: 9 }, comments: 7, pinned: true },
  { id: 'l-mep', author: 'u-elena', title: 'MEPs are saturated. The aides aren\u2019t.', streams: ['policy'], content: 'We shifted plant protein policy outreach from MEPs to their policy assistants in March. Response rate went from 4% to 31%. The aides are younger, hungrier for substantive briefings, and they write the lines. Treating them as the actual audience changed everything.', when: '4 days ago', reactions: { helpful: 38, insightful: 22, bookmarked: 18 }, comments: 12, pinned: false },
  { id: 'l-retail', author: 'u-tomas', title: 'The retail buyer doesn\u2019t care about your values', streams: ['retail'], content: 'I\u2019ve pitched 14 retailers this year. The pitch that lands is: "here is the SKU economics, here is the basket-uplift data from three comparable launches, here is the shelf plan." Mission talk loses the room in the first 90 seconds. Save it for the press release.', when: '1 week ago', reactions: { helpful: 41, insightful: 19, bookmarked: 27 }, comments: 15, pinned: false },
  { id: 'l-cm', author: 'u-priya', title: 'Cultivated meat language: "cell-cultivated" > "lab-grown" (data inside)', streams: ['research', 'consumer'], content: 'Ran a 1,200-person panel across DE/FR/IT. "Cell-cultivated" outperforms "lab-grown" by 17pp on intent-to-try. "Cultivated" alone is fine but underperforms by 6pp vs the full phrase. Avoid "synthetic" entirely — it tanks scores.', when: '1 week ago', reactions: { helpful: 32, insightful: 28, bookmarked: 21 }, comments: 9, pinned: false },
  { id: 'l-grant', author: 'u-marcus', title: 'Three-page grant proposals get funded. Twenty-page ones don\u2019t.', streams: ['capacity'], content: 'I reviewed 60 funded proposals from the last two cycles across four major foundations. The median funded proposal was 3.2 pages. The median rejected one was 8.4. The pattern is clear: short proposals force you to lead with the change, not the methodology. Write the press release, then the proposal.', when: '2 weeks ago', reactions: { helpful: 51, insightful: 33, bookmarked: 42 }, comments: 18, pinned: false },
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 'sp-1', user: 'u-elena', org: 'eapf', platform: 'linkedin', streams: ['policy', 'corporate'], description: 'Op-ed on the EU protein strategy and why plant-based should be the default. Looking for shares from policy folks.', request: 'Repost + tag one MEP from your country', when: '2h ago', engagements: 23 },
  { id: 'sp-2', user: 'u-mara', org: 'veganuary', platform: 'twitter', streams: ['consumer'], description: 'Veganuary 2027 sign-up page is live. Aim for 2M pledges — every share counts.', request: 'Quote-tweet with your org\u2019s endorsement', when: '5h ago', engagements: 41 },
  { id: 'sp-3', user: 'u-priya', org: 'gfi-eu', platform: 'linkedin', streams: ['research'], description: 'New consumer-language report on cultivated meat. Methodology + raw data linked.', request: 'Comment with which finding surprised you most', when: '1d ago', engagements: 18 },
  { id: 'sp-4', user: 'u-jonas', org: 'dvf', platform: 'instagram', streams: ['public-food'], description: 'Behind-the-scenes from the Copenhagen schools pilot. Visuals are strong this time.', request: 'Repost to stories', when: '1d ago', engagements: 31 },
  { id: 'sp-5', user: 'u-tomas', org: 'proveg', platform: 'linkedin', streams: ['retail'], description: 'Albert Heijn launch deck — full retail engagement playbook published as a LinkedIn doc.', request: 'Share + tag any retailer contacts you think should see this', when: '2d ago', engagements: 27 },
  { id: 'sp-6', user: 'u-isabel', org: 'animaleq', platform: 'twitter', streams: ['policy', 'media'], description: 'New investigation exposing factory farming conditions in Spain. Full documentary drops Friday.', request: 'Like + bookmark the teaser thread', when: '2d ago', engagements: 15 },
];

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  { id: 'd-1', title: 'SPAA Module 04 — Strategic Planning for Advocacy Orgs', type: 'course_material', stream: 'capacity', source: 'SPAA / SPII Curriculum', updated: 'Apr 2026', size: '42p PDF', downloads: 218 },
  { id: 'd-2', title: 'Retail Engagement Playbook — Northern Europe', type: 'best_practice', stream: 'retail', source: 'ProVeg + Albert Schweitzer', updated: 'May 2026', size: '28p PDF', downloads: 184 },
  { id: 'd-3', title: 'Cultivated Meat Consumer Language — EU 5-country study', type: 'report', stream: 'research', source: 'GFI Europe', updated: 'Apr 2026', size: '64p PDF', downloads: 312 },
  { id: 'd-4', title: '2025 Plant Food System Summit — Workshop Transcripts', type: 'summit_transcript', stream: 'capacity', source: 'Summit \u201925 — Vienna', updated: 'Jan 2026', size: '186 docs', downloads: 89 },
  { id: 'd-5', title: 'EU Protein Strategy — Campaign playbook', type: 'case_study', stream: 'policy', source: 'European Alliance for Plant-based Foods', updated: 'Mar 2026', size: '14p', downloads: 156 },
  { id: 'd-6', title: 'School Meals Default-Plant Pilot — Copenhagen', type: 'case_study', stream: 'public-food', source: 'Danish Vegetarian Assoc.', updated: 'May 2026', size: '11p', downloads: 92 },
  { id: 'd-7', title: 'Foundation Grant Proposal Templates (3-page format)', type: 'best_practice', stream: 'capacity', source: 'Stray Dog Institute', updated: 'Feb 2026', size: '6 docs', downloads: 246 },
  { id: 'd-8', title: 'Faunalytics 2026 Research Library Index', type: 'external', stream: 'research', source: 'Faunalytics', updated: 'Apr 2026', size: 'index', downloads: 174 },
  { id: 'd-9', title: 'EU Dietary Guidelines — Submission Toolkit', type: 'best_practice', stream: 'public-health', source: 'ProVeg Policy', updated: 'May 2026', size: '9 docs', downloads: 127 },
  { id: 'd-10', title: 'Movement Capacity Assessment — framework + scoring', type: 'best_practice', stream: 'capacity', source: 'SPAA Cohort 2025', updated: 'Mar 2026', size: '22p', downloads: 103 },
];

export const LEARNING_FEED: LearningFeedItem[] = [
  { id: 'lf-1', source: 'ProVeg International', title: 'Civil-society coalition calls on European supermarkets to go plant-rich', when: '4h ago', stream: 'retail', summary: 'ProVeg, Madre Brava, WRI and WWF — backed by 25 orgs across 12 countries — launched Plant-Rich Europe, asking retailers to measure and rebalance plant- vs animal-based sales toward 60% plant-based by 2035.' },
  { id: 'lf-2', source: 'ProVeg / EU', title: "EU agrees new rules on plant-based food names — 'veggie burger' survives", when: '1d ago', stream: 'policy', summary: "A 5 March 2026 provisional trilogue deal restricts 31 animal terms (e.g. 'steak', 'drumstick') on plant-based products but preserves format names like burger, sausage and nuggets. Final adoption still pending." },
  { id: 'lf-3', source: 'GFI Europe', title: 'Alt proteins could add €111bn to the EU economy by 2040', when: '2d ago', stream: 'research', summary: 'A Systemiq analysis for GFI Europe finds alternative proteins could generate €111bn/year and 414,000 jobs by 2040 with the right investment — fuelling calls for a dedicated European Alternative Protein Strategy.' },
  { id: 'lf-4', source: 'Euractiv', title: 'EU livestock strategy expected in June after spring consultation', when: '3d ago', stream: 'farm', summary: 'The Commission is due to present its long-term livestock strategy in June 2026 following its call for evidence (closed 10 April). Advocates are pushing for protein diversification rather than entrenchment.' },
  { id: 'lf-5', source: 'The Grocer', title: 'Veganuary founder launches anti-factory-farming campaign on the Tube', when: '5d ago', stream: 'media', summary: "Project Slingshot, Matthew Glover's new org, debuted its celebrity-fronted 'Ban CO2 Gas Chambers for Pigs' campaign across 200+ London Underground stations, aiming to make factory farming socially indefensible." },
];

export const UPCOMING_TASKS: UpcomingTask[] = [
  { label: 'Sign the Project Slingshot petition to ban CO2 gas chambers', due: 'Due Jun 05', stream: 'policy' },
  { label: 'Endorse the Plant-Rich Europe retailer call', due: 'Due Jun 10', stream: 'retail' },
  { label: 'Brief MEPs on the EU plant-based labelling deal', due: 'Due Jun 12', stream: 'policy' },
  { label: 'Share ProVeg Incubator before applications close Jun 21', due: 'Due Jun 18', stream: 'careers' },
];

// Stream-filter matching for the multi-select "shop by stream" model.
// An empty selection means "all streams" (no filter). Otherwise an item shows
// if any of its streams is in the active selection.
export const matchesStreams = (itemStreams: string[], active: string[]): boolean =>
  active.length === 0 || itemStreams.some(s => active.includes(s));
export const matchesStream = (stream: string, active: string[]): boolean =>
  active.length === 0 || active.includes(stream);

// Real activity count per stream — campaigns + resources + learnings + posts +
// people that touch the stream. Drives the sidebar row counts, the "browse all
// 14 streams" tiles, and the hero stats so the numbers reflect actual content.
export function streamActivityCount(id: string): number {
  const inStreams = (arr: { streams: string[] }[]) => arr.filter(x => x.streams.includes(id)).length;
  const inStream = (arr: { stream: string }[]) => arr.filter(x => x.stream === id).length;
  return (
    inStreams(CAMPAIGNS) +
    inStream(KNOWLEDGE_DOCS) +
    inStreams(LEARNINGS) +
    inStreams(SOCIAL_POSTS) +
    inStreams(PEOPLE)
  );
}
