const express = require('express'); 

const app = express();

app.use(express.json());

const slotsRouter = require('./routes/slots');
app.use('/api/slots', slotsRouter);


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});