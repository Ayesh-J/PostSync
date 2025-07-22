import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Content Creator",
    image: "https://i.pravatar.cc/100?img=1",
    quote: "PostSync helped me schedule across all my platforms in one go. Absolute game-changer!",
  },
  {
    name: "Rahul Mehta",
    role: "Digital Marketer",
    image: "https://i.pravatar.cc/100?img=2",
    quote: "Managing multiple campaigns is so much easier now. I can't go back to manual posting.",
  },
  {
    name: "Sana R.",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/100?img=3",
    quote: "The simplicity and speed of PostSync saves my team hours every week. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#0b082b] text-white pt-16 pb-4 px-4"> {/* Reduced pb from 16 to 4 */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Loved by Creators & Teams
        </motion.h2>
        <p className="text-gray-400 mb-10">
          Here's what some of our users have to say.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#161342] rounded-2xl p-6 shadow-lg hover:shadow-primary/40 transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full mx-auto mb-4"
              />
              <p className="text-sm text-gray-300 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-white">{t.name}</h4>
              <p className="text-xs text-gray-400">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
