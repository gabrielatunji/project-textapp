const express = require('express'); 
const dotenv = require('dotenv'); 
const cloudinary = require('cloudinary').v2; 
const multer  = require('multer'); 
const upload = multer({ dest: 'uploads/' }); 


const app = express(); 
dotenv.config(); 
PORT = process.env.PORT 

//cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


app.post('/upload-avatar', upload.single('avatar'), async function (req, res, next) {
    const filePath = req.file.path
    const{userName} = req.body 
    try{
        const uploadResult = await cloudinary.uploader.upload(filePath,
             { public_id: `avatar/${userName}`,
               folder: 'TextingAppAvatars'
            })
            res.json({ imageUrl: uploadResult.secure_url}); 
        }catch(error){
            console.log(error);
            res.status(500).json({error: 'upload failed'})

        }
  }); 

  app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
  }); 

