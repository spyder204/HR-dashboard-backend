const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        designation:{
            type:String,
            required:true,
            default:''
        },
        currentProject:{
            type:String,
            required:false,
            default:''               
        },
        attendance:{
            type:Number,
            default:0,
            required:false
        }

    },
    {
        timestamps:true
    }
);

var Employees = mongoose.model("Employee", employeeSchema);
module.exports = Employees;