import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getExamination, getAllData } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [examination, setExamination] = useState(null)
  const [medicalRecord, setMedicalRecord] = useState([]);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  useEffect(() => {
    getExamination()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true)
          setExamination(res)
        } else {
          setIsLoggedIn(false)
          setExamination(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  useEffect(() => {
    getAllData()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true)
          setMedicalRecord(res)
        } else {
          setIsLoggedIn(false)
          setMedicalRecord(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  const updateUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const updateExamination = async () => {
    try {
      const examination = await getExamination();
      setExamination(examination);
    } catch (error) {
      console.error('Failed to fetch examination:', error);
    }
  };

  const updateMedicalRecord = async () => {
    try {
      const medicalRecord = await getAllData();
      setMedicalRecord(medicalRecord);
    } catch (error) {
      console.error('Failed to fetch medical record:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        examination,
        setExamination,
        medicalRecord,
        setMedicalRecord,
        isLoading,
        updateUser,
        updateExamination,
        updateMedicalRecord,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;