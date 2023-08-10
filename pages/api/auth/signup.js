import { connectToDB } from "@/utils/mongodb";
import User from "@/model/user";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { email, firstName, lastName, password} = await req.body

    if (!email || !password || !firstName || !lastName) {
    return res.status(405).json({ message: 'Incomplete data!' });
    }

    // if (!(password === cpassword)) return  new Response (JSON.stringify({error: 'Password does not match!'}), {status: 401})
  
    await connectToDB();

    const userExist = await User.findOne({email})
    if (userExist) {
      return res.status(401).json({ message: 'Email already exists.' });
    }

    const user = await User.create({email, firstName, lastName, password: await hash(password, 12)})
    
    return res.status(200).json({
      user: {
        email: user.email, 
        name: `${user.firstName} ${user.lastName}`,
        id: user._id,
        role: user.role,
        password: password
      }, 
      status: true, 
      message: 'Successful' });
   
  } catch (error) {
    return res.status(500).json(error);
  }
}

