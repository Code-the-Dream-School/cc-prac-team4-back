const createPet = async (req, res) => {
  res.send('create pet');
};
const getAllPets = async (req, res) => {
  res.send('get all pets');
};
const getSinglePet = async (req, res) => {
  res.send('get single pet');
};
const updatePet = async (req, res) => {
  res.send('update pet');
};
const deletePet = async (req, res) => {
  res.send('delete pet');
};
const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createPet,
  getAllPets,
  getSinglePet,
  updatePet,
  deletePet,
  uploadImage,
};
