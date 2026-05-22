// Mycelium — sample data (TypeScript)

export type Stream = {
  id: string;
  label: string;
  short: string;
  color: string;
  dot: string;
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

export const STREAMS: Stream[] = [
  { id: 'public-health', label: 'Public Health', short: 'Health', color: '#52796F', dot: '#84A98C' },
  { id: 'research', label: 'Research & Academia', short: 'Research', color: '#5E548E', dot: '#9F86C0' },
  { id: 'policy', label: 'Policy Change', short: 'Policy', color: '#2D6A4F', dot: '#40916C' },
  { id: 'corporate', label: 'Corporate & Industry', short: 'Corporate', color: '#6B4226', dot: '#A87C5F' },
  { id: 'culinary', label: 'Culinary Training', short: 'Culinary', color: '#B5651D', dot: '#D4A373' },
  { id: 'farm', label: 'Farm Adaptation', short: 'Farm', color: '#3A5A40', dot: '#6B8F71' },
  { id: 'retail', label: 'Retailer Engagement', short: 'Retail', color: '#4A6741', dot: '#7EA172' },
  { id: 'consumer', label: 'Consumer Engagement', short: 'Consumer', color: '#C46210', dot: '#E89848' },
  { id: 'public-food', label: 'Public Food', short: 'Public Food', color: '#1B6B5A', dot: '#4ECDC4' },
  { id: 'universities', label: 'Universities', short: 'Universities', color: '#3D5A80', dot: '#7E9DC0' },
  { id: 'media', label: 'Media & Film', short: 'Media', color: '#9B2226', dot: '#C9747A' },
  { id: 'capacity', label: 'Capacity Building', short: 'Capacity', color: '#1B4332', dot: '#74C69D' },
  { id: 'careers', label: 'Careers & Talent', short: 'Careers', color: '#7B2D8E', dot: '#B07CC6' },
  { id: 'law', label: 'Law & Litigation', short: 'Law', color: '#5C4033', dot: '#A0785C' },
];

export const streamById = (id: string): Stream => STREAMS.find(s => s.id === id) || STREAMS[0];

export const ORGS: Org[] = [
  { id: 'veganuary', name: 'Veganuary', country: 'UK', logo: 'V', tint: '#1B4332', streams: ['consumer', 'public-health'], members: 4 },
  { id: 'proveg', name: 'ProVeg International', country: 'Germany', logo: 'P', tint: '#2D6A4F', streams: ['policy', 'consumer', 'corporate'], members: 6 },
  { id: 'gfi-eu', name: 'Good Food Institute Europe', country: 'EU', logo: 'G', tint: '#40916C', streams: ['research', 'policy', 'corporate'], members: 5 },
  { id: 'ciwf', name: 'Compassion in World Farming', country: 'UK', logo: 'C', tint: '#52796F', streams: ['policy', 'farm'], members: 3 },
  { id: 'vegansoc', name: 'The Vegan Society', country: 'UK', logo: 'VS', tint: '#74C69D', streams: ['consumer', 'capacity'], members: 4 },
  { id: 'eurogroup', name: 'Eurogroup for Animals', country: 'EU', logo: 'EA', tint: '#3D5A80', streams: ['policy', 'law'], members: 4 },
  { id: 'dvf', name: 'Danish Vegetarian Assoc.', country: 'Denmark', logo: 'DV', tint: '#B5651D', streams: ['public-health', 'public-food'], members: 2 },
  { id: 'albert', name: 'Albert Schweitzer Stiftung', country: 'Germany', logo: 'AS', tint: '#6B4226', streams: ['retail', 'consumer'], members: 3 },
  { id: 'l214', name: 'L214', country: 'France', logo: 'L', tint: '#9B2226', streams: ['policy', 'media'], members: 3 },
  { id: 'animaleq', name: 'Animal Equality', country: 'Spain', logo: 'AE', tint: '#5E548E', streams: ['policy', 'media'], members: 2 },
  { id: 'sdi', name: 'Stray Dog Institute', country: 'US/EU', logo: 'S', tint: '#D4A373', streams: ['capacity', 'careers'], members: 2 },
  { id: 'faunalytics', name: 'Faunalytics', country: 'Global', logo: 'F', tint: '#9F86C0', streams: ['research'], members: 2 },
];

export const orgById = (id: string): Org => ORGS.find(o => o.id === id)!;

export const PEOPLE: Person[] = [
  { id: 'u-mara', name: 'Mara Lindqvist', org: 'veganuary', role: 'Campaigns Director', country: 'Sweden', streams: ['consumer', 'public-health'], title: 'Track Lead \u2014 Consumer Campaigns', tint: '#2D6A4F' },
  { id: 'u-amelie', name: 'Am\u00e9lie Rousseau', org: 'l214', role: 'EU Policy Lead', country: 'France', streams: ['policy', 'law'], title: 'Member', tint: '#9B2226' },
  { id: 'u-jonas', name: 'Jonas Eriksen', org: 'dvf', role: 'Executive Director', country: 'Denmark', streams: ['public-health', 'public-food'], title: 'Member', tint: '#B5651D' },
  { id: 'u-priya', name: 'Priya Iyer', org: 'gfi-eu', role: 'Senior Policy Analyst', country: 'Belgium', streams: ['research', 'policy'], title: 'Track Lead \u2014 Alt Proteins', tint: '#40916C' },
  { id: 'u-tomas', name: 'Tom\u00e1\u0161 Nov\u00e1k', org: 'proveg', role: 'Retail Engagement Manager', country: 'Czechia', streams: ['retail', 'consumer'], title: 'Member', tint: '#6B4226' },
  { id: 'u-isabel', name: 'Isabel Moreno', org: 'animaleq', role: 'Investigations Lead', country: 'Spain', streams: ['policy', 'media'], title: 'Member', tint: '#5E548E' },
  { id: 'u-anke', name: 'Anke Hoffmann', org: 'albert', role: 'Corporate Outreach', country: 'Germany', streams: ['retail', 'corporate'], title: 'Member', tint: '#6B4226' },
  { id: 'u-finn', name: "Finn O\u2019Brien", org: 'ciwf', role: 'Campaign Strategist', country: 'Ireland', streams: ['policy', 'consumer'], title: 'Member', tint: '#52796F' },
  { id: 'u-elena', name: 'Elena Marchetti', org: 'eurogroup', role: 'Senior Policy Officer', country: 'Italy/EU', streams: ['policy', 'law'], title: 'Track Lead \u2014 Policy & Advocacy', tint: '#3D5A80' },
  { id: 'u-marcus', name: 'Marcus Halberg', org: 'sdi', role: 'Program Director', country: 'Germany', streams: ['capacity', 'careers'], title: 'Admin', tint: '#D4A373' },
  { id: 'u-saoirse', name: 'Saoirse Walsh', org: 'faunalytics', role: 'Research Director', country: 'Ireland', streams: ['research'], title: 'Track Lead \u2014 Research', tint: '#9F86C0' },
  { id: 'u-leah', name: 'Leah Bauer', org: 'vegansoc', role: 'Communications Lead', country: 'UK', streams: ['consumer', 'media'], title: 'Member', tint: '#74C69D' },
  { id: 'u-pieter', name: 'Pieter van Dijk', org: 'proveg', role: 'EU Affairs Director', country: 'Netherlands', streams: ['policy', 'corporate'], title: 'Member', tint: '#2D6A4F' },
  { id: 'u-noor', name: 'Noor Yilmaz', org: 'veganuary', role: 'Growth & Partnerships', country: 'UK', streams: ['consumer', 'retail'], title: 'Member', tint: '#1B4332' },
];

export const personById = (id: string): Person => PEOPLE.find(p => p.id === id)!;
export const CURRENT_USER = PEOPLE[0];

export const CAMPAIGNS: Campaign[] = [
  { id: 'c-veg27', title: 'Veganuary 2027 \u2014 Launch Week', org: 'veganuary', streams: ['consumer', 'public-health'], start: '2026-12-26', end: '2027-01-08', featured: true, cta: 'Share our launch posts on LinkedIn and X between Jan 1\u20137. Tag #Veganuary2027 \u2014 we\u2019re aiming for 2M pledges this year.', support: ['social_media', 'newsletter'], description: 'Annual 31-day plant-based pledge. We\u2019re focusing 2027 on retail partnerships and the Northern European market.', supporters: 47 },
  { id: 'c-eudg', title: 'EU Dietary Guidelines \u2014 Public Consultation', org: 'proveg', streams: ['public-health', 'policy'], start: '2026-06-01', end: '2026-07-15', featured: true, cta: 'Submit individual + organizational responses to the EU consultation. Template + talking points in the linked brief.', support: ['policy_action', 'petition'], description: 'EFSA is updating its scientific opinion on dietary reference values. Window is short. Coordinated submissions are weighted more heavily.', supporters: 31 },
  { id: 'c-better', title: '\u201CBetter by Plants\u201D \u2014 Albert Heijn campaign', org: 'albert', streams: ['retail', 'consumer'], start: '2026-09-15', end: '2026-10-30', featured: false, cta: 'Buy + share the new co-branded Albert Heijn products. Photos of in-store displays \u2014 huge help for the case study deck.', support: ['social_media', 'event'], description: 'In-store + DTC push with Albert Heijn rolling out 24 new private-label products. NL pilot, EU expansion if KPIs hit.', supporters: 19 },
  { id: 'c-cage', title: 'End the Cage Age \u2014 implementation push', org: 'eurogroup', streams: ['policy', 'law'], start: '2026-06-10', end: '2026-09-30', featured: true, cta: 'Contact your MEP. We have a personalised draft for each member state. The Commission proposal lands in late September.', support: ['policy_action'], description: 'The Commission promised a legislative proposal by end of 2023. It\u2019s 2026. We need sustained pressure through Q3.', supporters: 58 },
  { id: 'c-school', title: 'Plant-based School Meals \u2014 Denmark pilot', org: 'dvf', streams: ['public-food', 'public-health'], start: '2026-08-15', end: '2026-12-15', featured: false, cta: 'Sign the open letter from Danish health professionals (now also accepting EU signatories). 4-min read, 30 sec to sign.', support: ['petition', 'newsletter'], description: 'Copenhagen schools moving to default-plant menus from August. Build the case for national rollout 2027.', supporters: 22 },
  { id: 'c-summit', title: 'Plant Food System Summit \u2014 Berlin', org: 'sdi', streams: ['capacity', 'consumer', 'policy'], start: '2026-11-12', end: '2026-11-14', featured: true, cta: 'Submit a session proposal by July 31. We\u2019re especially looking for retail & policy case studies from Southern Europe.', support: ['event'], description: 'Third annual summit. 220 attendees expected. Three tracks: policy, retail, capacity.', supporters: 41 },
  { id: 'c-altprot', title: 'Alt-Protein Regulation Briefing \u2014 DG SANTE', org: 'gfi-eu', streams: ['research', 'policy'], start: '2026-06-18', end: '2026-06-18', featured: false, cta: 'Closed-door briefing. RSVP-only. If your org has European cultivated meat producers in its network, please flag for invite list.', support: ['event'], description: 'Setting the technical agenda for the next Novel Food regulation review.', supporters: 8 },
];

export const LEARNINGS: Learning[] = [
  { id: 'l-school', author: 'u-jonas', title: 'What worked (and didn\u2019t) in our Copenhagen schools pilot', streams: ['public-food', 'public-health'], content: 'Three things mattered more than we expected: (1) the chefs, not the parents, were the hardest sell \u2014 their identity was tied to the old menu; (2) reframing as \u201cdefault plant + opt-in meat\u201d worked, \u201cmeatless Mondays\u201d didn\u2019t; (3) the dietitian endorsement letter unlocked the principals. Happy to share the template.', when: '2 days ago', reactions: { helpful: 24, insightful: 12, bookmarked: 9 }, comments: 7, pinned: true },
  { id: 'l-mep', author: 'u-elena', title: 'MEPs are saturated. The aides aren\u2019t.', streams: ['policy'], content: 'We shifted End-the-Cage outreach from MEPs to their policy assistants in March. Response rate went from 4% to 31%. The aides are younger, hungrier for substantive briefings, and they write the lines. Treating them as the actual audience changed everything.', when: '4 days ago', reactions: { helpful: 38, insightful: 22, bookmarked: 18 }, comments: 12, pinned: false },
  { id: 'l-retail', author: 'u-tomas', title: 'The retail buyer doesn\u2019t care about your values', streams: ['retail'], content: 'I\u2019ve pitched 14 retailers this year. The pitch that lands is: \u201chere is the SKU economics, here is the basket-uplift data from three comparable launches, here is the shelf plan.\u201d Mission talk loses the room in the first 90 seconds. Save it for the press release.', when: '1 week ago', reactions: { helpful: 41, insightful: 19, bookmarked: 27 }, comments: 15, pinned: false },
  { id: 'l-cm', author: 'u-priya', title: 'Cultivated meat language: \u201ccell-cultivated\u201d > \u201clab-grown\u201d (data inside)', streams: ['research', 'consumer'], content: 'Ran a 1,200-person panel across DE/FR/IT. \u201CCell-cultivated\u201D outperforms \u201Clab-grown\u201D by 17pp on intent-to-try. \u201CCultivated\u201D alone is fine but underperforms by 6pp vs the full phrase. Avoid \u201Csynthetic\u201D entirely \u2014 it tanks scores.', when: '1 week ago', reactions: { helpful: 32, insightful: 28, bookmarked: 21 }, comments: 9, pinned: false },
  { id: 'l-grant', author: 'u-marcus', title: 'Three-page grant proposals get funded. Twenty-page ones don\u2019t.', streams: ['capacity'], content: 'I reviewed 60 funded proposals from the last two cycles across four major foundations. The median funded proposal was 3.2 pages. The median rejected one was 8.4. The pattern is clear: short proposals force you to lead with the change, not the methodology. Write the press release, then the proposal.', when: '2 weeks ago', reactions: { helpful: 51, insightful: 33, bookmarked: 42 }, comments: 18, pinned: false },
];

export const SOCIAL_POSTS: SocialPost[] = [
  { id: 'sp-1', user: 'u-elena', org: 'eurogroup', platform: 'linkedin', streams: ['policy', 'law'], description: 'Op-ed on the Commission\u2019s delay on the cage-age proposal. Looking for shares from advocacy folks.', request: 'Repost + tag one MEP from your country', when: '2h ago', engagements: 23 },
  { id: 'sp-2', user: 'u-mara', org: 'veganuary', platform: 'twitter', streams: ['consumer'], description: 'Veganuary 2027 sign-up page is live. Aim for 2M pledges \u2014 every share counts.', request: 'Quote-tweet with your org\u2019s endorsement', when: '5h ago', engagements: 41 },
  { id: 'sp-3', user: 'u-priya', org: 'gfi-eu', platform: 'linkedin', streams: ['research'], description: 'New consumer-language report on cultivated meat. Methodology + raw data linked.', request: 'Comment with which finding surprised you most', when: '1d ago', engagements: 18 },
  { id: 'sp-4', user: 'u-jonas', org: 'dvf', platform: 'instagram', streams: ['public-food'], description: 'Behind-the-scenes from the Copenhagen schools pilot. Visuals are strong this time.', request: 'Repost to stories', when: '1d ago', engagements: 31 },
  { id: 'sp-5', user: 'u-tomas', org: 'proveg', platform: 'linkedin', streams: ['retail'], description: 'Albert Heijn launch deck \u2014 full retail engagement playbook published as a LinkedIn doc.', request: 'Share + tag any retailer contacts you think should see this', when: '2d ago', engagements: 27 },
  { id: 'sp-6', user: 'u-isabel', org: 'animaleq', platform: 'twitter', streams: ['policy', 'media'], description: 'Spanish supermarket undercover \u2014 footage drops Friday. Building pre-release momentum.', request: 'Like + bookmark the teaser thread', when: '2d ago', engagements: 15 },
];

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  { id: 'd-1', title: 'SPA Module 04 \u2014 Strategic Planning for Advocacy Orgs', type: 'course_material', stream: 'capacity', source: 'SPA / SPII Curriculum', updated: 'Apr 2026', size: '42p PDF', downloads: 218 },
  { id: 'd-2', title: 'Retail Engagement Playbook \u2014 Northern Europe', type: 'best_practice', stream: 'retail', source: 'ProVeg + Albert Schweitzer', updated: 'May 2026', size: '28p PDF', downloads: 184 },
  { id: 'd-3', title: 'Cultivated Meat Consumer Language \u2014 EU 5-country study', type: 'report', stream: 'research', source: 'GFI Europe', updated: 'Apr 2026', size: '64p PDF', downloads: 312 },
  { id: 'd-4', title: '2025 Plant Food System Summit \u2014 Workshop Transcripts', type: 'summit_transcript', stream: 'capacity', source: 'Summit \u201925 \u2014 Vienna', updated: 'Jan 2026', size: '186 docs', downloads: 89 },
  { id: 'd-5', title: 'End the Cage Age \u2014 Campaign post-mortem', type: 'case_study', stream: 'policy', source: 'Eurogroup for Animals', updated: 'Mar 2026', size: '14p', downloads: 156 },
  { id: 'd-6', title: 'School Meals Default-Plant Pilot \u2014 Copenhagen', type: 'case_study', stream: 'public-food', source: 'Danish Vegetarian Assoc.', updated: 'May 2026', size: '11p', downloads: 92 },
  { id: 'd-7', title: 'Foundation Grant Proposal Templates (3-page format)', type: 'best_practice', stream: 'capacity', source: 'Stray Dog Institute', updated: 'Feb 2026', size: '6 docs', downloads: 246 },
  { id: 'd-8', title: 'Faunalytics 2026 Research Library Index', type: 'external', stream: 'research', source: 'Faunalytics', updated: 'Apr 2026', size: 'index', downloads: 174 },
  { id: 'd-9', title: 'EU Dietary Guidelines \u2014 Submission Toolkit', type: 'best_practice', stream: 'public-health', source: 'ProVeg Policy', updated: 'May 2026', size: '9 docs', downloads: 127 },
  { id: 'd-10', title: 'Movement Capacity Assessment \u2014 framework + scoring', type: 'best_practice', stream: 'capacity', source: 'SPA Cohort 2025', updated: 'Mar 2026', size: '22p', downloads: 103 },
];

