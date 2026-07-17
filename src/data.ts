export interface Article {
  id: string;
  headline: string;
  overview: string;
  mainBodyParagraphs: string[];
  conclusion: string;
  gradientFrom: string;
  gradientTo: string;
  episodeNumber: string;
  category: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    id: "inspiration-vs-systems",
    headline: "Inspiration vs Systems",
    overview: "Why motivation starts the journey but systems create outcomes.",
    mainBodyParagraphs: [
      "Many people begin new goals feeling inspired, but inspiration alone rarely lasts. Motivation fluctuates with emotions, circumstances, and energy levels, making it an unreliable foundation for long-term success.",
      "What truly separates consistent performers from everyone else is the system they build around their goals. Habits, routines, structured schedules, and repeatable processes make progress possible even when motivation fades. By relying on systems instead of emotions, people remove unnecessary friction and make consistent action easier.",
      "Small actions performed consistently compound over time into meaningful achievements. Sustainable success is rarely built through occasional bursts of motivation—it is built through disciplined systems."
    ],
    conclusion: "Instead of waiting to feel motivated, invest your time in building systems that make consistent progress inevitable.",
    gradientFrom: "from-indigo-600",
    gradientTo: "to-blue-600",
    episodeNumber: "EPISODE 01",
    category: "OPERATIONS"
  },
  {
    id: "strategic-alliances",
    headline: "Strategic Alliances",
    overview: "The importance of surrounding yourself with ambitious people.",
    mainBodyParagraphs: [
      "Success is rarely achieved in isolation. The people you spend time with influence your mindset, ambitions, opportunities, and standards. Building meaningful relationships with driven individuals creates an environment where learning, collaboration, and growth naturally occur.",
      "Rather than collecting contacts, focus on developing genuine relationships built on trust and mutual value. Strong professional networks often lead to better ideas, partnerships, and opportunities that would be difficult to achieve alone.",
      "The quality of your relationships often determines the quality of your future."
    ],
    conclusion: "Build meaningful alliances with people who inspire growth and challenge you to think bigger.",
    gradientFrom: "from-pink-600",
    gradientTo: "to-rose-600",
    episodeNumber: "EPISODE 02",
    category: "NETWORK"
  },
  {
    id: "de-risk-the-first-yes",
    headline: "De-Risk The First Yes",
    overview: "How getting the first customer is easier when risk is removed.",
    mainBodyParagraphs: [
      "First-time customers are naturally hesitant because they are uncertain about the outcome. Instead of trying to convince them with promises, successful businesses reduce the perceived risk of saying yes.",
      "Offering guarantees, free trials, pilot projects, or low-commitment entry points helps build trust and lowers hesitation. When customers feel protected, they become more willing to make their first decision.",
      "Removing friction often matters more than adding persuasion."
    ],
    conclusion: "Reduce customer risk before increasing your sales effort.",
    gradientFrom: "from-purple-600",
    gradientTo: "to-indigo-600",
    episodeNumber: "EPISODE 03",
    category: "SALES"
  },
  {
    id: "solve-unserved-problems",
    headline: "Solve Unserved Problems",
    overview: "Businesses grow by solving overlooked problems.",
    mainBodyParagraphs: [
      "The biggest business opportunities often exist where important problems remain unsolved. Rather than competing in crowded markets, successful entrepreneurs identify frustrations that people experience every day but rarely see addressed effectively.",
      "Innovation does not always mean inventing something completely new. Often, it means providing a better, simpler, or more accessible solution to an existing problem.",
      "Businesses that consistently solve meaningful problems naturally create value and long-term demand."
    ],
    conclusion: "Focus on solving real problems that others have ignored.",
    gradientFrom: "from-teal-600",
    gradientTo: "to-emerald-600",
    episodeNumber: "EPISODE 04",
    category: "INNOVATION"
  },
  {
    id: "sell-outcomes-not-capabilities",
    headline: "Sell Outcomes, Not Capabilities",
    overview: "Customers buy results, not features.",
    mainBodyParagraphs: [
      "Customers rarely purchase products because of technical specifications or impressive capabilities. Instead, they buy the outcome those products help them achieve.",
      "Rather than explaining what your product does, explain how it improves someone's life, saves time, increases revenue, or solves a challenge. Clear communication around outcomes makes your value easier to understand.",
      "People invest in transformation—not complexity."
    ],
    conclusion: "Always position your product around the results customers truly want.",
    gradientFrom: "from-amber-600",
    gradientTo: "to-orange-600",
    episodeNumber: "EPISODE 05",
    category: "MARKETING"
  },
  {
    id: "the-500-follower-advantage",
    headline: "The 500 Follower Advantage",
    overview: "Trust and relevance beat massive reach.",
    mainBodyParagraphs: [
      "Large audiences may create visibility, but trust creates influence. A small community of engaged followers often generates greater impact than thousands of passive viewers.",
      "Consistent value, authenticity, and meaningful interactions build credibility over time. Businesses and creators benefit more from strong relationships than inflated follower counts.",
      "Quality of audience consistently outperforms quantity."
    ],
    conclusion: "Prioritize trust and engagement before chasing larger numbers.",
    gradientFrom: "from-violet-600",
    gradientTo: "to-purple-600",
    episodeNumber: "EPISODE 06",
    category: "INFLUENCE"
  },
  {
    id: "agency-to-ecosystem",
    headline: "Agency to Ecosystem",
    overview: "The shift from selling services to building infrastructure.",
    mainBodyParagraphs: [
      "Many businesses begin by selling services that depend entirely on the founder's time. While effective initially, this model eventually limits growth.",
      "Long-term scalability comes from building systems, products, platforms, and infrastructure that continue creating value independently of personal effort.",
      "Moving from an agency mindset to an ecosystem mindset creates leverage and sustainable growth."
    ],
    conclusion: "Build assets that scale beyond your personal capacity.",
    gradientFrom: "from-cyan-600",
    gradientTo: "to-blue-600",
    episodeNumber: "EPISODE 07",
    category: "SCALE"
  },
  {
    id: "operational-risk-of-inexperience",
    headline: "Operational Risk of Inexperience",
    overview: "Scaling creates new challenges that require mature systems.",
    mainBodyParagraphs: [
      "Growth introduces complexity. Processes that work for a small team often become inefficient as businesses expand.",
      "Successful scaling requires documentation, accountability, communication, and operational discipline. Without mature systems, growth exposes weaknesses instead of creating opportunities.",
      "Operational excellence is essential for sustainable expansion."
    ],
    conclusion: "Prepare your operations before rapid growth begins.",
    gradientFrom: "from-red-600",
    gradientTo: "to-orange-600",
    episodeNumber: "EPISODE 08",
    category: "RISK"
  },
  {
    id: "creative-freedom-drives-conversion",
    headline: "Creative Freedom Drives Conversion",
    overview: "Great creators perform when given ownership, not control.",
    mainBodyParagraphs: [
      "Creativity thrives when talented people have the freedom to contribute ideas and make meaningful decisions. Excessive control often reduces motivation, innovation, and ownership.",
      "Leaders who trust their teams encourage accountability and produce stronger creative outcomes. Empowered individuals consistently perform better than micromanaged teams.",
      "Ownership creates commitment."
    ],
    conclusion: "Give capable people the freedom to create their best work.",
    gradientFrom: "from-fuchsia-600",
    gradientTo: "to-pink-600",
    episodeNumber: "EPISODE 09",
    category: "CREATIVE"
  },
  {
    id: "capital-is-fuel-not-success",
    headline: "Capital Is Fuel, Not Success",
    overview: "Money amplifies execution but cannot replace it.",
    mainBodyParagraphs: [
      "Funding can accelerate growth, but it cannot compensate for weak strategy or poor execution. Businesses succeed because of disciplined decision-making, consistent execution, and strong fundamentals—not because they simply have more capital.",
      "Money magnifies strengths and weaknesses. Companies with solid foundations benefit most from additional resources.",
      "Execution remains the greatest competitive advantage."
    ],
    conclusion: "Treat capital as a tool for growth, never as a substitute for execution.",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-teal-600",
    episodeNumber: "EPISODE 10",
    category: "CAPITAL"
  }
];
