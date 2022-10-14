import React from "react"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [authData, setAuthData] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("auth").select()
      if (error) {
        console.log(error)
      }
      if (data) {
        data.forEach((d) => {
          const { userName, password } = d
          console.log(userName, password)
        })

        setAuthData(data)
      }
    }
    fetchUsers()
  }, [])
  const logIn = (e) => {
    e.preventDefault()
    if (userName === null || password === null) {
      alert("Enter username and passowrd")
    } else {
      for (let i = 0; i < authData.length; i++) {
        if (
          authData[i].userName === userName &&
          authData[i].password === password
        ) {
          navigate("/dash")
          break
        } else {
          alert("Username and passowrd does not match")
          break
        }
      }
    }
  }

  return (
    <div
      className="Auth-form-container"
      style={{ background: "linear-gradient(45deg, black, white)" }}
    >
      <form className="Auth-form" style={{ backgroundColor: "lightgray" }}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={logIn}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Auth