export const LEARNING_FEED: LearningFeedItem[] = [
  { id: 'lf-1', source: 'POLITICO Pro Food', title: 'Commission to unveil EU Sustainable Food Systems framework in October', when: '3h ago', stream: 'policy', summary: 'The Commission\u2019s leaked communication outlines mandatory sustainability labelling and reformulation targets. Implications for plant-based positioning are significant \u2014 see briefing.' },
  { id: 'lf-2', source: 'Reuters', title: 'Albert Heijn doubles private-label plant-based SKUs', when: '8h ago', stream: 'retail', summary: 'Dutch retailer announces 24 new SKUs in own-brand plant-based range. KPIs target 18% category share by EOY 2027.' },
  { id: 'lf-3', source: 'Nature Food', title: 'Meta-analysis: dietary shift potential of default-plant menus', when: '1d ago', stream: 'research', summary: '8-study meta-analysis (n=14,200) finds default-plant menus shift consumption by 23\u201341pp. Effect persists at 6-month follow-up in 5/8 studies.' },
  { id: 'lf-4', source: 'EFSA', title: 'EFSA opens public consultation on dietary reference values', when: '1d ago', stream: 'public-health', summary: 'Consultation runs through July 15. Coordinated organizational submissions are weighted in the final synthesis.' },
  { id: 'lf-5', source: 'GFI', title: 'France clarifies cultivated meat regulatory pathway', when: '2d ago', stream: 'research', summary: 'ANSES publishes updated Novel Food guidance. Two French producers expected to file under the new pathway in Q3.' },
];

export const UPCOMING_TASKS: UpcomingTask[] = [
  { label: 'Submit EFSA consultation response', due: 'Due Jul 12', stream: 'public-health' },
  { label: 'Approve Veganuary launch graphics', due: 'Due Jun 04', stream: 'consumer' },
  { label: 'RSVP to GFI alt-protein briefing', due: 'Due Jun 14', stream: 'research' },
  { label: 'Review End-the-Cage MEP letter draft', due: 'Due Jun 09', stream: 'policy' },
];
