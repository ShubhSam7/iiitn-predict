"use client";

import { motion } from "framer-motion";
import { TrendingUp, Wallet, Trophy, Clock, Users } from "lucide-react";

export default function LandingPage() {
  const liveMarkets = [
    {
      id: 1,
      category: "CULTURAL",
      question: "Will Abhivyakti be postponed this year?",
      yesPercent: 65,
      noPercent: 35,
      volume: "₹45,200",
      endsIn: "18 hrs",
    },
    {
      id: 2,
      category: "SPORTS",
      question: "Will CSE win the Inter-Branch Cricket Tournament?",
      yesPercent: 42,
      noPercent: 58,
      volume: "₹38,900",
      endsIn: "2 days",
    },
    {
      id: 3,
      category: "CAMPUS",
      question: "Will mid-sem exams be conducted online?",
      yesPercent: 78,
      noPercent: 22,
      volume: "₹62,100",
      endsIn: "5 hrs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#1e1e1e]/80 border-b border-[#a9f99e]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">
              <span className="text-white">IIITN</span>
              <span className="text-[#A7A4F2]">Predict</span>
            </h1>
            <div className="hidden md:flex gap-6 text-sm">
              <a
                href="#markets"
                className="hover:text-[#A7A4F2] transition-colors"
              >
                Markets
              </a>
              <a
                href="#leaderboard"
                className="hover:text-[#A7A4F2] transition-colors"
              >
                Leaderboard
              </a>
              <a
                href="#portfolio"
                className="hover:text-[#A7A4F2] transition-colors"
              >
                Portfolio
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 text-sm font-medium hover:text-[#A7A4F2] transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-[#A7A4F2] hover:bg-[#A7A4F2]/90 rounded-full text-sm font-medium text-black transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Predict. Play. <span className="text-[#A7A4F2]">Prevail.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              The ultimate campus prediction market for IIIT Nagpur. Trade
              virtual coins on college events, compete with peers, and prove
              your forecasting skills.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-[#A7A4F2] hover:bg-[#A7A4F2]/90 rounded-full font-semibold text-lg text-black transition-all">
                Start Predicting
              </button>
              <button className="px-8 py-4 border border-[#a9f99e]/40 hover:border-[#a9f99e]/70 rounded-full font-semibold text-lg transition-all">
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Markets */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-4xl font-bold">Live Markets</h3>
              <button className="text-[#A7A4F2] hover:underline">
                View All →
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {liveMarkets.map((market, index) => (
                <motion.div
                  key={market.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-[#272727] border border-[#a9f99e]/20 hover:border-[#a9f99e]/50 rounded-2xl p-6 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        index === 0
                          ? "bg-[#A7A4F2]/20 text-[#A7A4F2]"
                          : index === 1
                            ? "bg-[#ff932e]/20 text-[#ff932e]"
                            : "bg-[#A7A4F2]/20 text-[#A7A4F2]"
                      }`}
                    >
                      {market.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {market.endsIn}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold mb-6 leading-tight group-hover:text-[#A7A4F2] transition-colors">
                    {market.question}
                  </h4>

                  {/* Probability Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#a9f99e]">
                        YES {market.yesPercent}%
                      </span>
                      <span className="text-[#cc3131]">
                        NO {market.noPercent}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#a9f99e] transition-all"
                        style={{ width: `${market.yesPercent}%` }}
                      />
                      <div
                        className="bg-[#cc3131] transition-all"
                        style={{ width: `${market.noPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Volume: {market.volume}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#272727]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold text-center mb-16">
              How It Works
            </h3>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Wallet,
                  title: "Get 10k Coins",
                  description:
                    "Sign up with your IIITN email and receive 10,000 virtual coins to start trading.",
                },
                {
                  icon: TrendingUp,
                  title: "Analyze Trends",
                  description:
                    "Study market probabilities, volume, and community sentiment to make informed predictions.",
                },
                {
                  icon: Trophy,
                  title: "Win & Climb",
                  description:
                    "Cash out winning positions and climb the leaderboard. Top predictors earn bragging rights!",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-6 ${
                      index === 0
                        ? "bg-[#A7A4F2]"
                        : index === 1
                          ? "bg-[#ff932e]"
                          : "bg-[#A7A4F2]"
                    } rounded-2xl flex items-center justify-center`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 IIITN Predict. Built for IIIT Nagpur students.</p>
        </div>
      </footer>
    </div>
  );
}
