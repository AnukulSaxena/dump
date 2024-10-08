import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Define the schema for the 'offices' collection
const officeSchema = new mongoose.Schema({
  officeName: String,
  pincode: Number,
  taluk: String,
  districtName: String,
  stateName: String
});

// Create a model from the schema
const Office = mongoose.model('offices', officeSchema);

// UserData schema
const userDataSchema = new mongoose.Schema({
  office: { type: mongoose.Schema.Types.ObjectId, ref: 'Office' }
});

// Create UserData model
const UserData = mongoose.model('UserData', userDataSchema);

// Define a route to get data from the 'offices' collection
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



const getGroupedByState = async () => {
  try {
    const result = await Office.aggregate([{
      $group: {
        _id: '$stateName'
      }
    },{
      $project: {
        _id: 0,
        state: "$_id",
    }
      }
    ]);
    return result;
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw error;
  }
};


const getGroupedByDistrict = async (state) => {
  try {
    const result = await Office.aggregate([
      {
        '$match': {
          'stateName': state
        }
      }, {
        '$group': {
          '_id': '$districtName'
        }
      }, {
        '$project': {
          '_id': 0, 
          'district': '$_id'
        }
      }
    ]);
    return result;
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw error;
  }
};

const getGroupedByTaluk = async (district) => {
  try {
    const result = await Office.aggregate(
      [
        {
          $match: {
            districtName: district
          }
        },
        {
          $group: {
            _id: '$taluk',
          }
        }
        ,{
            $project: {
              _id: 0,
              taluk: "$_id",
          }
        } 
      ]
    );
    return result;
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw error;
  }
};

const getGroupedByPincode = async (taluk) => {
  try {
    const result = await Office.aggregate(
      [
        {
          $match: {
            taluk: taluk
          }
        } 
      ]
    );
    return result;
  } catch (error) {
    console.error('Error in aggregation:', error);
    throw error;
  }
};

app.get('/state', async (req, res) => {
  try {
    const data = await getGroupedByState();
    console.log(data.length);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching grouped data');
  }
});

app.get('/district/:state', async (req, res) => {
  try {

    const state = req.params.state;
    const data = await getGroupedByDistrict(state);
    console.log(data.length);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching grouped data');
  }
});

app.get('/taluk/:district', async (req, res) => {
  try {

    const district = req.params.district;
    const data = await getGroupedByTaluk(district);
    console.log(data.length);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching grouped data');
  }
});

app.get('/pincode/:taluk', async (req, res) => {
  try {

    const taluk = req.params.taluk;
    const data = await getGroupedByPincode(taluk);
    console.log(data.length);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching grouped data');
  }
});


app.post('/userdata', async (req, res) => {
  try {
    console.log(req.body);
    const {  officeId } = req.body;

    // Find the office by ID
    const office = await Office.findById(officeId);
    if (!office) {
      return res.status(404).json({ message: 'Office not found' });
    }

    // Create a new userData document
    const newUserData = new UserData({
      office: office._id
    });

    // Save the userData document
    await newUserData.save();

    res.status(201).json({ message: 'User data saved successfully', data: newUserData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving user data' });
  }
});

app.get('/userdata', async (req, res) => {
  try {
    const users = await UserData.aggregate([
      {
        $lookup: {
          from: 'offices', // The collection to join
          localField: 'office', // The field from the input documents
          foreignField: '_id', // The field from the documents of the "from" collection
          as: 'office' // The name of the new array field to add to the input documents
        }
      },
      {
        $unwind: '$office' // Unwind the array to deconstruct the array field from the input documents to output a document for each element
      }
    ]);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
});

app.get('/userdata', async (req, res) => {
  try {
    const users = await UserData.aggregate([
      {
        $lookup: {
          from: 'offices', // The collection to join
          localField: 'office', // The field from the input documents
          foreignField: '_id', // The field from the documents of the "from" collection
          as: 'office' // The name of the new array field to add to the input documents
        }
      },
      {
        $unwind: '$office' // Unwind the array to deconstruct the array field from the input documents to output a document for each element
      }
    ]);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
});
