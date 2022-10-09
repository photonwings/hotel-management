import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  // let navigate = useNavigate()
  // let location = useLocation()
  // console.log(location)
  // const routeChange = () => {
  //   let path = `\\auth`
  //   navigate(path)
  // }
  return (
    <div className="body-container home-img">
      <div className="home home-img">
        <h1>HOTEL RAJARAJESHWARI</h1>
        <Link to="/auth">
          <button className="btn btn-primary p-2 m-5">Log-In</button>
        </Link>
        <p className="mt-5 pt-5">
          Created by - Vaibhava Hathwar & Vaibhav Kulkarni
        </p>
      </div>
    </div>
  )
}

export default Home
