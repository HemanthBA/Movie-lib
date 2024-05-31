const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://udalengineeruk:OeRVFsVi4Ap7MEom@cluster0.43yl1fc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

{
    useCreateIndex:true ,useNewUrlParser:true,useUnifiedTopology: true }).then(
    console.log('connected')
)



