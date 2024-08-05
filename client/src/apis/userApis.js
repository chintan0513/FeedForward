import api from "../axios/axios";
import Toast from "../custom/CustomToast";
import axios from "axios";

const baseUrl = "localhost:8000/api";

export const userSignin = async (payload, setUser, setIsLoading) => {
  console.log(payload);
  setIsLoading(true);
  await axios
    .post("http://localhost:8000/api/user/signin", payload)
    .then((response) => {
      if (response.data?.user?.token) {
        let userData = response.data?.user;
        setUser(userData);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData?.id,
            email: userData?.email,
            token: userData?.token,
            active: userData?.active,
            isDoner: userData?.isDoner,
            isAdmin: userData?.isAdmin,
          })
        );
      }
    })
    .catch((err) => {
      // Toast.error(err?.response?.data?.message)
      setIsLoading(false);
    });
};

export const userSignup = async (payload) => {
  await api
    .post("http://localhost:8000/api/user/signup", payload)
    .then((response) => {
      console.log("Signup Success!");
      window.location.href = "/feed";
    })
    .catch((err) => {
      Toast.error(err?.response?.data?.message);
    });
};
