import React, { useEffect, useState } from "react";
import styles from "./signUp.module.css";
import axios from "axios";

function SignUp() {
  const [jokes, setJokes] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/jokes")
  //     .then((response) => {
  //       setJokes(response.data);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className={styles.container}>
      {jokes.map((obj) => {
        return (
          <div className={styles.joke} key={obj.id}>
            <h1>{`Id :- ${obj.id}`}</h1>
            <p>{obj.joke}</p>
          </div>
        )
      })}
    </div>
  );
}

export default SignUp;
