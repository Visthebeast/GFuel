const User = require('../model/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const { GMAIL, PASS } = require('../env.js')

const handleNewUser = async (req, res) => {
    const { id, phone, position, yerid, allowance, mail, user, pwd } = req.body;
    if (!id||!phone||!position||!yerid||!allowance||!mail||!user||!pwd) return res.status(400).json({ 'message': ' all fields are required.' });

    // check for duplicate EmployeeNames in the db
    const duplicate = await User.findOne({ EmployeeName: user }).exec();
    const duplicate1 = await User.findOne({ EmployeeEmail: mail }).exec();
    if (duplicate||duplicate1) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            
            EmployeeId: id,
            EmployeePassword: hashedPwd,
            EmployeeName: user,
            EmployeeEmail: mail,
            EmployeePhone: phone,
            EmployeePosition: position,
            EmployerId: yerid,
            EmployeeMonthlyAllowance: allowance
        });

        let config = {
            service: 'gmail',
            auth: {
                user: GMAIL,
                pass: PASS
            }
        }
        
        let transporter = nodemailer.createTransport(config);
        
        let MailGenerator = new Mailgen({
            theme: "cerberus",
            product: {
                name: "G-FUEL.",
                link: 'Link will be shared soon' //site of our link
            }
        })
        let response = {
            body: {
                name: req.body.user,
                greeting:'Welcome',
                intro: 'You are successfully registered with G-FUEL!',
                table: {
                    data: [
                        {
                            EmployeeName:req.body.user,
                            EmployeeEmail: req.body.mail,
                            EmployeePassword:req.body.pwd,
                        }
                    ],
                    columns: {
                        // Optionally, customize the column widths
                        customWidth: {
                            EmployeeName: '30%',
                            EmployeeEmail: '40%'
                        }
                    }
                },
                outro: "Use Email and Password for Login",
                signature: 'Thank you for choosing us:)'
            }
        }

        let EmployeeEmail = MailGenerator.generate(response)

        let message = {
            from: GMAIL,
            to: req.body.mail,
            subject: "SignIn confirmation!",
            html: EmployeeEmail
        }

        transporter.sendMail(message).then(() => {
            return res.status(201).json({
                msg: "you should receive an EmployeeEmail", result
            })
        }).catch(error => {
            return res.status(500).json({ error })
        })
 
        console.log(result);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };