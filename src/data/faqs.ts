export type Faq = {
  question: string;
  answer: string;
};

/**
 * Factual answers about the enquiry process only. No invented rental
 * policies, prices or guarantees — policy details come with each quote.
 */
export const faqs: Faq[] = [
  {
    question: "How does the rental enquiry work?",
    answer:
      "Tell us where and when you need a car using the search or quote form. Our team reviews your request, checks what's available for your trip and comes back to you with options and a personal quote. Nothing is booked or charged until you confirm.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "Your name, an email address or phone number we can reach you on, your pick-up and drop-off locations and your travel dates. Mentioning a preferred vehicle type helps us send better options straight away.",
  },
  {
    question: "Can I request an airport rental?",
    answer:
      "Yes — include your arrival airport and, if you can, your flight time in the enquiry. We'll propose pick-up arrangements that fit your arrival.",
  },
  {
    question: "What types of vehicles are available?",
    answer:
      "We arrange economy, compact, sedan, SUV, family and luxury vehicles. Availability depends on your location and dates, which is why every enquiry is answered with concrete options rather than a generic list.",
  },
  {
    question: "Can I request a specific vehicle?",
    answer:
      "You can name a preferred category or model in the enquiry form and we'll do our best to match it, or suggest the closest available alternative for your trip.",
  },
  {
    question: "Can I rent for multiple days or longer periods?",
    answer:
      "Yes — from a single day to weekly and monthly rentals. Just set your pick-up and drop-off dates in the enquiry and the quote will reflect the full period.",
  },
  {
    question: "How do I contact CarRentalO?",
    answer:
      "The quickest way is the quote form on this site — it goes straight to our team. Any contact channels listed on the contact page reach the same people.",
  },
];
