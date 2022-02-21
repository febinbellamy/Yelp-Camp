const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 25; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "620db1c55fe92658208a5cc5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae quis ex dolorum at illum veritatis sunt magni rerum necessitatibus quam, ea reprehenderit quasi atque optio nesciunt vitae exercitationem praesentium quod. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae quis ex dolorum at illum veritatis sunt magni rerum necessitatibus quam, ea reprehenderit quasi atque optio nesciunt vitae exercitationem praesentium quod.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dsxptrywr/image/upload/v1645228653/YelpCamp/quwljh57lv3ipamzzjha.png",
          filename: "YelpCamp/quwljh57lv3ipamzzjha",
        },
        {
          url: "https://res.cloudinary.com/dsxptrywr/image/upload/v1645228653/YelpCamp/vkj13o4x5wybggrpvyrz.png",
          filename: "YelpCamp/vkj13o4x5wybggrpvyrz",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
