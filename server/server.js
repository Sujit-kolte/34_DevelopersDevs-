const { getDocs, collection } = "firebase-admin/firestore";

const io = require("socket.io")(3000, {
  cors: { origin: "*", methods: ["GET", "POST"], Credential: true },
});

function haversineDistance(coord1, coord2) {
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const lat1 = toRadians(coord1.lat);
  const lon1 = toRadians(coord1.lon);
  const lat2 = toRadians(coord2.lat);
  const lon2 = toRadians(coord2.lon);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

function sortCoordinatesByProximity(coordinatesArray, targetCoord) {
  return coordinatesArray.sort((a, b) => {
    const distanceA = haversineDistance(a, targetCoord);
    const distanceB = haversineDistance(b, targetCoord);
    return distanceA - distanceB;
  });
}

const fetchAllNurses = async () => {
  const querySnapshot = await getDocs(collection(db, "nurse"));
  const documents = []; // Initialize as an array of Nurse type
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() }); // Type assertion to Nurse
  });
  return documents; // Set nurses to the fetched documents
};

io.on("connection", (socket) => {
  socket.io("help", async ({ email, lan, lng }) => {
    const sort = [];
  });
});
