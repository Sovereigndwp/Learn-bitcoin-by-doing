// Module 1: If You Don't Define It, It Will Define You
// Goal: Teach students why money exists, how past forms of money failed, what makes good money, and how Bitcoin fits in.
// Implementation format: Simple layout with sections, quizzes, and a scorecard for traits. Suitable for integration into a React app.

const module1 = {
  title: "If You Don't Define It, It Will Define You",
  sections: [
    {
      id: "barter-world",
      title: "Barter World: Why We Invented Money",
      type: "story",
      content: `
        Imagine waking up in a world with no money. Not bad money—no money at all.
        You want shoes. Someone else wants bread. Another needs roof repair.
        Unless you find the exact person who wants what you have and has what you need, you can't trade.
        This is called the double coincidence of wants—and it makes life frustrating.

        Plus, even if you trade, you can't save extra food (it spoils), and nobody agrees what things are worth.

        Without money, trade is slow, saving is risky, and comparing value is messy.
      `,
      activity: {
        prompt: "Look around your room. Pick 3 things. Try to trade them without using money. What happens?",
        type: "reflection"
      }
    },
    {
      id: "money-fails-quiz",
      title: "Money's Greatest Fails (Interactive Quiz Timeline)",
      type: "quiz",
      questions: [
        {
          id: 1,
          text: "Rare shells were used as money on Pacific Islands—until traders arrived with boatloads from elsewhere.",
          question: "What went wrong?",
          options: ["Trade increased", "Shells lost their scarcity", "Islanders chose the wrong shell"],
          answer: 1,
          takeaway: "Shells lost scarcity. Good money must be hard to reproduce.",
          unlock: "Scarcity"
        },
        {
          id: 2,
          text: "Salt was used as money, but it dissolved in rain and rotted in humidity.",
          question: "Why was this a problem?",
          options: ["Too common", "Not divisible", "Wouldn't last"],
          answer: 2,
          takeaway: "Money must be durable to hold value.",
          unlock: "Durability"
        },
        {
          id: 3,
          text: "Gold was used for centuries but was heavy and risky to transport.",
          question: "What was its biggest weakness?",
          options: ["Too beautiful", "Hard to carry", "Too scarce"],
          answer: 1,
          takeaway: "Money must be easy to move—portability matters.",
          unlock: "Portability"
        },
        {
          id: 4,
          text: "Germany in 1923 saw prices doubling every few days. People rushed to spend their money before it lost value.",
          question: "What's the lesson?",
          options: ["Spending fast is good", "Money must store value", "Prices should be flexible"],
          answer: 1,
          takeaway: "Money must hold value over time, or it fails.",
          unlock: "Store of Value"
        },
        {
          id: 5,
          text: "In ancient Rome, coins were secretly mixed with cheaper metals or clipped around the edges, making them unequal in value.",
          question: "What happened to trust in money?",
          options: ["Nothing changed", "People stopped trusting coins", "They made more coins"],
          answer: 1,
          takeaway: "When money isn't uniform, people lose trust. Fungibility is essential.",
          unlock: "Fungibility"
        },
        {
          id: 6,
          text: "The Yap Islands used massive stone money that never moved. Ownership was remembered by the community.",
          question: "What does this reveal about money?",
          options: ["Must be physical", "Community agreement matters", "Lost money still counts"],
          answer: 1,
          takeaway: "Money relies on shared knowledge of ownership—not physical form. Ledger consensus is what really matters.",
          unlock: "Ledger Consensus"
        },
        {
          id: 7,
          text: "In 2020, protesting Canadian truckers had their bank accounts frozen.",
          question: "What would change with Bitcoin?",
          options: ["Nothing", "Funds stay accessible", "Authorities would allow the protest"],
          answer: 1,
          takeaway: "Decentralized money can't be frozen—censorship resistance matters.",
          unlock: "Censorship Resistance"
        },
        {
          id: 8,
          text: "In Turkey, Argentina, and China, governments have placed strict controls on how much money citizens can withdraw or move abroad. Some families trying to leave must carry gold, hide cash, or pay black market rates.",
          question: "How does Bitcoin challenge that system?",
          options: ["It doesn't", "It respects capital controls", "It allows borderless movement of value"],
          answer: 2,
          takeaway: "Bitcoin moves freely across borders, helping people escape restrictions and protect savings.",
          unlock: "Borderless"
        },
        {
          id: 9,
          text: "When cattle was used as money, it worked for big trades—but you couldn't pay someone with half a cow.",
          question: "What did this reveal about money?",
          options: ["Cows were too smelly", "Money must be divisible", "People wanted beef"],
          answer: 1,
          takeaway: "Money must be divisible to handle both big and small transactions.",
          unlock: "Divisibility"
        },
        {
          id: 10,
          text: "Bitcoin is the first money that is digital, scarce, portable, divisible, and cannot be confiscated or counterfeited.",
          question: "What makes Bitcoin different?",
          options: ["Just another app", "Digital gold with new powers", "Only for small payments"],
          answer: 1,
          takeaway: "Bitcoin combines all traits of sound money with global digital reach—plus neutrality and decentralization.",
          unlock: "All traits"
        }
      ]
    },
    {
      id: "traits-scorecard",
      title: "The Traits That Matter",
      type: "scorecard",
      content: "Each quiz question unlocked a core trait of sound money. Here's your scorecard:",
      traits: [
        "Scarcity",
        "Durability",
        "Portability",
        "Store of Value",
        "Fungibility",
        "Ledger Consensus",
        "Censorship Resistance",
        "Borderless",
        "Divisibility"
      ],
      summary: "Bitcoin is the first money in history that combines all these properties—plus decentralization and neutrality—in one system."
    },
    {
      id: "timeline",
      title: "The Evolution of Money",
      type: "interactive-timeline",
      eras: [
        "Barter (9000 BCE)",
        "Commodity Money (3000 BCE)",
        "Metal Coins (600 BCE)",
        "Paper Money (700 CE)",
        "Banking Systems (1400 CE)",
        "Digital Banking (1950s)",
        "Bitcoin (2009)"
      ],
      note: "Optional deep dive for students or teachers who want to explore the full history."
    }
  ]
};

export default module1;
