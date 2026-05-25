const dummyData = {
  categories: [
    {
      name: "Signature Bafla",
      description: "Slow-baked baflas served with dal, ghee, and chutneys",
    },
    {
      name: "Royal Thalis",
      description: "Complete Indian meals with breads, sabzi, dal, and sweets",
    },
    {
      name: "Desi Curries",
      description: "Rich homestyle curries inspired by Malwa and North India",
    },
    {
      name: "Rotis",
      description: "Tandoor and tawa rotis baked fresh for every order",
    },
    {
      name: "Rice Specials",
      description: "Comforting rice dishes with fragrant spices and sides",
    },
    {
      name: "Chaat And Mithai",
      description: "Street-style snacks and classic Indian desserts",
    },
  ],

  customizations: [
    { name: "Ghee Pour", price: 20, type: "ghee" },
    { name: "Extra Dal Bowl", price: 35, type: "dal" },
    { name: "Green Chutney", price: 15, type: "spicey" },
    { name: "Garlic Chutney", price: 18, type: "spicey" },
    { name: "Onion Lachha", price: 12, type: "salad" },
    { name: "Mirchi Thecha", price: 15, type: "spicey" },
    { name: "Extra Bafla", price: 45, type: "baffale" },
    { name: "Crispy Bati", price: 30, type: "batties" },
    { name: "Boondi Raita", price: 45, type: "raita" },
    { name: "Baingan Bharta", price: 70, type: "bharta" },
    { name: "Roasted Papad", price: 20, type: "papad" },
    { name: "Fried Papad", price: 25, type: "papad" },
    { name: "Kachumber Salad", price: 40, type: "salad" },
  ],

  menu: [
    {
      name: "Classic Dal Bafla Platter",
      description:
        "Four baked baflas with panchmel dal, ghee, garlic chutney, and onion salad",
      image_url:
        "https://placehold.co/1200x800/F4C06A/5B2E1F.png?text=Classic+Dal+Bafla+Platter",
      price: 249,
      rating: 4.9,
      category_name: "Signature Bafla",
      customizations: [
        "Ghee Pour",
        "Extra Dal Bowl",
        "Garlic Chutney",
        "Onion Lachha",
        "Roasted Papad",
      ],
    },
    {
      name: "Stuffed Masala Bafla",
      description:
        "Crisp baflas stuffed with spiced potato filling, served with dal and green chutney",
      image_url:
        "https://placehold.co/1200x800/E6A85F/5B2E1F.png?text=Stuffed+Masala+Bafla",
      price: 269,
      rating: 4.7,
      category_name: "Signature Bafla",
      customizations: [
        "Ghee Pour",
        "Green Chutney",
        "Mirchi Thecha",
        "Extra Bafla",
        "Boondi Raita",
      ],
    },
    {
      name: "Bafla Family Feast",
      description:
        "A sharing meal with baflas, dal, jeera rice, papad, pickle, and dessert",
      image_url:
        "https://placehold.co/1200x800/D99A4E/4C2518.png?text=Bafla+Family+Feast",
      price: 549,
      rating: 4.8,
      category_name: "Signature Bafla",
      customizations: [
        "Extra Dal Bowl",
        "Extra Bafla",
        "Crispy Bati",
        "Roasted Papad",
        "Boondi Raita",
      ],
    },
    {
      name: "Malwa Royal Thali",
      description:
        "Dal bafla, sev tamatar, aloo jeera, roti, rice, raita, papad, and sweet",
      image_url:
        "https://placehold.co/1200x800/F1C27D/4C2518.png?text=Malwa+Royal+Thali",
      price: 329,
      rating: 4.8,
      category_name: "Royal Thalis",
      customizations: [
        "Ghee Pour",
        "Boondi Raita",
        "Roasted Papad",
        "Kachumber Salad",
        "Baingan Bharta",
      ],
    },
    {
      name: "Paneer Maharaja Thali",
      description:
        "Paneer curry, dal, seasonal sabzi, roti, pulao, salad, and dessert",
      image_url:
        "https://placehold.co/1200x800/DEB887/5B2E1F.png?text=Paneer+Maharaja+Thali",
      price: 359,
      rating: 4.7,
      category_name: "Royal Thalis",
      customizations: [
        "Garlic Chutney",
        "Boondi Raita",
        "Fried Papad",
        "Onion Lachha",
        "Kachumber Salad",
      ],
    },
    {
      name: "Panchmel Dal Tadka",
      description:
        "Slow-cooked five-lentil dal finished with cumin, garlic, and desi ghee",
      image_url:
        "https://placehold.co/1200x800/C98A45/4A2416.png?text=Panchmel+Dal+Tadka",
      price: 189,
      rating: 4.6,
      category_name: "Desi Curries",
      customizations: [
        "Ghee Pour",
        "Extra Dal Bowl",
        "Crispy Bati",
        "Roasted Papad",
        "Kachumber Salad",
      ],
    },
    {
      name: "Sev Tamatar Ki Sabzi",
      description:
        "A tangy tomato gravy topped with crunchy sev in true Indori style",
      image_url:
        "https://placehold.co/1200x800/D9734E/4A2416.png?text=Sev+Tamatar+Ki+Sabzi",
      price: 199,
      rating: 4.5,
      category_name: "Desi Curries",
      customizations: [
        "Green Chutney",
        "Onion Lachha",
        "Mirchi Thecha",
        "Crispy Bati",
        "Kachumber Salad",
      ],
    },
    {
      name: "Paneer Lababdar",
      description:
        "Soft paneer cubes simmered in a creamy tomato-cashew masala",
      image_url:
        "https://placehold.co/1200x800/CB6C43/4A2416.png?text=Paneer+Lababdar",
      price: 289,
      rating: 4.8,
      category_name: "Desi Curries",
      customizations: [
        "Garlic Chutney",
        "Onion Lachha",
        "Boondi Raita",
        "Kachumber Salad",
        "Fried Papad",
      ],
    },
    {
      name: "Baingan Bharta Dhaba Style",
      description:
        "Fire-roasted eggplant mash with onions, tomatoes, and smoky spices",
      image_url:
        "https://placehold.co/1200x800/B7633B/4A2416.png?text=Baingan+Bharta",
      price: 209,
      rating: 4.4,
      category_name: "Desi Curries",
      customizations: [
        "Baingan Bharta",
        "Garlic Chutney",
        "Onion Lachha",
        "Roasted Papad",
        "Crispy Bati",
        "Kachumber Salad",
      ],
    },
    {
      name: "Tandoori Roti Basket",
      description:
        "A basket of soft tandoori rotis brushed lightly with butter and herbs",
      image_url:
        "https://placehold.co/1200x800/CC8B54/4C2518.png?text=Tandoori+Roti+Basket",
      price: 89,
      rating: 4.3,
      category_name: "Fresh Breads",
      customizations: [
        "Ghee Pour",
        "Green Chutney",
        "Garlic Chutney",
        "Roasted Papad",
      ],
    },
    {
      name: "Butter Naan Pair",
      description:
        "Two fluffy butter naans baked in the tandoor and served warm",
      image_url:
        "https://placehold.co/1200x800/D8A35D/4C2518.png?text=Butter+Naan+Pair",
      price: 99,
      rating: 4.5,
      category_name: "Fresh Breads",
      customizations: [
        "Ghee Pour",
        "Garlic Chutney",
        "Fried Papad",
        "Kachumber Salad",
      ],
    },
    {
      name: "Jeera Rice Bowl",
      description:
        "Fragrant basmati rice tempered with cumin, ghee, and fresh coriander",
      image_url:
        "https://placehold.co/1200x800/E5BF7A/4C2518.png?text=Jeera+Rice+Bowl",
      price: 149,
      rating: 4.4,
      category_name: "Rice Specials",
      customizations: [
        "Ghee Pour",
        "Extra Dal Bowl",
        "Roasted Papad",
        "Boondi Raita",
      ],
    },
    {
      name: "Veg Pulao Raita Combo",
      description:
        "Lightly spiced pulao with peas, beans, carrots, and cooling raita",
      image_url:
        "https://placehold.co/1200x800/CF9F5A/4C2518.png?text=Veg+Pulao+Combo",
      price: 219,
      rating: 4.6,
      category_name: "Rice Specials",
      customizations: [
        "Boondi Raita",
        "Kachumber Salad",
        "Fried Papad",
        "Green Chutney",
      ],
    },
    {
      name: "Indori Poha Kachori Combo",
      description:
        "Soft poha with sev and pomegranate served with a hot kachori on the side",
      image_url:
        "https://placehold.co/1200x800/F0C96A/5B2E1F.png?text=Indori+Poha+Kachori+Combo",
      price: 159,
      rating: 4.7,
      category_name: "Chaat And Mithai",
      customizations: [
        "Green Chutney",
        "Onion Lachha",
        "Mirchi Thecha",
        "Kachumber Salad",
      ],
    },
    {
      name: "Jalebi Rabdi Cup",
      description:
        "Hot jalebi spirals topped with creamy rabdi and crushed pistachio",
      image_url:
        "https://placehold.co/1200x800/F2A65A/5B2E1F.png?text=Jalebi+Rabdi+Cup",
      price: 139,
      rating: 4.9,
      category_name: "Chaat And Mithai",
      customizations: [],
    },
    {
      name: "Gulab Jamun Duo",
      description:
        "Two warm gulab jamuns soaked in saffron sugar syrup",
      image_url:
        "https://placehold.co/1200x800/BB6B4D/FFF4E4.png?text=Gulab+Jamun+Duo",
      price: 99,
      rating: 4.5,
      category_name: "Chaat And Mithai",
      customizations: [],
    },
  ],
};

export default dummyData;
