import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ticketsAtom } from "../../state/ticketAtom";
import { usersAtom } from "../../state/usersAtom";
import FilterMenu from "../FilterMenu/FilterMenu";
import "./DisplayButton.css";

// Icons
import displayIcon from "../../assets/Display.svg";
import downIcon from "../../assets/down.svg";

const DisplayButton = () => {
  const setTickets = useSetRecoilState(ticketsAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();

      if (Array.isArray(data.tickets)) {
        setTickets(data.tickets);
        localStorage.setItem("tickets", JSON.stringify(data.tickets));
      } else {
        setTickets([]);
      }

      if (Array.isArray(data.users)) {
        setUsers(data.users);
        localStorage.setItem("users", JSON.stringify(data.users));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTickets([]);
      setUsers([]);
    }
  };

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    const storedUsers = localStorage.getItem("users");

    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [setTickets, setUsers]);

  const handleOptionSelect = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="display-btn-container">
        <button className="display-btn" onClick={() => setIsPopupOpen(!isPopupOpen)}>
          <img src={displayIcon} alt="" />
          <p className="btn-para">Display</p>
          <img src={downIcon} alt="" />
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <FilterMenu onOptionSelect={handleOptionSelect} />{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayButton;
