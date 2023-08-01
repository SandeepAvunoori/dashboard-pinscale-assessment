import Cookies from 'js-cookie'
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './index.css'
const LoginForm = () => {

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();
    const sux = (id) => {

        Cookies.set('id', id, { expires: 78 })

    }

    const submitted = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(
                `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${name}&password=${pass}`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
                },
            }
            );
            const data = await response.json();
            console.log('data', data);
           const { get_user_id } = data

            const { id } = get_user_id[0]
            //console.log(id);


            if (id !== undefined) {
                sux(id)
                navigate("/profile")
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    const input = (e) => {
        setName(e.target.value)
    }

    const password = (e) => {
        setPass(e.target.value)
    }

    return (
        <form onSubmit={submitted} className='form-container' >
            <div className='form-container-div1'>
              <div className='form-container-div2'> 
                <span className="title">Money</span><span className="title">Matters</span>
              </div>
              <div  className='input-field'>
                  <label className='label'>Email</label>
                  <input onChange={input} type="text" />
              </div>
              <div  className='input-field'>
                <label className='label'>Password</label>
                <input onChange={password} type="password" />
              </div>
              <div className='button-div'>
                  <button type="submit"  className='button'>Submit</button>
              </div>
            </div>
        </form>
    )
}

export default LoginForm